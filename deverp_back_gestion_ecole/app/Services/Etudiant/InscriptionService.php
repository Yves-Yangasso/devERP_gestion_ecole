<?php
// app/Services/Etudiant/InscriptionService.php

namespace App\Services\Etudiant;

use App\Contracts\Repositories\Etudiant\EtudiantRepositoryInterface;
use App\Contracts\Repositories\Etudiant\ProfilEtudiantRepositoryInterface;
use App\Contracts\Repositories\Tuteur\TuteurRepositoryInterface; // Ajout du repository manquant
use App\Events\Etudiant\EtudiantInscrit;
use App\Enums\Etudiant\StatutEtudiant;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Exception;

class InscriptionService
{
    private $etudiantRepository;
    private $profilRepository;
    private $tuteurRepository; // Déclaration de la propriété

    public function __construct(
        EtudiantRepositoryInterface $etudiantRepository,
        ProfilEtudiantRepositoryInterface $profilRepository,
        TuteurRepositoryInterface $tuteurRepository // Injection de dépendance
    ) {
        $this->etudiantRepository = $etudiantRepository;
        $this->profilRepository = $profilRepository;
        $this->tuteurRepository = $tuteurRepository; // Initialisation
    }

    public function inscrire(array $donnees)
    {
        DB::beginTransaction();
        
        try {
            // 1. Création du tuteur si les informations sont fournies
            $tuteur = null;
            if (isset($donnees['tuteur'])) {
                $tuteur = $this->tuteurRepository->create($donnees['tuteur']);
            }

            // 2. Création de l'étudiant
            $donneesEtudiant = [
                'matricule' => $this->genererMatricule(),
                'nom' => $donnees['nom'],
                'prenom' => $donnees['prenom'],
                'date_naissance' => $donnees['date_naissance'],
                'lieu_naissance' => $donnees['lieu_naissance'],
                'adresse' => $donnees['adresse'],
                'telephone' => $donnees['telephone'],
                'email' => $donnees['email'],
                'cni' => $donnees['cni'],
                'statut' => StatutEtudiant::EN_ATTENTE,
                'tuteur_id' => $tuteur?->id
            ];

            $etudiant = $this->etudiantRepository->create($donneesEtudiant);

            // 3. Création du profil étudiant
            $donneesProfilEtudiant = [
                'etudiant_id' => $etudiant->id,
                'niveau_etude' => $donnees['niveau_etude'],
                'dernier_etablissement' => $donnees['dernier_etablissement'],
                'annee_bac' => $donnees['annee_bac'],
                'serie_bac' => $donnees['serie_bac'],
                'mention_bac' => $donnees['mention_bac'],
                'numero_bac' => $donnees['numero_bac']
            ];

            $profil = $this->profilRepository->create($donneesProfilEtudiant);

            DB::commit();

            // Déclencher l'événement d'inscription
            event(new EtudiantInscrit($etudiant));

            return $etudiant->load('profil', 'tuteur');

        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Erreur lors de l\'inscription: ' . $e->getMessage());
            throw new Exception('Une erreur est survenue lors de l\'inscription');
        }
    }

    private function genererMatricule(): string
    {
        $annee = date('Y');
        $prefix = 'ISI';
        $dernierEtudiant = $this->etudiantRepository->getDernierMatricule();
        
        if ($dernierEtudiant) {
            $numero = intval(substr($dernierEtudiant->matricule, -4)) + 1;
        } else {
            $numero = 1;
        }

        return $prefix . $annee . str_pad($numero, 4, '0', STR_PAD_LEFT);
    }
}