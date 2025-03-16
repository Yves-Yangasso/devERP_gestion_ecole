<?php

namespace App\Enums\Etudiant;

enum TypeDocument: string
{
    case PIECE_IDENTITE = 'piece_identite';        // CNI, Passeport, etc.
    case PHOTO = 'photo';                          // Photo d'identité
    case DIPLOME_BAC = 'diplome_bac';             // Baccalauréat
    case RELEVE_NOTES_BAC = 'releve_notes_bac';   // Relevé de notes du bac
    case CERTIFICAT_NAISSANCE = 'certificat_naissance'; // Extrait de naissance
    case CERTIFICAT_MEDICAL = 'certificat_medical'; // Certificat médical
    case ATTESTATION_DIPLOME = 'attestation_diplome'; // Attestations d'autres diplômes
    case AUTORISATION_PARENTALE = 'autorisation_parentale'; // Pour mineurs
    case CONTRAT_SCOLARITE = 'contrat_scolarite';  // Contrat signé
    case CERTIFICAT_RESIDENCE = 'certificat_residence'; // Certificat de résidence
    case AUTRE = 'autre';                          // Autres types de documents

    /**
     * Obtenir le libellé du type de document
     */
    public function libelle(): string
    {
        return match($this) {
            self::PIECE_IDENTITE => 'Pièce d\'identité',
            self::PHOTO => 'Photo d\'identité',
            self::DIPLOME_BAC => 'Diplôme du Baccalauréat',
            self::RELEVE_NOTES_BAC => 'Relevé de notes du Baccalauréat',
            self::CERTIFICAT_NAISSANCE => 'Extrait de naissance',
            self::CERTIFICAT_MEDICAL => 'Certificat médical',
            self::ATTESTATION_DIPLOME => 'Attestation de diplôme',
            self::AUTORISATION_PARENTALE => 'Autorisation parentale',
            self::CONTRAT_SCOLARITE => 'Contrat de scolarité',
            self::CERTIFICAT_RESIDENCE => 'Certificat de résidence',
            self::AUTRE => 'Autre document'
        };
    }

    /**
     * Vérifier si le document a une date d'expiration
     */
    public function aExpiration(): bool
    {
        return in_array($this, [
            self::PIECE_IDENTITE,
            self::CERTIFICAT_MEDICAL,
            self::CERTIFICAT_RESIDENCE
        ]);
    }

    /**
     * Obtenir la durée de validité en mois
     */
    public function dureeValidite(): ?int
    {
        return match($this) {
            self::PIECE_IDENTITE => 120,        // 10 ans
            self::CERTIFICAT_MEDICAL => 12,      // 1 an
            self::CERTIFICAT_RESIDENCE => 3,     // 3 mois
            default => null
        };
    }

    /**
     * Vérifier si le document est obligatoire pour l'inscription
     */
    public function estObligatoire(): bool
    {
        return in_array($this, [
            self::PIECE_IDENTITE,
            self::PHOTO,
            self::DIPLOME_BAC,
            self::RELEVE_NOTES_BAC,
            self::CERTIFICAT_NAISSANCE,
            self::CERTIFICAT_MEDICAL
        ]);
    }

    /**
     * Obtenir les formats de fichiers autorisés
     */
    public function formatsAutorises(): array
    {
        return match($this) {
            self::PHOTO => ['jpg', 'jpeg', 'png'],
            default => ['pdf', 'jpg', 'jpeg', 'png']
        };
    }

    /**
     * Obtenir la taille maximale en Mo
     */
    public function tailleMaximale(): int
    {
        return match($this) {
            self::PHOTO => 2,  // 2 Mo max pour les photos
            default => 5       // 5 Mo max pour les autres documents
        };
    }

    /**
     * Obtenir le dossier de stockage
     */
    public function dossierStockage(): string
    {
        return match($this) {
            self::PIECE_IDENTITE => 'pieces_identite',
            self::PHOTO => 'photos',
            self::DIPLOME_BAC, self::ATTESTATION_DIPLOME => 'diplomes',
            self::RELEVE_NOTES_BAC => 'releves',
            self::CERTIFICAT_NAISSANCE, 
            self::CERTIFICAT_MEDICAL, 
            self::CERTIFICAT_RESIDENCE => 'certificats',
            self::AUTORISATION_PARENTALE => 'autorisations',
            self::CONTRAT_SCOLARITE => 'contrats',
            default => 'autres'
        };
    }
}