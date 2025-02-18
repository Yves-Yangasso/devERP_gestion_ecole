<?php

namespace App\Services\Tuteur;

use App\Models\ModePaiement;
use App\Repositories\Eloquent\ModePaiementRepository;
use App\Events\Paiement\ModePaiementCreer;
use App\Events\Paiement\ModePaiementModifie;

class ModePaiementService
{
    public function __construct(
        private ModePaiementRepository $modePaiementRepository
    ) {}

    public function creer(array $donnees)
    {
        $modePaiement = $this->modePaiementRepository->creer($donnees);

        event(new ModePaiementCreer($modePaiement));

        return $modePaiement;
    }

    public function modifier($id, array $donnees)
    {
       // $modePaiement = $this->modePaiementRepository>modifier($id, $donnees);

      //  event(new ModePaiementModifie($modePaiement));

      //  return $modePaiement;
    }

    public function supprimer($id)
    {
        $this->modePaiementRepository->supprimer($id);
    }
}
