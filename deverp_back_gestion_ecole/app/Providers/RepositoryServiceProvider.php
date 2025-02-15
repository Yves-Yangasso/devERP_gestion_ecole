<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Eloquent\DossierRepository;
use App\Contracts\Repositories\Dossier\DossierRepositoryInterface;
use App\Contracts\Repositories\Dossier\TypeDocumentRepositoryInterface;
use App\Repositories\Eloquent\TypeDocumentRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(DossierRepositoryInterface::class, DossierRepository::class);
        $this->app->bind(TypeDocumentRepositoryInterface::class, TypeDocumentRepository::class);
    }
}
