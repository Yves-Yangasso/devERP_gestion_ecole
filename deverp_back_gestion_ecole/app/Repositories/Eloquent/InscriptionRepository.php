<?php
// app/Repositories/Eloquent/InscriptionRepository.php

namespace App\Repositories\Eloquent;

use App\Contracts\Repositories\Etudiant\InscriptionRepositoryInterface;
use App\Enums\Etudiant\StatutInscription;
use App\Models\Etudiant;
use App\Models\Inscription;

class InscriptionRepository extends BaseRepository implements InscriptionRepositoryInterface
{
    public function __construct(Inscription $model)
    {
        parent::__construct($model);
    }

    public function creerInscription(Etudiant $etudiant, array $donnees): Inscription
    {
        return $this->model->create([
            'etudiant_id' => $etudiant->id,
            'annee_academique' => $donnees['annee_academique'],
            'date_inscription' => now(),
            'statut' => StatutInscription::ACTIF,
            'classe_id' => $donnees['classe_id'] ?? null,
            'frais_inscription' => $donnees['frais_inscription'] ?? 0,
            'mode_paiement' => $donnees['mode_paiement'] ?? null
        ]);
    }

    public function estDejaInscrit(Etudiant $etudiant, string $anneeAcademique): bool
    {
        return $this->model
            ->where('etudiant_id', $etudiant->id)
            ->where('annee_academique', $anneeAcademique)
            ->whereIn('statut', [
                StatutInscription::ACTIF,
                StatutInscription::EN_ATTENTE
            ])
            ->exists();
    }

    public function obtenirInscriptionsActives(Etudiant $etudiant)
    {
        return $this->model
            ->where('etudiant_id', $etudiant->id)
            ->where('statut', StatutInscription::ACTIF)
            ->get();
    }

    public function create(array $donnees)
    {
        return $this->model->create($donnees);
    }
}
