<?php

namespace App\Providers;

use App\Contracts\Repositories\Document\DocumentRepositoryInterface as DocumentDocumentRepositoryInterface;
use App\Contracts\Repositories\Dossier\DossierRepositoryInterface as DossierDossierRepositoryInterface;
use App\Repositories\Eloquent\Document\DocumentRepository;
use App\Repositories\Eloquent\Dossier\DossierRepository;
use Illuminate\Support\ServiceProvider;
use App\Repositories\Eloquent\Dossier\DossierRepository as DossierDossierRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(DossierDossierRepositoryInterface::class, DossierDossierRepository::class);
        $this->app->bind(DocumentDocumentRepositoryInterface::class, DocumentRepository::class);
    }

    public function boot()
    {
        //
    }
}
