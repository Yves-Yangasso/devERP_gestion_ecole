<?php

namespace App\Contracts\Repositories\Paiement;

use App\Models\Paiement;
use Illuminate\Support\Collection;

interface PaiementRepositoryInterface
{
    /**
     * Créer un nouveau tuteur.
     *
     * @param array $donnees
     * @return Paiement
     */
    public function creer(array $donnees): Paiement;

    /**
     * Modifier un tuteur existant.
     *
     * @param int $id
     * @param array $donnees
     * @return Paiement
     */
    public function modifier(int $id, array $donnees): Paiement;

    /**
     * Supprimer un tuteur par son ID.
     *
     * @param int $id
     * @return void
     */
    public function supprimer(int $id): void;

    /**
     * Récupérer un tuteur par son ID.
     *
     * @param int $id
     * @return Paiement|null
     */
    public function trouverParId(int $id): ?Paiement;

    /**
     * Récupérer tous les tuteurs.
     *
     * @return Collection
     */
    public function tous(): Collection;
}
