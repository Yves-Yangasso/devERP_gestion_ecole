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
}
