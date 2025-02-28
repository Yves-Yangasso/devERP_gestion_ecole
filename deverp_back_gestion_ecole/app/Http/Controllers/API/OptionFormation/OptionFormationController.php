<?php
namespace App\Http\Controllers\API\OptionFormation;

use App\Http\Controllers\Controller;
use App\Services\OptionFormation\OptionFormationService;
use App\Http\Requests\OptionFormation\StoreOptionFormationRequest;
use Illuminate\Http\JsonResponse;

class OptionFormationController extends Controller
{
    protected $optionFormationService;

    public function __construct(OptionFormationService $optionFormationService)
    {
        $this->optionFormationService = $optionFormationService;
    }

    public function index(): JsonResponse
    {
        return response()->json($this->optionFormationService->getAll());
    }

    public function show($id): JsonResponse
    {
        return response()->json($this->optionFormationService->getById($id));
    }

    public function store(StoreOptionFormationRequest $request): JsonResponse
    {
        return response()->json($this->optionFormationService->create($request->validated()), 201);
    }

    public function update(StoreOptionFormationRequest $request, $id): JsonResponse
    {
        return response()->json($this->optionFormationService->update($id, $request->validated()));
    }

    public function destroy($id): JsonResponse
    {
        $this->optionFormationService->delete($id);
        return response()->json(['message' => 'Option de formation supprimée avec succès']);
    }
}
