<?php
//app/Notifications/Dossier/ValidationDossierNotification.php
namespace App\Notifications\Dossier;

use App\Models\Inscription;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ValidationDossierNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $inscription;

    /**
     * Create a new notification instance.
     */
    public function __construct(Inscription $inscription)
    {
        $this->inscription = $inscription;
    }
    public function via($notifiable): array
    {
        return ['mail', 'database']; // Utilisez 'database' pour les notifications in-app
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail($notifiable): MailMessage
    {
        $paiementUrl = url('/etudiant/paiement/' . $this->inscription->id);

        return (new MailMessage)
            ->subject('Félicitations - Votre dossier a été validé')
            ->greeting('Bonjour ' . $this->inscription->prenom . ' ' . $this->inscription->nom . ',')
            ->line('Nous avons le plaisir de vous informer que votre dossier d\'inscription a été validé avec succès.')
            ->line('Vous pouvez maintenant procéder au paiement des frais d\'inscription pour finaliser votre admission.')
            ->action('Procéder au paiement', $paiementUrl)
            ->line('Une fois le paiement effectué, vous recevrez votre carte d\'étudiant et votre certificat de scolarité.')
            ->line('Montant à payer: XXX FCFA')
            ->line('Code de suivi: ' . ($this->inscription->dossier ? $this->inscription->dossier->code_suivi : 'Non disponible'))
            ->line('En cas de questions, n\'hésitez pas à nous contacter.')
            ->salutation('Cordialement, l\'équipe pédagogique');
    }

    /**
     * Get the array representation of the notification.
     */
    public function toArray($notifiable): array
    {
        return [
            'inscription_id' => $this->inscription->id,
            'message' => 'Votre dossier d\'inscription a été validé. Veuillez procéder au paiement.',
            'code_suivi' => $this->inscription->dossier ? $this->inscription->dossier->code_suivi : null,
            'date_validation' => now()->toDateTimeString(),
            'action_url' => '/etudiant/paiement/' . $this->inscription->id,
            'action_text' => 'Procéder au paiement'
        ];
    }
}
