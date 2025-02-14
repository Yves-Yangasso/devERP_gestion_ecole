<?php

namespace App\Contracts\Repositories\Dossier;

use App\Models\Dossier;
use Illuminate\Database\Eloquent\Collection;

interface DossierRepositoryInterface
{

    /**
     * Créer un nouveau dossier
     */
    public function create(array $data): Dossier;

    /**
     * Récupérer un dossier par son ID
     */
    public function findById(int $id): ?Dossier;

    /**
     * Récupérer un dossier par son code de suivi
     */
    public function findByCodeSuivi(string $codeSuivi): ?Dossier;

    /**
     * Mettre à jour un dossier
     */
    public function update(Dossier $dossier, array $data): bool;

    /**
     * Récupérer tous les dossiers en attente de validation
     */
    public function getDossiersEnAttente(): Collection;

    /**
     * Récupérer les dossiers d'un étudiant
     */
    public function getDossiersByEtudiant(int $etudiantId): Collection;

    /**
     * Ajouter un document au dossier
     */
    public function ajouterDocument(Dossier $dossier, array $documentData): void;

    /**
     * Mettre à jour le statut d'un dossier
     */
    public function updateStatut(Dossier $dossier, string $statut, ?string $commentaire = null): bool;

    /**
     * Permet de recuperer tout les dossiers ayant un status specifiques
     */
    public function getByStatut(string $statut): Collection;
}
