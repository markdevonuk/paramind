// ============================================================
// PARAMIND - admin-emails.js
// Email template management for admin-emails.html.
//
// Manages three templates stored in Firestore:
//   - emailTemplates/newMember       (auto-sent on registration)
//   - emailTemplates/newProMember    (auto-sent on Pro upgrade)
//   - emailTemplates/general         (one-off CSV-driven send)
//
// Requires (at call time):
//   - Firebase v10 modular SDK initialised in admin-emails.html
//   - Firestore + Storage already created on the app
//   - Quill 2.x available globally as window.Quill
//
// Talks to:
//   - Firestore collection:  emailTemplates/{newMember|newProMember|general}
//   - Storage path:          email-templates/images/...
// ============================================================

import {
    doc, getDoc, setDoc, serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

import {
    ref as storageRef, uploadBytes, getDownloadURL
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';


// ---- Module-local state ------------------------------------
let _db = null;
let _storage = null;
let _adminEmail = null;

// One entry per template
const TEMPLATES = {
    newMember:     { quill: null, hasGreeting: true,  hasFirstNameToken: false },
    newProMember:  { quill: null, hasGreeting: true,  hasFirstNameToken: false },
    general:       { quill: null, hasGreeting: false, hasFirstNameToken: true  }
};

// Parsed CSV recipients (general tab)
let _recipients = [];


// ============================================================
// PUBLIC: initAdminEmails
// ============================================================
export async function initAdminEmails({ db, storage, adminEmail }) {
    _db = db;
    _storage = storage;
    _adminEmail = adminEmail;

    try {
        await waitForQuill();
    } catch (err) {
        console.error('admin-emails: Quill failed to load', err);
        alert('Rich text editor failed to load. Please refresh.');
        return;
    }

    // Build the three editors
    buildEditor('newMember',     '#newMember-editor',     false);
    buildEditor('newProMember',  '#newProMember-editor',  false);
    buildEditor('general',       '#general-editor',       true);  // with {firstName} button

    // Set up the shared image-resize toolbar listeners (once)
    attachGlobalImageListeners();

    // Load existing template content from Firestore
    await Promise.all([
        loadTemplate('newMember'),
        loadTemplate('newProMember'),
        loadTemplate('general')
    ]);

    // Wire up save buttons
    document.getElementById('newMember-save').addEventListener('click',
        () => saveTemplate('newMember'));
    document.getElementById('newProMember-save').addEventListener('click',
        () => saveTemplate('newProMember'));
    document.getElementById('general-save').addEventListener('click',
        () => saveTemplate('general'));

    // Wire up live preview updates on editor changes
    TEMPLATES.newMember.quill.on('text-change',    () => renderPreview('newMember'));
    TEMPLATES.newProMember.quill.on('text-change', () => renderPreview('newProMember'));
    TEMPLATES.general.quill.on('text-change',      () => renderPreview('general'));

    // Wire up CSV controls
    document.getElementById('general-csv-file').addEventListener('change', handleCsvFile);
    document.getElementById('general-parse').addEventListener('click', () => {
        const text = document.getElementById('general-csv-paste').value;
        parseCsvAndRender(text);
    });
}


// ============================================================
// QUILL SETUP
// ============================================================
function waitForQuill() {
    return new Promise((resolve, reject) => {
        if (window.Quill) return resolve();
        let tries = 0;
        const tick = () => {
            if (window.Quill) return resolve();
            if (++tries > 80) return reject(new Error('Quill not loaded after 8s'));
            setTimeout(tick, 100);
        };
        tick();
    });
}

function buildEditor(templateId, selector, includeFirstNameButton) {
    // Base toolbar
    const toolbar = [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['link', 'image'],
        ['blockquote'],
        ['clean']
    ];

    // Add the {firstName} insert button only for the General editor
    if (includeFirstNameButton) {
        toolbar.push(['insertFirstName']);
    }

    const handlers = {
        image: () => quillImageHandler(templateId)
    };

    if (includeFirstNameButton) {
        handlers.insertFirstName = function () {
            const quill = TEMPLATES[templateId].quill;
            const range = quill.getSelection(true);
            quill.insertText(range.index, '{firstName}', 'user');
            quill.setSelection(range.index + '{firstName}'.length);
        };
    }

    const quill = new window.Quill(selector, {
        theme: 'snow',
        placeholder: 'Write the email here…',
        modules: {
            toolbar: {
                container: toolbar,
                handlers: handlers
            }
        }
    });

    TEMPLATES[templateId].quill = quill;

    // Per-editor click handler — show resize toolbar when an image is clicked
    quill.root.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            showResizeToolbar(e.target);
        } else {
            hideResizeToolbar();
        }
    });
}


