<?php

namespace App\Notifications\Etudiant;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class Confirmation extends Mailable
{
    use Queueable, SerializesModels;

    public $nom;
    public $codeSuivi;

    public function __construct($nom, $codeSuivi)
    {
        $this->nom = $nom;
        $this->codeSuivi = $codeSuivi;
    }

    public function build()
    {
        return $this->subject('Votre inscription est confirmée !')
                    ->view('emails.confirmation_inscription')
                    ->with([
                        'nom' => $this->nom,
                        'codeSuivi' => $this->codeSuivi,
                    ]);
    }
}
