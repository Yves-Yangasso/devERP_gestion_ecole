<?php

namespace App\Http\Controllers\Etudiant;

use App\Http\Controllers\Controller;
use App\Models\Etudiant;
use Barryvdh\DomPDF\Facade\Pdf as PDF;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Response;

class CarteEtudiantController extends Controller
{
    public function genererCarte(int $id): Response
    {
        // Récupération de l'étudiant et de ses informations liées
        $etudiant = Etudiant::with(['inscription.filiere'])->findOrFail($id);

        // Préparation des données pour la carte d'étudiant
        $data = [
            'matricule' => $etudiant->matricule,
            'email_institutionnel' => $etudiant->email_institutionnel,
            'nom' => $etudiant->nom,
            'prenom' => $etudiant->prenom,
            'filiere' => $etudiant->inscription->filiere->nom ?? 'Non spécifiée',
            'telephone' => $etudiant->inscription->telephone,
        ];

        // Générer le PDF à partir de la vue
        $pdf = PDF::loadView('pdf.carte-etudiant', $data);
        $fileName = 'carte_etudiant_' . $etudiant->matricule . '.pdf';

        // Envoi de l'email avec la pièce jointe
        Mail::send('emails.student_card', ['student' => $data], function ($message) use ($data, $pdf, $fileName) {
            $message->to($data['email_institutionnel'])
                    ->subject('Votre Carte Étudiant')
                    ->attachData($pdf->output(), $fileName, [
                        'mime' => 'application/pdf',
                    ]);
        });

        // Télécharger la carte d'étudiant générée
        return $pdf->download($fileName);
    }
}
