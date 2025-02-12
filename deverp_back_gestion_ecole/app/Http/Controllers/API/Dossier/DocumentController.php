<?php

namespace App\Http\Controllers\API\Dossier;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dossier\SoumettreDocumentRequest;
use App\Http\Resources\Dossier\DocumentResource;
use App\Services\Dossier\DocumentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DocumentController extends Controller
{
    public function __construct(
        private readonly DocumentService $documentService
    ) {}

    public function index(string $codeDossier): JsonResponse
    {
        $documents = $this->documentService->getDocumentsByDossier($codeDossier);
        
        return response()->json([
            'data' => DocumentResource::collection($documents)
        ]);
    }

    public function show(string $codeDossier, int $documentId): JsonResponse
    {
        $document = $this->documentService->getDocument($documentId);
        
        if (!$document || $document->dossier->code_suivi !== $codeDossier) {
            return response()->json([
                'message' => 'Document non trouvé'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'data' => new DocumentResource($document)
        ]);
    }

    public function store(SoumettreDocumentRequest $request, string $codeDossier): JsonResponse
    {
        try {
            $document = $this->documentService->soumettreDocument(
                $codeDossier,
                $request->validated()
            );

            return response()->json([
                'message' => 'Document soumis avec succès',
                'data' => new DocumentResource($document)
            ], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la soumission du document',
                'error' => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function update(Request $request, string $codeDossier, int $documentId): JsonResponse
    {
        $request->validate([
            'commentaire' => 'nullable|string|max:500',
        ]);

        try {
            $document = $this->documentService->updateDocument(
                $documentId,
                $request->only(['commentaire'])
            );

            return response()->json([
                'message' => 'Document mis à jour avec succès',
                'data' => new DocumentResource($document)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la mise à jour du document',
                'error' => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function destroy(string $codeDossier, int $documentId): JsonResponse
    {
        try {
            $this->documentService->deleteDocument($documentId);

            return response()->json([
                'message' => 'Document supprimé avec succès'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la suppression du document',
                'error' => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }
}