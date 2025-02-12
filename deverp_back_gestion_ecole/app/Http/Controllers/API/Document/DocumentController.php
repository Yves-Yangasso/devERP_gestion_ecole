<?php

namespace App\Http\Controllers\API\Document;

use App\Http\Controllers\Controller;
use App\Http\Requests\Document\StockerDocumentRequest;
use App\Services\Document\DocumentService;

class DocumentController extends Controller
{
    protected $documentService;

    public function __construct(DocumentService $documentService)
    {
        $this->documentService = $documentService;
    }

    public function store(StockerDocumentRequest $request)
    {
        return response()->json($this->documentService->ajouterDocument($request->validated()), 201);
    }
}
