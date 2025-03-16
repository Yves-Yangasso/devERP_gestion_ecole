<?php

namespace App\Contracts\Repositories\Paiement;

use App\Models\ModePaiement;
use Illuminate\Support\Collection;

interface ModePaiementRepositoryInterface
{
    /**
     * Créer un nouveau tuteur.
     *
     * @param array $donnees
     * @return ModePaiement
     */
    public function creer(array $donnees): ModePaiement;

    /**
     * Modifier un tuteur existant.
     *
     * @param int $id
     * @param array $donnees
     * @return ModePaiement
     */
    public function modifier(int $id, array $donnees): ModePaiement;

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
     * @return ModePaiement|null
     */
    public function trouverParId(int $id): ?ModePaiement;

    /**
     * Récupérer tous les tuteurs.
     *
     * @return Collection
     */
    public function tous(): Collection;
}
