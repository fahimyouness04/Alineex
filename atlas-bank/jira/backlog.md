# Backlog Jira — Atlas Bank

## Epic

**ATLAS-1 — Plateforme bancaire en ligne Atlas Bank**
Regroupe toutes les stories du projet : authentification, comptes,
transactions et administration.

## Sprint 1 — Authentification et comptes

**Story — ATLAS-2 : En tant que client, je veux créer un compte pour accéder à la banque en ligne**
- Task — ATLAS-3 : Créer la table clients et le modèle Client.
- Task — ATLAS-4 : Créer la route POST /auth/inscription (hash bcrypt).
- Sub-task — ATLAS-5 : Valider l'email unique (erreur 409 EMAIL_DEJA_UTILISE).
- Sub-task — ATLAS-6 : Créer le formulaire d'inscription React.

**Story — ATLAS-7 : En tant que client, je veux me connecter pour accéder à mes comptes**
- Task — ATLAS-8 : Créer la route POST /auth/connexion (JWT).
- Task — ATLAS-9 : Créer le middleware de vérification du jeton.
- Sub-task — ATLAS-10 : Stocker le jeton dans le navigateur (localStorage).
- Sub-task — ATLAS-11 : Créer l'écran de connexion React.

**Story — ATLAS-12 : En tant que client, je veux consulter et créer mes comptes bancaires**
- Task — ATLAS-13 : Créer la table comptes et le modèle Compte.
- Task — ATLAS-14 : Créer les routes GET /comptes et POST /comptes.
- Sub-task — ATLAS-15 : Générer le numéro de compte automatiquement.
- Sub-task — ATLAS-16 : Afficher la liste des comptes dans le dashboard.

## Sprint 2 — Transactions

**Story — ATLAS-17 : En tant que client, je veux déposer et retirer de l'argent**
- Task — ATLAS-18 : Créer la table transactions et le modèle Transaction.
- Task — ATLAS-19 : Créer les routes POST /transactions/depot et /retrait.
- Sub-task — ATLAS-20 : Refuser le retrait si le solde est insuffisant (409).

**Story — ATLAS-21 : En tant que client, je veux faire un virement vers un autre compte**
- Task — ATLAS-22 : Créer la route POST /transactions/virement.
- Sub-task — ATLAS-23 : Vérifier le compte destinataire (404 si introuvable).
- Sub-task — ATLAS-24 : Mettre à jour les deux soldes et enregistrer
  les deux transactions.
- Sub-task — ATLAS-25 : Créer le formulaire de virement React.

**Story — ATLAS-26 : En tant que client, je veux consulter l'historique de mes transactions**
- Task — ATLAS-27 : Créer la route GET /comptes/:id/transactions.
- Sub-task — ATLAS-28 : Afficher l'historique avec le solde après
  chaque opération.

## Sprint 3 — Administration et déploiement

**Story — ATLAS-29 : En tant qu'administrateur, je veux consulter les clients et les comptes**
- Task — ATLAS-30 : Créer le middleware de vérification admin.
- Task — ATLAS-31 : Créer les routes GET /admin/clients et /admin/comptes.

**Story — ATLAS-32 : En tant qu'équipe, nous voulons déployer le projet et le présenter**
- Task — ATLAS-33 : Déployer le frontend sur Vercel.
- Task — ATLAS-34 : Rédiger le cahier des charges et les diagrammes UML.
- Task — ATLAS-35 : Préparer la présentation du projet.

## Bugs (exemples traités)

- **Bug — ATLAS-36 : Le solde devient négatif après un retrait.**
  Cause : la vérification du solde manquait. Corrigé par le contrôle
  409 SOLDE_INSUFFISANT avant la mise à jour.
- **Bug — ATLAS-37 : L'historique affiche les transactions dans le désordre.**
  Cause : pas de tri par date. Corrigé par ORDER BY date_transaction DESC.
