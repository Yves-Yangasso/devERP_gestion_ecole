<?php

namespace App\Contracts\Services\Document;
use App\Enums\Etudiant\EtapeInscription;

interface RecapitulatifEtudiantServiceInterface
{
    public function getInformationsEtudiant(int $etudiantId);
    public function getInformationsTuteur(int $etudiantId);
    public function getDossiers(int $etudiantId);
    public function getRecapitulatifComplet(int $etudiantId);
    // public function getEtapeInscription(int $etudiantId): EtapeInscription;
}