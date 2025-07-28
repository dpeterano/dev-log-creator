const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

let languageWindow;

function createLanguageSelector() {
    languageWindow = new BrowserWindow({
        width: 400,
        height: 300,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        icon: path.join(__dirname, 'assets', 'icon.png'),
        title: 'Dev Log Creator - Language Selection',
        resizable: false,
        center: true,
        show: false
    });

    languageWindow.loadFile(path.join(__dirname, 'language-selector.html'));
    
    languageWindow.once('ready-to-show', () => {
        languageWindow.show();
    });

    languageWindow.on('closed', () => {
        app.quit();
    });
}

app.whenReady().then(createLanguageSelector);

app.on('window-all-closed', () => {
    app.quit();
});

// IPC Handlers
ipcMain.handle('select-language', async (event, language) => {
    languageWindow.close();
    
    // Launch the appropriate version
    const { spawn } = require('child_process');
    const mainFile = language === 'en' ? 'main-en.js' : 'main.js';
    
    spawn(process.execPath, [path.join(__dirname, mainFile)], {
        detached: true,
        stdio: 'ignore'
    }).unref();
    
    app.quit();
});
