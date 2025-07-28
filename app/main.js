const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

// Importer nos modules existants
const { getFormattedDate, getYearMonth } = require('../src/dateUtils');
const SettingsManager = require('../src/settingsManager');

let mainWindow;
const settings = new SettingsManager();

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        icon: path.join(__dirname, 'assets', 'icon.png'),
        title: 'Dev Log Creator',
        resizable: true,
        minWidth: 800,
        minHeight: 600
    });

    mainWindow.loadFile(path.join(__dirname, 'renderer.html'));
    
    // Ouvrir les DevTools en mode développement
    if (process.argv.includes('--dev')) {
        mainWindow.webContents.openDevTools();
    }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// IPC Handlers
ipcMain.handle('get-current-date', () => {
    return getFormattedDate();
});

ipcMain.handle('get-dev-log-path', () => {
    return settings.getDevLogPath();
});

ipcMain.handle('select-dev-log-folder', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory'],
        title: 'Choisir le dossier pour stocker les dev logs',
        defaultPath: settings.getDevLogPath()
    });
    
    if (!result.canceled && result.filePaths.length > 0) {
        const selectedPath = result.filePaths[0];
        settings.setDevLogPath(selectedPath);
        return { success: true, path: selectedPath };
    }
    
    return { success: false };
});

ipcMain.handle('create-dev-log', async (event, logData) => {
    try {
        const date = new Date();
        const formattedDate = getFormattedDate(date);
        const { year, month } = getYearMonth(date);
        
        // Chemin vers le dossier dev-log configuré par l'utilisateur
        const baseDevLogDir = settings.getDevLogPath();
        const devLogDir = path.join(baseDevLogDir, 'dev-log');
        const yearDir = path.join(devLogDir, year);
        const monthDir = path.join(yearDir, month);
        
        // Créer la structure de dossiers
        if (!fs.existsSync(devLogDir)) {
            fs.mkdirSync(devLogDir, { recursive: true });
        }
        if (!fs.existsSync(yearDir)) {
            fs.mkdirSync(yearDir, { recursive: true });
        }
        if (!fs.existsSync(monthDir)) {
            fs.mkdirSync(monthDir, { recursive: true });
        }
        
        const fileName = `${formattedDate}.md`;
        const filePath = path.join(monthDir, fileName);
        
        // Vérifier si le fichier existe
        if (fs.existsSync(filePath)) {
            const result = await dialog.showMessageBox(mainWindow, {
                type: 'question',
                buttons: ['Écraser', 'Annuler'],
                defaultId: 1,
                title: 'Fichier existant',
                message: `Le fichier ${fileName} existe déjà.`,
                detail: 'Voulez-vous l\'écraser ?'
            });
            
            if (result.response === 1) {
                return { success: false, message: 'Opération annulée.' };
            }
        }
        
        // Template du dev log
        const template = `# Dev Log - ${formattedDate}

## Objectifs du jour
- ${logData.objectives || '-'}

## Travail effectué
- ${logData.workDone || '-'}

## Problèmes rencontrés
- ${logData.problems || '-'}

## Solutions trouvées
- ${logData.solutions || '-'}

## À faire demain
- ${logData.tomorrow || '-'}

## Notes
- 
`;
        
        fs.writeFileSync(filePath, template, 'utf8');
        
        // Ouvrir le fichier dans VS Code
        const { exec } = require('child_process');
        exec(`code "${filePath}"`, (error) => {
            // Ignorer les erreurs si VS Code n'est pas installé
        });
        
        return { 
            success: true, 
            message: 'Dev log créé avec succès !',
            filePath: filePath
        };
        
    } catch (error) {
        return { 
            success: false, 
            message: `Erreur : ${error.message}` 
        };
    }
});

ipcMain.handle('open-file-location', async (event, filePath) => {
    const { shell } = require('electron');
    shell.showItemInFolder(filePath);
});
