<?php

namespace App\Listeners\Tuteur;

use Illuminate\Contracts\Queue\ShouldQueue;
use App\Events\Tuteur\TuteurModifie;
use App\Notifications\Tuteur\NotificationModificationProfil;

class MettreAJourAssociations implements ShouldQueue
{
    public function handle(TuteurModifie $event)
    {
        $event->tuteur->notify(new NotificationModificationProfil($event->tuteur));
    }
}
