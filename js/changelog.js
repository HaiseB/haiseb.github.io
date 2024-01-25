const repoOwner = 'HaiseB';
const repoName = 'haiseb.github.io';
const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/commits?per_page=10&page=1`;

fetch(apiUrl)
    .then(response => response.json())
    .then(commits => {
        const changelogContainer = document.getElementById('changelog-list');

        const commitsByDay = {};

        commits.forEach(commit => {
            const commitDate = new Date(commit.commit.author.date);
            const formattedDate = `${commitDate.getDate()} ${getMonthName(commitDate.getMonth())} ${commitDate.getFullYear()}`;

            const dayKey = commitDate.toISOString().split('T')[0];

            if (!commitsByDay[dayKey]) {
                commitsByDay[dayKey] = [];
            }

            commitsByDay[dayKey].push({
                message: commit.commit.message,
                hour: commitDate.getHours(),
                formattedDate: formattedDate
            });
        });

        for (const dayKey in commitsByDay) {
            const dayCommits = commitsByDay[dayKey];

            const dayContainer = document.createElement('div');
            changelogContainer.appendChild(dayContainer);

            const dayHeader = document.createElement('span');
            dayHeader.innerHTML = `
                <i class="fa-solid fa-chevron-right"></i>&nbsp;&nbsp;Commits on ${dayCommits[0].formattedDate}
            `;
            dayContainer.appendChild(dayHeader);

            const commitsList = document.createElement('ul');
            commitsList.classList.add('list-group');
            dayContainer.appendChild(commitsList);

            dayCommits.forEach(commit => {
                const listItem = document.createElement('li');
                listItem.classList.add('list-group-item');
                listItem.innerHTML = `
                    <span class="fw-bold">${commit.message}</span><br>
                    <span class="fst-italic">at ${commit.hour}:${formatMinutes(commit.hour)}</span>
                `;
                commitsList.appendChild(listItem);
            });
        }
    })
    .catch(error => console.error('Error fetching data:', error));

function getMonthName(monthIndex) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthIndex];
}

function formatMinutes(minutes) {
    return minutes < 10 ? `0${minutes}` : minutes;
}
