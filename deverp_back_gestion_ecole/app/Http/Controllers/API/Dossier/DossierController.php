<?php

namespace App\Http\Controllers\API\Dossier;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dossier\CreerDossierRequest;
use App\Http\Requests\Dossier\SoumettreDocumentRequest;
use App\Http\Resources\Dossier\DossierResource;
use App\Services\Dossier\DossierService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class DossierController extends Controller
{
    public function __construct(
        private readonly DossierService $dossierService
    ) {}

    public function store(CreerDossierRequest $request): JsonResponse
    {
        $dossier = $this->dossierService->creerDossier($request->validated());
        
        return response()->json([
            'message' => 'Dossier créé avec succès',
            'data' => new DossierResource($dossier)
        ], Response::HTTP_CREATED);
    }

    public function show(string $codeSuivi): JsonResponse
    {
        $dossier = $this->dossierService->getDossierParCodeSuivi($codeSuivi);

        if (!$dossier) {
            return response()->json([
                'message' => 'Dossier non trouvé'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'data' => new DossierResource($dossier)
        ]);
    }

    public function soumettreDocument(SoumettreDocumentRequest $request, string $codeSuivi): JsonResponse
    {
        $dossier = $this->dossierService->getDossierParCodeSuivi($codeSuivi);

        if (!$dossier) {
            return response()->json([
                'message' => 'Dossier non trouvé'
            ], Response::HTTP_NOT_FOUND);
        }

        $this->dossierService->ajouterDocument($dossier, $request->validated());

        return response()->json([
            'message' => 'Document soumis avec succès',
            'data' => new DossierResource($dossier->fresh())
        ]);
    }
}