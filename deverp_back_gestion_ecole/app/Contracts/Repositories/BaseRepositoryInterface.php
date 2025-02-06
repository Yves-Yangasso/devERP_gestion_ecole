<?php
// app/Contracts/Repositories/BaseRepositoryInterface.php

namespace App\Contracts\Repositories;

interface BaseRepositoryInterface
{
    public function tous(array $colonnes = ['*']);
    public function trouverParId($id);
    public function creer(array $donnees);
    public function modifier($id, array $donnees);
    public function supprimer($id);
    public function paginer(int $nombreParPage = 15, array $colonnes = ['*']);
    public function create(array $donnees);
}