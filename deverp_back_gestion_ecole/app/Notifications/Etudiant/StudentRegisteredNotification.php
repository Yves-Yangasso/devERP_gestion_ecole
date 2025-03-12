<?php
namespace App\Notifications\Etudiant;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Log;

class StudentRegisteredNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $student;
    protected $personalEmail;
    protected $defaultPassword = 'P@sser2025';

    public function __construct($student, string $personalEmail)
    {
        $this->student = $student;
        $this->personalEmail = $personalEmail;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        Log::info('Construction de l\'email pour : ' . $this->personalEmail);
        return (new MailMessage)
            ->subject('Bienvenue au Groupe ISI - Vos identifiants de connexion')
            ->markdown('emails.etudiant.registered', [
                'student' => $this->student,
                'defaultPassword' => $this->defaultPassword,
                'loginUrl' => url('/login'),
            ]);
    }

    /**
     * Définir le destinataire personnalisé pour l'email
     */
    public function routeNotificationForMail($notifiable)
    {
        return $this->personalEmail;
    }
}
