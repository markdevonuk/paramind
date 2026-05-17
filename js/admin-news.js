// ============================================================
// PARAMIND - admin-news.js
// Article management for the "What's New" page.
// Imported and initialised from admin.html.
//
// Requires (at call time):
//   - Firebase v10 modular SDK initialised in admin.html
//   - Firestore + Storage already created on the app
//   - Quill 2.x available globally as window.Quill
//   - The articles HTML section present in admin.html
//
// Talks to:
//   - Firestore collection:  articles/{autoId}
//   - Storage paths:         articles/images/...
//                            articles/attachments/...
// ============================================================

import {
    collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc,
    query, orderBy, serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

import {
    ref as storageRef, uploadBytes, getDownloadURL
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';


// ---- Module-local state ------------------------------------
let _db = null;
let _storage = null;
let _quill = null;
let _editingArticleId = null;     // null = creating a new article
let _pendingCoverImageUrl = null; // Storage URL or null
let _pendingAttachments = [];     // [{ name, url, size, type }]


// ============================================================
// PUBLIC: initAdminNews
// Call this from admin.html once Firestore + Storage are ready.
// ============================================================
export async function initAdminNews({ db, storage }) {
    _db = db;
    _storage = storage;

    attachListeners();

    try {
        await waitForQuill();
        buildQuill();
    } catch (err) {
        console.error('admin-news: Quill failed to load', err);
        document.getElementById('articlesList').innerHTML =
            '<div class="alert alert-warning">Rich text editor failed to load. Check your network and refresh.</div>';
        return;
    }

    await refreshArticleList();
}


// ============================================================
// QUILL
// ============================================================
function waitForQuill() {
    return new Promise((resolve, reject) => {
        if (typeof window.Quill !== 'undefined') return resolve();
        let tries = 0;
        const tick = () => {
            if (typeof window.Quill !== 'undefined') return resolve();
            if (++tries > 80) return reject(new Error('Quill not loaded after 8s'));
            setTimeout(tick, 100);
        };
        tick();
    });
}

function buildQuill() {
    _quill = new window.Quill('#articleEditor', {
        theme: 'snow',
        placeholder: 'Write your article here…',
        modules: {
            toolbar: {
                container: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'align': [] }],
                    ['link', 'image'],
                    ['blockquote', 'code-block'],
                    ['clean']
                ],
                handlers: { image: quillImageHandler }
            }
        }
    });
}

// Custom Quill image handler: pick a file, upload to Storage, embed the URL.
function quillImageHandler() {
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

        // Show a placeholder note while uploading
        const range = _quill.getSelection(true);
        _quill.insertText(range.index, '⏳ uploading…\n', 'user');

        try {
            const url = await uploadFile(file, 'articles/images');
            // Remove the placeholder, then embed the image at the same spot
            _quill.deleteText(range.index, '⏳ uploading…\n'.length, 'user');
            _quill.insertEmbed(range.index, 'image', url, 'user');
            _quill.setSelection(range.index + 1);
        } catch (err) {
            console.error('Image upload failed:', err);
            _quill.deleteText(range.index, '⏳ uploading…\n'.length, 'user');
            alert('Image upload failed: ' + describeError(err));
        }
    };
    input.click();
}


// ============================================================
// STORAGE UPLOAD HELPER
// ============================================================
async function uploadFile(file, pathPrefix) {
    const ts = Date.now();
    const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 80);
    const path = `${pathPrefix}/${ts}_${safe}`;
    const ref = storageRef(_storage, path);
    const snapshot = await uploadBytes(ref, file, { contentType: file.type });
    return await getDownloadURL(snapshot.ref);
}


// ============================================================
// FORM LISTENERS
// ============================================================
function attachListeners() {
    document.getElementById('newArticleBtn').addEventListener('click', () => openForm(null));
    document.getElementById('articleCancelBtn').addEventListener('click', closeForm);
    document.getElementById('articleSaveBtn').addEventListener('click', saveArticle);

    // Cover image upload
    document.getElementById('articleCoverImage').addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const preview = document.getElementById('articleCoverImagePreview');
        preview.innerHTML = '<div class="text-muted small"><span class="spinner-border spinner-border-sm me-1"></span> Uploading cover…</div>';
        try {
            const url = await uploadFile(file, 'articles/images');
            _pendingCoverImageUrl = url;
            renderCoverPreview();
        } catch (err) {
            console.error('Cover upload failed:', err);
            preview.innerHTML = `<div class="text-danger small">Cover upload failed: ${escapeHtml(describeError(err))}</div>`;
        }
    });

    // Attachment upload
    document.getElementById('articleAttachmentInput').addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const url = await uploadFile(file, 'articles/attachments');
            _pendingAttachments.push({
                name: file.name,
                url,
                size: file.size,
                type: file.type || 'application/octet-stream'
            });
            renderAttachmentsList();
            document.getElementById('articleAttachmentInput').value = '';
        } catch (err) {
            console.error('Attachment upload failed:', err);
            alert('Attachment upload failed: ' + describeError(err));
        }
    });
}


