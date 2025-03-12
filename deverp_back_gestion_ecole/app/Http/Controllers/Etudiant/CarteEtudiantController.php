<?php

namespace App\Http\Controllers\Etudiant;

use App\Http\Controllers\Controller;
use App\Models\Etudiant;
use Barryvdh\DomPDF\Facade\Pdf as PDF;
use Illuminate\Http\Response;

class CarteEtudiantController extends Controller
{
    public function genererCarte(int $id): Response
    {
        $etudiant = Etudiant::with(['inscription.filiere'])->findOrFail($id);

        $data = [
            'matricule' => $etudiant->matricule,
            'email_institutionnel' => $etudiant->email_institutionnel,
            'nom' => $etudiant->nom,
            'prenom' => $etudiant->prenom,
            'filiere' => $etudiant->inscription->filiere->nom ?? 'Non spécifiée',
            'telephone' => $etudiant->inscription->telephone,
        ];

        $pdf = PDF::loadView('pdf.carte-etudiant', $data);
        return $pdf->download('carte_etudiant_' . $etudiant->matricule . '.pdf');
    }
}
