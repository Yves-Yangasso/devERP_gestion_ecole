<?php
namespace App\Providers;
use App\Events\InscriptionSupprimer;
use App\Events\Etudiant\EtudiantCree;
use App\Events\Etudiant\EtudiantInscrit;
use App\Listeners\Etudiant\GenererCarteEtudiant;
use App\Listeners\Etudiant\EnvoyerEmailBienvenue;
use App\Listeners\Etudiant\EmailSuppressionInscrit;
use App\Notifications\Etudiant\NotificationNouvelleInscription;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    protected $listener = [
        EtudiantCree::class =>[
            // GenererCarteEtudiant::class,
            EnvoyerEmailBienvenue::class,

        ],
        EtudiantInscrit::class =>[
            NotificationNouvelleInscription::class,
        ],
        InscriptionSupprimer::class => [
            EmailSuppressionInscrit::class,
        ],

    ];
}
