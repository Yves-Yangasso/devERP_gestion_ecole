<?php
namespace App\Notifications\Etudiant;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class StudentRegisteredNotification extends Notification implements ShouldQueue {
    use Queueable;

    public function via($notifiable) {
        return ['mail'];
    }

    public function toMail($notifiable) {
        return (new MailMessage)
            ->subject('Bienvenue dans notre école')
            ->line('Votre inscription est bien validée.')
            ->action('Accéder à votre compte', url('/login'));
    }
}
