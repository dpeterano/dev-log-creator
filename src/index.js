const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { getFormattedDate } = require('./dateUtils');
const { createLogFileWithContent } = require('./fileCreator');
const SettingsManager = require('./settingsManager');

const settings = new SettingsManager();

console.log('🚀 Créateur de Dev Log Interactif');
console.log('==================================');
console.log(`📅 Date du jour : ${getFormattedDate()}`);
console.log(`📁 Dossier de destination : ${settings.getDevLogPath()}`);
console.log('');

// Interface interactive
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Données collectées
const logData = {
    objectives: '',
    workDone: '',
    problems: '',
    solutions: '',
    tomorrow: ''
};

function askQuestion(question, key, callback) {
    rl.question(question, (answer) => {
        logData[key] = answer.trim() || '-';
        callback();
    });
}

function collectLogData() {
    console.log('📝 Remplissez les informations pour votre dev log :');
    console.log('   (Appuyez sur Entrée pour laisser vide)\n');

    askQuestion('🎯 Quels étaient vos objectifs pour aujourd\'hui ? ', 'objectives', () => {
        askQuestion('✅ Qu\'avez-vous accompli aujourd\'hui ? ', 'workDone', () => {
            askQuestion('❗ Quels problèmes avez-vous rencontrés ? ', 'problems', () => {
                askQuestion('💡 Quelles solutions avez-vous trouvées ? ', 'solutions', () => {
                    askQuestion('📋 Que prévoyez-vous de faire demain ? ', 'tomorrow', () => {
                        console.log('\n🎉 Merci ! Création du fichier en cours...\n');
                        createLogFileWithContent(logData);
                        rl.close();
                    });
                });
            });
        });
    });
}

function askUserAction() {
    rl.question('Voulez-vous créer un nouveau dev log pour aujourd\'hui ? (o/n) : ', (answer) => {
        if (answer.toLowerCase() === 'o' || answer.toLowerCase() === 'oui' || answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
            console.log('');
            collectLogData();
        } else {
            console.log('👋 À bientôt !');
            rl.close();
        }
    });
}

// Initialize the application
function init() {
    askUserAction();
}

// Run the initialization function
init();