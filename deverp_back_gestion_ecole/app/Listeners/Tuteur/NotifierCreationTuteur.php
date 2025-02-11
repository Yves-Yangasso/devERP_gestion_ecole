<?php

namespace App\Listeners\Tuteur;

use Illuminate\Contracts\Queue\ShouldQueue;
use App\Events\Tuteur\TuteurCree;
use App\Events\Tuteur\TuteurModifie;
use App\Notifications\Tuteur\NotificationCreationTuteur;
use App\Notifications\Tuteur\NotificationModificationProfil;

class NotifierCreationTuteur implements ShouldQueue
{
    public function handle(TuteurCree $event)
    {
        $event->tuteur->notify(new NotificationCreationTuteur($event->tuteur));
    }
}
