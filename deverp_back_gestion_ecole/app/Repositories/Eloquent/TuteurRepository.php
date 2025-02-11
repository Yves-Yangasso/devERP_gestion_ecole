<?php

namespace App\Repositories\Eloquent;

use App\Models\Tuteur;
use App\Contracts\Repositories\Tuteur\TuteurRepositoryInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Collection;

class TuteurRepository implements TuteurRepositoryInterface
{
    public function creer(array $donnees): Tuteur
    {
        return Tuteur::create($donnees);
    }

    public function modifier(int $id, array $donnees): Tuteur
    {
        $tuteur = Tuteur::findOrFail($id);
        $tuteur->update($donnees);
        return $tuteur;
    }

    public function supprimer(int $id): void
    {
        $tuteur = Tuteur::findOrFail($id);
        $tuteur->delete();
    }

    public function trouverParId(int $id): ?Tuteur
    {
        return Tuteur::find($id);
    }

    public function tous(): Collection
    {
        return Tuteur::all();
    }
}
