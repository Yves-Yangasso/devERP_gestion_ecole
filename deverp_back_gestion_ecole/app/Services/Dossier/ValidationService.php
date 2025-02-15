<?php

namespace App\Services\Dossier;

use App\Models\{Document, ValidationDocument};
use Illuminate\Support\Facades\Auth;

class ValidationService
{
    /**
     * Valider un document manuellement
     */
    public function validerDocument(Document $document, array $data): void
    {
        if (!$document instanceof Document) {
            throw new \Exception('Le document fourni n\'est pas valide.');
        }

        $document->update([
            'statut' => $data['resultat'],
            'commentaire' => $data['commentaire'] ?? null,
            'date_validation' => now(),
        ]);

        ValidationDocument::create([
            'document_id' => $document->id,
            'validateur_type' => 'utilisateur',
            'validateur_id' => Auth::id(), // Assurez-vous que l'utilisateur est authentifié
            'commentaire' => $data['commentaire'] ?? null,
        ]);

        $document->dossier->mettreAJourStatut();
    }
}
