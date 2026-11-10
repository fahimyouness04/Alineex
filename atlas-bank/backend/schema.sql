-- Atlas Bank — schéma MySQL
CREATE DATABASE IF NOT EXISTS atlas_bank CHARACTER SET utf8mb4;
USE atlas_bank;

CREATE TABLE IF NOT EXISTS clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  mot_de_passe VARCHAR(255) NOT NULL,
  telephone VARCHAR(20),
  is_admin TINYINT(1) NOT NULL DEFAULT 0,
  date_creation DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS comptes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT NOT NULL,
  numero_compte VARCHAR(20) NOT NULL UNIQUE,
  type ENUM('courant', 'epargne') NOT NULL,
  solde DECIMAL(12,2) NOT NULL DEFAULT 0,
  devise VARCHAR(3) NOT NULL DEFAULT 'MAD',
  statut VARCHAR(20) NOT NULL DEFAULT 'actif',
  date_creation DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id)
);

CREATE TABLE IF NOT EXISTS transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  compte_id INT NOT NULL,
  type ENUM('depot', 'retrait', 'virement_envoye', 'virement_recu') NOT NULL,
  montant DECIMAL(12,2) NOT NULL,
  description VARCHAR(255),
  compte_destinataire_id INT,
  solde_apres DECIMAL(12,2) NOT NULL,
  date_transaction DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (compte_id) REFERENCES comptes(id),
  FOREIGN KEY (compte_destinataire_id) REFERENCES comptes(id)
);
