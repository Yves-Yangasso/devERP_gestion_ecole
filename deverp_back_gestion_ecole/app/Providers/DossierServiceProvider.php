<?php

namespace App\Providers;

use App\Contracts\Repositories\Dossier\DossierRepositoryInterface;
use App\Repositories\Eloquent\DossierRepository;
use App\Services\Dossier\{DossierService, ValidationService, IAValidationService};
use Illuminate\Support\ServiceProvider;

class DossierServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // Binding du repository
        $this->app->bind(DossierRepositoryInterface::class, DossierRepository::class);

        // Binding des services
        $this->app->singleton(DossierService::class, function ($app) {
            return new DossierService(
                $app->make(DossierRepositoryInterface::class),
                $app->make(ValidationService::class)
            );
        });

        // Service de validation conditionnel selon la configuration
        $this->app->singleton(ValidationService::class, function ($app) {
            if (config('dossier.mode_validation') === 'automatique' && 
                config('dossier.ia_validation_enabled')) {
                return $app->make(IAValidationService::class);
            }
            return new ValidationService();
        });
    }

    public function boot(): void
    {
        // Publication de la configuration
        $this->publishes([
            __DIR__ . '/../config/dossier.php' => config_path('dossier.php'),
        ], 'dossier-config');
    }
}