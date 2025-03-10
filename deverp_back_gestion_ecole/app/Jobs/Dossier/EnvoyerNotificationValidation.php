<?php
//app/Jobs/Dossier/EnvoyerNotificationValidation.php
namespace App\Jobs\Dossier;

use App\Models\Inscription;
use App\Notifications\Dossier\ValidationDossierNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class EnvoyerNotificationValidation implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $inscriptionId;

    /**
     * Le nombre de fois que le job peut être tenté.
     */
    public $tries = 3;

    /**
     * Le nombre de secondes avant que le job soit à nouveau disponible.
     */
    public $backoff = 60;

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
            $inscription = Inscription::with(['dossier', 'tuteur'])->find($this->inscriptionId);

            if (!$inscription) {
                Log::warning("Impossible d'envoyer la notification: inscription #{$this->inscriptionId} non trouvée");
                return;
            }

            if (!$inscription->dossier || $inscription->dossier->statut !== 'valide') {
                Log::warning("Dossier non validé pour l'inscription #{$this->inscriptionId}");
                return;
            }

            // Envoi de la notification
            $inscription->notify(new ValidationDossierNotification($inscription));

            // Log de succès
            Log::info("Notification de validation du dossier envoyée pour l'inscription #{$inscription->id}");
        } catch (\Exception $e) {
            Log::error("Erreur lors de l'envoi de la notification de validation: " . $e->getMessage());
            $this->fail($e);
        }
    }

    /**
     * Gérer l'échec du job.
     */
    public function failed(\Exception $exception): void
    {
        Log::error("Échec de l'envoi de la notification de validation pour l'inscription #{$this->inscriptionId}: " . $exception->getMessage());
    }
}
