<?php

namespace App\Http\Controllers;

use App\Http\Requests\Filieres\StoreFiliereRequest;
use App\Http\Requests\Filieres\UpdateFiliereRequest;
use Illuminate\Http\Request;
use App\Services\Filieres\FiliereService;

class FiliereController extends Controller {
    protected $filiereService;

    public function __construct(FiliereService $filiereService) {
        $this->filiereService = $filiereService;
    }

    public function index() {
        return response()->json($this->filiereService->getAll());
    }

    public function show($id) {
        return response()->json($this->filiereService->getById($id));
    }

    public function store(StoreFiliereRequest $request) {
        return response()->json($this->filiereService->create($request->validated()), 201);
    }

    public function update(UpdateFiliereRequest $request, $id) {
        return response()->json($this->filiereService->update($id, $request->validated()));
    }

    public function destroy($id) {
        return response()->json($this->filiereService->delete($id));
    }
}