<?php

namespace App\Http\Controllers;

use App\Http\Requests\Document\StoreTypeDocumentRequest;
use App\Http\Requests\Document\UpdateTypeDocumentRequest;
use App\Services\Document\TypeDocumentService;
use Illuminate\Http\JsonResponse;

class TypeDocumentController extends Controller
{
    protected TypeDocumentService $typeDocumentService;

    public function __construct(TypeDocumentService $typeDocumentService)
    {
        $this->typeDocumentService = $typeDocumentService;
    }

    public function index(): JsonResponse
    {
        return response()->json($this->typeDocumentService->getAll());
    }

    public function show(int $id): JsonResponse
    {
        $document = $this->typeDocumentService->findById($id);
        return $document ? response()->json($document) : response()->json(['error' => 'Document non trouvé'], 404);
    }

    public function store(StoreTypeDocumentRequest $request): JsonResponse
    {
        $document = $this->typeDocumentService->create($request->validated());
        return response()->json($document, 201);
    }

    public function update(UpdateTypeDocumentRequest $request, int $id): JsonResponse
    {
        $updated = $this->typeDocumentService->update($id, $request->validated());
        return $updated ? response()->json(['message' => 'Document mis à jour']) : response()->json(['error' => 'Échec de la mise à jour'], 400);
    }

    public function destroy(int $id): JsonResponse
    {
        $deleted = $this->typeDocumentService->delete($id);
        return $deleted ? response()->json(['message' => 'Document supprimé']) : response()->json(['error' => 'Échec de la suppression'], 400);
    }
}
