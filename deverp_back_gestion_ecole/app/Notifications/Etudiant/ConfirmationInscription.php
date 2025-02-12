<?php

namespace App\Notifications\Etudiant;

use App\Models\Inscription;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class ConfirmationInscription extends Notification implements ShouldQueue
{
    use Queueable;

    protected $student;

    public function __construct(Inscription $student)
    {
        $this->student = $student;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Confirmation de votre inscription et code de suivi')
            ->greeting('Bonjour ' . $this->student->prenom . ' ' . $this->student->nom . ',')
            ->line('Votre inscription a bien été enregistrée !')
            ->line('Pour suivre l\'avancement de votre dossier, utilisez le code de suivi ci-dessous :')
            ->line('** Code de suivi : ' . $this->student->code_suivi . '**')
            ->action('Suivre mon inscription', url('/suivi-inscription?code=' . $this->student->code_suivi))
            ->line('Merci de votre confiance et à bientôt !')
            ->line('Cordialement, l\'équipe de gestion.');
    }
}
