<?php
namespace App\Listeners\Dossier;

use App\Events\Dossier\DossierValide;
use App\Notifications\Dossier\ValidationDossierNotification;
use Illuminate\Contracts\Queue\ShouldQueue;

class EnvoyerNotificationValidation implements ShouldQueue
{
    public function handle(DossierValide $event)
    {
        // Récupérer l'inscription associée au dossier validé
        $inscription = $event->dossier->inscription;

        // Vérifiez que l'inscription existe avant d'essayer d'envoyer une notification
        if ($inscription) {
            // Envoyer la notification avec l'inscription
            $inscription->notify(new ValidationDossierNotification($inscription));
        }
    }
}
