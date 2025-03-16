<?php
// app/Notifications/Etudiant/ConfirmationInscription.php

namespace App\Notifications\Etudiant;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ConfirmationInscription extends Notification implements ShouldQueue
{
    use Queueable;

    protected $inscription;

    public function __construct($inscription)
    {
        $this->inscription = $inscription;
    }

    public function via($notifiable)
    {
        return ['mail', 'database', 'sms'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Confirmation d\'inscription - ISI')
            ->greeting('Cher(e) ' . $notifiable->prenom)
            ->line('Votre inscription a été validée avec succès.')
            ->line('Détails de l\'inscription :')
            ->line('Classe : ' . $this->inscription->classe->nom)
            ->line('Année académique : ' . $this->inscription->annee_academique)
            ->action('Voir les détails', url('/espace-etudiant/inscription'))
            ->line('Vous pouvez maintenant accéder à tous nos services.');
    }

    public function toArray($notifiable)
    {
        return [
            'type' => 'inscription',
            'message' => 'Inscription validée',
            'inscription_id' => $this->inscription->id
        ];
    }
}