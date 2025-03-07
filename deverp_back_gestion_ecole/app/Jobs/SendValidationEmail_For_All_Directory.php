<?php
namespace App\Jobs;

use App\Models\Dossier;
use App\Models\Inscription;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Mail\ValidationEmail_For_All_Directory;

class SendValidationEmail_For_All_Directory implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $dossier;

    public function __construct(Dossier $dossier)
    {
        $this->dossier = $dossier;
    }

    public function handle()
    {
        $inscription = Inscription::find($this->dossier->inscription_id);
        if (!$inscription) {
            return;
        }

        // Générer un mot de passe temporaire
        $password = Str::random(10);

        // Créer un lien pour poursuivre l'inscription
        $url = url('/inscription/complete?email=' . $inscription->email . '&code_suivi=' . $this->dossier->code_suivi);

        // Envoyer l'email
        Mail::to($inscription->email)->send(new ValidationEmail_For_All_Directory($inscription, $this->dossier, $password, $url));
    }
}
