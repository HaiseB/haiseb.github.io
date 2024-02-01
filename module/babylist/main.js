// Charger le client Google Sheets
/*gapi.load('client', initClient);

function initClient() {
    gapi.client.init({
        apiKey: 'AIzaSyAwl1XH2I-yGvgjsOtvPcZCYxdJp__A7J0',
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
        console.log('Client Google Sheets chargé avec succès.');

        // Vous pouvez maintenant appeler les fonctions pour lire et écrire des données dans Google Sheets
        // Par exemple :
        getDataFromGoogleSheets();
        createCommentInGoogleSheets();
    }).catch(function(error) {
        console.error('Erreur lors du chargement du client Google Sheets:', error);
    });
}*/


// Charger le client OAuth2 de Google
gapi.load('auth2', initAuth2);

function initAuth2() {
    gapi.auth2.init({
        client_id: '128823670908-fvr3fsmaqes6ibqtqep5h1s2rr4uk5tu.apps.googleusercontent.com',
    }).then(function() {
        console.log('Client OAuth2 chargé avec succès.');
        // Vous pouvez maintenant appeler les fonctions pour obtenir un jeton d'accès
        getDataFromGoogleSheets();
    }).catch(function(error) {
        console.error('Erreur lors du chargement du client OAuth2:', error);
    });
}

// Connexion avec Google pour obtenir un jeton d'accès
function signInWithGoogle() {
    gapi.auth2.getAuthInstance().signIn().then(function() {
        console.log('Connecté avec succès.');
        // Une fois connecté, vous pouvez utiliser le jeton d'accès pour accéder à l'API Google Sheets
        // Par exemple : getDataFromGoogleSheets();
    }).catch(function(error) {
        console.error('Erreur lors de la connexion avec Google:', error);
    });
}

// Lecture des données depuis Google Sheets
function getDataFromGoogleSheets() {
    const sheetId = '1VFepd02PXQJfIXfL22oEnP6XJgdWIEZLRF3NIw4dIyE';
    const range = 'cadeaux!A:E'; // Plage de données à lire

    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: range,
    }).then(function(response) {
        var range = response.result;
        if (range.values.length > 0) {
            // Traitez les données lues depuis Google Sheets ici
            console.log(range.values);
        } else {
            console.log('Aucune donnée trouvée.');
        }
    }, function(response) {
        console.error('Erreur lors de la lecture des données:', response.result.error.message);
    });
}

// Écriture de données dans Google Sheets
function writeToGoogleSheets() {
    const sheetId = '1VFepd02PXQJfIXfL22oEnP6XJgdWIEZLRF3NIw4dIyE';
    const range = 'cadeaux!A:E'; // Plage de données à écrire

    var values = [
        // Les données que vous souhaitez écrire dans la feuille de calcul
        ["Nouveau cadeau", 10, "lien_image", "Propriétaire", "lien_cadeau"],
    ];

    var body = {
        values: values
    };

    gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: range,
        valueInputOption: 'USER_ENTERED',
        resource: body
    }).then((response) => {
        var result = response.result;
        console.log(`${result.updates.updatedCells} cellules mises à jour.`);
    }, function(response) {
        console.error('Erreur lors de l\'écriture des données:', response.result.error.message);
    });
}

function createCommentInGoogleSheets() {
    const sheetId = '1VFepd02PXQJfIXfL22oEnP6XJgdWIEZLRF3NIw4dIyE';
    const range = 'cadeaux!A1'; // Cellule où vous souhaitez ajouter le commentaire

    const request = {
        spreadsheetId: sheetId,
        resource: {
            requests: [
                {
                    "addComment": {
                        "location": {
                            "sheetId": 0, // L'ID de la feuille de calcul où vous souhaitez ajouter le commentaire
                            "dimensionRange": {
                                "sheetId": 0,
                                "dimension": "COLUMNS",
                                "startIndex": 0,
                                "endIndex": 1
                            }
                        },
                        "text": "Votre commentaire ici"
                    }
                }
            ]
        }
    };

    gapi.client.sheets.spreadsheets.batchUpdate(request)
    .then(function(response) {
        console.log('Commentaire créé avec succès.');
    })
    .catch(function(error) {
        console.error('Erreur lors de la création du commentaire:', error.result.error.message);
    });
}
