<?php

namespace App\Services\Dossier;

use App\Contracts\Repositories\Dossier\DossierRepositoryInterface;
use App\Events\Dossier\DossierCree;
use App\Events\Dossier\DocumentSoumis;
use App\Models\Dossier;
use App\Models\Document;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Collection;

class DossierService
{
    public function __construct(
        private readonly DossierRepositoryInterface $dossierRepository,
        private readonly ValidationService $validationService
    ) {}

    /**
     * Crée un nouveau dossier
     *
     * @param array $data
     * @param int|null $etudiantId
     * @return Dossier
     */
    public function creerDossier(array $data, ?int $etudiantId = null): Dossier
    {
        if (isset($etudiantId)) {
            $data['etudiant_id'] = $etudiantId;
        }

        $dossier = $this->dossierRepository->create($data);

        // Récupérer la liste des documents requis depuis la configuration
        $documentsRequis = config('dossier.documents_requis', []);

        // Déclencher l'événement avec les bons paramètres
        event(new DossierCree($dossier->code_suivi, $documentsRequis));

        return $dossier;
    }

    public function ajouterDocument(Dossier $dossier, array $documentData): Document
    {
        // Vérifier que le fichier est présent
        if (!isset($documentData['fichier'])) {
            throw new \InvalidArgumentException('Le fichier est requis');
        }

        // Traiter et stocker le fichier
        $chemin = $this->stockerDocument($documentData['fichier'], $dossier->code_suivi);

        // Associer le chemin au document
        $documentData['chemin'] = $chemin;

        // Créer le document dans la base de données
        $document = $dossier->documents()->create($documentData);

        // Déclencher l'événement avec le bon objet
        event(new DocumentSoumis($document, $documentData['type']));

        // Lancer la validation si le mode automatique est activé
        if (config('dossier.mode_validation') === 'automatique') {
            $this->validationService->validerDocument($document, $documentData['type']);
        }

        return $document;
    }

    public function getDossierParCodeSuivi(string $codeSuivi): ?Dossier
    {
        return $this->dossierRepository->findByCodeSuivi($codeSuivi);
    }

    private function stockerDocument($fichier, string $codeSuivi): string
    {
        if (!$fichier) {
            throw new \InvalidArgumentException('Le fichier est invalide');
        }

        $nomFichier = uniqid() . '.' . $fichier->getClientOriginalExtension();
        $chemin = "dossiers/{$codeSuivi}/{$nomFichier}";

        Storage::disk('public')->putFileAs(
            "dossiers/{$codeSuivi}",
            $fichier,
            $nomFichier
        );

        return $chemin;
    }

    public function getDossiersByStatut(string $statut): Collection
    {
        return $this->dossierRepository->getByStatut($statut);
    }

    public function mettreAJourStatutDocuments(array $donnees): bool
    {
        $dossierId = $donnees['id']; // L'ID du dossier
        $documents = $donnees['documents']; // Liste des documents

        foreach ($documents as $document) {
            $this->dossierRepository->updateStatusDocument($dossierId, $document['id'], $document['status']);
        }

        return true;
    }
}
