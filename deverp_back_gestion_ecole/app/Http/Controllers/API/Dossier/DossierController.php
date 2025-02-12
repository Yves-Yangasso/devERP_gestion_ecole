<?php

namespace App\Http\Controllers\API\Dossier;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dossier\ValidateDossierRequests;
use App\Services\Dossier\CreerDossierServices;
use Illuminate\Http\Request;

class DossierController extends Controller
{
    protected $dossierService;

    public function __construct(CreerDossierServices $dossierService)
    {
        $this->dossierService = $dossierService;
    }

    public function store(ValidateDossierRequests $request)
    {
        return response()->json($this->dossierService->creerDossier($request->validated()), 201);
    }
}
