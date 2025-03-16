<?php

namespace App\Notifications\Dossier;

use App\Models\Inscription;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\MailMessage as Mailable;
use Illuminate\Notifications\Notification;

class ValidationDossierNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $inscription;
    protected $password;

    /**
     * Crée une nouvelle instance de notification.
     */
    public function __construct(Inscription $inscription, $password = null)
    {
        $this->inscription = $inscription;
        $this->password = $password; // Optionnel si on envoie le mot de passe
    }

    /**
     * Définit les canaux de notification.
     */
    public function via($notifiable): array
    {
        return ['mail', 'database']; // Notification par email et en base de données
    }

    /**
     * Représentation de la notification sous forme d'email.
     */
    public function toMail($notifiable): Mailable
    {
        $paiementUrl = url('/etudiant/paiement/' . $this->inscription->id);
        $codeSuivi = $this->inscription->dossier ? $this->inscription->dossier->code_suivi : 'Non disponible';
        $dateSoumission = $this->inscription->dossier ? $this->inscription->dossier->date_soumission : 'Non disponible';

        return (new MailMessage)
            ->subject('🎉 Félicitations - Votre dossier a été validé !')
            ->greeting('Bonjour ' . $this->inscription->prenom . ' ' . $this->inscription->nom . ',')
            ->line('Nous avons le plaisir de vous informer que votre dossier d\'inscription a été validé avec succès.')
            ->line('Veuillez trouver ci-dessous les détails de votre inscription :')
            ->line('**📝 Détails de votre inscription :**')
            ->line('👤 **Nom :** ' . $this->inscription->nom)
            ->line('👤 **Prénom :** ' . $this->inscription->prenom)
            ->line('📧 **Email :** ' . $this->inscription->email)
            ->line('📅 **Date de soumission :** ' . $dateSoumission)
            ->line('✅ **Date de validation :** ' . now())
            ->line('🔑 **Code de suivi :** ' . $codeSuivi)
            ->line('**🔑 Vos accès :**')
            ->line('📧 **Email :** ' . $this->inscription->email)
            ->line('🔐 **Mot de passe :** ' . ($this->password ?? 'Déjà défini'))
            ->line('Vous pourrez le modifier après votre première connexion.')
            ->line('📌 **Poursuivez votre inscription en réglant les frais d\'inscription :**')
            ->action('Finaliser mon inscription', $paiementUrl)
            ->line('Une fois le paiement effectué, vous recevrez votre carte d\'étudiant et votre certificat de scolarité.')
            ->line('📞 En cas de questions, n\'hésitez pas à nous contacter.')
            ->salutation('Cordialement,
            L\'équipe pédagogique 🎓');
    }

    /**
     * Représentation de la notification sous forme de tableau.
     */
    public function toArray($notifiable): array
    {
        return [
            'inscription_id' => $this->inscription->id,
            'message' => 'Votre dossier d\'inscription a été validé. Veuillez procéder au paiement.',
            'code_suivi' => $this->inscription->dossier ? $this->inscription->dossier->code_suivi : null,
            'date_validation' => now()->toDateTimeString(),
            'action_url' => url('/etudiant/paiement/' . $this->inscription->id),
            'action_text' => 'Procéder au paiement'
        ];
    }
}
