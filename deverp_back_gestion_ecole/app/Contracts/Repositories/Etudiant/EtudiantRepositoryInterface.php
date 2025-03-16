<?php
// app/Contracts/Repositories/Etudiant/EtudiantRepositoryInterface.php

namespace App\Contracts\Repositories\Etudiant;

use App\Contracts\Repositories\BaseRepositoryInterface;

interface EtudiantRepositoryInterface extends BaseRepositoryInterface
{
    public function trouverParMatricule(string $matricule);
    public function trouverParEmail(string $email);
    public function etudiantsActifs();
    public function etudiantsParStatut(string $statut);
    public function rechercherEtudiants(string $terme);
    public function mettreAJourStatut($id, string $statut);
    public function getDernierMatricule();
}