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