// ============================================================
// IMAGE UPLOAD HANDLER (per template)
// Pipeline: pick file -> client-side compress to max 600px wide
// -> upload to Storage -> embed URL in editor.
// ============================================================
function quillImageHandler(templateId) {
    const quill = TEMPLATES[templateId].quill;
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
        const file = input.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            alert('Please choose an image file.');
            return;
        }

        const range = quill.getSelection(true);
        quill.insertText(range.index, '⏳ uploading…\n', 'user');

        try {
            const processed = await compressImage(file, 600);
            const url = await uploadFile(processed, 'email-templates/images');
            quill.deleteText(range.index, '⏳ uploading…\n'.length, 'user');
            quill.insertEmbed(range.index, 'image', url, 'user');
            quill.setSelection(range.index + 1);
        } catch (err) {
            console.error('Image upload failed:', err);
            quill.deleteText(range.index, '⏳ uploading…\n'.length, 'user');
            alert('Image upload failed: ' + describeError(err));
        }
    };
    input.click();
}

// Client-side image compression. Returns a File (possibly the original
// if no resize was needed, or a new compressed File).
// GIFs and SVGs are returned unchanged (preserve animation / vector).
async function compressImage(file, maxWidth) {
    if (file.type === 'image/gif')     return file;
    if (file.type === 'image/svg+xml') return file;

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                // Already small enough — use original to avoid recompression artefacts
                if (img.width <= maxWidth) {
                    resolve(file);
                    return;
                }

                const ratio = maxWidth / img.width;
                const newW = maxWidth;
                const newH = Math.round(img.height * ratio);

                const canvas = document.createElement('canvas');
                canvas.width = newW;
                canvas.height = newH;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, newW, newH);

                // Preserve PNG/WebP (for transparency), JPEG everything else
                const outType = (file.type === 'image/png' || file.type === 'image/webp')
                    ? file.type : 'image/jpeg';
                const quality = (outType === 'image/jpeg') ? 0.85 : undefined;

                canvas.toBlob((blob) => {
                    if (!blob) {
                        reject(new Error('Image compression failed'));
                        return;
                    }
                    // Keep original name but ensure extension matches outType
                    const baseName = file.name.replace(/\.[^.]+$/, '');
                    const ext = outType === 'image/png' ? '.png'
                              : outType === 'image/webp' ? '.webp'
                              : '.jpg';
                    const compressed = new File([blob], baseName + ext, { type: outType });
                    resolve(compressed);
                }, outType, quality);
            };
            img.onerror = () => reject(new Error('Could not read image'));
            img.src = e.target.result;
        };
        reader.onerror = () => reject(new Error('Could not read file'));
        reader.readAsDataURL(file);
    });
}

// ============================================================
// IMAGE RESIZE TOOLBAR (click-to-resize)
// One shared toolbar, positioned over whichever image was clicked.
// Sets the HTML `width` attribute (best supported by email clients).
// ============================================================
let _resizeToolbar = null;
let _activeImage = null;
let _globalImageListenersAttached = false;

