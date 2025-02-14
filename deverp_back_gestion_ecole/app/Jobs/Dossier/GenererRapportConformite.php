<?php

namespace App\Jobs\Dossier;

use App\Models\{Document, Dossier};
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;


class GenererRapportConformite implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        private readonly Dossier $dossier
    ) {}

    public function handle(): void
    {
        try {
            $rapport = [
                'dossier_id' => $this->dossier->id,
                'code_suivi' => $this->dossier->code_suivi,
                'date_generation' => now()->format('Y-m-d H:i:s'),
                'documents' => [],
                'statut_global' => $this->dossier->statut,
                'documents_manquants' => $this->dossier->documentsManquants(),
            ];

            foreach ($this->dossier->documents as $document) {
                $validations = $document->validations()->latest()->first();
                
                $rapport['documents'][] = [
                    'type' => $document->type,
                    'statut' => $document->statut,
                    'date_validation' => $document->date_validation?->format('Y-m-d H:i:s'),
                    'validateur_type' => $validations?->validateur_type,
                    'score_confiance' => $validations?->score_confiance,
                    'commentaire' => $document->commentaire,
                ];
            }

            // Stocker le rapport (à adapter selon vos besoins)
            Storage::disk('local')->put(
                "rapports/dossier_{$this->dossier->code_suivi}.json",
                json_encode($rapport, JSON_PRETTY_PRINT)
            );

        } catch (\Exception $e) {
            Log::error('Erreur lors de la génération du rapport:', [
                'dossier_id' => $this->dossier->id,
                'error' => $e->getMessage()
            ]);
        }
    }
}