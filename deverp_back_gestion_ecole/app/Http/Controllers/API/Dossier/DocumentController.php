<?php

namespace App\Http\Controllers\API\Dossier;

use App\Http\Controllers\Controller;
use App\Services\Storage\CloudinaryStorageService;
use App\Services\Dossier\DocumentService;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    protected CloudinaryStorageService $cloudinaryService;
    protected DocumentService $documentService;

    public function __construct(
        CloudinaryStorageService $cloudinaryService, 
        DocumentService $documentService
    ) {
        $this->cloudinaryService = $cloudinaryService;
        $this->documentService = $documentService;
    }

    public function uploadDocument(Request $request)
    {
        $request->validate([
            'document' => 'required|file|mimes:pdf,jpg,jpeg,png|max:10240',
            'dossier_id' => 'required|exists:dossiers,id',
            'type_document' => 'required|string'
        ]);

        $file = $request->file('document');
        $dossierPath = "dossier_{$request->dossier_id}/";

        // ✅ Correction : Utilisation de $this->cloudinaryService
        $uploadResult = $this->cloudinaryService->uploadDocument($file, $dossierPath, $request->type_document);

        if (!$uploadResult['success']) {
            return response()->json(['error' => $uploadResult['error']], 500);
        }

        // Création du document en base de données
        $document = $this->documentService->creerDocument([
            'dossier_id' => $request->dossier_id,
            'type' => $request->type_document,
            'chemin' => $uploadResult['url'],
            'public_id' => $uploadResult['public_id'],
            'format' => $uploadResult['format']
        ], $file);

        return response()->json([
            'message' => 'Document uploadé avec succès',
            'document' => $document
        ]);
    }
}



// namespace App\Http\Controllers\API\Dossier;

// use App\Http\Controllers\Controller;
// use App\Http\Requests\Dossier\SoumettreDocumentRequest;
// use App\Http\Resources\Dossier\DocumentResource;
// use App\Services\Dossier\DocumentService;
// use Illuminate\Http\JsonResponse;
// use Illuminate\Http\Request;
// use Illuminate\Http\Response;

// class DocumentController extends Controller
// {
//     public function __construct(
//         private readonly DocumentService $documentService
//     ) {}

//     public function index(string $codeDossier): JsonResponse
//     {
//         $documents = $this->documentService->getDocumentsByDossier($codeDossier);
        
//         return response()->json([
//             'data' => DocumentResource::collection($documents)
//         ]);
//     }

//     public function show(string $codeDossier, int $documentId): JsonResponse
//     {
//         $document = $this->documentService->getDocument($documentId);
        
//         if (!$document || $document->dossier->code_suivi !== $codeDossier) {
//             return response()->json([
//                 'message' => 'Document non trouvé'
//             ], Response::HTTP_NOT_FOUND);
//         }

//         return response()->json([
//             'data' => new DocumentResource($document)
//         ]);
//     }

//     public function store(SoumettreDocumentRequest $request, string $codeDossier): JsonResponse
//     {
//         try {
//             $document = $this->documentService->soumettreDocument(
//                 $codeDossier,
//                 $request->validated()
//             );

//             return response()->json([
//                 'message' => 'Document soumis avec succès',
//                 'data' => new DocumentResource($document)
//             ], Response::HTTP_CREATED);
//         } catch (\Exception $e) {
//             return response()->json([
//                 'message' => 'Erreur lors de la soumission du document',
//                 'error' => $e->getMessage()
//             ], Response::HTTP_BAD_REQUEST);
//         }
//     }

//     public function update(Request $request, string $codeDossier, int $documentId): JsonResponse
//     {
//         $request->validate([
//             'commentaire' => 'nullable|string|max:500',
//         ]);

//         try {
//             $document = $this->documentService->updateDocument(
//                 $documentId,
//                 $request->only(['commentaire'])
//             );

//             return response()->json([
//                 'message' => 'Document mis à jour avec succès',
//                 'data' => new DocumentResource($document)
//             ]);
//         } catch (\Exception $e) {
//             return response()->json([
//                 'message' => 'Erreur lors de la mise à jour du document',
//                 'error' => $e->getMessage()
//             ], Response::HTTP_BAD_REQUEST);
//         }
//     }

//     public function destroy(string $codeDossier, int $documentId): JsonResponse
//     {
//         try {
//             $this->documentService->deleteDocument($documentId);

//             return response()->json([
//                 'message' => 'Document supprimé avec succès'
//             ]);
//         } catch (\Exception $e) {
//             return response()->json([
//                 'message' => 'Erreur lors de la suppression du document',
//                 'error' => $e->getMessage()
//             ], Response::HTTP_BAD_REQUEST);
//         }
//     }
// }