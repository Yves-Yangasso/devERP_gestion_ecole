<?php

namespace App\Http\Controllers;

use App\Models\ProfilTuteur;
use App\Http\Requests\AssocierEtudiantRequest;
use Illuminate\Http\Request;

class ProfilTuteurController extends Controller
{
    public function index()
    {
        $tuteurs = ProfilTuteur::with('etudiants')->get();
        return response()->json($tuteurs);
    }

    public function show($id)
    {
        $tuteur = ProfilTuteur::with('etudiants')->findOrFail($id);
        return response()->json($tuteur);
    }

    public function associerEtudiant(AssocierEtudiantRequest $request, $id)
    {
        $tuteur = ProfilTuteur::findOrFail($id);
        $tuteur->etudiants()->sync($request->etudiants);
        return response()->json(['message' => 'Association mise à jour avec succès']);
}
}
