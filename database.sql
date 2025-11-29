-- Portfolio site database schema
-- Import via phpMyAdmin or mysql CLI: mysql -u root -p < database.sql

CREATE DATABASE IF NOT EXISTS portfolio_site CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE portfolio_site;

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(120) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Insert a starter admin account (username: admin)
-- Replace the password hash with your own by running in PHP: password_hash('yourPassword', PASSWORD_BCRYPT)
INSERT INTO admin_users (username, password_hash, email)
VALUES (
  'admin',
  '$2y$10$U3c0wxeG.zdI0Z.6w7bv/.sS2YRUcN6i/K3PaY5E9OQj1YxDCEpXO', -- password: ChangeMe123!
  'admin@example.com'
)
ON DUPLICATE KEY UPDATE username = username;

-- Contact form submissions table
CREATE TABLE IF NOT EXISTS contact_messages (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL,
  subject VARCHAR(160) DEFAULT NULL,
  message TEXT NOT NULL,
  status ENUM('new', 'read', 'archived') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Optional projects table for future dynamic content
CREATE TABLE IF NOT EXISTS projects (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(160) NOT NULL,
  summary VARCHAR(255) NOT NULL,
  description TEXT,
  tech_stack VARCHAR(255),
  live_url VARCHAR(255),
  repo_url VARCHAR(255),
  is_visible TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Optional services table for future offerings
CREATE TABLE IF NOT EXISTS services (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  blurb VARCHAR(255) NOT NULL,
  description TEXT,
  is_visible TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
