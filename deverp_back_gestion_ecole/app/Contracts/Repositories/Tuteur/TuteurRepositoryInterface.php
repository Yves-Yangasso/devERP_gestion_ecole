<?php

namespace App\Contracts\Repositories\Tuteur;

use App\Models\Tuteur;
use Illuminate\Support\Collection;

interface TuteurRepositoryInterface
{
    /**
     * Créer un nouveau tuteur.
     *
     * @param array $donnees
     * @return Tuteur
     */
    public function creer(array $donnees): Tuteur;

    /**
     * Modifier un tuteur existant.
     *
     * @param int $id
     * @param array $donnees
     * @return Tuteur
     */
    public function modifier(int $id, array $donnees): Tuteur;

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
     * @return Tuteur|null
     */
    public function trouverParId(int $id): ?Tuteur;

    /**
     * Récupérer tous les tuteurs.
     *
     * @return Collection
     */
    public function tous(): Collection;
}
