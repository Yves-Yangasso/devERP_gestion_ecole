<?php

namespace App\Http\Controllers\API\Tuteur;

use App\Http\Controllers\Controller;
use App\Services\Tuteur\TuteurService;
use App\Http\Resources\Tuteur\TuteurResource;
use App\Http\Requests\Tuteur\CreerTuteurRequest;
use App\Http\Requests\Tuteur\ModifierTuteurRequest;
use App\Models\Tuteur;

class TuteurController extends Controller
{
    public function __construct(private TuteurService $tuteurService) {}

    // Liste des tuteurs
    public function index()
    {
        $tuteurs = Tuteur::all();
        return TuteurResource::collection($tuteurs);
    }

    // Détails d'un tuteur
    public function show($id)
    {
        $tuteur = Tuteur::findOrFail($id);
        return new TuteurResource($tuteur);
    }

    // Créer un tuteur
    public function creer(CreerTuteurRequest $request)
    {
        $tuteur = $this->tuteurService->creer($request->validated());
        return new TuteurResource($tuteur);
    }

    // Modifier un tuteur
    public function modifier($id, ModifierTuteurRequest $request)
    {
        $tuteur = $this->tuteurService->modifier($id, $request->validated());
        return new TuteurResource($tuteur);
    }

    // Supprimer un tuteur
    public function supprimer($id)
    {
        $this->tuteurService->supprimer($id);
        return response()->json(['message' => 'Tuteur supprimé avec succès'],200);
}
}
