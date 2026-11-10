# Atlas Bank — Questions et réponses pour la répétition

## 1. Contexte et objectifs

**Q : Pourquoi avoir choisi une banque en ligne comme projet ?**
R : Parce que c'est un besoin concret : les clients veulent gérer leur
argent en ligne. Et le domaine bancaire couvre bien les compétences du
full stack : authentification, comptes, transactions et règles de gestion
comme le solde insuffisant.

**Q : Quels sont les objectifs du projet ?**
R : Permettre à un client de gérer ses comptes en ligne en toute
sécurité, permettre les virements, dépôts et retraits, donner à un
administrateur une vue d'ensemble, et livrer une application complète,
testable en ligne et présentable devant un jury.

## 2. Fonctionnalités

**Q : Qu'est-ce qu'un client peut faire dans l'application ?**
R : S'inscrire et se connecter, consulter ses comptes courants et
épargne, créer un nouveau compte, déposer et retirer de l'argent, faire
un virement vers un autre compte par son numéro, et consulter
l'historique de ses transactions avec le solde après chaque opération.

**Q : Que se passe-t-il si le solde est insuffisant ?**
R : Le retrait ou le virement est refusé avec l'erreur 409
SOLDE_INSUFFISANT, et aucun solde n'est modifié. Le solde ne peut jamais
devenir négatif.

## 3. Architecture technique

**Q : Quelle est l'architecture du projet ?**
R : Trois couches. Le frontend en React affiche les écrans et envoie des
requêtes fetch vers l'API. Le backend en Express suit le modèle MVC :
routes, contrôleurs et modèles. La base de données est MySQL.

**Q : Comment fonctionne l'authentification ?**
R : À la connexion, le backend vérifie l'email et le mot de passe avec
bcrypt, puis il crée un jeton JWT. Le frontend envoie ce jeton dans le
header Authorization à chaque requête. Les mots de passe sont hashés,
jamais stockés en clair.

## 4. Base de données

**Q : Quelles sont les tables de la base de données ?**
R : Trois tables : clients (nom, prénom, email, mot de passe hashé,
téléphone, is_admin), comptes (numéro de compte, type, solde, devise) et
transactions (type, montant, description, solde après l'opération).

**Q : Quelles sont les relations entre les tables ?**
R : Un client possède plusieurs comptes (1 à 0..*), et un compte
enregistre plusieurs transactions (1 à 0..*). Un virement crée deux
transactions : une « virement_envoye » sur le compte source et une
« virement_recu » sur le compte destinataire.

## 5. Cas d'utilisation

**Q : Qui sont les acteurs de l'application ?**
R : Le client et l'administrateur. Le client gère son argent : comptes,
dépôts, retraits, virements, historique. L'administrateur gère les
clients et consulte toutes les transactions.

**Q : Que signifie la relation « include » entre le virement et la vérification du solde ?**
R : Elle signifie que le virement inclut toujours la vérification du
solde : on ne peut pas virer plus que ce qu'on a sur le compte.

## 6. Organisation Scrum et Jira

**Q : Comment le projet est-il organisé dans Jira ?**
R : En un Epic, « Plateforme bancaire en ligne Atlas Bank », découpé en
trois sprints. Le sprint 1 couvre l'authentification et les comptes, le
sprint 2 les transactions, et le sprint 3 l'administration, le
déploiement et la présentation. Chaque story est découpée en tâches et
sous-tâches.

**Q : Donnez un exemple de bug corrigé pendant le projet.**
R : Le solde devenait négatif après un retrait, parce que la vérification
du solde manquait. Il a été corrigé par le contrôle 409 SOLDE_INSUFFISANT
avant la mise à jour du solde.

## 7. Déploiement et conclusion

**Q : Comment le projet est-il déployé et testé ?**
R : Le code est versionné sur GitHub avec des branches et des commits
réguliers, et le frontend est déployé sur Vercel, donc le jury peut le
tester en ligne sans rien installer. En local, il suffit de lancer
l'API et le frontend avec npm start, après avoir créé la base avec
schema.sql et les données de démonstration avec npm run seed.
