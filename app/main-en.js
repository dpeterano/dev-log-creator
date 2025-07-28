const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

// Import our existing modules
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

    mainWindow.loadFile(path.join(__dirname, 'renderer-en.html'));
    
    // Open DevTools in development mode
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
        title: 'Choose folder to store dev logs',
        defaultPath: settings.getDevLogPath()
    });
    
    if (!result.canceled && result.filePaths.length > 0) {
        const selectedPath = result.filePaths[0];
        settings.setDevLogPath(selectedPath);
        return { success: true, path: selectedPath };
    }
    
    return { success: false };
});

ipcMain.handle('create-dev-log-en', async (event, logData) => {
    try {
        const date = new Date();
        const formattedDate = getFormattedDate(date);
        const { year, month } = getYearMonth(date);
        
        // Path to user-configured dev-log folder
        const baseDevLogDir = settings.getDevLogPath();
        const devLogDir = path.join(baseDevLogDir, 'dev-log');
        const yearDir = path.join(devLogDir, year);
        const monthDir = path.join(yearDir, month);
        
        // Create folder structure
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
        
        // Check if file exists
        if (fs.existsSync(filePath)) {
            const result = await dialog.showMessageBox(mainWindow, {
                type: 'question',
                buttons: ['Overwrite', 'Cancel'],
                defaultId: 1,
                title: 'File exists',
                message: `The file ${fileName} already exists.`,
                detail: 'Do you want to overwrite it?'
            });
            
            if (result.response === 1) {
                return { success: false, message: 'Operation cancelled.' };
            }
        }
        
        // Dev log template
        const template = `# Dev Log - ${formattedDate}

## Today's Objectives
- ${logData.objectives || '-'}

## Work Completed
- ${logData.workDone || '-'}

## Problems Encountered
- ${logData.problems || '-'}

## Solutions Found
- ${logData.solutions || '-'}

## Tomorrow's Tasks
- ${logData.tomorrow || '-'}

## Notes
- 
`;
        
        fs.writeFileSync(filePath, template, 'utf8');
        
        // Open file in VS Code
        const { exec } = require('child_process');
        exec(`code "${filePath}"`, (error) => {
            // Ignore errors if VS Code is not installed
        });
        
        return { 
            success: true, 
            message: 'Dev log created successfully!',
            filePath: filePath
        };
        
    } catch (error) {
        return { 
            success: false, 
            message: `Error: ${error.message}` 
        };
    }
});

ipcMain.handle('open-file-location', async (event, filePath) => {
    const { shell } = require('electron');
    shell.showItemInFolder(filePath);
});
