<?php
// app/Repositories/Eloquent/InscriptionRepository.php

namespace App\Repositories\Eloquent;

use App\Contracts\Repositories\Etudiant\InscriptionRepositoryInterface;
use App\Enums\Etudiant\StatutInscription;
use App\Events\Etudiant\EtudiantInscrit;
use App\Models\Etudiant;
use App\Models\Inscription;
use App\Notifications\Etudiant\SuppressionInscription;

class InscriptionRepository extends BaseRepository implements InscriptionRepositoryInterface
{
    public function __construct(Inscription $model)
    {
        parent::__construct($model);
    }

    /**
     * Crée une inscription pour un étudiant.
     *
     * @param Etudiant $etudiant
     * @param array $donnees
     * @return Inscription
     */
    public function creerInscription(array $data): Inscription
    {
        return $this->model->create($data);
    }

    /**
     * Met à jour une inscription existante.
     *
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function update(int $id, array $data): bool
    {
        return $this->model->where('id', $id)->update($data);
    }

    /**
     * Supprime une inscription par son ID.
     *
     * @param int $id
     * @return void
     */
    public function delete(int $id): bool
    {
        $inscription = $this->find($id);

        if ($inscription) {
            $inscription->delete();
            event(new SuppressionInscription($id));
            return true;
        }
        return false;
    }

    /**
     * Vérifie si un étudiant est déjà inscrit pour une année académique donnée.
     *
     * @param Etudiant $etudiant
     * @param string $anneeAcademique
     * @return bool
     */
    public function estDejaInscrit(Inscription $inscription, string $anneeAcademique): bool
    {
        return $this->model
            ->join('etudiants', 'inscriptions.id', '=', 'etudiants.id_inscription')
            ->where('inscriptions.id', $inscription->id)
            ->where('inscriptions.annee_academique', $anneeAcademique)
            ->whereIn('inscriptions.statut', [
                StatutInscription::ACTIF,
                StatutInscription::EN_ATTENTE,
            ])
            ->exists();
    }

    /**
     * Récupère toutes les inscriptions actives d'un étudiant.
     *
     * @param Etudiant $etudiant
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function obtenirInscriptionsActives(Inscription $inscription)
    {
        return $this->model
            ->where('id', $inscription->id)
            ->where('statut', StatutInscription::ACTIF)
            ->get();
    }

    /**
     * Récupère tous les enregistrements d'inscriptions.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function get_all()
    {
        return $this->model->all();
    }
}
