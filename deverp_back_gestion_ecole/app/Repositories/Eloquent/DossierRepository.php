<?php

namespace App\Repositories\Eloquent;

use App\Models\Dossier;
use App\Models\Document;
use App\Contracts\Repositories\Dossier\DossierRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Enums\Dossier\StatutDossier;


class DossierRepository implements DossierRepositoryInterface
{
    protected $model;

    public function __construct(Dossier $dossier)
    {
        $this->model = $dossier;
    }

    public function create(array $data): Dossier
    {
        return $this->model->create($data);
    }
    public function getByStatut(string $statut): Collection
    {
        return Dossier::where('statut', $statut)->get();
    }

    public function findByCodeSuivi(string $codeSuivi): ?Dossier
    {
        return $this->model
            ->whereHas('inscription', function ($query) use ($codeSuivi) {
                $query->where('code_suivi', $codeSuivi);
            })
            ->with(['documents', 'inscription'])
            ->first();
    }

    public function update(Dossier $dossier, array $data): bool
    {
        return $dossier->update($data);
    }

    public function getDossiersEnAttente(): Collection
    {
        return $this->model
            ->where('statut', 'en_attente')
            ->with(['documents', 'inscription'])
            ->get();
    }

    public function getDossiersByEtudiant(int $etudiantId): Collection
    {
        return $this->model
            ->whereHas('inscription', function ($query) use ($etudiantId) {
                $query->where('etudiant_id', $etudiantId);
            })
            ->with(['documents', 'inscription'])
            ->get();
    }

    public function ajouterDocument(Dossier $dossier, array $documentData): void
    {
        $dossier->documents()->create($documentData);
    }

    public function updateStatut(Dossier $dossier, string $statut, ?string $commentaire = null): bool
    {
        $updateData = ['statut' => $statut];

        if ($commentaire !== null) {
            $updateData['commentaire'] = $commentaire;
        }

        return $dossier->update($updateData);
    }

    public function getDossiersByStatut(StatutDossier $statut, int $perPage = 15): LengthAwarePaginator
    {
        return $this->model
            ->where('statut', $statut)
            ->with(['documents', 'inscription'])
            ->latest()
            ->paginate($perPage);
    }
    public function findById(int $id): ?Dossier
    {
        return $this->model
            ->with(['documents', 'inscription'])
            ->find($id);
    }


    public function modifieStatut(int $id, string $statut): ?Dossier
    {
        $dossier = Dossier::find($id);
        if (!$dossier) {
            return null;
        }

        $dossier->statut = $statut;
        $dossier->save();

        return $dossier;
    }

}
// namespace App\Repositories\Eloquent;

// use App\Contracts\Repositories\Dossier\DossierRepositoryInterface;
// use App\Models\Dossier;
// use App\Models\Document;
// use Illuminate\Database\Eloquent\Collection;
// use Illuminate\Support\Facades\DB;

// class DossierRepository implements DossierRepositoryInterface
// {
//     public function create(array $data): Dossier
//     {
//         return DB::transaction(function () use ($data) {
//             $dossier = new Dossier($data);
//             $dossier->genererCodeSuivi();
//             $dossier->save();

//             return $dossier;
//         });
//     }

//     public function findById(int $id): ?Dossier
//     {
//         return Dossier::with(['documents', 'validations'])->find($id);
//     }

//     public function findByCodeSuivi(string $codeSuivi): ?Dossier
//     {
//         return Dossier::with(['documents', 'validations'])
//             ->where('code_suivi', $codeSuivi)
//             ->first();
//     }

//     public function update(Dossier $dossier, array $data): bool
//     {
//         return $dossier->update($data);
//     }

//     public function getDossiersEnAttente(): Collection
//     {
//         return Dossier::with(['documents', 'validations'])
//             ->where('statut', 'en_attente')
//             ->get();
//     }

//     public function getDossiersByEtudiant(int $etudiantId): Collection
//     {
//         return Dossier::with(['documents', 'validations'])
//             ->where('etudiant_id', $etudiantId)
//             ->get();
//     }

//     public function ajouterDocument(Dossier $dossier, array $documentData): void
//     {
//         DB::transaction(function () use ($dossier, $documentData) {
//             $document = new Document($documentData);
//             $dossier->documents()->save($document);

//             // Mettre à jour le statut du dossier si nécessaire
//             $this->verifierCompletudeDossier($dossier);
//         });
//     }

//     public function updateStatut(Dossier $dossier, string $statut, ?string $commentaire = null): bool
//     {
//         return $dossier->update([
//             'statut' => $statut,
//             'commentaire' => $commentaire
//         ]);
//     }

//     private function verifierCompletudeDossier(Dossier $dossier): void
//     {
//         $documentsRequis = config('dossier.documents_requis');
//         $documentsPresents = $dossier->documents->pluck('type')->toArray();

//         $dossierComplet = count(array_diff($documentsRequis, $documentsPresents)) === 0;

//         if ($dossierComplet && $dossier->statut === 'incomplet') {
//             $this->updateStatut($dossier, 'en_attente');
//         } elseif (!$dossierComplet && $dossier->statut === 'en_attente') {
//             $this->updateStatut($dossier, 'incomplet');
//         }
//     }
// }
