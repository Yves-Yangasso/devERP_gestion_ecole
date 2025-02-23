<?php

namespace App\Contracts\Repositories\Paiement;

use App\Models\LignePaiement;
use Illuminate\Support\Collection;

interface LignePaiementRepositoryInterface
{
    public function creer(array $donnees): LignePaiement;

    public function modifier(int $id, array $donnees): LignePaiement;

    public function supprimer(int $id): void;

    public function trouverParId(int $id): ?LignePaiement;

    public function tous(): Collection;
}
