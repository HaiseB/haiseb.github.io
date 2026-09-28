const REPO = 'HaiseB/haiseb.github.io';
const apiUrl = `https://api.github.com/repos/${REPO}/tags?per_page=10`;

const changelogContainer = document.getElementById('changelog-list');

renderLoading();

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`GitHub API: ${response.status}`);
        }
        return response.json();
    })
    .then(renderTags)
    .catch(error => {
        console.error('Error fetching data:', error);
        renderError();
    });

function renderTags(tags) {
    changelogContainer.replaceChildren();

    if (!Array.isArray(tags) || tags.length === 0) {
        renderError();
        return;
    }

    const list = document.createElement('ul');
    list.className = 'list-group changelog-day mb-3';
    tags.forEach(tag => list.appendChild(buildTagItem(tag)));
    changelogContainer.appendChild(list);
}

function buildTagItem(tag) {
    const item = document.createElement('li');
    item.className = 'list-group-item d-flex justify-content-between align-items-center gap-3';

    const left = document.createElement('div');
    left.className = 'd-flex align-items-center gap-3';
    left.appendChild(icon('fa-solid fa-tag text-body-secondary'));

    const info = document.createElement('div');
    info.className = 'd-flex flex-column';

    const title = document.createElement('a');
    title.className = 'fw-bold text-body text-decoration-none changelog-title';
    title.href = `https://github.com/${REPO}/releases/tag/${encodeURIComponent(tag.name)}`;
    title.target = '_blank';
    title.rel = 'noopener noreferrer';
    title.textContent = tag.name;
    info.appendChild(title);

    const subtitle = document.createElement('small');
    subtitle.className = 'text-body-secondary';
    subtitle.textContent = 'Version publiée sur GitHub';
    info.appendChild(subtitle);
    left.appendChild(info);
    item.appendChild(left);

    const sha = document.createElement('a');
    sha.className = 'badge text-bg-light font-monospace text-decoration-none';
    sha.href = `https://github.com/${REPO}/tree/${encodeURIComponent(tag.name)}`;
    sha.target = '_blank';
    sha.rel = 'noopener noreferrer';
    sha.title = 'Voir le tag sur GitHub';
    sha.textContent = `#${String(tag.commit.sha).substring(0, 7)}`;
    item.appendChild(sha);

    return item;
}

function renderLoading() {
    changelogContainer.replaceChildren();

    const loading = document.createElement('div');
    loading.className = 'text-body-secondary d-flex align-items-center gap-2 py-3';

    const spinner = document.createElement('span');
    spinner.className = 'spinner-border spinner-border-sm';
    spinner.setAttribute('role', 'status');
    loading.appendChild(spinner);
    loading.append('Chargement des tags GitHub...');

    changelogContainer.appendChild(loading);
}

function renderError() {
    changelogContainer.replaceChildren();

    const alert = document.createElement('div');
    alert.className = 'alert alert-warning d-flex align-items-center gap-2';
    alert.appendChild(icon('fa-solid fa-triangle-exclamation'));
    alert.append('Impossible de récupérer le changelog depuis GitHub pour le moment.');

    const link = document.createElement('a');
    link.href = `https://github.com/${REPO}/tags`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'alert-link ms-auto';
    link.textContent = 'Voir les tags sur GitHub';
    alert.appendChild(link);

    changelogContainer.appendChild(alert);
}

function icon(classNames) {
    const node = document.createElement('i');
    node.className = classNames;
    return node;
}

