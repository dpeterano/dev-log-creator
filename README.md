# Dev Log Creator

> Modern desktop application to create daily dev logs with an intuitive graphical interface.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Electron](https://img.shields.io/badge/Electron-25.0.0-47848f.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## Screenshots

### Main Interface (French)
![French Interface](screenshots/french-interface.png)

### Main Interface (English)
![English Interface](screenshots/english-interface.png)

### Language Selector
![Language Selector](screenshots/language-selector.png)

## Features

- **Modern interface** with gradient design
- **Bilingual support** (French/English)
- **Custom folder selector**
- **5 structured fields** for your day
- **Automatic folder structure** creation
- **Settings persistence**
- **Automatic VS Code integration**
- **Keyboard shortcuts** (Ctrl+Enter, Ctrl+R)

## Quick Start

```bash
# Clone the project
git clone https://github.com/dpeterano/dev-log-creator.git
cd dev-log-creator

# Install dependencies
npm install

# Launch the application
npm start                # French version
npm run start-en         # English version
npm run select-language  # Language selector
```

## Usage

### GUI Application
```bash
npm start        # French interface
npm run start-en # English interface
```

### Pre-built Executables
```bash
# Windows - French version
.\Lancer-Version-Francaise.bat

# Windows - English version  
.\Launch-English-Version.bat
```

### Console Mode (Legacy)
```bash
npm run console  # Command line interface
```

## Generated Structure

```
[Your Folder]/
└── dev-log/
    └── 2025/
        └── 07/
            └── 2025-07-28.md
```

## Generated Template

```markdown
# Dev Log - 2025-07-28

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

## Development

```bash
# Development mode (with DevTools)
npm run dev     # French
npm run dev-en  # English

# Build executables
npm run pack    # French version
npm run pack-en # English version
```

## Keyboard Shortcuts

- **Ctrl + Enter**: Create dev log
- **Ctrl + R**: Clear all fields

## Language Support

- **Français** (French): Default version
- **English**: Full feature parity

## License

MIT - See [LICENSE](LICENSE) for details.

---

**Found this helpful?** Give it a star on GitHub!
