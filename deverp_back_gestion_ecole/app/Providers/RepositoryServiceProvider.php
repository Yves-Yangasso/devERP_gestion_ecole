<?php

namespace App\Providers;

use App\Contracts\Repositories\Departement\DepartementRepositoryInterface;
use App\Contracts\Repositories\Document\DocumentRepositoryInterface as DocumentDocumentRepositoryInterface;
use App\Contracts\Repositories\Dossier\DossierRepositoryInterface as DossierDossierRepositoryInterface;
use App\Contracts\Repositories\Filieres\FiliereRepositoryInterface;
use App\Repositories\Eloquent\Departement\DepartementRepository;
use App\Repositories\Eloquent\Document\DocumentsRepository;
use Illuminate\Support\ServiceProvider;
use App\Repositories\Eloquent\Dossier\DossierRepository as DossierDossierRepository;
use App\Repositories\Eloquent\Filieres\FiliereRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(DossierDossierRepositoryInterface::class, DossierDossierRepository::class);
        $this->app->bind(DocumentDocumentRepositoryInterface::class, DocumentsRepository::class);
        $this->app->bind( DepartementRepositoryInterface::class,DepartementRepository::class);
        $this->app->bind( FiliereRepositoryInterface::class,FiliereRepository::class);
    }

    public function boot()
    {
        //
    }
}
