const { ipcRenderer } = require('electron');

// DOM elements
const form = document.getElementById('devLogForm');
const submitBtn = document.getElementById('submitBtn');
const clearBtn = document.getElementById('clearBtn');
const notification = document.getElementById('notification');
const currentDateSpan = document.getElementById('currentDate');
const currentPathSpan = document.getElementById('currentPath');
const changeFolderBtn = document.getElementById('changeFolderBtn');

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    // Display current date
    const currentDate = await ipcRenderer.invoke('get-current-date');
    currentDateSpan.textContent = currentDate;
    
    // Display current path
    await updateCurrentPath();
    
    // Focus on first field
    document.getElementById('objectives').focus();
});

// Update path display
async function updateCurrentPath() {
    try {
        const devLogPath = await ipcRenderer.invoke('get-dev-log-path');
        currentPathSpan.textContent = devLogPath;
    } catch (error) {
        currentPathSpan.textContent = 'Error loading path';
        console.error('Error loading path:', error);
    }
}

// Handle folder change
changeFolderBtn.addEventListener('click', async () => {
    try {
        const result = await ipcRenderer.invoke('select-dev-log-folder');
        if (result.success) {
            await updateCurrentPath();
            showNotification('Destination folder updated!', 'success');
        }
    } catch (error) {
        showNotification('Error selecting folder', 'error');
        console.error('Error selecting folder:', error);
    }
});

// Form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '⏳ Creating...';
    
    // Collect form data
    const formData = new FormData(form);
    const logData = {
        objectives: formData.get('objectives'),
        workDone: formData.get('workDone'),
        problems: formData.get('problems'),
        solutions: formData.get('solutions'),
        tomorrow: formData.get('tomorrow')
    };
    
    try {
        const result = await ipcRenderer.invoke('create-dev-log-en', logData);
        
        if (result.success) {
            showNotification(result.message, 'success');
            
            // Show button to open folder
            setTimeout(() => {
                const openFolderBtn = document.createElement('button');
                openFolderBtn.textContent = '📁 Open Folder';
                openFolderBtn.className = 'btn btn-secondary';
                openFolderBtn.onclick = () => {
                    ipcRenderer.invoke('open-file-location', result.filePath);
                };
                
                notification.appendChild(openFolderBtn);
            }, 1000);
            
            // Clear form after success
            setTimeout(() => {
                form.reset();
                document.getElementById('objectives').focus();
            }, 2000);
            
        } else {
            showNotification(result.message, 'error');
        }
    } catch (error) {
        showNotification(`Error: ${error.message}`, 'error');
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = '✨ Create Dev Log';
    }
});

// Clear form
clearBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all fields?')) {
        form.reset();
        document.getElementById('objectives').focus();
        showNotification('Form cleared!', 'info');
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl+Enter to submit
    if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        form.dispatchEvent(new Event('submit'));
    }
    
    // Ctrl+R to clear (prevent default browser refresh)
    if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        clearBtn.click();
    }
});

// Notification system
function showNotification(message, type = 'info') {
    notification.className = `notification ${type}`;
    notification.innerHTML = message;
    notification.classList.remove('hidden');
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 5000);
}

// Auto-resize textareas
document.querySelectorAll('textarea').forEach(textarea => {
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
});
