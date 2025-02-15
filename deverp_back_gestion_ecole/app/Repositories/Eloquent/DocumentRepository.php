<?php
// app/Repositories/Eloquent/Document/DocumentsRepository.php
namespace App\Repositories\Eloquent;

use App\Contracts\Repositories\Dossier\DocumentRepositoryInterface;
use App\Models\Document;
use App\Enums\Dossier\StatutDocument;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Storage;
use Exception;

class DocumentRepository implements DocumentRepositoryInterface
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

    public function updateStatut(int $id, string $statut): ?Document
    {
        $document = Document::find($id);
        if (!$document) {
            return null;
        }

        $document->statut = $statut;
        $document->save();

        return $document;
    }

}

// namespace App\Repositories\Eloquent;

// use App\Contracts\Repositories\Dossier\DocumentRepositoryInterface;
// use App\Models\Document;
// use Illuminate\Database\Eloquent\Collection;
// use Illuminate\Support\Facades\DB;

// class DocumentRepository implements DocumentRepositoryInterface
// {
//     public function create(array $data): Document
//     {
//         return DB::transaction(function () use ($data) {
//             $document = Document::create($data);

//             // Mise à jour du statut du dossier si nécessaire
//             $this->verifierCompletudeDossier($document->dossier);

//             return $document;
//         });
//     }

//     // public function findById(int $id): ?Document
//     // {
//     //     return Document::find($id);
//     // }

//     public function findByDossierId(int $dossierId): Collection
//     {
//         return Document::where('dossier_id', $dossierId)
//             ->orderBy('created_at', 'desc')
//             ->get();
//     }

//     public function findByType(int $dossierId, string $type): ?Document
//     {
//         return Document::where('dossier_id', $dossierId)
//             ->where('type', $type)
//             ->first();
//     }

//     public function findById(int $id): ?Document
//     {
//         return Document::with('dossier')->find($id);
//     }

//     public function getByDossier(string $codeDossier): Collection
//     {
//         return Document::whereHas('dossier', function ($query) use ($codeDossier) {
//             $query->where('code_suivi', $codeDossier);
//         })->get();
//     }

//     public function update(Document $document, array $data): bool
//     {
//         return $document->update($data);
//     }

//     public function delete(Document $document): bool
//     {
//         return DB::transaction(function () use ($document) {
//             $dossier = $document->dossier;
//             $deleted = $document->delete();

//             if ($deleted) {
//                 $this->verifierCompletudeDossier($dossier);
//             }

//             return $deleted;
//         });
//     }

//     public function typeExistsPourDossier(string $codeDossier, string $type): bool
//     {
//         return Document::whereHas('dossier', function ($query) use ($codeDossier) {
//             $query->where('code_suivi', $codeDossier);
//         })->where('type', $type)->exists();
//     }

//     public function getDocumentsManquants(string $codeDossier): array
//     {
//         $documentsRequis = config('dossier.documents_requis');

//         $documentsPresents = Document::whereHas('dossier', function ($query) use ($codeDossier) {
//             $query->where('code_suivi', $codeDossier);
//         })->pluck('type')->toArray();

//         return array_diff($documentsRequis, $documentsPresents);
//     }

//     private function verifierCompletudeDossier($dossier): void
//     {
//         $documentsManquants = $this->getDocumentsManquants($dossier->code_suivi);

//         $nouveauStatut = empty($documentsManquants) ? 'en_attente' : 'incomplet';

//         if ($dossier->statut !== $nouveauStatut) {
//             $dossier->update(['statut' => $nouveauStatut]);
//         }
//     }
// }
