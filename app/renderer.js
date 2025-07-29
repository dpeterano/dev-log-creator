const { ipcRenderer } = require('electron');

// Éléments du DOM
const form = document.getElementById('devLogForm');
const clearBtn = document.getElementById('clearBtn');
const createBtn = document.getElementById('createBtn');
const notification = document.getElementById('notification');
const currentDateSpan = document.getElementById('currentDate');
const currentPathSpan = document.getElementById('currentPath');
const changeFolderBtn = document.getElementById('changeFolderBtn');

// Initialisation
document.addEventListener('DOMContentLoaded', async () => {
    // Afficher la date actuelle
    const currentDate = await ipcRenderer.invoke('get-current-date');
    currentDateSpan.textContent = currentDate;
    
    // Afficher le chemin actuel
    await updateCurrentPath();
    
    // Focus sur le premier champ
    document.getElementById('objectives').focus();
});

// Mettre à jour l'affichage du chemin
async function updateCurrentPath() {
    try {
        const devLogPath = await ipcRenderer.invoke('get-dev-log-path');
        currentPathSpan.textContent = devLogPath;
    } catch (error) {
        currentPathSpan.textContent = 'Erreur lors du chargement du chemin';
        console.error('Error loading path:', error);
    }
}

// Gestion du changement de dossier
changeFolderBtn.addEventListener('click', async () => {
    try {
        const result = await ipcRenderer.invoke('select-dev-log-folder');
        if (result.success) {
            await updateCurrentPath();
            showNotification('Dossier de destination mis à jour !', 'success');
        }
    } catch (error) {
        showNotification('Erreur lors de la sélection du dossier', 'error');
        console.error('Error selecting folder:', error);
    }
});

// Gestion du formulaire
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Collecter les données
    const formData = new FormData(form);
    const logData = {
        objectives: formData.get('objectives').trim(),
        workDone: formData.get('workDone').trim(),
        problems: formData.get('problems').trim(),
        solutions: formData.get('solutions').trim(),
        tomorrow: formData.get('tomorrow').trim()
    };
    
    // Désactiver le bouton pendant le traitement
    createBtn.disabled = true;
    createBtn.innerHTML = 'Création en cours...';
    
    try {
        const result = await ipcRenderer.invoke('create-dev-log', logData);
        
        if (result.success) {
            showNotification(result.message, 'success');
            
            // Afficher un bouton pour ouvrir le dossier
            setTimeout(() => {
                const openFolderBtn = document.createElement('button');
                openFolderBtn.textContent = 'Ouvrir le dossier';
                openFolderBtn.className = 'btn btn-secondary';
                openFolderBtn.onclick = () => {
                    ipcRenderer.invoke('open-file-location', result.filePath);
                };
                
                notification.appendChild(openFolderBtn);
            }, 1000);
            
            // Effacer le formulaire après succès
            setTimeout(() => {
                clearForm();
            }, 2000);
            
        } else {
            showNotification(result.message, 'error');
        }
    } catch (error) {
        showNotification(`Erreur : ${error.message}`, 'error');
    } finally {
        // Réactiver le bouton
        createBtn.disabled = false;
        createBtn.innerHTML = 'Créer le Dev Log';
    }
});

// Bouton effacer
clearBtn.addEventListener('click', () => {
    if (confirm('Êtes-vous sûr de vouloir effacer tous les champs ?')) {
        clearForm();
    }
});

// Fonctions utilitaires
function clearForm() {
    form.reset();
    document.getElementById('objectives').focus();
}

function showNotification(message, type = 'info') {
    notification.className = `notification ${type}`;
    notification.innerHTML = message;
    notification.classList.remove('hidden');
    
    // Masquer automatiquement après 5 secondes
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 5000);
}

// Raccourcis clavier
document.addEventListener('keydown', (e) => {
    // Ctrl+Enter pour soumettre
    if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        form.dispatchEvent(new Event('submit'));
    }
    
    // Ctrl+R pour effacer
    if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        clearBtn.click();
    }
});

// Auto-resize des textareas
document.querySelectorAll('textarea').forEach(textarea => {
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
});
