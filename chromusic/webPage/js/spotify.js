const defaultSpotifyPlaylists = {
    playlists: [
        {
            title: "Spotify Embed: Recommendation Playlist",
            src: "https://open.spotify.com/embed/playlist/32NkwlZQYqno5HauO6FWvU",
        },
        {
            title: "Release Radar",
            src: "https://open.spotify.com/embed/playlist/37i9dQZEVXbm5hwesT134B",
        },
        {
            title: "Daily",
            src: "https://open.spotify.com/embed/playlist/37i9dQZF1EfLEPeaXTXu94",
        }
    ],
    albums: [
        {
            title: "Ashnikko - Demidevil",
            src: "https://open.spotify.com/embed/album/438ToDoVaJH5aTIXXrlDyI",
        },
        {
            title: "Kalika - Adieu les monstres",
            src: "https://open.spotify.com/embed/album/0UrbIea2sXlvZfMhD9PkFA",
        },
        {
            title: "Melanie Martinez - Portals",
            src: "https://open.spotify.com/embed/album/4kI7ZZF6CgDGFTjZNFwXYG",
        },
    ],
};

async function getPlaylists() {
    return new Promise((resolve) => {
        chrome.storage.local.get(["spotifyPlaylists"], function (result) {
            resolve(result.spotifyPlaylists);
            console.log("Playlists retrieved : ", JSON.stringify(result.spotifyPlaylists, null, 2));
        });
    });
}

async function updatePlaylistUI() {
    const playlists = await getPlaylists();
    const ulIframe = document.getElementById('ul-iframe');

    if (playlists && (playlists.playlists || playlists.albums)) {
        ulIframe.innerHTML = '';

        // Ajoutez le titre "Playlists"
        if (playlists.playlists.length > 0) {
            const playlistsTitleLi = document.createElement('li');
            playlistsTitleLi.classList.add('list-group-item');
            playlistsTitleLi.textContent = 'Playlists';
            ulIframe.appendChild(playlistsTitleLi);
        }

        // Ajoutez les playlists
        playlists.playlists.forEach((playlist, index) => {
            const iframeLi = document.createElement('li');
            iframeLi.classList.add('list-group-item', 'spotify-iframe');
            iframeLi.innerHTML = `
                <iframe title="${playlist.title}"
                    src="${playlist.src}" width="100%"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"></iframe>
            `;
            ulIframe.appendChild(iframeLi);
        });

        // Ajoutez le titre "Albums"
        if (playlists.albums.length > 0) {
            const albumsTitleLi = document.createElement('li');
            albumsTitleLi.classList.add('list-group-item');
            albumsTitleLi.textContent = 'Albums';
            ulIframe.appendChild(albumsTitleLi);
        }

        // Ajoutez les albums
        playlists.albums.forEach((album, index) => {
            const iframeLi = document.createElement('li');
            iframeLi.classList.add('list-group-item', 'spotify-iframe');
            iframeLi.innerHTML = `
                <iframe title="${album.title}"
                    src="${album.src}" width="100%"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"></iframe>
            `;
            ulIframe.appendChild(iframeLi);
        });
    }
}

async function start() {
    const playlists = await getPlaylists();
    const playlistTextarea = document.getElementById("playlistTextarea");
    const resetPlaylistsAsked = window.location.href.includes('resetPlaylist=true');

    if (!playlists || resetPlaylistsAsked) {
        chrome.storage.local.set(
            { spotifyPlaylists: defaultSpotifyPlaylists },
            function () {
                console.log("Playlists saved : ", defaultSpotifyPlaylists);
            }
        );

        playlistTextarea.value = JSON.stringify(defaultSpotifyPlaylists, null, 2);
    } else {
        playlistTextarea.value = JSON.stringify(playlists, null, 2);
    }
}

function clickRandomButton() {
    // ToDo find the right selector
    const spotifyButtons = document.querySelectorAll('[id="buttonTertiary"]');

    if (spotifyButtons.length > 0) {
        const randomIndex = Math.floor(Math.random() * spotifyButtons.length);
        const randomButton = spotifyButtons[randomIndex];

        randomButton.click();
    } else {
        console.log("impossible to play a random playlist");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    start();
    updatePlaylistUI();

    if (window.location.href.includes("playing=true")) {
        clickRandomButton();
    }

    const playlistTextarea = document.getElementById("playlistTextarea");
    const saveButton = document.getElementById('saveButton');
    const resetPlaylistButton = document.getElementById('resetPlaylist');


    saveButton.addEventListener('click', function () {
        const spotifyPlaylists = JSON.parse(playlistTextarea.value);
        chrome.storage.local.set({ spotifyPlaylists: spotifyPlaylists }, function () {
            console.log("Playlists saved : ", spotifyPlaylists);
            location.reload();
        });
    });

    resetPlaylistButton.addEventListener('click', function () {
        const confirmed = window.confirm("Are you sure to reset playlists?");

        if (confirmed) {
            chrome.storage.local.set(
                { spotifyPlaylists: defaultSpotifyPlaylists },
                function () {
                    console.log("Playlists have been reseted : ", defaultSpotifyPlaylists);
                    location.reload();
                }
            );
        }
    });
});