function ensureResizeToolbar() {
    if (_resizeToolbar) return;
    const tb = document.createElement('div');
    tb.className = 'email-image-resizer';
    tb.innerHTML = `
        <button type="button" data-width="25">25%</button>
        <button type="button" data-width="50">50%</button>
        <button type="button" data-width="75">75%</button>
        <button type="button" data-width="100">100%</button>
    `;
    tb.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-width]');
        if (!btn || !_activeImage) return;
        const w = btn.getAttribute('data-width');
        _activeImage.setAttribute('width', w + '%');
        // Update active-button styling
        tb.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // Refresh preview for whichever editor owns this image
        for (const [tid, cfg] of Object.entries(TEMPLATES)) {
            if (cfg.quill && cfg.quill.root.contains(_activeImage)) {
                renderPreview(tid);
                // Mark the editor dirty so save status reflects unsaved changes
                cfg.quill.update();
                break;
            }
        }
        // Reposition after resize since image dimensions changed
        requestAnimationFrame(() => positionResizeToolbar(_activeImage));
    });
    document.body.appendChild(tb);
    _resizeToolbar = tb;
}

function showResizeToolbar(img) {
    ensureResizeToolbar();
    _activeImage = img;
    _resizeToolbar.classList.add('is-open');
    // Reflect current image width on the buttons
    const current = img.getAttribute('width') || '';
    _resizeToolbar.querySelectorAll('button').forEach(b => {
        b.classList.toggle('active', current === b.getAttribute('data-width') + '%');
    });
    positionResizeToolbar(img);
}

function hideResizeToolbar() {
    if (_resizeToolbar) _resizeToolbar.classList.remove('is-open');
    _activeImage = null;
}

function positionResizeToolbar(img) {
    if (!_resizeToolbar || !img) return;
    const rect = img.getBoundingClientRect();
    // Place above the image; if no room, place below
    const tbHeight = 36;
    let top = rect.top - tbHeight - 4;
    if (top < 4) top = rect.bottom + 4;
    _resizeToolbar.style.top = top + 'px';
    _resizeToolbar.style.left = rect.left + 'px';
}

function attachGlobalImageListeners() {
    if (_globalImageListenersAttached) return;
    _globalImageListenersAttached = true;

    document.addEventListener('click', (e) => {
        // Clicks inside the resize toolbar are handled internally — leave alone
        if (_resizeToolbar && _resizeToolbar.contains(e.target)) return;
        // Clicks on an editor image are handled by the per-editor listener
        if (e.target.tagName === 'IMG' && e.target.closest('.ql-editor')) return;
        hideResizeToolbar();
    });
    window.addEventListener('scroll', hideResizeToolbar, true);
    window.addEventListener('resize', hideResizeToolbar);
}

async function uploadFile(file, pathPrefix) {
    const ts = Date.now();
    const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 80);
    const path = `${pathPrefix}/${ts}_${safe}`;
    const ref = storageRef(_storage, path);
    const snapshot = await uploadBytes(ref, file, { contentType: file.type });
    return await getDownloadURL(snapshot.ref);
}


// ============================================================
// LOAD / SAVE TEMPLATES
// ============================================================
async function loadTemplate(templateId) {
    const statusEl = document.getElementById(`${templateId}-status`);
    try {
        const snap = await getDoc(doc(_db, 'emailTemplates', templateId));
        if (snap.exists()) {
            const data = snap.data();
            document.getElementById(`${templateId}-subject`).value = data.subject || '';
            const quill = TEMPLATES[templateId].quill;
            // Use the dangerouslyPasteHTML method to restore saved HTML
            quill.clipboard.dangerouslyPasteHTML(data.htmlBody || '');
            const ts = data.lastEditedAt && data.lastEditedAt.toDate
                ? data.lastEditedAt.toDate().toLocaleString('en-GB')
                : 'never';
            const who = data.lastEditedBy || 'unknown';
            statusEl.textContent = `Last saved: ${ts} by ${who}`;
            statusEl.className = 'save-status';
        } else {
            statusEl.textContent = 'Not yet saved';
            statusEl.className = 'save-status';
        }
        renderPreview(templateId);
    } catch (err) {
        console.error(`Failed to load ${templateId}:`, err);
        statusEl.textContent = 'Failed to load: ' + describeError(err);
        statusEl.className = 'save-status error';
    }
}

