<?php

namespace App\Http\Controllers\Etudiant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Etudiant\InscrireEtudiantRequest;
use App\Services\Etudiant\InscriptionService;
use Illuminate\Http\JsonResponse;

class InscriptionEtudiantController extends Controller
{
    protected $inscriptionService;

    public function __construct(InscriptionService $inscriptionService)
    {
        $this->inscriptionService = $inscriptionService;
    }

    // public function __construct(
    //     private readonly InscriptionService $inscriptionService
    // ) {}

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
}
