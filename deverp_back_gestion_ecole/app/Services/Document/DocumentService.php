<?php
// Services/Document/DocumentService.php
namespace App\Services\Document;

use App\Contracts\Services\Document\DocumentServiceInterface;
use App\Models\Document;
use Illuminate\Http\UploadedFile;

class DocumentService implements DocumentServiceInterface
{
    private $cloudinaryService;

    public function __construct(CloudinaryService $cloudinaryService)
    {
        $this->cloudinaryService = $cloudinaryService;
    }

    public function stockerDocument(UploadedFile $fichier, array $donnees): Document
    {
        // Déterminer le dossier selon le type de document
        $dossier = $this->determinerDossier($donnees['type_document_id']);

        // Stocker sur Cloudinary
        $resultatStockage = $this->cloudinaryService->stockerFichier($fichier, $dossier);

        if (!$resultatStockage['success']) {
            throw new \Exception('Erreur lors du stockage du fichier : ' . $resultatStockage['message']);
        }

        // Créer l'entrée dans la base de données
        return Document::create([
            'etudiant_id' => $donnees['etudiant_id'],
            'type_document_id' => $donnees['type_document_id'],
            'nom' => $fichier->getClientOriginalName(),
            'chemin_fichier' => $resultatStockage['url'],
            'cloudinary_id' => $resultatStockage['cloudinary_id'],
            'taille' => $resultatStockage['taille'],
            'format' => $resultatStockage['format'],
            'statut' => 'en_attente',
            'date_expiration' => $donnees['date_expiration'] ?? null
        ]);
    }

    private function determinerDossier(int $typeDocumentId): string
    {
        $typeDossiers = [
            1 => 'pieces_identite',
            2 => 'diplomes',
            3 => 'certificats',
            4 => 'photos',
            5 => 'autres'
        ];

        return $typeDossiers[$typeDocumentId] ?? 'divers';
    }
}
