<?php

namespace App\Contracts\Repositories\Etudiant;

interface AssociationEtudiantTuteurRepositoryInterface
{
    public function create(array $data);

    public function getInscriptionByIdTuteur(int $tuteurId);

    public function getTuteursByIdInscription(int $inscriptionId);
}
