# 📁 Guide du Sélecteur de Dossier

## 🎯 Nouvelle fonctionnalité ajoutée !

Votre application Dev Log Creator dispose maintenant d'un **sélecteur de dossier personnalisé** qui vous permet de choisir exactement où stocker vos dev logs.

## 🔧 Comment ça fonctionne

### 1. **Interface mise à jour**
- Une nouvelle barre de paramètres apparaît sous le titre
- Elle affiche le dossier actuellement sélectionné
- Un bouton "Changer le dossier" permet de modifier la destination

### 2. **Premier lancement**
- **Dossier par défaut** : `C:\Users\[VotreNom]\Documents\dev-log`
- L'application crée automatiquement ce dossier s'il n'existe pas

### 3. **Changement de dossier**
- Cliquez sur "Changer le dossier"
- Une boîte de dialogue s'ouvre pour sélectionner un nouveau dossier
- Le chemin est immédiatement mis à jour dans l'interface
- Vos préférences sont automatiquement sauvegardées

### 4. **Structure créée**
```
[Votre dossier choisi]/
└── dev-log/           ← Sous-dossier créé automatiquement
    └── 2025/          ← Année courante
        └── 07/        ← Mois courant
            └── 2025-07-28.md ← Votre dev log
```

## ⚡ Avantages

✅ **Flexibilité totale** - Stockez vos logs où vous voulez  
✅ **Sauvegarde automatique** - Vos préférences sont mémorisées  
✅ **Compatible réseau** - Peut pointer vers un dossier partagé  
✅ **Rétrocompatible** - Fonctionne avec vos anciens dev logs  
✅ **Interface claire** - Vous voyez toujours où vont vos fichiers  

## 🔄 Migration des anciens dev logs

Si vous aviez déjà des dev logs dans l'ancien emplacement, vous pouvez :

1. **Les déplacer manuellement** vers votre nouveau dossier
2. **Ou garder les deux emplacements** - l'application s'adapte

## 💾 Fichier de configuration

Vos préférences sont sauvegardées dans :
`C:\Users\[VotreNom]\.dev-log-creator-settings.json`

Contenu exemple :
```json
{
  "devLogPath": "C:\\Users\\Dylan\\OneDrive\\Documents\\MesProjets",
  "language": "fr"
}
```

---

🎉 **Profitez de cette nouvelle flexibilité pour organiser vos dev logs comme vous le souhaitez !**
