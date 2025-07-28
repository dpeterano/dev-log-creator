const fs = require('fs');
const path = require('path');
const os = require('os');

class SettingsManager {
    constructor() {
        this.settingsPath = path.join(os.homedir(), '.dev-log-creator-settings.json');
        this.defaultSettings = {
            devLogPath: path.join(os.homedir(), 'Documents', 'dev-log'),
            language: 'fr'
        };
        this.settings = this.loadSettings();
    }

    loadSettings() {
        try {
            if (fs.existsSync(this.settingsPath)) {
                const data = fs.readFileSync(this.settingsPath, 'utf8');
                return { ...this.defaultSettings, ...JSON.parse(data) };
            }
        } catch (error) {
            console.error('Error loading settings:', error);
        }
        return { ...this.defaultSettings };
    }

    saveSettings() {
        try {
            fs.writeFileSync(this.settingsPath, JSON.stringify(this.settings, null, 2), 'utf8');
            return true;
        } catch (error) {
            console.error('Error saving settings:', error);
            return false;
        }
    }

    getDevLogPath() {
        return this.settings.devLogPath;
    }

    setDevLogPath(newPath) {
        this.settings.devLogPath = newPath;
        return this.saveSettings();
    }

    getLanguage() {
        return this.settings.language;
    }

    setLanguage(language) {
        this.settings.language = language;
        return this.saveSettings();
    }

    getAllSettings() {
        return { ...this.settings };
    }

    resetSettings() {
        this.settings = { ...this.defaultSettings };
        return this.saveSettings();
    }
}

module.exports = SettingsManager;
