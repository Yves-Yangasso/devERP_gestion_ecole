<?php
// app/Providers/RepositoryServiceProvider.php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Contracts\Repositories\Etudiant\EtudiantRepositoryInterface;
use App\Contracts\Repositories\Etudiant\ProfilEtudiantRepositoryInterface;
use App\Contracts\Repositories\Etudiant\InscriptionRepositoryInterface;
use App\Repositories\Eloquent\EtudiantRepository;
use App\Repositories\Eloquent\ProfilEtudiantRepository;
use App\Repositories\Eloquent\InscriptionRepository;
use App\Contracts\Repositories\Tuteur\TuteurRepositoryInterface;
use App\Repositories\Eloquent\TuteurRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(EtudiantRepositoryInterface::class, EtudiantRepository::class);
        $this->app->bind(ProfilEtudiantRepositoryInterface::class, ProfilEtudiantRepository::class);
        $this->app->bind(InscriptionRepositoryInterface::class, InscriptionRepository::class);
        $this->app->bind(TuteurRepositoryInterface::class, TuteurRepository::class);

    }

}
