<?php

namespace App\Http\Resources\Dossier;

use Illuminate\Http\Resources\Json\ResourceCollection;

class DossierCollection extends ResourceCollection
{
    public function toArray($request): array
    {
        return [
            'data' => $this->collection->map(function ($dossier) {
                return [
                    'id' => $dossier->id,
                    'code_suivi' => $dossier->code_suivi,
                    'etudiant' => [
                        'id' => $dossier->etudiant->id,
                        'nom' => $dossier->etudiant->nom,
                        'prenom' => $dossier->etudiant->prenom,
                    ],
                    'statut' => $dossier->statut->value,
                    'documents_count' => $dossier->documents->count(),
                    'documents_valides_count' => $dossier->documents
                        ->where('statut', 'valide')
                        ->count(),
                    'date_soumission' => $dossier->date_soumission?->format('Y-m-d H:i:s'),
                    'derniere_modification' => $dossier->updated_at->format('Y-m-d H:i:s'),
                    'est_complet' => $dossier->estComplet(),
                ];
            }),
            'meta' => [
                'total' => $this->collection->count(),
                'dossiers_en_attente' => $this->collection
                    ->where('statut', 'en_attente')
                    ->count(),
                'dossiers_valides' => $this->collection
                    ->where('statut', 'valide')
                    ->count(),
                'dossiers_rejetes' => $this->collection
                    ->where('statut', 'rejete')
                    ->count(),
            ],
            'links' => [
                'self' => url()->current(),
            ],
        ];
    }

    public function with($request): array
    {
        return [
            'success' => true,
            'timestamp' => now()->toIso8601String(),
        ];
    }
}