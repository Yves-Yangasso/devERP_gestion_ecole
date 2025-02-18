<?php

namespace App\Jobs\Etudiant;

use App\Models\Inscription;
use App\Notifications\Dossier\NotificationInscription;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class EnvoyerNotificationInscription implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $inscriptionId;

    /**
     * Create a new job instance.
     */
    public function __construct(int $inscriptionId)
    {
        $this->inscriptionId = $inscriptionId;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            $inscription = Inscription::with('dossier')->find($this->inscriptionId);
            
            if ($inscription) {
                $inscription->notify(new NotificationInscription($inscription));
                Log::info("Notification d'inscription envoyée pour l'inscription #{$inscription->id}");
            } else {
                Log::warning("Impossible d'envoyer la notification: inscription #{$this->inscriptionId} non trouvée");
            }
        } catch (\Exception $e) {
            Log::error("Erreur lors de l'envoi de la notification d'inscription dans le job: " . $e->getMessage());
            $this->fail($e);
        }
    }
}