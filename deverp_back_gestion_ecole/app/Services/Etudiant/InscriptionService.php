<?php

namespace App\Services\Etudiant;

use App\Models\{Inscription, Tuteur, Dossier, Document};
use App\Services\Storage\CloudinaryStorageService;
use App\Notifications\Dossier\NotificationInscription;
use App\Services\Dossier\DossierService;
use App\Repositories\Eloquent\InscriptionRepository;
use App\Enums\Dossier\StatutDocument;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Exception;
use Illuminate\Support\Facades\Log;

class InscriptionService
{
    public function __construct(
        private readonly CloudinaryStorageService $cloudinaryStorage,
        private readonly DossierService $dossierService,
        private readonly EtudiantService $etudiantService,
        private readonly InscriptionRepository $inscriptionRepository
    ) {}

    public function createCompleteInscription(array $data)
    {
        DB::beginTransaction();
        try {
            // 1. Créer les tuteurs
            $tuteurIds = $this->createTuteurs($data['tuteurs']);

            // 2. Créer l'inscription
            $inscription = $this->createInscription($data['etudiant'], $tuteurIds[0]);

            //if ($data['action'] == 'en_ligne') {
                // 3. Créer le dossier avec les documents
                $dossier = $this->createDossierWithDocuments(
                    $inscription,
                    $data['dossier']
                );

                // 4. Récupérer les URLs de stockage Cloudinary
                $this->updateCloudinaryUrls($dossier);

                // 5. Créer l'étudiant
                // $etudiant = $this->etudiantService->registerStudent([
                //     'inscription_id' => $inscription['id'],  // ID de l'inscription
                //     'nom' => $data['nom'],
                //     'prenom' => $data['prenom'],
                //     'matricule' => $data['matricule'],
                //     'email_institutionnel' => $data['email_institutionnel']
                // ]);
            //}

            // 5. Envoyer la notification d'inscription
            $this->sendInscriptionNotification($inscription);

            DB::commit();

            return $this->inscriptionRepository->getWithDossierAndDocuments($inscription->id);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Erreur lors de l\'inscription complète: ' . $e->getMessage());
            throw new Exception('Erreur lors de l\'inscription: ' . $e->getMessage());
        }
    }

    private function createTuteurs(array $tuteursData): array
    {
        return array_map(function ($tuteurData) {
            $tuteur = Tuteur::create($tuteurData);
            return $tuteur->id;
        }, $tuteursData);
    }

    private function createInscription(array $etudiantData, int $tuteurId): Inscription
    {
        return $this->inscriptionRepository->create(array_merge(
            $etudiantData,
            ['id_tuteur' => $tuteurId]
        ));
    }

    private function createDossierWithDocuments(Inscription $inscription, array $dossierData): Dossier
    {
        // Créer le dossier
        $dossier = Dossier::create([
            'inscription_id' => $inscription->id,
            'titre' => $dossierData['titre'],
            'description' => $dossierData['description'],
            'code_suivi' => $this->generateCodeSuivi(),
            'statut' => 'en_attente'
        ]);

        // Traiter chaque document
        foreach ($dossierData['documents'] as $documentData) {
            $this->processDocument($dossier, $documentData, $inscription);
        }

        return $dossier;
    }

    private function sendInscriptionNotification(Inscription $inscription): void
    {
        try {
            // Charger la relation dossier si ce n'est pas déjà fait
            if (!$inscription->relationLoaded('dossier')) {
                $inscription->load('dossier');
            }

            // Envoyer la notification
            $inscription->notify(new NotificationInscription($inscription));
        } catch (\Exception $e) {
            Log::error("Erreur lors de l'envoi de la notification: " . $e->getMessage());
            // Ne pas faire échouer l'inscription si l'envoi échoue
        }
    }

    private function processDocument(Dossier $dossier, array $documentData, Inscription $inscription): void
    {
        $uploadResult = $this->cloudinaryStorage->uploadDocument(
            $documentData['fichier'],
            $dossier->code_suivi,
            [
                'tags' => [$dossier->code_suivi, $documentData['type_document']],
                'pages' => true,
            ],
            $inscription->prenom,
            $inscription->nom
        );

        if (!$uploadResult['success']) {
            throw new Exception('Échec de l\'upload du document: ' . ($uploadResult['error'] ?? 'Erreur inconnue'));
        }

        Document::create([
            'dossier_id' => $dossier->id,
            'type' => $documentData['type_document'],
            'chemin' => $uploadResult['url'],
            'url_secure' => $uploadResult['secure_url'],
            'url_public' => $uploadResult['url'],
            'preview_url' => $uploadResult['preview_url'],
            'folder_path' => $uploadResult['folder'],
            'public_id' => $uploadResult['public_id'],
            'statut' => StatutDocument::EN_ATTENTE,
            'format' => $uploadResult['format'],
            'upload_timestamp' => $uploadResult['timestamp'] // Stocker l'horodatage
        ]);
    }

    private function updateCloudinaryUrls(Dossier $dossier): void
    {
        foreach ($dossier->documents as $document) {
            $metadata = $this->cloudinaryStorage->getDocumentMetadata($document->public_id);
            if ($metadata) {
                $document->update([
                    'url_secure' => $metadata['secure_url'] ?? null,
                    'url_public' => $metadata['url'] ?? null,
                    'folder_path' => $metadata['folder'] ?? null
                ]);
            }
        }
    }

    private function generateCodeSuivi(): string
    {
        return 'DOS-' . strtoupper(Str::random(12));
    }

    public function getInscriptionComplete($id)
    {
        return $this->inscriptionRepository->getWithDossierAndDocuments($id);
    }

    public function getAllInscriptionsComplete()
    {
        return $this->inscriptionRepository->getAll();
    }

    public function validateInscription(int $inscriptionId): void
    {
        DB::beginTransaction();
        try {
            $inscription = $this->inscriptionRepository->getWithDossierAndDocuments($inscriptionId);

            if (!$inscription) {
                throw new Exception('Inscription non trouvée');
            }

            // Archiver les documents si le dossier est validé
            if ($inscription->dossier && $inscription->dossier->statut === 'valide') {
                foreach ($inscription->dossier->documents as $document) {
                    $this->cloudinaryStorage->archiveDocument(
                        $document->public_id,
                        "archives/{$inscription->dossier->code_suivi}"
                    );
                }
            }

            // Mettre à jour le statut de l'inscription
            $this->inscriptionRepository->updateStatut($inscriptionId, 'validee');

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception('Erreur lors de la validation de l\'inscription: ' . $e->getMessage());
        }
    }
}
