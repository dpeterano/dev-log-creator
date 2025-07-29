const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    
    mainWindow = new BrowserWindow({
        width: 900,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        icon: path.join(__dirname, 'app', 'assets', 'icon.png'),
        title: 'Dev Log Creator - Screenshot Mode',
        show: false
    });

    // Load French version first
    mainWindow.loadFile(path.join(__dirname, 'app', 'renderer.html'));
    
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        
        // Take screenshot after a delay
        setTimeout(async () => {
            const image = await mainWindow.capturePage();
            const fs = require('fs');
            const screenshotPath = path.join(__dirname, 'screenshots', 'french-interface.png');
            fs.writeFileSync(screenshotPath, image.toPNG());
            console.log(`French interface screenshot updated: ${screenshotPath}`);
            
            // Load English version
            mainWindow.loadFile(path.join(__dirname, 'app', 'renderer-en.html'));
            
            setTimeout(async () => {
                const imageEn = await mainWindow.capturePage();
                const screenshotPathEn = path.join(__dirname, 'screenshots', 'english-interface.png');
                fs.writeFileSync(screenshotPathEn, imageEn.toPNG());
                console.log(`English interface screenshot updated: ${screenshotPathEn}`);
                
                app.quit();
            }, 2000);
            
        }, 2000);
    });
}

app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', () => {
    app.quit();
});
