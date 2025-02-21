<?php
// app/Repositories/Eloquent/Document/DocumentsRepository.php
namespace App\Repositories\Eloquent;

use App\Models\Document;
use App\Enums\Dossier\StatutDocument;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Storage;
use Exception;

class DocumentRepository
{
    protected $model;

    public function __construct(Document $document)
    {
        $this->model = $document;
    }

    public function creer(array $data): Document
    {
        return $this->model->create($data);
    }

    public function trouverParId(int $id): ?Document
    {
        return $this->model->with('dossier')->find($id);
    }

    public function trouverParDossierId(int $dossierId): Collection
    {
        return $this->model
            ->where('dossier_id', $dossierId)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function mettreAJourStatut(int $id, StatutDocument $statut, ?string $commentaire = null): bool
    {
        return $this->model->where('id', $id)->update([
            'statut' => $statut,
            'commentaire' => $commentaire,
            'date_traitement' => now()
        ]);
    }

    public function remplacerDocument(int $id, array $nouveauDocument): Document
    {
        $document = $this->trouverParId($id);

        if (!$document) {
            throw new Exception('Document non trouvé');
        }

        // Supprimer l'ancien fichier s'il existe
        if ($document->chemin_fichier) {
            Storage::delete($document->chemin_fichier);
        }

        // Mettre à jour avec le nouveau fichier
        $document->update([
            'chemin_fichier' => $nouveauDocument['chemin_fichier'],
            'type_document' => $nouveauDocument['type_document'] ?? $document->type_document,
            'statut' => StatutDocument::EN_ATTENTE,
            'commentaire' => null,
            'date_traitement' => null
        ]);

        return $document->fresh();
    }

    public function getDocumentsNonTraites(): Collection
    {
        return $this->model
            ->where('statut', StatutDocument::EN_ATTENTE)
            ->with('dossier')
            ->get();
    }

    public function supprimer(int $id): bool
    {
        $document = $this->trouverParId($id);

        if ($document && $document->chemin_fichier) {
            Storage::delete($document->chemin_fichier);
        }

        return $document ? $document->delete() : false;
    }
    public function delete(Document $document): bool
    {
        return $document->delete();
    }
    public function update(Document $document, array $data): bool
    {
        return $document->update($data);
    }
}
