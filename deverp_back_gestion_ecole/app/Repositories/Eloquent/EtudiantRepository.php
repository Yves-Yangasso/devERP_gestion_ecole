<?php
// app/Repositories/Eloquent/EtudiantRepository.php

namespace App\Repositories\Eloquent;

use App\Models\Etudiant;
use App\Contracts\Repositories\Etudiant\EtudiantRepositoryInterface;

class EtudiantRepository extends BaseRepository implements EtudiantRepositoryInterface
{
    public function __construct(Etudiant $model)
    {
        parent::__construct($model);
    }

    public function trouverParMatricule(string $matricule)
    {
        return $this->model->where('matricule', $matricule)->firstOrFail();
    }

    public function trouverParEmail(string $email)
    {
        return $this->model->where('email', $email)->first();
    }

    public function etudiantsActifs()
    {
        return $this->model->where('statut', 'ACTIF')
            ->orderBy('nom')
            ->get();
    }

    public function etudiantsParStatut(string $statut)
    {
        return $this->model->where('statut', $statut)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function rechercherEtudiants(string $terme)
    {
        return $this->model->where('nom', 'LIKE', "%{$terme}%")
            ->orWhere('prenom', 'LIKE', "%{$terme}%")
            ->orWhere('matricule', 'LIKE', "%{$terme}%")
            ->orWhere('email', 'LIKE', "%{$terme}%")
            ->paginate(15);
    }

    public function mettreAJourStatut($id, string $statut)
    {
        $etudiant = $this->trouverParId($id);
        $etudiant->statut = $statut;
        $etudiant->save();
        return $etudiant;
    }
    public function create(array $donnees)
    {
        $donnees['matricule'] = $this->genererMatricule();
        return $this->model->create($donnees);
    }
    public function getDernierMatricule()
    {
        return $this->model->orderBy('id', 'desc')->first();
    }
    private function genererMatricule(): string
    {
        $annee = date('Y');
        $prefix = 'ISI';
        $dernierEtudiant = $this->getDernierMatricule();

        if ($dernierEtudiant) {
            $numero = intval(substr($dernierEtudiant->matricule, -4)) + 1;
        } else {
            $numero = 1;
        }

        return $prefix . $annee . str_pad($numero, 4, '0', STR_PAD_LEFT);
    }
    public function findById($id)
    {
        return $this->model->findOrFail($id);
    }
}
