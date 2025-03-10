<?php
namespace App\Notifications\Dossier;

use App\Models\Dossier;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use App\Enums\Dossier\StatutDossier;

class ResultatValidationDossier extends Notification
{
    protected $dossier;

    public function __construct(Dossier $dossier)
    {
        $this->dossier = $dossier;
    }

    // Ajoute cette méthode pour spécifier le canal de notification
    public function via($notifiable)
    {
        return ['mail']; // Utilisation du canal e-mail
    }

    public function toMail($notifiable)
    {
        $mailMessage = new MailMessage;

        if ($this->dossier->statut === StatutDossier::VALIDE) {
            return $mailMessage
                ->subject('Votre dossier a été validé')
                ->line('Félicitations ! Votre dossier a été validé avec succès.')
                ->line('Vous pouvez maintenant procéder aux étapes suivantes de votre inscription.');
        }

        return $mailMessage
            ->subject('Mise à jour de votre dossier')
            ->line('Certains documents de votre dossier nécessitent une révision.')
            ->action('Voir les détails', url('/dossier/' . $this->dossier->id))
            ->line('Veuillez soumettre à nouveau les documents manquants ou invalides.');
    }
}
