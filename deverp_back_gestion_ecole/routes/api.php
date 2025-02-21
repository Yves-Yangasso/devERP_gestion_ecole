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
use App\Http\Controllers\API\Paiement\ModePaiementController;
use App\Http\Controllers\API\Paiement\PaiementController;
use App\Http\Controllers\API\Paiement\LignePaiementController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Routes d'authentification (publiques)
Route::post('/login', [AuthController::class, 'login']);
Route::post('/refresh', [AuthController::class, 'refresh']);

// Routes de test et debug
Route::get('/test', function () {
    return response()->json(['message' => 'Test route works!']);
});

Route::prefix('v1')->group(function () {

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
    });

    // Suivi des dossiers (public)
    Route::prefix('suivi-dossier')->group(function () {
        Route::post('/verifier', [SuiviDossierController::class, 'suivreDossier']);
        Route::post('/historique', [SuiviDossierController::class, 'getHistorique']);
    });

    // Dossiers (routes publiques)
    Route::prefix('dossiers')->group(function () {
        Route::get('/{dossierId}', [TraitementDossierController::class, 'getDossierDetails']);
        Route::get('/a-traiter', [TraitementDossierController::class, 'getDossiersATraiter']);
    });

    /*
    |--------------------------------------------------------------------------
    | Routes Protégées (authentification requise)
    |--------------------------------------------------------------------------
    */

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
            Route::post('/documents/{documentId}/traiter', [TraitementDossierController::class, 'traiterDocument']);
        });

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
        Route::prefix('paiements')->group(function () {
            Route::post('/', [PaiementController::class, 'store']);
            Route::get('/{id}', [PaiementController::class, 'show']);
            Route::delete('/{id}', [PaiementController::class, 'destroy']);
        });


        // Route permettant aux étudiants d'effectuer un paiement/Modifier/Annuler
        Route::prefix('ligne-paiements')->group(function () {
            Route::get('/', [LignePaiementController::class, 'index']);
            Route::post('/', [LignePaiementController::class, 'store']);
            Route::get('/{id}', [LignePaiementController::class, 'show']);
            Route::put('/{id}', [LignePaiementController::class, 'update']);
            Route::delete('/{id}', [LignePaiementController::class, 'destroy']);
        });
    });
});
