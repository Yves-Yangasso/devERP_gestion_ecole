<?php

namespace App\Services\Etudiant;

use App\Repositories\Eloquent\AssociationEtudiantTuteurRepository;

class AssociationEtudiantTuteurService
{
    protected $associationRepository;

    public function __construct(AssociationEtudiantTuteurRepository $associationRepository)
    {
        $this->associationRepository = $associationRepository;
    }

    public function createAssociation(array $data)
    {
        return $this->associationRepository->create($data);
    }

    public function getInscriptionsByTuteur(int $tuteurId)
    {
        return $this->associationRepository->getInscriptionsByTuteur($tuteurId);
    }

    public function getTuteursByInscription(int $inscriptionId)
    {
        return $this->associationRepository->getTuteursByInscription($inscriptionId);
    }
}
