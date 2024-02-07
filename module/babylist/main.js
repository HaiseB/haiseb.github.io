gapi.load('client', initClient);

function initClient() {
    gapi.client.init({
        apiKey: 'AIzaSyAwl1XH2I-yGvgjsOtvPcZCYxdJp__A7J0',
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
        console.log('Client Google Sheets chargé avec succès.');

        getDataFromGoogleSheets();
    }).catch(function(error) {
        console.error('Erreur lors du chargement du client Google Sheets:', error);
    });
}

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
