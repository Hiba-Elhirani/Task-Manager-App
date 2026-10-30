# Task Manager App

Application web de **gestion des tâches** développée avec React. Elle permet d'ajouter, modifier et supprimer des tâches, et affiche un graphique du nombre de tâches par statut.

## Fonctionnalités

- Ajouter une tâche avec : titre, date de début, date de fin, ressource et statut
- Modifier une tâche existante (les données reviennent dans le formulaire)
- Supprimer une tâche
- Trois statuts : **A Faire**, **En Cours**, **Termine**
- Tâches terminées barrées dans le tableau
- Saisir un mot dans la barre de recherche pour afficher uniquement les tâches correspondantes
- Graphique en barres (Recharts) mis à jour automatiquement
- Interface sombre

## Technologies

| Technologie | Usage |
|---|---|
| React | Interface et gestion de l'état (`useState`) |
| Vite | Outil de build et serveur de développement |
| Recharts | Graphique des tâches par statut |
| CSS | Mise en page et style |

## Installation

1. Cloner le projet :
```bash
git clone https://github.com/Hiba-Elhirani/Task-Manager-App.git
cd Task-Manager-App
```

2. Installer les dépendances :
```bash
npm install
```

3. Lancer le serveur de développement :
```bash
npm run dev
```

4. Ouvrir l'adresse affichée dans le terminal (par défaut `http://localhost:5173`).

## Structure du projet

```
Task-Manager-App/
├── src/
│   ├── GestionTache.jsx     # Composant principal (formulaire, tableau, graphique)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css       # Styles
├── index.html
├── package.json
└── README.md
```

## Utilisation

1. Remplir le formulaire en haut de la page.
2. Cliquer sur **Ajouter** : la tâche apparaît dans le tableau.
3. Cliquer sur **Modifier** pour reprendre les données d'une tâche, les changer, puis valider.
4. Cliquer sur **Supprimer** pour retirer une tâche.
5. Saisir un mot dans la barre de recherche pour afficher uniquement les tâches correspondantes.
6. Consulter le nombre total de tâches et le nombre de tâches en retard (leur statut s'affiche en rouge).
7. Le graphique à droite se met à jour à chaque changement.

## Auteur

Projet réalisé par **Hiba Elhirani** dans le cadre de la formation OFPPT.
