<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Eloquent\DossierRepository;
use App\Contracts\Repositories\Dossier\DossierRepositoryInterface;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(DossierRepositoryInterface::class, DossierRepository::class);
    }
}