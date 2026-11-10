# Atlas Bank — Notes pour le cahier (explications détaillées)

Explication détaillée de chaque paragraphe de la présentation,
pour pouvoir expliquer chaque slide devant le jury.

## Slide 1 — Titre

Atlas Bank est le nom du projet : une banque en ligne fictive. Le projet
est un projet de fin de cycle en 2ème année de développement, et il est
full stack : React pour le frontend, Express pour le backend, MySQL pour
la base de données, Jira pour l'organisation et Vercel pour le déploiement.

## Slide 2 — Contexte et objectifs

Le contexte est simple : aujourd'hui, les clients d'une banque veulent
gérer leur argent en ligne, sans se déplacer. L'objectif du projet est
donc de construire une application web qui permet de consulter ses comptes,
de déposer et retirer de l'argent, et de faire des virements, en toute
sécurité. Un administrateur a une vue d'ensemble des clients et des
comptes. Le projet couvre toutes les compétences étudiées cette année :
React, Node.js et Express, MySQL, Git et GitHub, Scrum et Jira, UML et
déploiement sur Vercel. C'est ce qui fait sa valeur : il montre tout ce
qui a été appris, dans un seul projet cohérent.

## Slide 3 — Fonctionnalités

Côté client, tout commence par l'inscription et la connexion : le client
crée un compte avec son nom, son prénom, son email et son mot de passe,
puis il se connecte et reçoit un jeton JWT. Ensuite il peut consulter ses
comptes courants et épargne avec leurs soldes, créer un nouveau compte,
déposer et retirer de l'argent, faire un virement vers un autre compte en
donnant son numéro, et consulter l'historique de ses transactions avec le
solde après chaque opération. Côté administrateur, on peut consulter la
liste des clients et de leurs comptes. Les règles de gestion protègent le
solde : un retrait ou un virement est refusé si le solde est insuffisant,
avec l'erreur 409, et le solde ne peut jamais devenir négatif.

## Slide 4 — Architecture technique

L'architecture a trois couches. Le frontend en React affiche les écrans
et envoie des requêtes fetch vers l'API, par exemple pour charger les
comptes ou envoyer un virement. Le backend en Express suit le modèle MVC :
les routes reçoivent les requêtes, les contrôleurs appliquent les règles
de gestion comme la vérification du solde, et les modèles parlent à la
base MySQL. L'authentification utilise un jeton JWT, envoyé dans le
header Authorization, et les mots de passe sont hashés avec bcrypt, donc
ils ne sont jamais stockés en clair.

## Slide 5 — Base de données

La base MySQL contient trois tables. La table clients stocke les
informations des clients et le hash de leur mot de passe, avec un champ
is_admin pour distinguer l'administrateur. La table comptes stocke le
numéro de compte unique, le type (courant ou épargne) et le solde, avec
deux décimales. La table transactions enregistre chaque opération avec
son type (dépôt, retrait, virement envoyé, virement reçu), son montant
et le solde après l'opération. Les relations sont : un client possède
plusieurs comptes (1 à 0..*), et un compte enregistre plusieurs
transactions (1 à 0..*). Un virement crée deux transactions : une
« virement_envoye » sur le compte source et une « virement_recu » sur
le compte destinataire.

## Slide 6 — Cas d'utilisation

Deux acteurs utilisent l'application. Le client s'inscrit, se connecte,
consulte ses comptes, crée un compte, dépose et retire de l'argent, fait
des virements et consulte son historique. Le virement inclut la
vérification du solde : on ne peut pas virer plus que ce qu'on a. C'est
la relation « include » du diagramme. L'administrateur gère les clients
et consulte toutes les transactions. Le diagramme montre bien la
séparation : tout ce qui touche à l'argent est côté client, et la
supervision est côté administrateur.

## Slide 7 — Organisation Scrum et Jira

Le projet est organisé en un Epic, « Plateforme bancaire en ligne Atlas
Bank », découpé en trois sprints. Le sprint 1 couvre l'authentification
et les comptes : inscription, connexion, création et consultation des
comptes. Le sprint 2 couvre les transactions : dépôt, retrait, virement
et historique. Le sprint 3 couvre l'administration, le déploiement et la
présentation. Chaque story est découpée en tâches et sous-tâches, par
exemple la validation de l'email unique est une sous-tâche de
l'inscription. Les bugs rencontrés sont suivis dans Jira : par exemple
le solde négatif après un retrait, corrigé par le contrôle 409
SOLDE_INSUFFISANT, et l'historique dans le désordre, corrigé par un tri
par date décroissante.

## Slide 8 — Déploiement et conclusion

Le code est versionné sur GitHub avec des branches et des commits
réguliers, ce qui permet de suivre l'avancement et de revenir en arrière
si besoin. Le frontend est déployé sur Vercel pour être testable en ligne
par le jury, sans rien installer. En conclusion, Atlas Bank montre qu'une
application bancaire complète peut être construite avec des technologies
modernes et simples : React, Express, MySQL et JWT. Le projet est
fonctionnel, sécurisé et prêt à être présenté.
