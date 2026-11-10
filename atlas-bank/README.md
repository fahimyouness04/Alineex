# Atlas Bank — Banque en ligne

Projet de fin de cycle (2ème année Développement / WFS, OFPPT) :
une banque en ligne complète, full stack, professionnelle et présentable.

## Contenu

- `cahier-des-charges.md` — contexte, fonctionnalités, stack,
  modèle de données, organisation Scrum, critères d'acceptation.
- `backend/` — API Express + MySQL + JWT (MVC).
- `frontend/` — interface React.
- `jira/backlog.md` — Epic, Stories, Tasks, Sub-tasks, Bugs, 3 sprints.
- `uml/` — diagrammes use case et classes.
- `presentation/` — présentation du projet + notes + questions/réponses.

## Démarrage rapide

```bash
# Base de données
mysql -u root -p < backend/schema.sql
cd backend && npm install && npm run seed && npm start

# Frontend (dans un autre terminal)
cd frontend && npm install && npm start
```

Ouvrir http://localhost:3000 — démo : demo@atlasbank.ma / demo123
