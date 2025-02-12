<?php

namespace App\Jobs\Dossier;

use App\Models\{Document, Dossier};
use App\Services\Dossier\IAValidationService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;


class AnalyserDocumentIA implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        private readonly Document $document
    ) {}

    public function handle(IAValidationService $validationService): void
    {
        try {
            $validationService->validerDocumentIA($this->document);
        } catch (\Exception $e) {
            Log::error('Erreur lors de l\'analyse IA:', [
                'document_id' => $this->document->id,
                'error' => $e->getMessage()
            ]);
            
            // Marquer pour une vérification manuelle en cas d'erreur
            $this->document->update([
                'statut' => 'a_verifier',
                'commentaire' => 'Erreur lors de l\'analyse automatique'
            ]);
        }
    }
}