# 🚀 Dev Log Creator - Application Desktop

Une application desktop moderne pour créer automatiquement vos dev logs quotidiens avec une interface graphique intuitive.

## ✨ Fonctionnalités

- **Interface graphique moderne** avec design gradient
- **5 champs de saisie** pour structurer votre journée
- **Sélecteur de dossier personnalisé** - Choisissez où stocker vos dev logs
- **Création automatique** de la structure de dossiers (dossier-choisi/dev-log/YYYY/MM/)
- **Template pré-rempli** avec vos réponses
- **Gestion des doublons** avec confirmation
- **Ouverture automatique** dans VS Code
- **Raccourcis clavier** (Ctrl+Enter pour valider, Ctrl+R pour effacer)
- **Notifications visuelles** de succès/erreur
- **Sauvegarde des préférences** - Vos paramètres sont mémorisés

## 🎯 Les 5 champs de l'interface

1. **🎯 Objectifs du jour** - Vos objectifs de la journée
2. **✅ Travail effectué** - Ce que vous avez accompli
3. **❗ Problèmes rencontrés** - Les difficultés rencontrées
4. **💡 Solutions trouvées** - Comment vous avez résolu les problèmes
5. **📋 À faire demain** - Vos plans pour le lendemain

## 🚀 Installation et utilisation

### Option 1: Utiliser l'application (Mode GUI)

```bash
# Installer les dépendances
npm install

# Sélecteur de langue (Français/English)
npm run select-language

# Lancer l'application graphique (Français)
npm start

# Lancer la version anglaise
npm run start-en
```

### Option 2: Mode console (ancien)

```bash
# Utiliser l'interface en ligne de commande
npm run console
```

## 📦 Générer un fichier .exe

Pour créer un fichier exécutable Windows :

```bash
# Générer la version française (portable)
npm run pack

# Générer la version anglaise (portable) 
npm run pack-en

# Générer les deux versions
npm run pack && npm run pack-en
```

### 🚀 Raccourcis de lancement rapide

- **`Lancer-Version-Francaise.bat`** - Lance la version française
- **`Launch-English-Version.bat`** - Lance la version anglaise

Les exécutables se trouvent dans le dossier `build/` :

## 🌍 Support multilingue

- **Français** (par défaut): `npm start`
- **English**: `npm run start-en`
- **Sélecteur de langue**: `npm run select-language`

L'exécutable sera créé dans le dossier `dist/` :
- `dist/Dev Log Creator Setup 1.0.0.exe` - Installateur
- `dist/win-unpacked/` - Version portable

## 🎨 Interface

L'application présente une interface moderne avec :
- **Design gradient** bleu/violet
- **Champs auto-redimensionnables**
- **Animations fluides**
- **Notifications en temps réel**
- **Boutons avec effets hover**

## 📁 Structure générée

L'application crée maintenant la structure suivante dans le dossier de votre choix :

```
[Dossier sélectionné]/
└── dev-log/
    └── 2025/
        └── 07/
            └── 2025-07-28.md
```

### 🔧 Configuration personnalisée

- **Première utilisation** : Le dossier par défaut est `Documents/dev-log`
- **Changement de dossier** : Cliquez sur "Changer le dossier" dans l'interface
- **Sauvegarde automatique** : Vos préférences sont sauvegardées dans `~/.dev-log-creator-settings.json`

Contenu du fichier généré :
```markdown
# Dev Log - 2025-07-28

## Objectifs du jour
- [Vos objectifs]

## Travail effectué
- [Votre travail]

## Problèmes rencontrés
- [Vos problèmes]

## Solutions trouvées
- [Vos solutions]

## À faire demain
- [Vos plans]

## Notes
- 
```

## 🎮 Raccourcis clavier

- **Ctrl + Enter** : Créer le dev log
- **Ctrl + R** : Effacer tous les champs
- **Tab** : Navigation entre les champs

---

*Créé avec ❤️ par Dylan*