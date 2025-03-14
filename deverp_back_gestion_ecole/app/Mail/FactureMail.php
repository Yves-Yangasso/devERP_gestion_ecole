<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class FactureMail extends Mailable
{
    use Queueable, SerializesModels;

    public $facture;

    /**
     * Crée une nouvelle instance du mail.
     */
    public function __construct($facture)
    {
        $this->facture = $facture;
    }

    /**
     * Définit l'enveloppe du mail (expéditeur, sujet).
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Votre Facture'
        );
    }

    /**
     * Définit le contenu du mail (vue utilisée).
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.facture',
            with: ['facture' => $this->facture]
        );
    }

    /**
     * Ajoute des pièces jointes (si nécessaire).
     */
    public function attachments(): array
    {
        return [];
    }
}
