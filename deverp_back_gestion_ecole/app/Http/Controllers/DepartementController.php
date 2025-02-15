<?php
namespace App\Http\Controllers;

use App\Http\Requests\Departement\StoreDepartementRequest;
use App\Http\Requests\Departement\UpdateDepartementRequest;
use Illuminate\Http\Request;
use App\Services\Departement\DepartementService;

class DepartementController extends Controller {
    protected $departementService;

    public function __construct(DepartementService $departementService) {
        $this->departementService = $departementService;
    }

    public function index() {
        return response()->json($this->departementService->getAll());
    }

    public function show($id) {
        return response()->json($this->departementService->getById($id));
    }

    public function store(StoreDepartementRequest $request) {
        return response()->json($this->departementService->create($request->validated()), 201);
    }

    public function update(UpdateDepartementRequest $request, $id) {
        return response()->json($this->departementService->update($id, $request->validated()));
    }

    public function destroy($id) {
        return response()->json($this->departementService->delete($id));
    }
}