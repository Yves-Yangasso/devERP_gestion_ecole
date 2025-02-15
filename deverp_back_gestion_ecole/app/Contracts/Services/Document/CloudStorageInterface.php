<?php

namespace App\Contracts\Services\Document;

use Illuminate\Http\UploadedFile;

interface CloudStorageInterface
{
    /**
     * Upload un document sur le stockage cloud
     *
     * @param UploadedFile $file Le fichier à uploader
     * @param string $folder Le dossier de destination
     * @param array $options Options supplémentaires (tags, metadata, etc.)
     * @return array Résultat de l'upload contenant au moins ['success' => bool, 'url' => ?string, 'error' => ?string]
     */
    public function uploadDocument(UploadedFile $file, string $folder, array $options, string $prenom, string $nom): array;

    /**
     * Supprime un document du stockage cloud
     *
     * @param string $publicId Identifiant public du document
     * @return bool Succès de la suppression
     */
    public function deleteDocument(string $publicId): bool;

    /**
     * Archive un document dans un dossier spécifique
     *
     * @param string $publicId Identifiant public du document
     * @param string $archiveFolder Dossier d'archivage
     * @return bool Succès de l'archivage
     */
    public function archiveDocument(string $publicId, string $archiveFolder): bool;

    /**
     * Récupère les métadonnées d'un document
     *
     * @param string $publicId Identifiant public du document
     * @return array|null Métadonnées du document ou null si non trouvé
     */
    public function getDocumentMetadata(string $publicId): ?array;

    /**
     * Met à jour les tags d'un document
     *
     * @param string $publicId Identifiant public du document
     * @param array $tags Nouveaux tags à appliquer
     * @return bool Succès de la mise à jour
     */
    public function updateDocumentTags(string $publicId, array $tags): bool;

    /**
     * Vérifie si un document existe
     *
     * @param string $publicId Identifiant public du document
     * @return bool True si le document existe
     */
    public function documentExists(string $publicId): bool;
}