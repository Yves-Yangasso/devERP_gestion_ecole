<?php

namespace App\Repositories\Eloquent;

use App\Contracts\Repositories\Dossier\DossierRepositoryInterface;
use App\Models\Dossier;
use App\Models\Document;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class DossierRepository implements DossierRepositoryInterface
{
    public function create(array $data): Dossier
    {
        return DB::transaction(function () use ($data) {
            $dossier = new Dossier($data);
            $dossier->genererCodeSuivi();
            $dossier->save();

            return $dossier;
        });
    }

    public function findById(int $id): ?Dossier
    {
        return Dossier::with(['documents', 'validations'])->find($id);
    }

    public function findByCodeSuivi(string $codeSuivi): ?Dossier
    {
        return Dossier::with(['documents', 'validations'])
            ->where('code_suivi', $codeSuivi)
            ->first();
    }

    public function update(Dossier $dossier, array $data): bool
    {
        return $dossier->update($data);
    }

    public function getDossiersEnAttente(): Collection
    {
        return Dossier::with(['documents', 'validations'])
            ->where('statut', 'en_attente')
            ->get();
    }

    public function getDossiersByEtudiant(int $etudiantId): Collection
    {
        return Dossier::with(['documents', 'validations'])
            ->where('etudiant_id', $etudiantId)
            ->get();
    }

    public function ajouterDocument(Dossier $dossier, array $documentData): void
    {
        DB::transaction(function () use ($dossier, $documentData) {
            $document = new Document($documentData);
            $dossier->documents()->save($document);

            // Mettre à jour le statut du dossier si nécessaire
            $this->verifierCompletudeDossier($dossier);
        });
    }

    public function updateStatut(Dossier $dossier, string $statut, ?string $commentaire = null): bool
    {
        return $dossier->update([
            'statut' => $statut,
            'commentaire' => $commentaire
        ]);
    }

    private function verifierCompletudeDossier(Dossier $dossier): void
    {
        $documentsRequis = config('dossier.documents_requis');
        $documentsPresents = $dossier->documents->pluck('type')->toArray();

        $dossierComplet = count(array_diff($documentsRequis, $documentsPresents)) === 0;

        if ($dossierComplet && $dossier->statut === 'incomplet') {
            $this->updateStatut($dossier, 'en_attente');
        } elseif (!$dossierComplet && $dossier->statut === 'en_attente') {
            $this->updateStatut($dossier, 'incomplet');
        }
    }
}