<?php
namespace App\Http\Controllers\API\Modalite;

use App\Http\Controllers\Controller;
use App\Services\Modalite\ModaliteService;
use App\Http\Requests\Modalite\StoreModaliteRequest;
use Illuminate\Http\JsonResponse;

class ModaliteController extends Controller
{
    protected $modaliteService;

    public function __construct(ModaliteService $modaliteService)
    {
        $this->modaliteService = $modaliteService;
    }

    public function index(): JsonResponse
    {
        return response()->json($this->modaliteService->getAll());
    }

    public function show($id): JsonResponse
    {
        return response()->json($this->modaliteService->getById($id));
    }

    public function store(StoreModaliteRequest $request): JsonResponse
    {
        return response()->json($this->modaliteService->create($request->validated()), 201);
    }

    public function update(StoreModaliteRequest $request, $id): JsonResponse
    {
        return response()->json($this->modaliteService->update($id, $request->validated()));
    }

    public function destroy($id): JsonResponse
    {
        $this->modaliteService->delete($id);
        return response()->json(['message' => 'Modalité supprimée avec succès']);
    }
}
