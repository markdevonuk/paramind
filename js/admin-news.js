// ============================================================
// PARAMIND - admin-news.js
// Paramind news articles for the "Paramedic news" page.
// Imported and initialised from admin.html.
//
// A Paramind news article is a short card: headline, a few
// sentences, and an optional link. It shows at the top of
// news.html (and first in the headline strip) until the next
// Mon/Wed/Fri news round-up is published, then it drops off.
//
// Requires (at call time):
//   - Firebase v10 modular SDK initialised in admin.html
//   - The "Paramind news articles" HTML section present in admin.html
//
// Talks to:
//   - Firestore collection:  paramindNews/{autoId}
//       { headline, body, link, publishedAt, updatedAt }
//   - social/latest.json (read only) to tell you whether an
//     article is still showing
// ============================================================

import {
    collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc,
    query, orderBy, serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';


// ---- Module-local state ------------------------------------
const COLLECTION = 'paramindNews';
const BODY_MAX = 400;             // keeps articles card-sized
let _db = null;
let _editingId = null;            // null = creating a new article
let _roundupPublished = null;     // Date of the latest news round-up, or null


// ============================================================
// PUBLIC: initAdminNews
// Call this from admin.html once Firestore is ready.
// (storage is accepted but not used — short articles have no uploads)
// ============================================================
export async function initAdminNews({ db }) {
    _db = db;
    attachListeners();
    await loadRoundupDate();
    await refreshList();
}


// ============================================================
// When was the latest news round-up published?
// An article saved BEFORE that time has been replaced.
// ============================================================
async function loadRoundupDate() {
    try {
        const res = await fetch('social/latest.json?t=' + Date.now(), { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        const d = data && data.published ? new Date(data.published) : null;
        _roundupPublished = (d && !isNaN(d.getTime())) ? d : null;
    } catch (err) {
        console.warn('admin-news: could not read social/latest.json', err);
    }
}


// ============================================================
// EVENT WIRING
// ============================================================
function attachListeners() {
    document.getElementById('pnNewBtn').addEventListener('click', () => openForm(null));
    document.getElementById('pnCancelBtn').addEventListener('click', closeForm);
    document.getElementById('pnSaveBtn').addEventListener('click', saveArticle);
    document.getElementById('pnBody').addEventListener('input', updateCounter);
}

function updateCounter() {
    const len = document.getElementById('pnBody').value.length;
    document.getElementById('pnBodyCount').textContent = len + ' / ' + BODY_MAX;
}


// ============================================================
// FORM OPEN / CLOSE
// ============================================================
function openForm(article) {
    _editingId = article ? article.id : null;
    document.getElementById('pnFormTitle').textContent = article ? 'Edit news article' : 'New news article';
    document.getElementById('pnHeadline').value = article ? (article.headline || '') : '';
    document.getElementById('pnBody').value = article ? (article.body || '') : '';
    document.getElementById('pnLink').value = article ? (article.link || '') : '';
    updateCounter();
    document.getElementById('pnFormWrapper').style.display = 'block';
    document.getElementById('pnHeadline').focus();
}

function closeForm() {
    _editingId = null;
    document.getElementById('pnFormWrapper').style.display = 'none';
}


// ============================================================
// SAVE
// Every save sets publishedAt to now, so editing and re-saving
// an old article puts it back on the news page until the next
// round-up.
// ============================================================
function isAllowedLink(link) {
    // A full web address, or a Paramind page such as upgrade.html
    return /^https?:\/\//i.test(link) || /^[a-z0-9-]+\.html([?#].*)?$/i.test(link);
}

async function saveArticle() {
    const headline = document.getElementById('pnHeadline').value.trim();
    const body = document.getElementById('pnBody').value.trim();
    const link = document.getElementById('pnLink').value.trim();

    if (!headline) { alert('Please enter a headline.'); return; }
    if (!body) { alert('Please enter the article text.'); return; }
    if (body.length > BODY_MAX) { alert('The text is too long. Please keep it to ' + BODY_MAX + ' characters.'); return; }
    if (link && !isAllowedLink(link)) {
        alert('The link must be a full web address starting with https:// or a Paramind page such as upgrade.html');
        return;
    }

    const saveBtn = document.getElementById('pnSaveBtn');
    const originalHtml = saveBtn.innerHTML;
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span> Saving…';

    try {
        const data = {
            headline,
            body,
            link,
            publishedAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        };
        if (_editingId) {
            await updateDoc(doc(_db, COLLECTION, _editingId), data);
        } else {
            await addDoc(collection(_db, COLLECTION), data);
        }
        closeForm();
        await refreshList();
    } catch (err) {
        console.error('Save news article failed:', err);
        alert('Save failed: ' + describeError(err));
    } finally {
        saveBtn.disabled = false;
        saveBtn.innerHTML = originalHtml;
    }
}


// ============================================================
// LIST + EDIT + DELETE
// ============================================================
async function refreshList() {
    const list = document.getElementById('pnList');
    list.innerHTML = '<div class="text-center py-3"><div class="spinner-border spinner-border-sm text-primary"></div> Loading news articles…</div>';

    try {
        const q = query(collection(_db, COLLECTION), orderBy('publishedAt', 'desc'));
        const snap = await getDocs(q);

        if (snap.empty) {
            list.innerHTML = '<div class="text-muted text-center py-4">No news articles yet. Click <strong>New news article</strong> to write one.</div>';
            return;
        }

        const rows = [];
        snap.forEach(d => {
            const a = d.data();
            const when = (a.publishedAt && a.publishedAt.toDate) ? a.publishedAt.toDate() : null;
            const date = when
                ? when.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                : '—';
            const showing = !when || !_roundupPublished || when.getTime() > _roundupPublished.getTime();
            const status = showing
                ? '<span class="badge bg-success">Showing now</span>'
                : '<span class="badge bg-secondary">Replaced by a newer round-up</span>';
            rows.push(`
                <tr>
                    <td>
                        <div class="fw-bold">${escapeHtml(a.headline || '(no headline)')}</div>
                        <div class="text-muted small">${escapeHtml((a.body || '').slice(0, 110))}</div>
                    </td>
                    <td class="text-muted small">${date}</td>
                    <td>${status}</td>
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
                            <th>Article</th>
                            <th style="width:120px;">Saved</th>
                            <th style="width:220px;">Status</th>
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
                    const snap2 = await getDoc(doc(_db, COLLECTION, id));
                    if (snap2.exists()) openForm({ id, ...snap2.data() });
                } catch (err) {
                    console.error('Load news article failed:', err);
                    alert('Could not load the article: ' + describeError(err));
                }
            });
        });
        list.querySelectorAll('button[data-action="delete"]').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.dataset.id;
                if (!confirm('Delete this news article? This cannot be undone.')) return;
                try {
                    await deleteDoc(doc(_db, COLLECTION, id));
                    await refreshList();
                } catch (err) {
                    console.error('Delete failed:', err);
                    alert('Delete failed: ' + describeError(err));
                }
            });
        });

    } catch (err) {
        console.error('Load news articles failed:', err);
        let msg = describeError(err);
        if (err && err.code === 'permission-denied') {
            msg += ' — the Firestore rule for the "paramindNews" collection has not been published yet.';
        }
        list.innerHTML = '<div class="alert alert-warning mb-0">Could not load news articles: ' + escapeHtml(msg) + '</div>';
    }
}


// ============================================================
// HELPERS
// ============================================================
function describeError(err) {
    if (!err) return 'Unknown error';
    if (err.code) return err.code + (err.message ? ' (' + err.message + ')' : '');
    return err.message || String(err);
}

function escapeHtml(s) {
    return String(s == null ? '' : s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
