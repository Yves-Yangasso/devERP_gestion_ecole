<?php

namespace App\Contracts\Repositories\Document;

use App\Models\Document;
use Illuminate\Database\Eloquent\Collection;

interface DocumentRepositoryInterface
{
    public function creer(array $data): Document;
    public function trouverParId(int $id): ?Document;
    public function trouverParDossierId(int $dossierId);

    /**
     * Créer un nouveau document
     */
    public function create(array $data): Document;

    /**
     * Trouver un document par son ID
     */
    public function findById(int $id): ?Document;

    /**
     * Récupérer tous les documents d'un dossier
     */
    public function getByDossier(string $codeDossier): Collection;

    /**
     * Mettre à jour un document
     */
    // public function update(Document $document, array $data): Document;
    public function update(Document $document, array $data): bool;


    /**
     * Supprimer un document
     */
    public function delete(Document $document): bool;

    /**
     * Vérifier si un type de document existe déjà pour un dossier
     */
    public function typeExistsPourDossier(string $codeDossier, string $type): bool;

    /**
     * Récupérer les documents manquants pour un dossier
     */
    public function getDocumentsManquants(string $codeDossier): array;
    
    public function findByDossierId(int $dossierId): Collection;
    
    public function findByType(int $dossierId, string $type): ?Document;
}
