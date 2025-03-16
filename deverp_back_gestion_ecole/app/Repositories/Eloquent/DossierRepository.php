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
        $updateData = ['status' => $statut];

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

    public function trouveParID(int $id): ?Dossier
    {
        return Dossier::with('documents')->find($id);
    }

    public function updateStatusDocument(int $dossierId, int $documentId, string $statut): void
    {
        $dossier = $this->trouveParID($dossierId);

        if (!$dossier) {
            return;
        }

        // Mettre à jour UN SEUL document
        Document::where('id', $documentId)->update(['status' => $statut]);

        // Vérifier si tous les documents sont valides
        $tousDocumentsValides = $dossier->documents()->where('status', 'valide')->count() === $dossier->documents()->count();
        $auMoinsUnInvalide = $dossier->documents()->where('status', 'invalide')->exists();

        // Déterminer le statut du dossier
        if ($tousDocumentsValides) {
            $nouveauStatut = 'valide';
        } elseif ($auMoinsUnInvalide) {
            $nouveauStatut = 'invalide';
        } else {
            $nouveauStatut = 'en_attente';
        }

        // Mettre à jour le statut du dossier
        $dossier->update(['status' => $nouveauStatut]);
    }
}
