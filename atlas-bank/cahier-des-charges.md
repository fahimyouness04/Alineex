# Cahier des charges — Atlas Bank

## 1. Contexte

Atlas Bank est une banque en ligne fictive, développée comme projet de fin
de cycle (2ème année Développement / WFS, OFPPT). Le projet couvre
l'ensemble des compétences étudiées cette année : React, Node.js/Express,
MySQL, Git/GitHub, Scrum/Jira, UML et déploiement.

## 2. Objectifs

- Permettre à un client de gérer ses comptes bancaires en ligne.
- Permettre les virements, dépôts et retraits en toute sécurité.
- Fournir à un administrateur une vue d'ensemble des clients et comptes.
- Livrer une application complète, testable en ligne et présentable
  devant un jury.

## 3. Périmètre fonctionnel

### 3.1 Client

1. S'inscrire (nom, prénom, email, téléphone, mot de passe).
2. Se connecter (email + mot de passe, jeton JWT).
3. Consulter ses comptes (courant, épargne) et leurs soldes.
4. Créer un nouveau compte (courant ou épargne).
5. Effectuer un dépôt sur un compte.
6. Effectuer un retrait (solde insuffisant refusé).
7. Effectuer un virement vers un autre compte (par numéro de compte).
8. Consulter l'historique des transactions d'un compte.

### 3.2 Administrateur

9. Consulter la liste des clients et de leurs comptes.
10. Consulter toutes les transactions.

### 3.3 Règles de gestion

- Un virement est refusé si le solde est insuffisant (erreur 409).
- Un virement vers un compte inexistant est refusé (erreur 404).
- Un retrait est refusé si le solde est insuffisant (erreur 409).
- Le solde d'un compte ne peut jamais être négatif.
- Chaque transaction enregistre le solde après l'opération.
- Les montants sont en dirhams (MAD), avec 2 décimales.

## 4. Stack technique

| Couche | Technologie |
| --- | --- |
| Frontend | React 18 (useState, useEffect, props, map, fetch) |
| Backend | Node.js + Express 4 (architecture MVC) |
| Authentification | JWT + bcrypt |
| Base de données | MySQL (mysql2) |
| Versionnage | Git / GitHub (branches, commits, merges) |
| Gestion de projet | Jira (Epic, Story, Task, Sub-task, Bug) + Scrum (3 sprints) |
| Déploiement | Vercel (frontend) |
| Documentation | UML (use case, classes), ce cahier des charges |

## 5. Architecture

```
frontend (React, port 3000)
    │  fetch /api/...
    ▼
backend (Express, port 3001)
    │  MVC : routes → controllers → models
    ▼
MySQL (atlas_bank)
```

API REST (base `/api`) :

| Méthode | Route | Description |
| --- | --- | --- |
| POST | /auth/inscription | Créer un client, retourne {jeton, utilisateur} |
| POST | /auth/connexion | Connexion, retourne {jeton, utilisateur} |
| GET | /comptes | Comptes du client connecté |
| POST | /comptes | Créer un compte (courant ou épargne) |
| GET | /comptes/:id | Détail d'un compte |
| GET | /comptes/:id/transactions | Historique d'un compte |
| POST | /transactions/depot | Déposer de l'argent |
| POST | /transactions/retrait | Retirer de l'argent |
| POST | /transactions/virement | Virer vers un autre compte |
| GET | /admin/clients | (Admin) liste des clients |
| GET | /admin/comptes | (Admin) liste des comptes |

Codes d'erreur : 400 DONNEES_INVALIDES, 401 NON_AUTHENTIFIE,
404 COMPTE_INTROUVABLE, 409 SOLDE_INSUFFISANT.

## 6. Modèle de données (MySQL)

**clients** : id, nom, prenom, email (unique), mot_de_passe (hash bcrypt),
telephone, is_admin (0/1), date_creation.

**comptes** : id, client_id (FK), numero_compte (unique, ex. AB1001),
type (courant / epargne), solde DECIMAL(12,2), devise (MAD),
statut (actif), date_creation.

**transactions** : id, compte_id (FK), type (depot / retrait /
virement_envoye / virement_recu), montant DECIMAL(12,2), description,
compte_destinataire_id (FK, nullable), solde_apres DECIMAL(12,2),
date_transaction.

## 7. Organisation Scrum / Jira

- **Epic** : Plateforme bancaire en ligne Atlas Bank.
- **Sprint 1** : Authentification + comptes (inscription, connexion,
  création et consultation des comptes).
- **Sprint 2** : Transactions (dépôt, retrait, virement, historique).
- **Sprint 3** : Administration + déploiement + présentation.
- Le détail (Stories, Tasks, Sub-tasks, Bugs) est dans `jira/backlog.md`.

## 8. Critères d'acceptation

- [ ] Inscription et connexion fonctionnent, mot de passe hashé, jeton JWT.
- [ ] Un client voit uniquement ses propres comptes.
- [ ] Virement entre deux comptes : les deux soldes sont mis à jour,
      les deux transactions sont enregistrées.
- [ ] Solde insuffisant → erreur 409, aucun solde modifié.
- [ ] Historique complet et ordonné par date.
- [ ] L'application démarre avec `npm install` puis `npm start`
      (frontend et backend) et la base avec `schema.sql` + `seed.js`.
- [ ] Projet déployé et testable en ligne (Vercel).
- [ ] Code simple et lisible, comme écrit par un humain.

## 9. Livrables

- Code source complet (frontend + backend + base de données).
- Ce cahier des charges.
- Backlog Jira et plan des sprints (`jira/backlog.md`).
- Diagrammes UML (use case, classes) dans `uml/`.
- Présentation du projet (`presentation/`).
