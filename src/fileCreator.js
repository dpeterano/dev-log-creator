const fs = require('fs');
const path = require('path');
const { getFormattedDate, getYearMonth } = require('./dateUtils');

// Template pour le dev log
const DEV_LOG_TEMPLATE = `# Dev Log - {date}

## Objectifs du jour
- {objectives}

## Travail effectué
- {workDone}

## Problèmes rencontrés
- {problems}

## Solutions trouvées
- {solutions}

## À faire demain
- {tomorrow}

## Notes
- 
`;

function createLogFile(date = new Date()) {
    const formattedDate = getFormattedDate(date);
    const { year, month } = getYearMonth(date);
    
    // Chemin vers le dossier dev-log (un niveau au-dessus de dev-log-creator)
    const devLogDir = path.join(__dirname, '..', '..', 'dev-log');
    const yearDir = path.join(devLogDir, year);
    const monthDir = path.join(yearDir, month);
    
    // Créer la structure de dossiers si elle n'existe pas
    if (!fs.existsSync(devLogDir)) {
        fs.mkdirSync(devLogDir, { recursive: true });
        console.log(`📁 Dossier créé : ${devLogDir}`);
    }
    if (!fs.existsSync(yearDir)) {
        fs.mkdirSync(yearDir, { recursive: true });
        console.log(`📁 Dossier créé : ${yearDir}`);
    }
    if (!fs.existsSync(monthDir)) {
        fs.mkdirSync(monthDir, { recursive: true });
        console.log(`📁 Dossier créé : ${monthDir}`);
    }
    
    // Créer le fichier dev log
    const fileName = `${formattedDate}.md`;
    const filePath = path.join(monthDir, fileName);
    
    if (fs.existsSync(filePath)) {
        console.log(`❌ Le fichier ${fileName} existe déjà dans ${monthDir}`);
        console.log(`💡 Chemin : ${filePath}`);
        return;
    }
    
    const content = DEV_LOG_TEMPLATE.replace('{date}', formattedDate);
    
    try {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Fichier dev log créé avec succès !`);
        console.log(`📄 ${filePath}`);
        
        // Essayer d'ouvrir le fichier dans VS Code
        const { exec } = require('child_process');
        exec(`code "${filePath}"`, (error) => {
            if (error) {
                console.log(`💡 Pour ouvrir le fichier : code "${filePath}"`);
            } else {
                console.log(`🚀 Fichier ouvert dans VS Code`);
            }
        });
    } catch (error) {
        console.error('❌ Erreur lors de la création du fichier :', error.message);
    }
}

function createLogFileWithContent(logData, date = new Date()) {
    const formattedDate = getFormattedDate(date);
    const { year, month } = getYearMonth(date);
    
    // Chemin vers le dossier dev-log (un niveau au-dessus de dev-log-creator)
    const devLogDir = path.join(__dirname, '..', '..', 'dev-log');
    const yearDir = path.join(devLogDir, year);
    const monthDir = path.join(yearDir, month);
    
    // Créer la structure de dossiers si elle n'existe pas
    if (!fs.existsSync(devLogDir)) {
        fs.mkdirSync(devLogDir, { recursive: true });
        console.log(`📁 Dossier créé : ${devLogDir}`);
    }
    if (!fs.existsSync(yearDir)) {
        fs.mkdirSync(yearDir, { recursive: true });
        console.log(`📁 Dossier créé : ${yearDir}`);
    }
    if (!fs.existsSync(monthDir)) {
        fs.mkdirSync(monthDir, { recursive: true });
        console.log(`📁 Dossier créé : ${monthDir}`);
    }
    
    // Créer le fichier dev log
    const fileName = `${formattedDate}.md`;
    const filePath = path.join(monthDir, fileName);
    
    if (fs.existsSync(filePath)) {
        console.log(`❌ Le fichier ${fileName} existe déjà dans ${monthDir}`);
        console.log(`💡 Chemin : ${filePath}`);
        
        // Demander si on veut l'écraser
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        rl.question('Voulez-vous écraser le fichier existant ? (o/n) : ', (answer) => {
            if (answer.toLowerCase() === 'o' || answer.toLowerCase() === 'oui') {
                writeLogFile(filePath, formattedDate, logData);
            } else {
                console.log('📝 Fichier non modifié.');
            }
            rl.close();
        });
        return;
    }
    
    writeLogFile(filePath, formattedDate, logData);
}

function writeLogFile(filePath, formattedDate, logData) {
    let content = DEV_LOG_TEMPLATE
        .replace('{date}', formattedDate)
        .replace('{objectives}', logData.objectives)
        .replace('{workDone}', logData.workDone)
        .replace('{problems}', logData.problems)
        .replace('{solutions}', logData.solutions)
        .replace('{tomorrow}', logData.tomorrow);
    
    try {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Fichier dev log créé avec succès !`);
        console.log(`📄 ${filePath}`);
        
        // Afficher un résumé
        console.log('\n📋 Résumé de votre dev log :');
        console.log(`🎯 Objectifs : ${logData.objectives}`);
        console.log(`✅ Travail effectué : ${logData.workDone}`);
        console.log(`❗ Problèmes : ${logData.problems}`);
        console.log(`💡 Solutions : ${logData.solutions}`);
        console.log(`📋 Demain : ${logData.tomorrow}`);
        
        // Essayer d'ouvrir le fichier dans VS Code
        const { exec } = require('child_process');
        exec(`code "${filePath}"`, (error) => {
            if (error) {
                console.log(`\n💡 Pour ouvrir le fichier : code "${filePath}"`);
            } else {
                console.log(`\n🚀 Fichier ouvert dans VS Code`);
            }
        });
    } catch (error) {
        console.error('❌ Erreur lors de la création du fichier :', error.message);
    }
}

module.exports = { createLogFile, createLogFileWithContent };