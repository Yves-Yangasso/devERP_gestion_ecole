<?php
//app/Services/Dossier/ValidationDossierService.php
namespace App\Services\Dossier;

use App\Models\Dossier;
use App\Models\Inscription;
use App\Events\Dossier\DossierValide;
use App\Jobs\Dossier\EnvoyerNotificationValidation;
use App\Enums\Dossier\StatutDocument;
use App\Enums\Dossier\StatutDossier;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Exception;

class ValidationDossierService
{
    /**
     * Valider un dossier d'inscription
     */
    public function validerDossier(int $dossierId): bool
    {
        DB::beginTransaction();
        try {
            $dossier = Dossier::with(['documents', 'inscription'])->findOrFail($dossierId);

            // Vérifier si tous les documents sont présents et valides
            $tousDocumentsValides = $dossier->documents->every(function ($document) {
                return $document->statut === StatutDocument::VALIDE;
            });

            if (!$tousDocumentsValides) {
                throw new Exception('Tous les documents ne sont pas validés');
            }

            // Mettre à jour le statut du dossier
            $dossier->update([
                'statut' => StatutDossier::VALIDE,
                'date_validation' => now(),
                'commentaire_validation' => 'Dossier complet et validé'
            ]);

            // Déclencher l'événement de validation du dossier
            event(new DossierValide($dossier));

            // Envoyer la notification de manière asynchrone
            EnvoyerNotificationValidation::dispatch($dossier->inscription->id)
                ->onQueue('notifications');

            DB::commit();
            return true;
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Erreur lors de la validation du dossier: ' . $e->getMessage());
            throw new Exception('Erreur lors de la validation du dossier: ' . $e->getMessage());
        }
    }

    /**
     * Vérifier l'état des documents d'un dossier
     */
    public function verifierEtatDocuments(int $dossierId): array
    {
        $dossier = Dossier::with('documents')->findOrFail($dossierId);

        $statutsDocuments = $dossier->documents->map(function ($document) {
            return [
                'id' => $document->id,
                'type' => $document->type,
                'statut' => $document->statut,
                'valide' => $document->statut === StatutDocument::VALIDE
            ];
        });

        $tousValides = $statutsDocuments->every(function ($document) {
            return $document['valide'];
        });

        return [
            'dossier_id' => $dossier->id,
            'documents' => $statutsDocuments,
            'tous_valides' => $tousValides,
            'peut_etre_valide' => $tousValides
        ];
    }

    /**
     * Récupérer la liste des dossiers validés
     */
    public function getDossiersValides()
    {
        return Dossier::where('statut', StatutDossier::VALIDE)
            ->with(['inscription', 'documents'])
            ->orderBy('date_validation', 'desc')
            ->get();
    }

    public function isDossierValide(int $dossierId): bool
{
    $dossier = Dossier::find($dossierId);

    return $dossier && $dossier->statut === 'valide'; // Supposons que le champ `statut` gère l'état du dossier
}
}
