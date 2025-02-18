<?php
// app/Http/Controllers/API/Dossier/TraitementDossierController.php

namespace App\Http\Controllers\API\Dossier;

use App\Http\Controllers\Controller;
use App\Services\Dossier\TraitementDossierService;
use App\Http\Resources\Dossier\DossierResource;
use App\Http\Requests\Dossier\TraiterDocumentRequest;
use Illuminate\Http\JsonResponse;

class TraitementDossierController extends Controller
{
    protected $traitementService;

    public function __construct(TraitementDossierService $traitementService)
    {
        $this->traitementService = $traitementService;
    }

    public function getDossierDetails(int $dossierId): JsonResponse
    {
        try {
            $dossier = $this->traitementService->getDossierById($dossierId);

            if (!$dossier) {
                return response()->json([
                    'success' => false,
                    'message' => 'Dossier non trouvé'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'dossier' => new DossierResource($dossier)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération du dossier',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getDossiersATraiter(): JsonResponse
    {
        try {
            $dossiers = $this->traitementService->getDossiersEnAttente();

            return response()->json([
                'success' => true,
                'dossiers' => DossierResource::collection($dossiers)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des dossiers',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function traiterDocument(TraiterDocumentRequest $request, int $documentId): JsonResponse
    {
        try {
            $document = $this->traitementService->traiterDocument($documentId, $request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Document traité avec succès',
                'document' => $document
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors du traitement du document',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