// ============================================================
// FORM RENDERING
// ============================================================
function renderCoverPreview() {
    const preview = document.getElementById('articleCoverImagePreview');
    if (!_pendingCoverImageUrl) {
        preview.innerHTML = '';
        return;
    }
    preview.innerHTML = `
        <div class="d-flex align-items-center gap-2 mt-1">
            <img src="${_pendingCoverImageUrl}" style="max-height:80px;border-radius:8px;">
            <button type="button" class="btn btn-link btn-sm text-danger" id="articleCoverRemove">Remove</button>
        </div>
    `;
    document.getElementById('articleCoverRemove').addEventListener('click', () => {
        _pendingCoverImageUrl = null;
        renderCoverPreview();
        document.getElementById('articleCoverImage').value = '';
    });
}

function renderAttachmentsList() {
    const list = document.getElementById('articleAttachmentsList');
    if (_pendingAttachments.length === 0) {
        list.innerHTML = '<div class="text-muted small fst-italic">No attachments yet.</div>';
        return;
    }
    list.innerHTML = _pendingAttachments.map((a, i) => `
        <div class="d-flex align-items-center gap-2 py-1 border-bottom">
            <i class="bi bi-paperclip"></i>
            <a href="${a.url}" target="_blank" class="flex-grow-1 text-decoration-none">${escapeHtml(a.name)}</a>
            <span class="text-muted small">${(a.size / 1024).toFixed(0)} KB</span>
            <button type="button" class="btn btn-link btn-sm text-danger" data-idx="${i}">Remove</button>
        </div>
    `).join('');
    list.querySelectorAll('button[data-idx]').forEach(btn => {
        btn.addEventListener('click', () => {
            _pendingAttachments.splice(parseInt(btn.dataset.idx, 10), 1);
            renderAttachmentsList();
        });
    });
}


