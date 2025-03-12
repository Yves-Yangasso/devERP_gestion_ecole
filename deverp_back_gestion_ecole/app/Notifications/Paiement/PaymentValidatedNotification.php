<?php

namespace App\Notifications\Paiement;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Log;

class PaymentValidatedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $paiement;
    protected $personalEmail;

    public function __construct($paiement, string $personalEmail)
    {
        $this->paiement = $paiement;
        $this->personalEmail = $personalEmail;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        Log::info('Construction de la facture pour : ' . $this->personalEmail);

        return (new MailMessage)
            ->subject('Groupe ISI - Votre facture de paiement')
            ->markdown('emails.paiement.validated', [
                'paiement' => $this->paiement,
            ]);
    }

    public function routeNotificationForMail($notifiable)
    {
        Log::info('Destinataire défini pour la facture : ' . $this->personalEmail);
        return $this->personalEmail;
    }
}
