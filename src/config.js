// Configuration for both language versions
const config = {
    french: {
        windowTitle: 'Dev Log Creator',
        fields: {
            objectives: 'Objectifs du jour',
            workDone: 'Travail effectué',
            problems: 'Problèmes rencontrés',
            solutions: 'Solutions trouvées',
            tomorrow: 'À faire demain'
        },
        placeholders: {
            objectives: 'Quels étaient vos objectifs pour aujourd\'hui ?',
            workDone: 'Qu\'avez-vous accompli aujourd\'hui ?',
            problems: 'Quels problèmes avez-vous rencontrés ?',
            solutions: 'Quelles solutions avez-vous trouvées ?',
            tomorrow: 'Que prévoyez-vous de faire demain ?'
        },
        buttons: {
            clear: 'Effacer',
            submit: 'Créer le Dev Log',
            creating: 'Création...'
        },
        messages: {
            success: 'Dev log créé avec succès !',
            cancelled: 'Opération annulée.',
            confirmClear: 'Êtes-vous sûr de vouloir effacer tous les champs ?',
            cleared: 'Formulaire effacé !',
            fileExists: 'Le fichier {fileName} existe déjà.',
            fileExistsDetail: 'Voulez-vous l\'écraser ?',
            overwrite: 'Écraser',
            cancel: 'Annuler'
        },
        template: {
            objectives: 'Objectifs du jour',
            workDone: 'Travail effectué',
            problems: 'Problèmes rencontrés',
            solutions: 'Solutions trouvées',
            tomorrow: 'À faire demain',
            notes: 'Notes'
        }
    },
    english: {
        windowTitle: 'Dev Log Creator',
        fields: {
            objectives: 'Today\'s Objectives',
            workDone: 'Work Completed',
            problems: 'Problems Encountered',
            solutions: 'Solutions Found',
            tomorrow: 'Tomorrow\'s Tasks'
        },
        placeholders: {
            objectives: 'What were your objectives for today?',
            workDone: 'What did you accomplish today?',
            problems: 'What problems did you encounter?',
            solutions: 'What solutions did you find?',
            tomorrow: 'What do you plan to do tomorrow?'
        },
        buttons: {
            clear: 'Clear',
            submit: 'Create Dev Log',
            creating: 'Creating...'
        },
        messages: {
            success: 'Dev log created successfully!',
            cancelled: 'Operation cancelled.',
            confirmClear: 'Are you sure you want to clear all fields?',
            cleared: 'Form cleared!',
            fileExists: 'The file {fileName} already exists.',
            fileExistsDetail: 'Do you want to overwrite it?',
            overwrite: 'Overwrite',
            cancel: 'Cancel'
        },
        template: {
            objectives: 'Today\'s Objectives',
            workDone: 'Work Completed',
            problems: 'Problems Encountered',
            solutions: 'Solutions Found',
            tomorrow: 'Tomorrow\'s Tasks',
            notes: 'Notes'
        }
    }
};

module.exports = config;
