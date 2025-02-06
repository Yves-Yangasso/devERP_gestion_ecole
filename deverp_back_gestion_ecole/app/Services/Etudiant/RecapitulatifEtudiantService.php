<?php
// app/Services/Etudiant/RecapitulatifEtudiantService.php

namespace App\Services\Etudiant;

use App\Contracts\Services\Etudiant\RecapitulatifEtudiantServiceInterface;
use App\Repositories\Eloquent\EtudiantRepository;
use App\Repositories\Eloquent\TuteurRepository;
use App\Repositories\Eloquent\DossierRepository;
use App\Services\Etudiant\EtapeInscription;

class RecapitulatifEtudiantService implements RecapitulatifEtudiantServiceInterface
{
    protected $etudiantRepository;
    protected $tuteurRepository;
    protected $dossierRepository;

    public function __construct(
        EtudiantRepository $etudiantRepository,
        TuteurRepository $tuteurRepository,
        DossierRepository $dossierRepository
    ) {
        $this->etudiantRepository = $etudiantRepository;
        $this->tuteurRepository = $tuteurRepository;
        $this->dossierRepository = $dossierRepository;
    }

    public function getInformationsEtudiant(int $etudiantId)
    {
        return $this->etudiantRepository->find($etudiantId);
    }

    public function getInformationsTuteur(int $etudiantId)
    {
        return $this->tuteurRepository->findByEtudiant($etudiantId);
    }

    public function getDossiers(int $etudiantId)
    {
        return $this->dossierRepository->findByEtudiant($etudiantId);
    }
    public function getEtapeInscription(int $etudiantId)
    {
        $etudiant = $this->etudiantRepository->findById($etudiantId);

        // Vérification séquentielle des étapes d'inscription
        if (!$etudiant->nom || !$etudiant->prenom) {
            return EtapeInscription::INFOS_PERSONNELLES;
        }

        if (!$etudiant->tuteur) {
            return EtapeInscription::INFOS_TUTEUR;
        }

        $documentsMandatoires = $this->dossierRepository->getDocumentsMandatoires($etudiantId);

        if (!$documentsMandatoires->allSubmitted()) {
            return EtapeInscription::DOCUMENTS;
        }

        if (!$documentsMandatoires->allValidated()) {
            return EtapeInscription::VALIDATION;
        }

        return EtapeInscription::COMPLETE;
    }

    public function getRecapitulatifComplet(int $etudiantId)
    {
        return [
            'informations_etudiant' => $this->getInformationsEtudiant($etudiantId),
            'informations_tuteur' => $this->getInformationsTuteur($etudiantId),
            'dossiers' => $this->getDossiers($etudiantId),
            'etape_inscription' => $this->getEtapeInscription($etudiantId)
        ];
    }
}