async function saveTemplate(templateId) {
    const statusEl  = document.getElementById(`${templateId}-status`);
    const saveBtn   = document.getElementById(`${templateId}-save`);
    const subject   = document.getElementById(`${templateId}-subject`).value.trim();
    const htmlBody  = TEMPLATES[templateId].quill.root.innerHTML;

    if (!subject) {
        alert('Please enter a subject line.');
        return;
    }

    saveBtn.disabled = true;
    saveBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span>Saving…';
    statusEl.textContent = 'Saving…';
    statusEl.className = 'save-status';

    try {
        await setDoc(doc(_db, 'emailTemplates', templateId), {
            templateId: templateId,
            subject: subject,
            htmlBody: htmlBody,
            lastEditedAt: serverTimestamp(),
            lastEditedBy: _adminEmail || 'unknown'
        }, { merge: true });

        statusEl.textContent = `Saved at ${new Date().toLocaleString('en-GB')}`;
        statusEl.className = 'save-status saved';
    } catch (err) {
        console.error(`Failed to save ${templateId}:`, err);
        statusEl.textContent = 'Save failed: ' + describeError(err);
        statusEl.className = 'save-status error';
    } finally {
        saveBtn.disabled = false;
        saveBtn.innerHTML = '<i class="bi bi-save me-1"></i>Save Template';
    }
}


// ============================================================
// PREVIEW RENDERING
// ============================================================
function renderPreview(templateId) {
    const previewEl = document.getElementById(`${templateId}-preview`);
    if (!previewEl) return;

    const cfg = TEMPLATES[templateId];
    let html = cfg.quill.root.innerHTML;

    // Pick a sample name
    let sampleName = 'Sarah';
    if (templateId === 'general' && _recipients.length > 0) {
        sampleName = _recipients[0].firstName || 'Sarah';
    }

    // Substitute {firstName} tokens (general)
    if (cfg.hasFirstNameToken) {
        html = html.replace(/\{firstName\}/g, escapeHtml(sampleName));
    }

    // Prepend locked greeting for new member / pro member
    let finalHtml = html;
    if (cfg.hasGreeting) {
        finalHtml = `<p>Dear ${escapeHtml(sampleName)},</p>` + html;
    }

    previewEl.innerHTML = finalHtml;
}


// ============================================================
// CSV PARSING (general tab)
// ============================================================
function handleCsvFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
        const text = event.target.result;
        document.getElementById('general-csv-paste').value = text;
        parseCsvAndRender(text);
    };
    reader.onerror = () => {
        alert('Failed to read file.');
    };
    reader.readAsText(file);
}

