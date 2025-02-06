<?php
// app/Contracts/Repositories/DossierRepositoryInterface.php

namespace App\Contracts\Repositories;

interface DossierRepositoryInterface
{
    public function creer(array $donnees);
    public function trouver($id);
    public function mettreAJour($id, array $donnees);
    public function supprimer($id);
    public function toutRecuperer();
    public function findByEtudiant(int $etudiantId);
}