<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Contracts\Auth\AuthentificationServiceInterface;
use App\Services\Auth\AuthentificationPassport;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(AuthentificationServiceInterface::class, AuthentificationPassport::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
