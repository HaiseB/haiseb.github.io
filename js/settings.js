function saveFormDataToCookie() {
    const form = document.getElementById('settingsForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const fetchChangelogCheckbox = document.getElementById('fetchChangelog');

        const formData = {
            fetchChangelog: fetchChangelogCheckbox.checked
        };

        const formDataJSON = JSON.stringify(formData);

        document.cookie = 'formData=' + encodeURIComponent(formDataJSON);

        includeChangelog()
    });
}

function loadFormDataFromCookie() {
    const cookieData = document.cookie.replace(/(?:(?:^|.*;\s*)formData\s*=\s*([^;]*).*$)|^.*$/, "$1");

    if (cookieData) {
        const formData = JSON.parse(decodeURIComponent(cookieData));
        const fetchChangelogCheckbox = document.getElementById('fetchChangelog');
        fetchChangelogCheckbox.checked = formData.fetchChangelog;
    }
}

function includeChangelog() {
    const changelog = document.getElementById('changelog');

    if (document.getElementById('fetchChangelog').checked) {
        const changelogScript = document.createElement('script');

        changelog.style.display = 'block';

        changelogScript.src = './js/changelog.js';

        var existingScript = document.querySelector('script[src="./js/changelog.js"]');

        if (!existingScript) {
            document.body.appendChild(changelogScript);
        }
    } else {
        changelog.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    saveFormDataToCookie();
    loadFormDataFromCookie();
    includeChangelog();
});