<?php
namespace App\Http\Controllers\API\Dossier;

use App\Http\Controllers\Controller;
use App\Services\Dossier\DossierValidationService;
use App\Http\Resources\Dossier\DossierResource;
use App\Http\Requests\Dossier\ValidationDossierRequest;
use Illuminate\Http\JsonResponse;

class ValidationDossierController extends Controller
{
    protected $validationService;

    public function __construct(DossierValidationService $validationService)
    {
        $this->validationService = $validationService;
    }

    public function validerDossier(ValidationDossierRequest $request, int $dossierId): JsonResponse
    {
        $dossier = $this->validationService->validerDossier($dossierId, $request->validated());
        return response()->json([
            'message' => 'Dossier traité avec succès',
            'dossier' => new DossierResource($dossier)
        ]);
    }

    public function getDossiersEnAttente(): JsonResponse
    {
        $dossiers = $this->validationService->getDossiersEnAttente();
        return response()->json([
            'dossiers' => DossierResource::collection($dossiers)
        ]);
    }

    public function getDocuments(int $dossierId): JsonResponse
{
    $documents = $this->validationService->getDocumentsByDossierId($dossierId);
    return response()->json([
        'documents' => $documents
    ]);
}


}
