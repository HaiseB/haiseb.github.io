/**
 * Combos du deck Memento.
 * Une étape (step) est une donnée structurée, jamais un bloc de texte libre :
 *   text     -> texte technique exact (Technical View, Fill the Blank, Put in Order)
 *   actor    -> carte qui agit / est invoquée
 *   targets  -> cartes ciblées
 *   actions  -> codes du lexique (jargon standardisé)
 *   story    -> ligne narrative du Story Mode (optionnelle, sinon générée)
 *   chain    -> { id, link } pour représenter les Chain Links
 */
export const combos = [
    {
        id: 'angwitch-1-card',
        name: 'Angwitch 1-card combo',
        emoji: '🧙',
        difficulty: 3,
        tags: ['1-card', 'starter'],
        endNote: 'SETUP COMPLETED — à partir d\'ici la combo peut partir dans différentes directions.',
        steps: [
            {
                id: 's01', phase: 'STARTER', actions: ['NS'],
                actor: 'Mementotlan Angwitch', targets: [],
                text: 'NS Mementotlan Angwitch',
                story: '🧙‍♀️ Angwitch ouvre le bal',
                tags: ['starter', 'summon']
            },
            {
                id: 's02', phase: 'STARTER', actions: ['ACTIVATE', 'SEARCH'],
                actor: 'Mementotlan Angwitch', targets: ['Mementotlan Tatsunootoshigo'],
                text: 'Activate Mementotlan Angwitch to search Mementotlan Tatsunootoshigo',
                story: '🧙‍♀️ ➡️ 🔎 cherche 🐉 Tatsunootoshigo',
                tags: ['search']
            },
            {
                id: 's03', phase: 'SETUP', actions: ['SS', 'ACTIVATE', 'POP', 'SEND'],
                actor: 'Mementotlan Tatsunootoshigo',
                targets: ['Mementotlan Mace', 'Mementotlan Goblin', 'Mementotlan Shleepy'],
                text: 'SS Mementotlan Tatsunootoshigo and activate it, popping itself, to send Mementotlan Mace, Mementotlan Goblin & Mementotlan Shleepy',
                story: '🐉 ➡️ 💥 se détruit ➡️ ⚰️ 🔨 👺 🐑',
                tags: ['summon', 'pop', 'gy']
            },
            {
                id: 's04', phase: 'SETUP', actions: ['ACTIVATE', 'POP', 'SS'],
                actor: 'Mementotlan Angwitch', targets: ['Mementotlan Mace'],
                text: 'Activate Mementotlan Angwitch, popping itself, to SS Mementotlan Mace',
                story: '🧙‍♀️ ➡️ 💥 ➡️ 🔨 Mace revient',
                tags: ['pop', 'summon', 'gy']
            },
            {
                id: 's05', phase: 'SETUP', actions: ['ACTIVATE', 'POP', 'SEARCH'],
                actor: 'Mementotlan Mace', targets: ['Mementotlan Fusion'],
                text: 'Activate Mementotlan Mace, popping itself, to search Mementotlan Fusion',
                story: '🔨 ➡️ 💥 ➡️ 🔎 🌀 Fusion',
                tags: ['pop', 'search']
            },
            {
                id: 's06', phase: 'SETUP', actions: ['ACTIVATE', 'SS', 'SHUFFLE'],
                actor: 'Mementotlan Fusion',
                targets: ['Mementomictlan Tecuhtlica - Creation King', 'Mementotlan Tatsunootoshigo', 'Mementotlan Mace', 'Mementotlan Angwitch'],
                text: 'Activate Mementotlan Fusion to SS Mementomictlan Tecuhtlica - Creation King by shuffling Mementotlan Tatsunootoshigo, Mementotlan Mace & Mementotlan Angwitch',
                story: '🌀 Fusion ➡️ 👑 Tecuhtlica',
                tags: ['fusion', 'summon']
            },
            {
                id: 's07', phase: 'GY_SETUP', actions: ['ACTIVATE', 'SEND'],
                actor: 'Mementomictlan Tecuhtlica - Creation King',
                targets: ['Mementomictlan Tecuhtlica - Creation King', 'Mementotlan Akihiron', 'Mementotlan Ghattic'],
                text: 'Activate Mementomictlan Tecuhtlica - Creation King to send another Mementomictlan Tecuhtlica - Creation King, Mementotlan Akihiron & Mementotlan Ghattic',
                story: '👑 ➡️ ⚰️ envoie 👑 🦖 🐱',
                tags: ['gy', 'send']
            },
            {
                id: 's08', phase: 'GY_SETUP', actions: ['SS'],
                actor: 'Mementotlan Ghattic', targets: [],
                text: 'Mementotlan Ghattic effect to SS itself',
                story: '🐱 Ghattic ➡️ ⬆️ revient',
                tags: ['gy', 'summon']
            },
            {
                id: 's09', phase: 'GY_SETUP', actions: ['ACTIVATE', 'ADD'],
                actor: 'Mementotlan Ghattic', targets: ['Mementotlan Shleepy'],
                text: 'Activate Mementotlan Ghattic to add Mementotlan Shleepy to hand',
                story: '🐱 ➡️ 🖐️ récupère 🐑 Shleepy',
                tags: ['add', 'gy']
            },
            {
                id: 's10', phase: 'GY_SETUP', actions: ['SEARCH'],
                actor: 'Mementomictlan Tecuhtlica - Creation King', targets: ['Mementomictlan'],
                text: 'Mementomictlan Tecuhtlica - Creation King GY effect to search Mementomictlan',
                story: '👑 (GY) ➡️ 🔎 🏟️ Mementomictlan',
                tags: ['gy', 'search']
            },
            {
                id: 's11', phase: 'GY_SETUP', actions: ['ACTIVATE'],
                actor: 'Mementomictlan', targets: [],
                text: 'Activate Mementomictlan',
                story: '🏟️ Le terrain s\'installe',
                tags: ['field']
            },
            {
                id: 's12', phase: 'BOARD_SETUP', actions: ['POP', 'SEARCH'],
                actor: 'Mementotlan Fusion',
                targets: ['Mementomictlan Tecuhtlica - Creation King', 'Mementotlan Bone Party'],
                text: 'CL1 Mementotlan Fusion in GY to pop Mementomictlan Tecuhtlica - Creation King and search Mementotlan Bone Party',
                story: '🌀 (GY) ➡️ 💥 👑 ➡️ 🔎 🦴 Bone Party',
                chain: { id: 'chain-1', link: 1 },
                tags: ['chain', 'gy', 'pop', 'search']
            },
            {
                id: 's13', phase: 'BOARD_SETUP', actions: ['SS'],
                actor: 'Mementotlan Shleepy', targets: [],
                text: 'CL2 Mementotlan Shleepy to SS itself from hand',
                story: '🐑 Shleepy ➡️ ⬆️ depuis la main',
                chain: { id: 'chain-1', link: 2 },
                tags: ['chain', 'summon']
            },
            {
                id: 's14', phase: 'BOARD_SETUP', actions: ['SS'],
                actor: 'Mementotlan Shleepy',
                targets: ['Mementotlan Twin Dragon', 'Mementotlan Shleepy', 'Mementotlan Ghattic'],
                text: 'New chain: CL1 Mementotlan Shleepy to SS Mementotlan Twin Dragon using Mementotlan Shleepy + Mementotlan Ghattic',
                story: '🐑 + 🐱 ➡️ 🐉🐉 Twin Dragon',
                chain: { id: 'chain-2', link: 1 },
                tags: ['chain', 'fusion', 'summon']
            },
            {
                id: 's15', phase: 'BOARD_SETUP', actions: ['SS'],
                actor: 'Mementomictlan', targets: ['Mementotlan Goblin'],
                text: 'CL2 Mementomictlan to SS Mementotlan Goblin',
                story: '🏟️ ➡️ ⬆️ 👺 Goblin',
                chain: { id: 'chain-2', link: 2 },
                tags: ['chain', 'summon']
            },
            {
                id: 's16', phase: 'BOARD_SETUP', actions: ['SS'],
                actor: 'Mementotlan Akihiron', targets: [],
                text: 'CL3 Mementotlan Akihiron to SS itself',
                story: '🦖 Akihiron ➡️ ⬆️ revient',
                chain: { id: 'chain-2', link: 3 },
                tags: ['chain', 'gy', 'summon']
            },
            {
                id: 's17', phase: 'BOARD_SETUP', actions: ['ACTIVATE', 'POP', 'ADD'],
                actor: 'Mementotlan Twin Dragon',
                targets: ['Mementotlan Akihiron', 'Mementotlan-Horned Dragon', 'Mementoal Tecuhtlica - Combined Creation'],
                text: 'Activate Mementotlan Twin Dragon, popping Mementotlan Akihiron, to add Mementotlan-Horned Dragon & Mementoal Tecuhtlica - Combined Creation',
                story: '🐉🐉 ➡️ 💥 🦖 ➡️ 🖐️ 🦕 + 👹',
                tags: ['pop', 'add']
            },
            {
                id: 's18', phase: 'BOARD_SETUP', actions: ['ACTIVATE', 'ADD', 'BANISH'],
                actor: 'Mementotlan Akihiron', targets: ['Mementotlan Fusion'],
                text: 'Activate Mementotlan Akihiron to add the banished Mementotlan Fusion to hand',
                story: '🦖 ➡️ ♻️ récupère 🌀 Fusion — 🏁 SETUP',
                tags: ['add', 'recover']
            }
        ],
        branches: [
            {
                id: 'horned-dragon-bone-party',
                name: 'Horned Dragon + Bone Party',
                emoji: '🦕',
                from: 's18',
                difficulty: 3,
                tags: ['end-board'],
                steps: [
                    {
                        id: 'b1s1', phase: 'END_BOARD', actions: ['ACTIVATE', 'POP', 'SEND'],
                        actor: 'Mementotlan Goblin', targets: ['Mementotlan Twin Dragon'],
                        text: 'Activate Mementotlan Goblin, popping Mementotlan Twin Dragon, to send 2 cards of choice',
                        story: '👺 ➡️ 💥 🐉🐉 ➡️ ⚰️ 2 cartes au choix',
                        tags: ['pop', 'send', 'gy']
                    },
                    {
                        id: 'b1s2', phase: 'END_BOARD', actions: ['FLOAT'],
                        actor: 'Mementotlan Twin Dragon', targets: [],
                        text: 'Mementotlan Twin Dragon GY effect to float into any body',
                        story: '🐉🐉 ➡️ 🫧 flotte en un corps',
                        tags: ['gy', 'float']
                    },
                    {
                        id: 'b1s3', phase: 'END_BOARD', actions: ['ACTIVATE', 'POP', 'SUMMON'],
                        actor: 'Mementotlan Bone Party',
                        targets: ['Mementoal Tecuhtlica - Combined Creation', 'Mementotlan Dark Blade'],
                        text: 'Activate Mementotlan Bone Party to pop Mementoal Tecuhtlica - Combined Creation in hand to summon Mementotlan Dark Blade',
                        story: '🦴 ➡️ 💥 👹 ➡️ ⚔️ Dark Blade',
                        tags: ['pop', 'summon']
                    },
                    {
                        id: 'b1s4', phase: 'END_BOARD', actions: ['ACTIVATE', 'SS', 'POP'],
                        actor: 'Mementotlan Dark Blade', targets: ['Mementotlan Angwitch'],
                        text: 'Activate Mementotlan Dark Blade to SS Mementotlan Angwitch from Deck by popping anything',
                        story: '⚔️ ➡️ ⬆️ 🧙‍♀️ Angwitch depuis le Deck',
                        tags: ['summon', 'pop']
                    },
                    {
                        id: 'b1s5', phase: 'END_BOARD', actions: ['LINK_SUMMON'],
                        actor: null, targets: [],
                        text: 'Link summon / build the desired Link line',
                        story: '🔻 On monte la ligne Link voulue',
                        tags: ['extension', 'link']
                    },
                    {
                        id: 'b1s6', phase: 'END_BOARD', actions: ['SS', 'SHUFFLE'],
                        actor: 'Mementoal Tecuhtlica - Combined Creation',
                        targets: ['Mementotlan Akihiron', 'Mementotlan Dark Blade'],
                        text: 'SS Mementoal Tecuhtlica - Combined Creation by shuffling appropriate cards while keeping Mementotlan Akihiron and Mementotlan Dark Blade in GY',
                        story: '👹 arrive — on garde 🦖 et ⚔️ au GY',
                        tags: ['fusion', 'summon', 'gy']
                    },
                    {
                        id: 'b1s7', phase: 'END_BOARD', actions: ['SS'],
                        actor: 'Mementotlan-Horned Dragon', targets: [],
                        text: 'SS Mementotlan-Horned Dragon from hand',
                        story: '🦕 Horned Dragon depuis la main',
                        tags: ['summon']
                    },
                    {
                        id: 'b1s8', phase: 'END_BOARD', actions: ['SET'],
                        actor: 'Mementotlan Fusion', targets: [],
                        text: 'Set Mementotlan Fusion',
                        story: '🂠 On pose 🌀 Fusion — 🏁 END BOARD',
                        tags: ['set', 'end-board']
                    }
                ]
            },
            {
                id: 'extending-horned-dragon',
                name: 'Extending with Horned Dragon',
                emoji: '🔻',
                from: 's18',
                difficulty: 4,
                tags: ['extension'],
                steps: [
                    {
                        id: 'b2s1', phase: 'END_BOARD', actions: ['SS'],
                        actor: 'Mementotlan-Horned Dragon', targets: [],
                        text: 'SS Mementotlan-Horned Dragon from hand',
                        story: '🦕 Horned Dragon depuis la main',
                        tags: ['summon']
                    },
                    {
                        id: 'b2s2', phase: 'END_BOARD', actions: ['LINK_SUMMON'],
                        actor: 'Cross-Sheep', targets: ['Mementotlan-Horned Dragon', 'Mementotlan Goblin'],
                        text: 'Link summon Cross-Sheep using Mementotlan-Horned Dragon + Mementotlan Goblin',
                        story: '🦕 + 👺 ➡️ 🐏 Cross-Sheep',
                        tags: ['link', 'summon']
                    },
                    {
                        id: 'b2s3', phase: 'END_BOARD', actions: ['ACTIVATE', 'POP', 'SUMMON'],
                        actor: 'Mementotlan Bone Party',
                        targets: ['Mementoal Tecuhtlica - Combined Creation', 'Mementotlan Dark Blade'],
                        text: 'Activate Mementotlan Bone Party to pop Mementoal Tecuhtlica - Combined Creation in hand to summon Mementotlan Dark Blade in Cross-Sheep\'s zone',
                        story: '🦴 ➡️ 💥 👹 ➡️ ⚔️ dans la zone de 🐏',
                        tags: ['pop', 'summon']
                    },
                    {
                        id: 'b2s4', phase: 'END_BOARD', actions: ['ACTIVATE', 'SS'],
                        actor: 'Cross-Sheep', targets: ['Mementotlan Goblin'],
                        text: 'Activate Cross-Sheep to SS Mementotlan Goblin',
                        story: '🐏 ➡️ ⬆️ 👺 Goblin',
                        tags: ['summon', 'gy']
                    },
                    {
                        id: 'b2s5', phase: 'END_BOARD', actions: ['ACTIVATE', 'SS'],
                        actor: 'Mementotlan Dark Blade', targets: ['Mementotlan Angwitch'],
                        text: 'Activate Mementotlan Dark Blade to SS Mementotlan Angwitch from Deck',
                        story: '⚔️ ➡️ ⬆️ 🧙‍♀️ depuis le Deck',
                        tags: ['summon']
                    },
                    {
                        id: 'b2s6', phase: 'END_BOARD', actions: ['ACTIVATE', 'POP', 'SEND'],
                        actor: 'Mementotlan Goblin', targets: ['Mementotlan Twin Dragon'],
                        text: 'Activate Mementotlan Goblin, popping Mementotlan Twin Dragon, to send 2 cards of choice',
                        story: '👺 ➡️ 💥 🐉🐉 ➡️ ⚰️ 2 cartes au choix',
                        tags: ['pop', 'send', 'gy']
                    },
                    {
                        id: 'b2s7', phase: 'END_BOARD', actions: ['LINK_SUMMON'],
                        actor: null, targets: [],
                        text: 'Build desired Link/Synchro board',
                        story: '🔻 On construit le board Link / Synchro voulu',
                        tags: ['extension']
                    },
                    {
                        id: 'b2s8', phase: 'END_BOARD', actions: ['SET'],
                        actor: 'Mementotlan Bone Party', targets: [],
                        text: 'During the End Phase, Field Spell sets Mementotlan Bone Party or another appropriate card',
                        story: '🏟️ End Phase ➡️ 🂠 🦴 Bone Party — 🏁 END BOARD',
                        tags: ['set', 'end-board']
                    }
                ]
            }
        ]
    }
];
