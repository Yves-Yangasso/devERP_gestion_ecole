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
            'type_document' => 'required|string',
            'prenom' => 'required|string',
            'nom' => 'required|string'
        ]);

        $file = $request->file('document');

        // Format standard pour tous les documents d'un même dossier
        $dossierCode = "dossier_{$request->dossier_id}";

        // Determine resource type based on file extension
        $isPDF = strtolower($file->getClientOriginalExtension()) === 'pdf';

        $uploadOptions = [
            'tags' => [$request->type_document, "dossier_{$request->dossier_id}"],
            'resource_type' => $isPDF ? 'raw' : 'auto',
            'format' => $isPDF ? 'pdf' : null,
            'type' => $request->type_document // Ajout du type pour nommer le fichier
        ];

        $uploadResult = $this->cloudinaryService->uploadDocument(
            $file,
            $dossierCode, // Utilisez le même code de dossier pour tous les documents
            $uploadOptions,
            $request->prenom,
            $request->nom
        );

        if (!$uploadResult['success']) {
            return response()->json(['error' => $uploadResult['error']], 500);
        }

        // Création du document en base de données
        $document = $this->documentService->creerDocument([
            'dossier_id' => $request->dossier_id,
            'type' => $request->type_document,
            'chemin' => $uploadResult['url'],
            'public_id' => $uploadResult['public_id'],
            'url_secure' => $uploadResult['secure_url'],
            'url_public' => $uploadResult['url'],
            'folder_path' => $uploadResult['folder'],
            'format' => $uploadResult['format'],
            'preview_url' => $uploadResult['preview_url'],
            'dossier_code' => $dossierCode,
            'prenom' => $request->prenom,
            'nom' => $request->nom
        ], $file);

        return response()->json([
            'message' => 'Document uploadé avec succès',
            'document' => $document,
            'preview_url' => $uploadResult['preview_url']
        ]);
    }

    /**
     * Prévisualisation d'un document dans le navigateur
     */
    public function previewDocument($documentId)
    {
        $document = $this->documentService->getDocument($documentId);

        if (!$document) {
            return response()->json(['error' => 'Document introuvable'], 404);
        }

        $isPDF = pathinfo($document->chemin, PATHINFO_EXTENSION) === 'pdf';

        if ($isPDF) {
            // Utiliser le viewer Google Docs pour une compatibilité maximale
            $viewerUrl = "https://docs.google.com/viewer?url=" . urlencode($document->url_secure) . "&embedded=true";

            return view('documents.pdf-preview', [
                'viewerUrl' => $viewerUrl,
                'downloadUrl' => $document->url_secure,
                'documentName' => $document->type
            ]);
        } else {
            // Pour les images, utiliser une vue simple
            return view('documents.image-preview', [
                'imageUrl' => $document->url_secure,
                'documentName' => $document->type
            ]);
        }
    }
}
