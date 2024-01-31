document.addEventListener('DOMContentLoaded', function () {
    const giftList = document.getElementById('giftList');
    const giftSelection = document.getElementById('giftSelection');
    const nameSelection = document.getElementById('nameSelection');
    const customName = document.getElementById('customName');
    const submitButton = document.getElementById('submitButton');

    // Charger les noms depuis le fichier JSON
    fetch('./data/users.json')
        .then(response => response.json())
        .then(data => {
            data.noms.forEach(name => {
                const option = document.createElement('option');
                option.text = name;
                nameSelection.add(option);
            });
        });

    // Charger les cadeaux depuis le fichier JSON
    fetch('./data/gifts.json')
        .then(response => response.json())
        .then(data => {
            data.cadeaux.forEach(gift => {
                const option = document.createElement('option');
                option.text = `${gift.nom} - ${gift.prix}€`;
                giftSelection.add(option);

                const listItem = document.createElement('li');
                listItem.textContent = `${gift.nom} - ${gift.proprietaire ? gift.proprietaire : 'Disponible'}`;
                giftList.appendChild(listItem);
            });
        });

    // Récupérer le nom stocké dans le cookie (s'il existe)
    const savedName = getCookie('userName');
    if (savedName) {
        console.log('Coucou ' + savedName + ' !');
        customName.value = savedName;
    }

    // Soumettre le choix du cadeau
    submitButton.addEventListener('click', function () {
        const selectedGiftIndex = giftSelection.selectedIndex;
        const selectedNameIndex = nameSelection.selectedIndex;
        const selectedName = nameSelection.options[selectedNameIndex].text;
        const customEnteredName = customName.value;

        if (selectedGiftIndex !== -1 && (selectedNameIndex !== -1 || customEnteredName.trim() !== '')) {
            const selectedGift = giftSelection.options[selectedGiftIndex].text.split(' - ')[0];
            const selectedGiftListItem = giftList.children[selectedGiftIndex];

            selectedGiftListItem.textContent = `${selectedGift} - ${selectedNameIndex !== -1 ? nameSelection.options[selectedNameIndex].text : customEnteredName}`;

            // Enregistrer le nom dans le cookie
            setCookie('userName', customEnteredName, 100); // 100 jours d'expiration du cookie

            // Ajouter le cadeau au fichier JSON des cadeaux
            fetch('./data/gifts.json')
                .then(response => response.json())
                .then(data => {
                    // Ajouter le nouveau cadeau à la liste des cadeaux
                    const newGift = {
                        "nom": selectedGift,
                        "prix": parseFloat(selectedGift.split(' - ')[1]),
                        "proprietaire": selectedNameIndex !== -1 ? selectedName : customEnteredName
                    };
                    data.cadeaux.push(newGift);

                    // Mettre à jour le fichier JSON des cadeaux
                    return fetch('./data/gifts.json', {
                        method: 'PUT', // ou 'POST' si vous préférez
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    });
                })
                .then(() => console.log('Cadeau ajouté avec succès'))
                .catch((error) => console.error('Erreur lors de l\'ajout du cadeau:', error));

            // Ajouter l'utilisateur au fichier JSON des utilisateurs si nécessaire
            if (selectedNameIndex === -1 && customEnteredName.trim() !== '') {
                fetch('./data/users.json')
                    .then(response => response.json())
                    .then(data => {
                        // Vérifier si l'utilisateur existe déjà dans la liste
                        if (!data.noms.includes(customEnteredName)) {
                            // Ajouter le nouvel utilisateur à la liste des utilisateurs
                            data.noms.push(customEnteredName);

                            // Mettre à jour le fichier JSON des utilisateurs
                            return fetch('./data/users.json', {
                                method: 'PUT', // ou 'POST' si vous préférez
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(data),
                            });
                        }
                    })
                    .then(() => console.log('Utilisateur ajouté avec succès'))
                    .catch((error) => console.error('Erreur lors de l\'ajout de l\'utilisateur:', error));
            }
        } else {
            alert('Veuillez choisir un cadeau et votre nom.');
        }
    });

    // Fonction pour récupérer un cookie
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // Fonction pour définir un cookie
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value}; ${expires}; path=/`;
    }
});
