<?php

namespace App\Listeners\Etudiant;

use App\Events\Etudiant\EtudiantInscrit;
use App\Jobs\Etudiant\EnvoyerNotificationInscription;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class EnvoyerEmailInscription implements ShouldQueue
{
    use InteractsWithQueue;

    /**
     * Handle the event.
     */
    public function handle(EtudiantInscrit $event): void
    {
        EnvoyerNotificationInscription::dispatch($event->inscription->id)
            ->onQueue('notifications');
    }
}