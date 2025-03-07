<?php

namespace App\Mail;

use App\Models\Dossier;
use App\Models\Inscription;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ValidationEmail_For_All_Directory extends Mailable
{
    use Queueable, SerializesModels;

    public $inscription;
    public $dossier;
    public $password;
    public $url;

    public function __construct(Inscription $inscription, Dossier $dossier, $password, $url)
    {
        $this->inscription = $inscription;
        $this->dossier = $dossier;
        $this->password = $password;
        $this->url = $url;
    }

    public function build()
    {
        return $this->subject('Votre dossier a été validé !')
                    ->view('emails.validation')
                    ->with([
                        'inscription' => $this->inscription,
                        'dossier' => $this->dossier,
                        'password' => $this->password,
                        'url' => $this->url,
                    ]);
    }
}
