<?php

namespace App\Services\Etudiant;

use App\Events\Etudiant\EtudiantInscrit;
use App\Notifications\Etudiant\Confirmation;
use App\Repositories\Eloquent\AssociationEtudiantTuteurRepository;
use App\Repositories\Eloquent\Document\DocumentsRepository;
use App\Repositories\Eloquent\Dossier\DossierRepository;
use App\Repositories\Eloquent\InscriptionRepository;
use App\Repositories\Eloquent\TuteurRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Exception;

class InscriptionService
{
    protected $inscriptionRepository;
    protected $tuteurRepository;
    protected $dossierRepository;
    protected $documentRepository;
    protected $association;

    public function __construct(
        InscriptionRepository $inscriptionRepository,
        TuteurRepository $tuteurRepository,
        DossierRepository $dossierRepository,
        DocumentsRepository $documentRepository,
        AssociationEtudiantTuteurRepository $associationEtudiant
    ) {
        $this->inscriptionRepository = $inscriptionRepository;
        $this->tuteurRepository = $tuteurRepository;
        $this->dossierRepository = $dossierRepository;
        $this->documentRepository = $documentRepository;
        $this->association = $associationEtudiant;
    }

    public function createInscription(array $data)
    {
        DB::beginTransaction();
        try {
            //  Créer l'inscription de l'étudiant
            $etudiant = $this->inscriptionRepository->create($data['etudiant']);

            //  Associer les tuteurs à l'étudiant
            foreach ($data['tuteurs'] as $tuteurData) {
                $tuteur = $this->tuteurRepository->creer($tuteurData);
                $this->association->create([
                    'inscription_id' => $etudiant->id,
                    'tuteur_id' => $tuteur->id,
                    'type_association' => $tuteurData['type_association'] ?? 'parent' // Définit une valeur par défaut
                ]);
            }

            //  Créer un dossier pour l'étudiant
            $dossier = $this->dossierRepository->creer([
                'inscription_id' => $etudiant->id,
                'nom' => 'Dossier de ' . $etudiant->nom,
                'description' => 'Dossier contenant les documents de l\'étudiant'
            ]);

            //  Ajouter les documents au dossier
            //  Vérifie si "dossier" et "documents" existent dans la requête
            if (!empty($data['dossier']['documents']) && is_array($data['dossier']['documents'])) {
                foreach ($data['dossier']['documents'] as $documentData) {
                    $this->documentRepository->creer([
                        'dossier_id' => $dossier->id,
                        'type_document' => $documentData['type_document'] ?? 'Autre',
                        'chemin_fichier' => $documentData['chemin_fichier'] ?? null
                    ]);
                }
            }


            //  Générer un code de suivi
            $codeSuivi = rand(100000, 999999);
            $etudiant->update(['code_suivi' => $codeSuivi]);

            // Envoyer un email avec le code de suivi
            try {
                Mail::to($etudiant->email)->send(new Confirmation($etudiant->nom, $codeSuivi));
            } catch (Exception $emailException) {
                Log::error('Erreur lors de l\'envoi de l\'email : ' . $emailException->getMessage());
                throw new Exception('Inscription enregistrée, mais l\'email de confirmation n\'a pas pu être envoyé.');
            }

            // 7️⃣ Déclencher un événement pour notifier d'une nouvelle inscription
            event(new EtudiantInscrit($etudiant));

            DB::commit();
            return $etudiant;
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Erreur lors de l’inscription : ' . $e->getMessage());
            throw new Exception('Une erreur est survenue lors de l’inscription.');
        }
    }

    public function getAllInscrits()
    {
        return $this->inscriptionRepository->getAll();
    }

    public function getInscritById($id)
    {
        return $this->inscriptionRepository->getById($id);
    }
}
