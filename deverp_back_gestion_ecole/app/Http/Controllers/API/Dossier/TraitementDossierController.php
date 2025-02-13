<?php

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

    public function traiterDocument(TraiterDocumentRequest $request, int $documentId): JsonResponse
    {
        $document = $this->traitementService->traiterDocument($documentId, $request->validated());
        return response()->json([
            'message' => 'Document traité avec succès',
            'document' => $document
        ]);
    }

    public function getDossiersATraiter(): JsonResponse
    {
        $dossiers = $this->traitementService->getDossiersEnAttente();
        return response()->json([
            'dossiers' => DossierResource::collection($dossiers)
        ]);
    }
}