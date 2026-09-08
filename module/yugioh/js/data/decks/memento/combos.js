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
    },
    {
    id: 'tatsunootoshigo-combo',
    name: 'Tatsunootoshigo combo',
    emoji: '🐉',
    difficulty: 4,
    tags: ['starter', '1-card'],
    endNote: 'SETUP — Trap searched, with Mementomictlan Tecuhtlica - Creation King remaining on field.',
    steps: [
        {
            id: 't01',
            phase: 'STARTER',
            actions: ['SS', 'ACTIVATE', 'POP', 'SEND'],
            actor: 'Mementotlan Tatsunootoshigo',
            targets: [
                'Mementotlan Mace',
                'Mementotlan Goblin',
                'Mementotlan Ghattic'
            ],
            text: 'SS Mementotlan Tatsunootoshigo and activate it, popping itself, to send Mementotlan Mace, Mementotlan Goblin & Mementotlan Ghattic',
            story: '🐉 Tatsunootoshigo ➡️ 💥 se détruit ➡️ ⚰️ 🔨 👺 🐱',
            tags: ['summon', 'pop', 'send', 'gy']
        },

        {
            id: 't02',
            phase: 'SETUP',
            actions: ['SS'],
            actor: 'Mementotlan Ghattic',
            targets: [],
            text: 'Mementotlan Ghattic effect to SS itself',
            story: '🐱 Ghattic ➡️ ⬆️ revient',
            tags: ['gy', 'summon']
        },

        {
            id: 't03',
            phase: 'SETUP',
            actions: ['ACTIVATE', 'ADD'],
            actor: 'Mementotlan Ghattic',
            targets: ['Mementotlan Mace'],
            text: 'Activate Mementotlan Ghattic to add Mementotlan Mace to hand',
            story: '🐱 ➡️ 🖐️ récupère 🔨 Mace',
            tags: ['add', 'gy']
        },

        {
            id: 't04',
            phase: 'SETUP',
            actions: ['NS'],
            actor: 'Mementotlan Mace',
            targets: [],
            text: 'NS Mementotlan Mace',
            story: '🔨 Mace ➡️ ⬇️ Normal Summon',
            tags: ['summon']
        },

        {
            id: 't05',
            phase: 'SETUP',
            actions: ['ACTIVATE', 'POP', 'SEARCH'],
            actor: 'Mementotlan Mace',
            targets: ['Mementotlan Fusion'],
            text: 'Activate Mementotlan Mace, popping itself, to search Mementotlan Fusion',
            story: '🔨 ➡️ 💥 ➡️ 🔎 🌀 Fusion',
            tags: ['pop', 'search']
        },

        {
            id: 't06',
            phase: 'SETUP',
            actions: ['ACTIVATE', 'SS', 'SHUFFLE'],
            actor: 'Mementotlan Fusion',
            targets: [
                'Mementomictlan Tecuhtlica - Creation King',
                'Mementotlan Mace',
                'Mementotlan Tatsunootoshigo',
                'Mementotlan Goblin'
            ],
            text: 'Activate Mementotlan Fusion to SS Mementomictlan Tecuhtlica - Creation King by shuffling Mementotlan Mace, Mementotlan Tatsunootoshigo & Mementotlan Goblin',
            story: '🌀 Fusion ➡️ 👑 Tecuhtlica',
            tags: ['fusion', 'summon', 'shuffle']
        },

        {
            id: 't07',
            phase: 'GY_SETUP',
            actions: ['ACTIVATE', 'SEND'],
            actor: 'Mementomictlan Tecuhtlica - Creation King',
            targets: [
                'Mementomictlan Tecuhtlica - Creation King',
                'Mementotlan Akihiron',
                'Mementotlan Angwitch'
            ],
            text: 'Activate Mementomictlan Tecuhtlica - Creation King to send another Mementomictlan Tecuhtlica - Creation King, Mementotlan Akihiron & Mementotlan Angwitch',
            story: '👑 ➡️ ⚰️ envoie 👑 🦖 🧙‍♀️',
            tags: ['gy', 'send']
        },

        {
            id: 't08',
            phase: 'GY_SETUP',
            actions: ['SEARCH'],
            actor: 'Mementomictlan Tecuhtlica - Creation King',
            targets: ['Mementomictlan'],
            text: 'Mementomictlan Tecuhtlica - Creation King GY effect to search Mementomictlan',
            story: '👑 (GY) ➡️ 🔎 🏟️ Mementomictlan',
            tags: ['gy', 'search']
        },

        {
            id: 't09',
            phase: 'GY_SETUP',
            actions: ['ACTIVATE'],
            actor: 'Mementomictlan',
            targets: [],
            text: 'Activate Mementomictlan',
            story: '🏟️ Le terrain s’installe',
            tags: ['field']
        },

        {
            id: 't10',
            phase: 'BOARD_SETUP',
            actions: ['POP', 'SEARCH'],
            actor: 'Mementotlan Fusion',
            targets: [
                'Mementotlan Ghattic',
                'Mementotlan Bone Party'
            ],
            text: 'Activate Mementotlan Fusion in the GY to pop Mementotlan Ghattic to search Mementotlan Bone Party',
            story: '🌀 (GY) ➡️ 💥 🐱 ➡️ 🔎 🦴 Bone Party',
            tags: ['gy', 'pop', 'search']
        },

        {
            id: 't11',
            phase: 'BOARD_SETUP',
            actions: ['SS'],
            actor: 'Mementotlan Akihiron',
            targets: [],
            text: 'Activate Mementotlan Akihiron in the GY to SS itself',
            story: '🦖 Akihiron ➡️ ⬆️ revient',
            tags: ['gy', 'summon']
        },

        {
            id: 't12',
            phase: 'BOARD_SETUP',
            actions: ['ACTIVATE', 'POP', 'SUMMON'],
            actor: 'Mementotlan Bone Party',
            targets: [
                'Mementotlan Akihiron',
                'Mementotlan Dark Blade'
            ],
            text: 'Activate Mementotlan Bone Party, popping Mementotlan Akihiron, to SS Mementotlan Dark Blade from Deck',
            story: '🦴 ➡️ 💥 🦖 ➡️ ⚔️ Dark Blade',
            tags: ['pop', 'summon']
        },

        {
            id: 't13',
            phase: 'BOARD_SETUP',
            actions: ['SS', 'ADD'],
            actor: 'Mementomictlan',
            targets: [
                'Mementotlan Angwitch',
                'Mementotlan Fusion'
            ],
            text: 'CL1 Mementomictlan to SS Mementotlan Angwitch from GY, CL2 Mementotlan Akihiron to add banished Mementotlan Fusion to hand',
            story: '🏟️ ➡️ 🧙‍♀️ Angwitch + 🦖 ➡️ ♻️ 🌀 Fusion',
            chain: { id: 'tatsunoo-chain-1', link: 1 },
            tags: ['chain', 'summon', 'add', 'gy']
        },

        {
            id: 't14',
            phase: 'BOARD_SETUP',
            actions: ['ADD'],
            actor: 'Mementotlan Angwitch',
            targets: ['Mementotlan Shleepy'],
            text: 'Activate Mementotlan Angwitch to add Mementotlan Shleepy',
            story: '🧙‍♀️ ➡️ 🔎 🐑 Shleepy',
            tags: ['search', 'add']
        },

        {
            id: 't15',
            phase: 'BOARD_SETUP',
            actions: ['SS'],
            actor: 'Mementotlan Shleepy',
            targets: [
                'Mementotlan Twin Dragon',
                'Mementotlan Angwitch'
            ],
            text: 'Activate Mementotlan Shleepy to SS itself, then activate it again to fuse Mementotlan Shleepy + Mementotlan Angwitch into Mementotlan Twin Dragon',
            story: '🐑 ➡️ ⬆️ ➡️ 🐑 + 🧙‍♀️ ➡️ 🐉🐉',
            tags: ['summon', 'fusion']
        },

        {
            id: 't16',
            phase: 'BOARD_SETUP',
            actions: ['ACTIVATE', 'POP', 'ADD'],
            actor: 'Mementotlan Twin Dragon',
            targets: [
                'Mementotlan Twin Dragon',
                'Mementotlan-Horned Dragon',
                'Mementoal Tecuhtlica - Combined Creation'
            ],
            text: 'Activate Mementotlan Twin Dragon, popping itself, to add Mementotlan-Horned Dragon and Mementoal Tecuhtlica - Combined Creation',
            story: '🐉🐉 ➡️ 💥 ➡️ 🖐️ 🦕 + 👹',
            tags: ['pop', 'add']
        },

        {
            id: 't17',
            phase: 'BOARD_SETUP',
            actions: ['FLOAT'],
            actor: 'Mementotlan Twin Dragon',
            targets: ['Mementotlan Shleepy'],
            text: 'Mementotlan Twin Dragon GY effect to float into Mementotlan Shleepy',
            story: '🐉🐉 (GY) ➡️ 🫧 ➡️ 🐑 Shleepy',
            tags: ['gy', 'float', 'summon']
        },

        {
            id: 't18',
            phase: 'BOARD_SETUP',
            actions: ['ACTIVATE', 'POP', 'SS'],
            actor: 'Mementotlan Dark Blade',
            targets: [
                'Mementotlan Shleepy',
                'Mementotlan Goblin'
            ],
            text: 'Activate Mementotlan Dark Blade, popping Mementotlan Shleepy, to SS Mementotlan Goblin from Deck',
            story: '⚔️ ➡️ 💥 🐑 ➡️ ⬆️ 👺 Goblin',
            tags: ['pop', 'summon']
        },

        {
            id: 't19',
            phase: 'BOARD_SETUP',
            actions: ['SEND'],
            actor: 'Mementotlan Shleepy',
            targets: [],
            text: 'Mementotlan Shleepy GY effect to send a trap of choice',
            story: '🐑 (GY) ➡️ ⚰️ envoie un piège',
            tags: ['gy', 'send']
        },

        {
            id: 't20',
            phase: 'BOARD_SETUP',
            actions: ['LINK_SUMMON'],
            actor: 'Cross-Sheep',
            targets: [
                'Mementotlan Dark Blade',
                'Mementotlan Goblin'
            ],
            text: 'Summon Cross-Sheep using Mementotlan Dark Blade and Mementotlan Goblin',
            story: '⚔️ + 👺 ➡️ 🐏 Cross-Sheep',
            tags: ['link', 'summon']
        },

        {
            id: 't21',
            phase: 'BOARD_SETUP',
            actions: ['SS'],
            actor: 'Mementotlan-Horned Dragon',
            targets: [],
            text: 'SS Mementotlan-Horned Dragon to Cross-Sheep’s link zone',
            story: '🦕 ➡️ ⬆️ dans la zone de 🐏',
            tags: ['summon']
        },

        {
            id: 't22',
            phase: 'BOARD_SETUP',
            actions: ['ACTIVATE', 'SS'],
            actor: 'Cross-Sheep',
            targets: [],
            text: 'Activate Cross-Sheep to SS any body',
            story: '🐏 ➡️ ⬆️ invoque un corps',
            tags: ['summon', 'extension']
        },

        {
            id: 't23',
            phase: 'END_BOARD',
            actions: ['LINK_SUMMON'],
            actor: 'Apollousa, Bow of the Goddess',
            targets: [],
            text: 'Link summon a 3 mat Apollousa while keeping Mementomictlan Tecuhtlica - Creation King on field',
            story: '🔻 3 corps ➡️ 🏹 Apollousa',
            tags: ['link', 'end-board']
        },

        {
            id: 't24',
            phase: 'END_BOARD',
            actions: ['SS', 'SHUFFLE'],
            actor: 'Mementoal Tecuhtlica - Combined Creation',
            targets: [
                'Mementomictlan Tecuhtlica - Creation King',
                'Mementotlan Akihiron',
                'Mementotlan Angwitch',
                'Mementotlan Dark Blade'
            ],
            text: 'SS Mementoal Tecuhtlica - Combined Creation by shuffling everything except Mementotlan Akihiron, Mementotlan Angwitch & Mementotlan Dark Blade',
            story: '👹 arrive ➡️ on garde 🦖 🧙‍♀️ ⚔️ au GY',
            tags: ['fusion', 'summon', 'shuffle']
        },

        {
            id: 't25',
            phase: 'END_BOARD',
            actions: ['SET'],
            actor: 'Mementotlan Fusion',
            targets: [],
            text: 'Set Mementotlan Fusion',
            story: '🂠 On pose 🌀 Fusion',
            tags: ['set']
        },

        {
            id: 't26',
            phase: 'END_BOARD',
            actions: ['SET'],
            actor: 'Mementomictlan',
            targets: [],
            text: 'During the End Phase, Field Spell sets trap of choice',
            story: '🏟️ End Phase ➡️ 🂠 piège — 🏁 END BOARD',
            tags: ['set', 'end-board']
        }
    ],
    branches: []
    }
];
