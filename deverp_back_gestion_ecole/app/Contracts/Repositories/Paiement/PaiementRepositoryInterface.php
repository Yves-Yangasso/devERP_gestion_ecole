<?php
namespace App\Contracts\Repositories\Paiement;

use App\Models\Paiement;
use Illuminate\Support\Collection;

interface PaiementRepositoryInterface
{
    public function creer(array $donnees): Paiement;
    public function modifier(int $id, array $donnees): Paiement;
    public function supprimer(int $id): void;
    public function trouverParId(int $id): ?Paiement;
    public function tous(): Collection;
}
