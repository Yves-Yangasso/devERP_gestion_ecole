-- Ajout d'une colonne 'upload_timestamp' à la table 'documents'
ALTER TABLE documents ADD COLUMN upload_timestamp VARCHAR(255) NULL;

-- Ajout d'une colonne 'status' avec une valeur par défaut 'en_attente' à la table 'documents'
ALTER TABLE documents ADD COLUMN status VARCHAR(50) DEFAULT 'en_attente';

-- Vérification de la structure de la table 'documents'
SELECT * FROM pg_table_def WHERE tablename = 'documents';

-- Affichage des colonnes de la table 'inscriptions' avec leurs types et valeurs par défaut
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'inscriptions';

-- Ajout de plusieurs colonnes à la table 'filieres'
ALTER TABLE filieres 
ADD COLUMN nom_filiere VARCHAR(255) NOT NULL,  -- Nom de la filière (obligatoire)
ADD COLUMN idepartement INT NOT NULL,          -- Clé étrangère vers 'departements' (obligatoire)
ADD COLUMN description TEXT,                   -- Description (optionnelle)
ADD COLUMN status VARCHAR(50) DEFAULT 'actif'; -- Statut avec une valeur par défaut

-- Suppression de la colonne 'status' de la table 'documents'
ALTER TABLE documents DROP COLUMN status;

-- Ajout de colonnes à la table 'departements'
ALTER TABLE departements 
ADD COLUMN nom_departement VARCHAR(255) NOT NULL, -- Nom du département (obligatoire)
ADD COLUMN description TEXT;                      -- Description du département (optionnelle)
