const REPO = 'HaiseB/haiseb.github.io';
const apiUrl = `https://api.github.com/repos/${REPO}/commits?per_page=15&page=1`;

const changelogContainer = document.getElementById('changelog-list');

renderLoading();

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`GitHub API: ${response.status}`);
        }
        return response.json();
    })
    .then(renderCommits)
    .catch(error => {
        console.error('Error fetching data:', error);
        renderError();
    });

function renderCommits(commits) {
    const commitsByDay = new Map();

    commits.forEach(commit => {
        if (commit.commit.message.startsWith('Merge branch')) {
            return;
        }

        const date = new Date(commit.commit.author.date);
        const dayKey = date.toISOString().split('T')[0];

        if (!commitsByDay.has(dayKey)) {
            commitsByDay.set(dayKey, { date: date, commits: [] });
        }

        commitsByDay.get(dayKey).commits.push(commit);
    });

    changelogContainer.replaceChildren();

    if (commitsByDay.size === 0) {
        renderError();
        return;
    }

    commitsByDay.forEach(day => {
        changelogContainer.appendChild(buildDayHeader(day));

        const list = document.createElement('ul');
        list.className = 'list-group changelog-day mb-3';
        day.commits.forEach(commit => list.appendChild(buildCommitItem(commit)));
        changelogContainer.appendChild(list);
    });
}

function buildDayHeader(day) {
    const header = document.createElement('div');
    header.className = 'd-flex align-items-center gap-2 mt-3 mb-2';

    header.appendChild(icon('fa-solid fa-code-branch text-body-secondary'));

    const label = document.createElement('span');
    label.className = 'fw-semibold';
    label.textContent = `Commits du ${formatDate(day.date)}`;
    header.appendChild(label);

    const count = document.createElement('span');
    count.className = 'badge rounded-pill text-bg-secondary';
    count.textContent = day.commits.length;
    header.appendChild(count);

    return header;
}

function buildCommitItem(commit) {
    const [title, ...bodyLines] = commit.commit.message.split('\n');
    const body = bodyLines.join('\n').trim();
    const date = new Date(commit.commit.author.date);
    const url = safeGithubUrl(commit.html_url);

    const item = document.createElement('li');
    item.className = 'list-group-item d-flex gap-3 align-items-start';

    item.appendChild(buildAvatar(commit));

    const content = document.createElement('div');
    content.className = 'flex-grow-1 overflow-hidden';
    item.appendChild(content);

    const topRow = document.createElement('div');
    topRow.className = 'd-flex justify-content-between align-items-start gap-2';
    content.appendChild(topRow);

    const titleLink = document.createElement('a');
    titleLink.className = 'fw-bold text-body text-decoration-none changelog-title';
    titleLink.textContent = title;
    if (url) {
        titleLink.href = url;
        titleLink.target = '_blank';
        titleLink.rel = 'noopener noreferrer';
        titleLink.title = 'Voir le commit sur GitHub';
    }
    topRow.appendChild(titleLink);

    if (url) {
        const shaLink = document.createElement('a');
        shaLink.className = 'badge text-bg-light font-monospace text-decoration-none flex-shrink-0';
        shaLink.href = url;
        shaLink.target = '_blank';
        shaLink.rel = 'noopener noreferrer';
        shaLink.title = 'Voir le commit sur GitHub';
        shaLink.appendChild(icon('fa-solid fa-code-commit'));
        shaLink.append(` ${commit.sha.substring(0, 7)}`);
        topRow.appendChild(shaLink);
    }

    if (body) {
        const bodyText = document.createElement('p');
        bodyText.className = 'small text-body-secondary mb-1 mt-1 changelog-body';
        bodyText.textContent = body;
        content.appendChild(bodyText);
    }

    content.appendChild(buildMeta(commit, date));

    return item;
}

function buildAvatar(commit) {
    const login = commit.author ? commit.author.login : null;
    const avatarUrl = commit.author ? safeGithubAvatar(commit.author.avatar_url) : null;

    if (!avatarUrl) {
        const fallback = document.createElement('span');
        fallback.className = 'changelog-avatar d-inline-flex align-items-center justify-content-center'
            + ' rounded-circle bg-body-tertiary text-body-secondary flex-shrink-0';
        fallback.appendChild(icon('fa-solid fa-user'));
        return fallback;
    }

    const wrapper = document.createElement('a');
    wrapper.href = `https://github.com/${encodeURIComponent(login)}`;
    wrapper.target = '_blank';
    wrapper.rel = 'noopener noreferrer';
    wrapper.className = 'flex-shrink-0';

    const avatar = document.createElement('img');
    avatar.src = avatarUrl;
    avatar.alt = login;
    avatar.width = 32;
    avatar.height = 32;
    avatar.loading = 'lazy';
    avatar.className = 'changelog-avatar rounded-circle';
    wrapper.appendChild(avatar);

    return wrapper;
}

function buildMeta(commit, date) {
    const meta = document.createElement('div');
    meta.className = 'small text-body-secondary d-flex flex-wrap align-items-center gap-3 mt-1';

    const author = document.createElement('span');
    author.appendChild(icon('fa-regular fa-user'));
    author.append(` ${commit.commit.author.name}`);
    meta.appendChild(author);

    const time = document.createElement('span');
    time.appendChild(icon('fa-regular fa-clock'));
    time.append(` ${formatTime(date)}`);
    meta.appendChild(time);

    if (commit.commit.verification && commit.commit.verification.verified) {
        const verified = document.createElement('span');
        verified.className = 'badge text-bg-success-subtle text-success-emphasis';
        verified.appendChild(icon('fa-solid fa-shield-halved'));
        verified.append(' Vérifié');
        meta.appendChild(verified);
    }

    if (commit.commit.comment_count > 0) {
        const commentSpan = document.createElement('span');
        commentSpan.appendChild(icon('fa-regular fa-comment'));
        commentSpan.append(` ${commit.commit.comment_count}`);
        meta.appendChild(commentSpan);
    }

    return meta;
}

function renderLoading() {
    changelogContainer.replaceChildren();

    const loading = document.createElement('div');
    loading.className = 'text-body-secondary d-flex align-items-center gap-2 py-3';

    const spinner = document.createElement('span');
    spinner.className = 'spinner-border spinner-border-sm';
    spinner.setAttribute('role', 'status');
    loading.appendChild(spinner);
    loading.append('Chargement des derniers commits...');

    changelogContainer.appendChild(loading);
}

function renderError() {
    changelogContainer.replaceChildren();

    const alert = document.createElement('div');
    alert.className = 'alert alert-warning d-flex align-items-center gap-2';
    alert.appendChild(icon('fa-solid fa-triangle-exclamation'));
    alert.append('Impossible de récupérer le changelog depuis GitHub pour le moment.');

    const link = document.createElement('a');
    link.href = `https://github.com/${REPO}/commits`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'alert-link ms-auto';
    link.textContent = 'Voir sur GitHub';
    alert.appendChild(link);

    changelogContainer.appendChild(alert);
}

function icon(classNames) {
    const node = document.createElement('i');
    node.className = classNames;
    return node;
}

function safeGithubUrl(url) {
    return typeof url === 'string' && url.startsWith('https://github.com/') ? url : null;
}

function safeGithubAvatar(url) {
    return typeof url === 'string' && url.startsWith('https://avatars.githubusercontent.com/') ? url : null;
}

function formatDate(date) {
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatTime(date) {
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}
