<?php

namespace App\Contracts\Repositories\Tuteur;

interface AssociationRepositoryInterface
{
    public function associerEtudiantATuteur(int $etudiantId, int $tuteurId);
    public function dissocierEtudiantDuTuteur(int $etudiantId, int $tuteurId);
    public function obtenirTuteursParEtudiant(int $etudiantId);
    public function obtenirEtudiantsParTuteur(int $tuteurId);
}
