<?php

namespace App\Http\Controllers\Etudiant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Etudiant\InscrireEtudiantRequest;
use App\Services\Etudiant\InscriptionService;
use Illuminate\Http\JsonResponse;
use App\Services\Dossier\ValidationDossierService;

class InscriptionEtudiantController extends Controller
{
    protected $inscriptionService;
    protected $validationDossierService;

    public function __construct(InscriptionService $inscriptionService,ValidationDossierService $validationDossierService)
    {
        $this->inscriptionService = $inscriptionService;
        $this->validationDossierService = $validationDossierService;


    }

    public function store(InscrireEtudiantRequest $request): JsonResponse
    {
        try {
            $inscription = $this->inscriptionService->createCompleteInscription($request->validated(), $request->action);
            return response()->json([
                'message' => 'Inscription enregistrée avec succès',
                'data' => $inscription
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de l\'enregistrement de l\'inscription',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function index(): JsonResponse
    {
        try {
            $inscriptions = $this->inscriptionService->getAllInscriptionsComplete();
            return response()->json($inscriptions);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la récupération des inscriptions',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id): JsonResponse
    {
        try {
            $inscription = $this->inscriptionService->getInscriptionComplete($id);
            return response()->json($inscription);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la récupération de l\'inscription',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    public function valider(int $inscriptionId): JsonResponse
    {
        try {
            // Récupérer l'inscription avec le dossier associé
            $inscription = $this->inscriptionService->getInscriptionComplete($inscriptionId);

            if (!$inscription || !$inscription->dossier) {
                return response()->json([
                    'message' => 'Inscription ou dossier non trouvé',
                    'success' => false
                ], 404);
            }

            // Vérifier si le dossier est déjà validé
            if (!$this->validationDossierService->isDossierValide($inscription->dossier->id)) {
                return response()->json([
                    'message' => 'Le dossier associé à cette inscription n\'est pas encore validé.',
                    'success' => false
                ], 400);
            }

            // Valider l'inscription uniquement si le dossier est validé
            $this->inscriptionService->validateInscription($inscriptionId);

            return response()->json([
                'message' => 'Inscription validée avec succès.',
                'success' => true,
                'data' => $this->inscriptionService->getInscriptionComplete($inscriptionId)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la validation de l\'inscription.',
                'error' => $e->getMessage(),
                'success' => false
            ], 500);
        }
    }
}
