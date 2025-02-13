<?php
namespace App\Services\Etudiant;

use App\Models\Inscription;
use App\Models\Tuteur;
use App\Models\Dossier;
use App\Models\Document;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Exception;
use Illuminate\Support\Facades\Log;

class InscriptionService
{
    public function createCompleteInscription(array $data)
    {
        try {
            DB::beginTransaction();

            // Créer les tuteurs
            $tuteurIds = [];
            foreach ($data['tuteurs'] as $tuteurData) {
                $tuteur = Tuteur::create($tuteurData);
                $tuteurIds[] = $tuteur->id;
            }

            // Créer l'inscription
            $inscription = Inscription::create(array_merge(
                $data['etudiant'],
                ['id_tuteur' => $tuteurIds[0]]
            ));

            // Créer le dossier
            $dossier = Dossier::create([
                'inscription_id' => $inscription->id,
                'titre' => $data['dossier']['titre'], // Changé de 'nom' à 'titre'
                'description' => $data['dossier']['description'],
                'code_suivi' => 'DOS-' . strtoupper(Str::random(12)),
                'statut' => 'en_attente'
            ]);

            // Créer les documents
            foreach ($data['dossier']['documents'] as $documentData) {
                Document::create([
                    'dossier_id' => $dossier->id,
                    'type_document' => $documentData['type_document'],
                    'chemin_fichier' => $documentData['chemin_fichier']
                ]);
            }

            DB::commit();

            return $this->getInscriptionComplete($inscription->id);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Erreur lors de l\'inscription : ' . $e->getMessage());
            throw new Exception('Erreur lors de l\'inscription : ' . $e->getMessage());
        }
    }

    public function getInscriptionComplete($id)
    {
        return Inscription::with(['tuteur', 'dossier.documents'])
            ->findOrFail($id);
    }

    public function getAllInscriptionsComplete()
    {
        return Inscription::with(['tuteur', 'dossier.documents'])
            ->get();
    }
}