# Atlas Bank — API (backend)

API REST de la banque en ligne Atlas Bank : Express + MySQL + JWT.

## Lancer le projet

```bash
npm install
cp .env.exemple .env
# Créer la base de données :
mysql -u root -p < schema.sql
# Données de démonstration :
npm run seed
# Démarrer l'API :
npm start
```

L'API tourne sur http://localhost:3001

Comptes de démonstration :
- Admin : admin@atlasbank.ma / admin123
- Démo : demo@atlasbank.ma / demo123

## Routes

| Méthode | Route | Description |
| --- | --- | --- |
| POST | /api/auth/inscription | Créer un client |
| POST | /api/auth/connexion | Connexion (retourne {jeton, utilisateur}) |
| GET | /api/comptes | Comptes du client connecté |
| POST | /api/comptes | Créer un compte (courant ou epargne) |
| GET | /api/comptes/:id | Détail d'un compte |
| GET | /api/comptes/:id/transactions | Historique d'un compte |
| POST | /api/transactions/depot | Déposer de l'argent |
| POST | /api/transactions/retrait | Retirer de l'argent |
| POST | /api/transactions/virement | Virer vers un autre compte |
| GET | /api/admin/clients | (Admin) liste des clients |
| GET | /api/admin/comptes | (Admin) liste des comptes |

Codes d'erreur : 400 DONNEES_INVALIDES, 401 NON_AUTHENTIFIE,
403 ACCES_REFUSE, 404 COMPTE_INTROUVABLE, 409 SOLDE_INSUFFISANT,
409 EMAIL_DEJA_UTILISE.
