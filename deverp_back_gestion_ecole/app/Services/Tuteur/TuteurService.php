<?php

namespace App\Services\Tuteur;

use App\Models\Tuteur;
use App\Repositories\Eloquent\TuteurRepository;
use App\Events\Tuteur\TuteurCree;
use App\Events\Tuteur\TuteurModifie;

class TuteurService
{
    public function __construct(
        private TuteurRepository $tuteurRepository
    ) {}

    public function creer(array $donnees)
    {
        $tuteur = $this->tuteurRepository->creer($donnees);

        event(new TuteurCree($tuteur));

        return $tuteur;
    }

    public function modifier($id, array $donnees)
    {
        $tuteur = $this->tuteurRepository->modifier($id, $donnees);

        event(new TuteurModifie($tuteur));

        return $tuteur;
    }

    public function supprimer($id)
    {
        $this->tuteurRepository->supprimer($id);
    }
}
