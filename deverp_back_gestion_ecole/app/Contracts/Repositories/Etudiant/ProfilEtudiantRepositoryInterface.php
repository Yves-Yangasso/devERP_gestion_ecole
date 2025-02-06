<?php
// app/Contracts/Repositories/Etudiant/ProfilEtudiantRepositoryInterface.php

namespace App\Contracts\Repositories\Etudiant;

use App\Contracts\Repositories\BaseRepositoryInterface;

interface ProfilEtudiantRepositoryInterface extends BaseRepositoryInterface
{
    public function trouverParEtudiantId($etudiantId);
    public function mettreAJourPhoto($id, string $cheminPhoto);
    public function create(array $donnees);
}