<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Etudiant\InscriptionEtudiantController;
use App\Http\Controllers\API\Tuteur\TuteurController;
use App\Http\Controllers\API\Dossier\DossierController;
use App\Http\Controllers\API\Dossier\ValidationDossierController;
use App\Http\Controllers\API\Dossier\TraitementDossierController;
use App\Http\Controllers\API\Dossier\DocumentController;
use App\Http\Controllers\API\Dossier\SuiviDossierController;
use App\Http\Controllers\API\Auth\AuthController;
use App\Http\Controllers\API\Formation\FormationController;
use App\Http\Controllers\API\Modalite\ModaliteController;
use App\Http\Controllers\API\NiveauEtudes\NiveauEtudesController;
use App\Http\Controllers\API\OptionFormation\OptionFormationController;
use App\Http\Controllers\API\Paiement\ModePaiementController;
use App\Http\Controllers\API\Paiement\PaiementController;
use App\Http\Controllers\API\Paiement\LignePaiementController;
use App\Http\Controllers\API\StructureTarifaire\StructureTarifaireController;
use App\Http\Controllers\API\Certifications\CertificationController;
use App\Http\Controllers\API\Cours\CoursController;
use App\Http\Controllers\DepartementController;
use App\Http\Controllers\Etudiant\EtudiantController;
use App\Http\Controllers\FiliereController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/


// Routes de test et debug
Route::get('/test', function () {
    return response()->json(['message' => 'Test route works!']);
});

