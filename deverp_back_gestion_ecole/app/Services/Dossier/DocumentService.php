<?php

namespace App\Services\Dossier;

use App\Models\Document;
use App\Enums\Dossier\ResultatValidation;
use App\Repositories\Eloquent\DocumentRepository;
use App\Services\Storage\CloudinaryStorageService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;

class DocumentService
{
    public function __construct(
        private readonly DocumentRepository $documentRepository,
        private readonly CloudinaryStorageService $cloudinaryStorage
    ) {}

    public function creerDocument(array $data, UploadedFile $fichier): Document
    {
        DB::beginTransaction();

        try {
            // Upload sur Cloudinary
            $uploadResult = $this->cloudinaryStorage->uploadDocument(
                $fichier,
                $data['dossier_code'],
                $data['type']
            );

            if (!$uploadResult['success']) {
                throw new \Exception('Échec du téléchargement: ' . ($uploadResult['error'] ?? 'Erreur inconnue'));
            }

            // Création du document
            $document = $this->documentRepository->creer([
                'dossier_id' => $data['dossier_id'],
                'type' => $data['type'],
                'chemin' => $uploadResult['url'],
                'public_id' => $uploadResult['public_id'],
                'statut' => ResultatValidation::EN_ATTENTE,
                'commentaire' => $data['commentaire'] ?? null,
            ]);

            DB::commit();
            return $document;
        } catch (\Exception $e) {
            DB::rollBack();

            // Nettoyage sur Cloudinary si nécessaire
            if (isset($uploadResult['public_id'])) {
                $this->cloudinaryStorage->deleteDocument($uploadResult['public_id']);
            }

            throw $e;
        }
    }

    public function mettreAJourDocument(Document $document, array $data): bool
    {
        return $this->documentRepository->update($document, $data);
    }

    public function supprimerDocument(Document $document): bool
    {
        DB::beginTransaction();
        try {
            // Suppression sur Cloudinary
            if ($document->public_id) {
                $this->cloudinaryStorage->deleteDocument($document->public_id);
            }

            // Suppression en base de données
            $this->documentRepository->delete($document);

            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function getDocumentsByDossier(int $dossierId): array
    {
        return $this->documentRepository->trouverParDossierId($dossierId)->toArray();
    }


    public function validerDocument(Document $document, string $statut, ?string $commentaire = null): bool
    {
        return $this->documentRepository->update($document, [
            'statut' => $statut,
            'commentaire' => $commentaire,
            'date_validation' => now(),
        ]);
    }

    public function getDocument(int $documentId): ?Document
    {
        return $this->documentRepository->trouverParId($documentId);
    }

    public function soumettreDocument(string $codeDossier, array $data): Document
    {
        // Logique pour soumettre un document (appel à creerDocument)
        return $this->creerDocument($data, $data['fichier']);
    }

    public function updateDocument(int $documentId, array $data): bool
    {
        $document = $this->getDocument($documentId);
        if (!$document) {
            throw new \Exception('Document introuvable');
        }

        return $this->mettreAJourDocument($document, $data);
    }

    public function deleteDocument(int $documentId): bool
    {
        $document = $this->getDocument($documentId);
        if (!$document) {
            throw new \Exception('Document introuvable');
        }

        return $this->supprimerDocument($document);
    }
}
