<?php

namespace App\Services\Paiement;

use App\Contracts\Repositories\Paiement\ModePaiementRepositoryInterface;
use App\Models\ModePaiement;
use Illuminate\Support\Collection;

class ModePaiementService
{
    protected ModePaiementRepositoryInterface $modePaiementRepository;

    public function __construct(ModePaiementRepositoryInterface $modePaiementRepository)
    {
        $this->modePaiementRepository = $modePaiementRepository;
    }

    public function creer(array $donnees): ModePaiement
    {
        return $this->modePaiementRepository->creer($donnees);
    }

    public function modifier(int $id, array $donnees): ModePaiement
    {
        return $this->modePaiementRepository->modifier($id, $donnees);
    }

    public function supprimer(int $id): void
    {
        $this->modePaiementRepository->supprimer($id);
    }

    public function trouverParId(int $id): ?ModePaiement
    {
        return $this->modePaiementRepository->trouverParId($id);
    }

    public function tous(): Collection
    {
        return $this->modePaiementRepository->tous();
    }
}