function parseCsvAndRender(text) {
    const statusEl = document.getElementById('general-csv-status');
    const wrap     = document.getElementById('general-recipient-preview-wrap');
    const tbody    = document.getElementById('general-recipient-tbody');
    const countEl  = document.getElementById('general-recipient-count');
    const skipEl   = document.getElementById('general-recipient-skipped');

    if (!text || !text.trim()) {
        _recipients = [];
        statusEl.textContent = 'No CSV content provided.';
        wrap.style.display = 'none';
        renderPreview('general');
        return;
    }

    let rows;
    try {
        rows = parseCsv(text);
    } catch (err) {
        statusEl.textContent = 'Could not parse CSV: ' + err.message;
        wrap.style.display = 'none';
        _recipients = [];
        renderPreview('general');
        return;
    }

    if (rows.length < 2) {
        statusEl.textContent = 'CSV needs at least a header row and one data row.';
        wrap.style.display = 'none';
        _recipients = [];
        renderPreview('general');
        return;
    }

    const headers = rows[0].map(h => h.trim().toLowerCase());
    const firstNameIdx = findColumnIndex(headers,
        ['firstname', 'first name', 'first_name', 'first-name', 'name', 'fname']);
    const emailIdx = findColumnIndex(headers,
        ['email', 'email address', 'email_address', 'e-mail', 'e_mail']);

    if (firstNameIdx === -1) {
        statusEl.textContent = 'CSV is missing a "firstName" column.';
        wrap.style.display = 'none';
        _recipients = [];
        renderPreview('general');
        return;
    }
    if (emailIdx === -1) {
        statusEl.textContent = 'CSV is missing an "email" column.';
        wrap.style.display = 'none';
        _recipients = [];
        renderPreview('general');
        return;
    }

    const validRows = [];
    let skipped = 0;
    for (let i = 1; i < rows.length; i++) {
        const r = rows[i];
        const firstName = (r[firstNameIdx] || '').trim();
        const email     = (r[emailIdx] || '').trim();
        if (!firstName || !email) {
            skipped++;
            continue;
        }
        if (!isValidEmail(email)) {
            skipped++;
            continue;
        }
        validRows.push({ firstName, email });
    }

    _recipients = validRows;

    // Render preview table
    tbody.innerHTML = validRows.slice(0, 200).map((r, i) => `
        <tr>
            <td>${i + 1}</td>
            <td>${escapeHtml(r.firstName)}</td>
            <td>${escapeHtml(r.email)}</td>
        </tr>
    `).join('');

    countEl.textContent = `${validRows.length} valid recipient${validRows.length === 1 ? '' : 's'}`;
    skipEl.textContent  = skipped > 0
        ? `${skipped} row${skipped === 1 ? '' : 's'} skipped (missing/invalid data)`
        : '';
    if (validRows.length > 200) {
        skipEl.textContent += ` — showing first 200`;
    }
    wrap.style.display = 'block';
    statusEl.textContent = '';

    // Refresh preview with first recipient's name
    renderPreview('general');
}

function findColumnIndex(headers, candidates) {
    for (const c of candidates) {
        const i = headers.indexOf(c);
        if (i !== -1) return i;
    }
    return -1;
}

function isValidEmail(s) {
    // Basic RFC 5322 sanity check — not perfect but rejects obvious nonsense
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

// Minimal CSV parser supporting quoted fields with embedded commas/quotes.
function parseCsv(text) {
    const rows = [];
    let row = [];
    let field = '';
    let inQuotes = false;
    const len = text.length;

    for (let i = 0; i < len; i++) {
        const ch = text[i];

        if (inQuotes) {
            if (ch === '"') {
                if (text[i + 1] === '"') {
                    // Escaped quote
                    field += '"';
                    i++;
                } else {
                    inQuotes = false;
                }
            } else {
                field += ch;
            }
        } else {
            if (ch === '"') {
                inQuotes = true;
            } else if (ch === ',') {
                row.push(field);
                field = '';
            } else if (ch === '\n' || ch === '\r') {
                // Push current field, push row, skip CRLF pair
                if (ch === '\r' && text[i + 1] === '\n') i++;
                row.push(field);
                rows.push(row);
                row = [];
                field = '';
            } else {
                field += ch;
            }
        }
    }

    // Handle final field/row (no trailing newline)
    if (field.length > 0 || row.length > 0) {
        row.push(field);
        rows.push(row);
    }

    // Drop fully-empty trailing rows
    while (rows.length > 0 && rows[rows.length - 1].every(c => c.trim() === '')) {
        rows.pop();
    }

    return rows;
}


// ============================================================
// SMALL UTILITIES
// ============================================================
function escapeHtml(s) {
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function describeError(err) {
    if (!err) return 'unknown error';
    if (typeof err === 'string') return err;
    return err.message || err.code || String(err);
}
