# 🚀 Dev Log Creator - Desktop Application

A modern desktop application to automatically create your daily dev logs with an intuitive graphical interface.

## ✨ Features

- **Modern graphical interface** with gradient design
- **5 input fields** to structure your day
- **Custom folder selector** - Choose where to store your dev logs
- **Automatic creation** of folder structure (selected-folder/dev-log/YYYY/MM/)
- **Pre-filled template** with your answers
- **Duplicate handling** with confirmation
- **Automatic opening** in VS Code
- **Keyboard shortcuts** (Ctrl+Enter to submit, Ctrl+R to clear)
- **Visual notifications** for success/error
- **Settings persistence** - Your preferences are remembered

## 🎯 The 5 interface fields

1. **🎯 Today's Objectives** - Your goals for the day
2. **✅ Work Completed** - What you accomplished
3. **❗ Problems Encountered** - Difficulties you faced
4. **💡 Solutions Found** - How you solved the problems
5. **📋 Tomorrow's Tasks** - Your plans for tomorrow

## 🚀 Installation and Usage

### Option 1: Use the application (GUI Mode)

```bash
# Install dependencies
npm install

# Launch the graphical application (French)
npm start

# Launch the English version
npm run start-en
```

### Option 2: Console mode (legacy)

```bash
# Use the command line interface
npm run console
```

## 📦 Generate a .exe file

To create a Windows executable:

```bash
# Install electron-builder globally (optional)
npm install -g electron-builder

# Build for Windows
npm run build-win

# Build English version for Windows
npm run build-win-en
```

## 🌍 Language Support

- **French** (default): `npm start`
- **English**: `npm run start-en`

## 🛠️ Development

```bash
# Development mode with DevTools (French)
npm run dev

# Development mode with DevTools (English)
npm run dev-en
```

## 📁 Generated Structure

The application now creates the following structure in your chosen folder:

```
[Selected Folder]/
└── dev-log/
    ├── 2025/
    │   ├── 01/
    │   │   ├── 2025-01-15.md
    │   │   └── 2025-01-16.md
    │   └── 02/
    │       └── 2025-02-01.md
```

### 🔧 Custom Configuration

- **First use**: Default folder is `Documents/dev-log`
- **Change folder**: Click "Change Folder" in the interface
- **Auto-save**: Your preferences are saved in `~/.dev-log-creator-settings.json`

## 🚀 Quick Start

1. Clone the repository
2. Run `npm install`
3. Run `npm start` (French) or `npm run start-en` (English)
4. Fill in your daily log and click "Create Dev Log"
5. The file opens automatically in VS Code

## 📝 Dev Log Template

Each generated file contains:

```markdown
# Dev Log - YYYY-MM-DD

## Today's Objectives
- Your objectives here

## Work Completed
- What you accomplished

## Problems Encountered
- Issues you faced

## Solutions Found
- How you solved them

## Tomorrow's Tasks
- Your plans for tomorrow

## Notes
- Additional notes
```

## ⌨️ Keyboard Shortcuts

- **Ctrl+Enter**: Create dev log
- **Ctrl+R**: Clear all fields

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Dylan**

---

⭐ If this project helped you, please give it a star on GitHub!
