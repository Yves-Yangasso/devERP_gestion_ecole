<?php

namespace App\Repositories\Eloquent;

use App\Models\Inscription;
use Illuminate\Database\Eloquent\Collection; // Ajout de l'import

class InscriptionRepository
{
    public function create(array $data)
    {
        return Inscription::create($data);
    }

    public function getAll(): Collection
    {
        return Inscription::all();
    }

    public function getById($id): ?Inscription
    {
        return Inscription::findOrFail($id);
    }

    public function findByCodeSuiviAndEmail(string $codeSuivi, string $email): ?Inscription
    {
        return Inscription::where('code_suivi', $codeSuivi)
            ->where('email', $email)
            ->first();
    }

    public function updateStatut($id, string $statut): bool
    {
        return Inscription::where('id', $id)->update(['statut' => $statut]);
    }

    public function getByStatut(string $statut): Collection
    {
        return Inscription::where('statut', $statut)->get();
    }

    public function getWithDossierAndDocuments($id): ?Inscription
    {
        return Inscription::with(['dossier.documents' => function ($query) {
            $query->orderBy('updated_at', 'desc');
        }])->findOrFail($id);
    }
}
