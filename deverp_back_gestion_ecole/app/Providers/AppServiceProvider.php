<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Contracts\Auth\AuthentificationServiceInterface;
use App\Contracts\Repositories\Paiement\LignePaiementRepositoryInterface;
use App\Contracts\Repositories\Paiement\ModePaiementRepositoryInterface;
use App\Contracts\Services\Document\CloudStorageInterface;
use App\Repositories\Eloquent\LignePaiementRepository;
use App\Repositories\Eloquent\ModePaiementRepository;
use App\Services\Auth\AuthentificationPassport;
use App\Services\Storage\CloudinaryStorageService;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(AuthentificationServiceInterface::class, AuthentificationPassport::class);
        $this->app->bind(CloudStorageInterface::class, CloudinaryStorageService::class);
        $this->app->bind(ModePaiementRepositoryInterface::class, ModePaiementRepository::class);
        $this->app->bind(LignePaiementRepositoryInterface::class,LignePaiementRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
