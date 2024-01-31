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

        alert('Données enregistrées dans le cookie !');
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
    if (document.getElementById('fetchChangelog').checked) {
        const changelogScript = document.createElement('script');
        changelogScript.src = './js/changelog.js';
        document.body.appendChild(changelogScript);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    saveFormDataToCookie();
    loadFormDataFromCookie();
    includeChangelog();
});