<?php
namespace App\Providers;

use App\Events\Etudiant\EtudiantInscrit;
use App\Listeners\Etudiant\EnvoyerEmailBienvenue;
use Illuminate\Support\ServiceProvider;

use Illuminate\Support\Facades\Gate;

class EventServiceProvider extends ServiceProvider{
    protected $listen = [
        EtudiantInscrit::class => [
            EnvoyerEmailBienvenue::class,
        ],
        'App\Events\Dossier\DossierValide' => [
            'App\Listeners\Dossier\EnvoyerNotificationValidation',
            'App\Listeners\Dossier\EnregistrerHistoriqueValidation',
        ],
        'App\Events\Dossier\DossierInvalide' => [
            'App\Listeners\Dossier\EnvoyerNotificationInvalidation',
            'App\Listeners\Dossier\EnregistrerHistoriqueInvalidation',
        ],
    ];
}
