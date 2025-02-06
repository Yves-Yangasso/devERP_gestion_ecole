<?php

namespace App\Http\Controllers\Document;

use App\Http\Controllers\Controller;
use App\Services\Document\DocumentService;
use App\Http\Requests\Document\StockerDocumentRequest;
use App\Http\Requests\Document\ModifierDocumentRequest;
use App\Models\Document;

class DocumentController extends Controller
{
    private $documentService;

    public function __construct(DocumentService $documentService)
    {
        $this->documentService = $documentService;
    }

    public function store(StockerDocumentRequest $request)
    {
        try {
            $document = $this->documentService->stockerDocument(
                $request->file('fichier'), 
                $request->validated()
            );

            return response()->json([
                'message' => 'Document ajouté avec succès',
                'document' => $document
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors du stockage du document',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(ModifierDocumentRequest $request, Document $document)
    {
        $document->update($request->validated());
        return response()->json($document);
    }

    public function destroy(Document $document)
    {
        $document->delete();
        return response()->json(null, 204);
    }
}