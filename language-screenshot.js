const { app, BrowserWindow } = require('electron');
const path = require('path');

let languageWindow;

function createLanguageWindow() {
    languageWindow = new BrowserWindow({
        width: 400,
        height: 300,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        icon: path.join(__dirname, 'app', 'assets', 'icon.png'),
        title: 'Language Selector Screenshot',
        show: false
    });

    languageWindow.loadFile(path.join(__dirname, 'app', 'language-selector.html'));
    
    languageWindow.once('ready-to-show', () => {
        languageWindow.show();
        
        setTimeout(async () => {
            const image = await languageWindow.capturePage();
            const fs = require('fs');
            const screenshotPath = path.join(__dirname, 'screenshots', 'language-selector.png');
            fs.writeFileSync(screenshotPath, image.toPNG());
            console.log(`✅ Language selector screenshot saved to: ${screenshotPath}`);
            app.quit();
        }, 1500);
    });
}

app.whenReady().then(() => {
    createLanguageWindow();
});

app.on('window-all-closed', () => {
    app.quit();
});