Route::prefix('v1')->group(function () {
    // Routes d'authentification (publiques)
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/refresh', [AuthController::class, 'refresh']);

    /*
    |--------------------------------------------------------------------------
    | Routes Publiques
    |--------------------------------------------------------------------------
    */
    Route::post('/filter', [DossierController::class, 'filter']);

    // Inscriptions étudiants
    Route::prefix('inscriptions')->group(function () {
        Route::get('/', [InscriptionEtudiantController::class, 'index']);
        Route::post('/', [InscriptionEtudiantController::class, 'store']);
        Route::get('/{id}', [InscriptionEtudiantController::class, 'show']);
        Route::post('/{id}/valider', [InscriptionEtudiantController::class, 'valider']);
    });

    // Suivi des dossiers (public)
    Route::prefix('suivi-dossier')->group(function () {
        Route::post('/verifier', [SuiviDossierController::class, 'suivreDossier']);
        Route::post('/historique', [SuiviDossierController::class, 'getHistorique']);
    });

    // Dossiers (routes publiques)
    // Route::prefix('dossiers')->group(function () {
    //     Route::get('/{dossierId}', [TraitementDossierController::class, 'getDossierDetails']);
    //     Route::get('/a-traiter', [TraitementDossierController::class, 'getDossiersATraiter']);
    // });

    Route::prefix('dossiers')->group(function () {
        // Création et modification
        Route::post('/update-status', [DossierController::class, 'mettreAJourStatut']);
        Route::post('/', [DossierController::class, 'store']);
        Route::get('/etudiant/{etudiantId}', [DossierController::class, 'getDossiersEtudiant']);

        // Validation des dossiers
        Route::get('/en-attente', [ValidationDossierController::class, 'getDossiersEnAttente']);
        Route::post('/{dossierId}/valider', [ValidationDossierController::class, 'validerDossier']);
        Route::get('/{dossierId}/documents', [ValidationDossierController::class, 'getDocuments']);
        Route::post('/documents/{documentId}/valider', [ValidationDossierController::class, 'validerDocument']);
        Route::get('/documents/preview/{documentId}', [DocumentController::class, 'previewDocument'])->name('documents.preview');

        // Traitement des documents
        //Route::post('/documents/{documentId}/traiter', [TraitementDossierController::class, 'traiterDocument']);
    });

    /*
    |--------------------------------------------------------------------------
    | Routes Protégées (authentification requise)
    |--------------------------------------------------------------------------
    */

    Route::prefix('dossiers')->group(function () {
        // Création et modification
        Route::post('/', [DossierController::class, 'store']);
        Route::get('/etudiant/{etudiantId}', [DossierController::class, 'getDossiersEtudiant']);

        //Route::post('/traitements', [TraitementDossierController::class, 'traiterDossierEtDocuments']);

        // Validation des dossiers
        Route::get('/en-attente', [ValidationDossierController::class, 'getDossiersEnAttente']);
        Route::post('/valider', [ValidationDossierController::class, 'validerDossier']);
        Route::get('/{dossierId}/documents', [ValidationDossierController::class, 'getDocuments']);
        Route::post('/documents/{documentId}/valider', [ValidationDossierController::class, 'validerDocument']);

        // Traitement des documents
        // Route::post('/documents/traiter', [TraitementDossierController::class, 'traiterDocument']);
    });
    Route::middleware(['auth:api'])->group(function () {
        // Informations utilisateur
        Route::get('/user', function (Request $request) {
            return response()->json($request->user());
        });

        // Déconnexion
        Route::post('/logout', [AuthController::class, 'logout']);

        // Gestion des tuteurs
        Route::prefix('tuteurs')->group(function () {
            Route::get('/', [TuteurController::class, 'index']);
            Route::post('/', [TuteurController::class, 'creer']);
            Route::get('/{id}', [TuteurController::class, 'show']);
            Route::put('/{id}', [TuteurController::class, 'modifier']);
            Route::delete('/{id}', [TuteurController::class, 'supprimer']);
        });

        // Gestion des dossiers


        // Gestion des documents
        Route::prefix('documents')->group(function () {
            Route::post('/', [DocumentController::class, 'store']);
            Route::post('/upload', [DocumentController::class, 'uploadDocument']);
        });

        // Route pour le gestion des Mode de Paiement(Creer,Modifier,Trouver,Supprimer)
        Route::prefix('modes-paiement')->group(function () {
            Route::get('/', [ModePaiementController::class, 'index']);
            Route::post('/', [ModePaiementController::class, 'store']);
            Route::get('/{id}', [ModePaiementController::class, 'show']);
            Route::put('/{id}', [ModePaiementController::class, 'update']);
            Route::delete('/{id}', [ModePaiementController::class, 'destroy']);
        });

        //Route pour le paiement par les étudiant



        // Route permettant aux étudiants d'effectuer un paiement/Modifier/Annuler
        Route::prefix('ligne-paiements')->group(function () {
            Route::get('/', [LignePaiementController::class, 'index']);
            Route::post('/', [LignePaiementController::class, 'store']);
            Route::get('/{id}', [LignePaiementController::class, 'show']);
            Route::put('/{id}', [LignePaiementController::class, 'update']);
            Route::delete('/{id}', [LignePaiementController::class, 'destroy']);
        });
    });

    Route::prefix('paiements')->group(function () {
        Route::post('/', [PaiementController::class, 'store']);
        Route::post('/valider', [PaiementController::class, 'valider']);
        Route::get('/{id}', [PaiementController::class, 'show']);
        Route::delete('/{id}', [PaiementController::class, 'destroy']);
    });

    Route::prefix('formations')->group(function () {
        Route::get('/', [FormationController::class, 'index']);
        Route::get('/{id}', [FormationController::class, 'show']);
        Route::post('/', [FormationController::class, 'store']);
        Route::put('/{id}', [FormationController::class, 'update']);
        Route::delete('/{id}', [FormationController::class, 'destroy']);
        Route::get('/{id}/tarif', [FormationController::class, 'getStructureTarifaire']);
    });

    Route::prefix('departements')->group(function () {
        Route::get('/', [DepartementController::class, 'index']);
        Route::get('/{id}', [DepartementController::class, 'show']);
        Route::post('/', [DepartementController::class, 'store']);
        Route::put('/{id}', [DepartementController::class, 'update']);
        Route::delete('/{id}', [DepartementController::class, 'destroy']);
    });

    Route::prefix('filiere')->group(function () {
        Route::get('/', [FiliereController::class, 'index']);
        Route::get('/{id}', [FiliereController::class, 'show']);
        Route::post('/', [FiliereController::class, 'store']);
        Route::put('/{id}', [FiliereController::class, 'update']);
        Route::delete('/{id}', [FiliereController::class, 'destroy']);
    });

    Route::prefix('niveaux-etudes')->group(function () {
        Route::get('/', [NiveauEtudesController::class, 'index']);
        Route::get('/{id}', [NiveauEtudesController::class, 'show']);
        Route::post('/', [NiveauEtudesController::class, 'store']);
        Route::put('/{id}', [NiveauEtudesController::class, 'update']);
        Route::delete('/{id}', [NiveauEtudesController::class, 'destroy']);
    });

    Route::prefix('certifications')->group(function () {
        Route::get('/', [CertificationController::class, 'index']);
        Route::get('/{id}', [CertificationController::class, 'show']);
        Route::post('/', [CertificationController::class, 'store']);
        Route::put('/{id}', [CertificationController::class, 'update']);
        Route::delete('/{id}', [CertificationController::class, 'destroy']);
    });

    Route::prefix('options-formations')->group(function () {
        Route::get('/', [OptionFormationController::class, 'index']);
        Route::get('/{id}', [OptionFormationController::class, 'show']);
        Route::post('/', [OptionFormationController::class, 'store']);
        Route::put('/{id}', [OptionFormationController::class, 'update']);
        Route::delete('/{id}', [OptionFormationController::class, 'destroy']);
    });

    // Gestion des cours
    Route::prefix('cours')->group(function () {
        Route::get('/', [CoursController::class, 'index']);
        Route::get('/{id}', [CoursController::class, 'show']);
        Route::post('/', [CoursController::class, 'store']);
        Route::put('/{id}', [CoursController::class, 'update']);
        Route::delete('/{id}', [CoursController::class, 'destroy']);
    });

    Route::prefix('modalites')->group(function () {
        Route::get('/', [ModaliteController::class, 'index']);
        Route::get('/{id}', [ModaliteController::class, 'show']);
        Route::post('/', [ModaliteController::class, 'store']);
        Route::put('/{id}', [ModaliteController::class, 'update']);
        Route::delete('/{id}', [ModaliteController::class, 'destroy']);
    });

    // Gestion des Tarif en fonction des
    Route::prefix('structure-tarifaire')->group(function () {
        Route::get('/', [StructureTarifaireController::class, 'index']);
        Route::get('/{id}', [StructureTarifaireController::class, 'show']);
        Route::post('/', [StructureTarifaireController::class, 'store']);
        Route::put('/{id}', [StructureTarifaireController::class, 'update']);
        Route::delete('/{id}', [StructureTarifaireController::class, 'destroy']);
    });

    // Creation de l'etudiant
    Route::prefix('etudiants')->group(function () {
        Route::post('/', [EtudiantController::class, 'store']);
    });
});
