<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tuteur;
use App\Enums\Tuteur\StatutTuteur;
use App\Enums\Tuteur\TypeAssociation;

class TuteurSeeder extends Seeder
{
    public function run()
    {
        $tuteur = Tuteur::create([
            'prenom' => 'Yang',
            'nom' => 'Bao',
            'email' => 'yangbao@example.com',
            'telephone' => '781000713',
            'adresse' => 'Fass, Dakar',
            'fonctions' => 'Analyste Programmeur',
            'statut' => StatutTuteur::ACTIF
        ]);

        // Exemple d'association (si un modèle Etudiant existe)
        $etudiant = \App\Models\Etudiant::first();
        if ($etudiant) {
            $tuteur->associerEtudiant(
                $etudiant, 
                TypeAssociation::RESPONSABLE_LEGAL
            );
        }
    }
}