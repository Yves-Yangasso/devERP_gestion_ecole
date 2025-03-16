<?php
// app/Contracts/Repositories/Etudiant/InscriptionRepositoryInterface.php

namespace App\Contracts\Repositories\Etudiant;

use App\Contracts\Repositories\BaseRepositoryInterface;
use App\Models\Inscription;
use App\Models\Etudiant;

interface InscriptionRepositoryInterface extends BaseRepositoryInterface
{
    /**
     * Créer une nouvelle inscription pour un étudiant
     *
     * @param Etudiant $etudiant
     * @param array $donnees
     * @return Inscription
     */
    public function creerInscription(array $donnees): Inscription;
    // public function create(array $data);

    /**
     * Vérifier si l'étudiant est déjà inscrit pour une période donnée
     *
     * @param Etudiant $etudiant
     * @param string $anneeAcademique
     * @return bool
     */
    public function estDejaInscrit(Inscription $inscription, string $anneeAcademique): bool;

    /**
     * Obtenir les inscriptions actives d'un étudiant
     *
     * @param Etudiant $etudiant
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function obtenirInscriptionsActives(Inscription $inscription);

    public function update($id, array $data);

    public function find($id);

    public function delete($id);

    public function paginate($perPage = 15, $columns = ["*"]);

    public function get_all();

}
