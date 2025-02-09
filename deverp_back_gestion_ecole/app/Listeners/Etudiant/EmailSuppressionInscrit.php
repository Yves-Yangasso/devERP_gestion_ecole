<?php

namespace App\Listeners\Etudiant;

use App\Events\Etudiant\InscriptionSupprimer;
use App\Notifications\Etudiant\SuppressionInscription;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class EmailSuppressionInscrit implements ShouldQueue
{

    public function handle(InscriptionSupprimer $event)
    {
        $event->inscription->notify(new SuppressionInscription($event->inscription));
    }

    public function failed(InscriptionSupprimer $event, $exception)
    {
        Log::error("Echec de l' envoie du messsage", [
            "ERREUR" => $exception->getMessage(),
            "Utilisateur" => $event->inscription->id_compte__user
        ]);
    }
}
