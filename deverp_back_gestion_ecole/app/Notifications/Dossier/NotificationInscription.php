<?php

namespace App\Notifications\Dossier;

use App\Models\Inscription;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NotificationInscription extends Notification implements ShouldQueue
{
    use Queueable;

    private $inscription;

    public function __construct(Inscription $inscription)
    {
        $this->inscription = $inscription;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('🎉 Confirmation de votre inscription')
            ->view('emails.inscription.confirmation', [
                'inscription' => $this->inscription
            ]);
    }

    public function toArray($notifiable)
    {
        return [
            'inscription_id' => $this->inscription->id,
            'code_suivi' => $this->inscription->dossier->code_suivi,
        ];
    }
}
