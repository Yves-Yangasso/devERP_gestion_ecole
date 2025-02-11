<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Contracts\Repositories\Tuteur\TuteurRepositoryInterface;
use App\Repositories\Eloquent\TuteurRepository;

class TuteurServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(
            TuteurRepositoryInterface::class, 
            TuteurRepository::class
        );
    }

    public function boot()
    {
        // Configuration des événements, listeners, etc.
    }
}