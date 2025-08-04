
import { sequelize, User, Site, Tag, Note } from '../models/index.js';

async function seedDatabase() {
    try {
        // Create sample users
        const user1 = await User.bulkCreate([
            {
                username: 'john_doe',
                lastname: 'Doe',
                email: 'john@example.com',
                password: 'password123',
                phone: '0123456789',
                role: 'admin',
            },
            {
                username: 'jane_doe',
                lastname: 'Smith',
                email: 'jane@example.com',
                password: 'password123',
                phone: '0987654321',
            },
        ]);

        // Create sample sites
        const site1 = await Site.bulkCreate([
            {
                title: 'Portfolio Personnel',
                url: 'https://portfolio-john.com',
                description: 'Site portfolio présentant les projets de développement web et mobile. Inclut une galerie de projets, CV interactif et blog technique.',
            },
            {
                title: 'Blog Tech',
                url: 'https://techblog-jane.com',
                description: 'Blog technique sur les dernières tendances en développement web, tutoriels JavaScript/Node.js et retours d\'expérience sur les projets.',
            },
        ]);

        // Create sample tags
        const tags = await Tag.bulkCreate([
            {
                name: 'Développement',
                color: '#3B82F6',
            },
            {
                name: 'Design',
                color: '#EF4444',
            },
            {
                name: 'Marketing',
                color: '#10B981',
            },
            {
                name: 'Projet Personnel',
                color: '#F59E0B',
            },
            {
                name: 'Urgent',
                color: '#DC2626',
            },
        ]);

        // Create sample notes
        const notes = await Note.bulkCreate([
            {
                title: 'Configuration de l\'API',
                content: 'Documentation sur la configuration initiale de l\'API avec Node.js et Sequelize. Inclut les étapes d\'installation, configuration de la base de données et structure des modèles.',
            },
            {
                title: 'Design System Components',
                content: 'Liste des composants du design system : boutons, formulaires, cartes, navigation. Chaque composant doit respecter les guidelines de couleurs et de typographie définies.',
            },
            {
                title: 'Stratégie Content Marketing',
                content: 'Plan de contenu pour les 3 prochains mois. Focus sur les articles techniques, tutoriels et études de cas. Objectif : augmenter le trafic organique de 30%.',
            },
            {
                title: 'Idées App Mobile',
                content: 'Brainstorming d\'idées pour une application mobile de productivité. Fonctionnalités : gestion de tâches, pomodoro timer, statistiques de productivité.',
            },
            {
                title: 'Bug Fix Authentication',
                content: 'URGENT : Résoudre le problème d\'authentification avec les tokens JWT. Les utilisateurs sont déconnectés après 5 minutes au lieu de 24h.',
            },
        ]);

        // Associate notes with tags
        await notes[0].addTag(tags[0]); // Configuration de l'API -> Développement
        await notes[0].addTag(tags[4]); // Configuration de l'API -> Urgent

        await notes[1].addTag(tags[1]); // Design System Components -> Design
        await notes[1].addTag(tags[0]); // Design System Components -> Développement

        await notes[2].addTag(tags[2]); // Stratégie Content Marketing -> Marketing

        await notes[3].addTag(tags[3]); // Idées App Mobile -> Projet Personnel
        await notes[3].addTag(tags[0]); // Idées App Mobile -> Développement

        await notes[4].addTag(tags[0]); // Bug Fix Authentication -> Développement
        await notes[4].addTag(tags[4]); // Bug Fix Authentication -> Urgent

        console.log('Database seeded successfully with users, sites, tags, notes and their associations.');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

await seedDatabase();

await sequelize.close();