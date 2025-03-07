<?php
namespace App\Console\Commands;

use App\Jobs\SendValidationEmail_For_All_Directory;
use Illuminate\Console\Command;
use App\Models\Dossier;
class CheckValidDossiers extends Command
{
    protected $signature = 'dossiers:check-valid {dossier_id?}';
    protected $description = 'Vérifie les dossiers validés et envoie un email aux utilisateurs';

    public function handle()
{
    $dossierId = $this->argument('dossier_id'); // Peut être NULL si non fourni

    if ($dossierId) {
        // Vérifier un seul dossier
        $dossier = Dossier::find($dossierId);
        if ($dossier && $dossier->statut === 'valide' &&
            (is_null($dossier->email_envoye_at) || $dossier->email_envoye_at < now()->subHour())) {

            dispatch(new SendValidationEmail_For_All_Directory($dossier));
            $dossier->update(['email_envoye_at' => now()]);
            $this->info("Email envoyé pour le dossier ID: $dossierId.");
        } else {
            $this->info("Aucun email envoyé pour ce dossier (déjà traité ou non valide).");
        }
    } else {
        // Vérifier tous les dossiers valides
        $dossiers = Dossier::where('statut', 'valide')
            ->whereNull('deleted_at')
            ->where(function ($query) {
                $query->whereNull('email_envoye_at')
                      ->orWhere('email_envoye_at', '<', now()->subHour());
            })
            ->get();

        foreach ($dossiers as $dossier) {
            dispatch(new SendValidationEmail_For_All_Directory($dossier));
            $dossier->update(['email_envoye_at' => now()]);
        }

        $this->info(count($dossiers) . ' emails envoyés.');
    }
}

}
