<?php

namespace App\Services\Tuteur;

use App\Models\Paiement;
use App\Repositories\Eloquent\PaiementRepository;
use App\Events\Paiement\PaiementCreer;
use App\Events\Paiement\PaiementModifie;

class ModePaiementService
{
    public function __construct(
        private PaiementRepository $PaiementRepository
    ) {}

    public function creer(array $donnees)
    {
        $paiement = $this->PaiementRepository->creer($donnees);

        event(new PaiementCreer($paiement));

        return $paiement;
    }

    public function modifier($id, array $donnees)
    {
       // $modePaiement = $this->modePaiementRepository>modifier($id, $donnees);

      //  event(new ModePaiementModifie($modePaiement));

      //  return $modePaiement;
    }

    public function supprimer($id)
    {
        $this->PaiementRepository->supprimer($id);
    }
}