// ============================================================
// FORM OPEN / CLOSE
// ============================================================
function openForm(articleData) {
    document.getElementById('articleFormWrapper').style.display = 'block';
    document.getElementById('newArticleBtn').style.display = 'none';

    if (articleData) {
        _editingArticleId = articleData.id;
        document.getElementById('articleFormTitle').textContent = 'Edit Article';
        document.getElementById('articleTitle').value = articleData.title || '';
        document.getElementById('articleExcerpt').value = articleData.excerpt || '';
        _quill.root.innerHTML = articleData.content || '';
        _pendingCoverImageUrl = articleData.coverImage || null;
        _pendingAttachments = Array.isArray(articleData.attachments) ? [...articleData.attachments] : [];
    } else {
        _editingArticleId = null;
        document.getElementById('articleFormTitle').textContent = 'New Article';
        document.getElementById('articleTitle').value = '';
        document.getElementById('articleExcerpt').value = '';
        _quill.root.innerHTML = '';
        _pendingCoverImageUrl = null;
        _pendingAttachments = [];
        document.getElementById('articleCoverImage').value = '';
    }

    renderCoverPreview();
    renderAttachmentsList();
    document.getElementById('articleFormWrapper').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function closeForm() {
    document.getElementById('articleFormWrapper').style.display = 'none';
    document.getElementById('newArticleBtn').style.display = '';
    _editingArticleId = null;
    _pendingCoverImageUrl = null;
    _pendingAttachments = [];
}


// ============================================================
// SAVE
// ============================================================
async function saveArticle() {
    const title = document.getElementById('articleTitle').value.trim();
    const excerpt = document.getElementById('articleExcerpt').value.trim();
    // Clean empty paragraph artifacts (<p><br></p>) — Quill produces these
    // when Enter is pressed on a blank line. Each would render as a ~42px
    // gap on the public page.
    const rawContent = _quill.root.innerHTML;
    const content = rawContent.replace(/<p>(?:\s|&nbsp;|<br\s*\/?>)*<\/p>/g, '');

    if (!title) {
        alert('Please enter a title.');
        return;
    }

    const saveBtn = document.getElementById('articleSaveBtn');
    const originalHtml = saveBtn.innerHTML;
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Saving…';

    try {
        const data = {
            title,
            excerpt,
            content,
            coverImage: _pendingCoverImageUrl || null,
            attachments: _pendingAttachments,
            status: 'published',  // future: add draft toggle
            updatedAt: serverTimestamp(),
            author: 'Mark Devon'
        };

        if (_editingArticleId) {
            await updateDoc(doc(_db, 'articles', _editingArticleId), data);
        } else {
            data.publishedAt = serverTimestamp();
            await addDoc(collection(_db, 'articles'), data);
        }

        closeForm();
        await refreshArticleList();

    } catch (err) {
        console.error('Save failed:', err);
        alert('Could not save: ' + describeError(err));
    } finally {
        saveBtn.disabled = false;
        saveBtn.innerHTML = originalHtml;
    }
}


// ============================================================
// LIST + DELETE
// ============================================================
async function refreshArticleList() {
    const list = document.getElementById('articlesList');
    list.innerHTML = '<div class="text-center py-3"><div class="spinner-border spinner-border-sm text-primary"></div> Loading articles…</div>';

    try {
        const q = query(collection(_db, 'articles'), orderBy('publishedAt', 'desc'));
        const snap = await getDocs(q);

        if (snap.empty) {
            list.innerHTML = '<div class="text-muted text-center py-4">No articles yet. Click <strong>New Article</strong> to write your first one.</div>';
            return;
        }

        const rows = [];
        snap.forEach(d => {
            const a = d.data();
            const date = (a.publishedAt && a.publishedAt.toDate)
                ? a.publishedAt.toDate().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                : '—';
            const cover = a.coverImage
                ? `<img src="${a.coverImage}" style="width:48px;height:48px;object-fit:cover;border-radius:6px;">`
                : '<div style="width:48px;height:48px;background:#f1f3f5;border-radius:6px;display:flex;align-items:center;justify-content:center;"><i class="bi bi-image text-muted"></i></div>';
            rows.push(`
                <tr>
                    <td>${cover}</td>
                    <td>
                        <div class="fw-bold">${escapeHtml(a.title || '(untitled)')}</div>
                        <div class="text-muted small">${escapeHtml(a.excerpt || '').slice(0, 90)}</div>
                    </td>
                    <td class="text-muted small">${date}</td>
                    <td class="text-end">
                        <button class="btn btn-sm btn-outline-primary me-2" data-action="edit" data-id="${d.id}">
                            <i class="bi bi-pencil"></i> Edit
                        </button>
                        <button class="btn btn-sm btn-outline-danger" data-action="delete" data-id="${d.id}">
                            <i class="bi bi-trash"></i> Delete
                        </button>
                    </td>
                </tr>
            `);
        });

        list.innerHTML = `
            <div class="table-responsive">
                <table class="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th style="width:60px;"></th>
                            <th>Title</th>
                            <th style="width:130px;">Published</th>
                            <th class="text-end" style="width:200px;">Actions</th>
                        </tr>
                    </thead>
                    <tbody>${rows.join('')}</tbody>
                </table>
            </div>
        `;

        list.querySelectorAll('button[data-action="edit"]').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.dataset.id;
                try {
                    const snap2 = await getDoc(doc(_db, 'articles', id));
                    if (snap2.exists()) openForm({ id, ...snap2.data() });
                } catch (err) {
                    console.error('Load article failed:', err);
                    alert('Could not load article: ' + describeError(err));
                }
            });
        });
        list.querySelectorAll('button[data-action="delete"]').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.dataset.id;
                if (!confirm('Delete this article? This cannot be undone.')) return;
                try {
                    await deleteDoc(doc(_db, 'articles', id));
                    await refreshArticleList();
                } catch (err) {
                    console.error('Delete failed:', err);
                    alert('Delete failed: ' + describeError(err));
                }
            });
        });

    } catch (err) {
        console.error('Load articles failed:', err);
        let msg = describeError(err);
        // Friendly hints for the most likely setup issues
        if (err.code === 'permission-denied') {
            list.innerHTML = `<div class="alert alert-warning">
                Permission denied reading <code>articles</code>. The Firestore rule for <code>articles</code> may not be deployed yet.
            </div>`;
        } else if (err.code === 'failed-precondition') {
            list.innerHTML = `<div class="alert alert-warning">
                Firestore needs an index for this query. Click the link in the browser console to create it (one click) and refresh.
            </div>`;
        } else {
            list.innerHTML = `<div class="alert alert-danger">Could not load articles: ${escapeHtml(msg)}</div>`;
        }
    }
}


// ============================================================
// HELPERS
// ============================================================
function describeError(err) {
    if (!err) return 'unknown error';
    if (err.message) return err.message;
    if (err.code)    return err.code;
    return String(err);
}

function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
}
