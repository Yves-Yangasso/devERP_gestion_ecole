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

Route::prefix('v1')->group(function () {
    
    /*** 📌 Routes d'inscription des étudiants ***/
    Route::prefix('inscriptions')->group(function () {
        Route::get('/', [InscriptionEtudiantController::class, 'index']);
        Route::get('/{id}', [InscriptionEtudiantController::class, 'show']);
        Route::post('/', [InscriptionEtudiantController::class, 'store']);
    });

    /*** 📌 Routes des tuteurs ***/

    Route::prefix('/tuteurs')->group(function () {
        // Liste des tuteurs
        Route::get('/', [TuteurController::class, 'index']);
    
        // Détails d'un tuteur
        Route::get('/{id}', [TuteurController::class, 'show']);
    
        // Créer un tuteur
        Route::post('/', [TuteurController::class, 'creer']);
    
        // Modifier un tuteur
        Route::put('/{id}', [TuteurController::class, 'modifier']);
    
        // Supprimer un tuteur
        Route::delete('/{id}', [TuteurController::class, 'supprimer']);
    });

    /*** 📌 Routes pour la gestion des dossiers ***/
    Route::prefix('dossiers')->group(function () {
        Route::post('/', [DossierController::class, 'store']);
        Route::get('/{codeSuivi}', [DossierController::class, 'show']);
        Route::post('/{codeSuivi}/documents', [DossierController::class, 'soumettreDocument']);
        Route::get('/etudiant/{etudiantId}', [DossierController::class, 'getDossiersEtudiant']);
    });

    /*** 📌 Routes pour le suivi des dossiers ***/
    Route::prefix('suivi-dossier')->group(function () {
        Route::post('/verifier', [SuiviDossierController::class, 'suivreDossier']);
        Route::post('/historique', [SuiviDossierController::class, 'getHistorique']);
    });

    /*** 🔒 Routes protégées par middleware 'auth:sanctum' ***/
    Route::middleware(['auth:sanctum'])->group(function () {    

        /*** 📌 Routes pour la validation des dossiers ***/
        Route::prefix('dossiers')->group(function () {
            Route::get('/en-attente', [ValidationDossierController::class, 'getDossiersEnAttente']);
            Route::post('/{dossierId}/valider', [ValidationDossierController::class, 'validerDossier']);
            Route::get('/{dossierId}/documents', [ValidationDossierController::class, 'getDocuments']);
            Route::post('/documents/{documentId}/valider', [ValidationDossierController::class, 'validerDocument']);
        });

        /*** 📌 Routes pour le traitement des dossiers ***/
        Route::prefix('dossiers')->group(function () {
            Route::get('/a-traiter', [TraitementDossierController::class, 'getDossiersATraiter']);
            Route::get('/{dossierId}', [TraitementDossierController::class, 'getDossierDetails']);
            Route::post('/documents/{documentId}/traiter', [TraitementDossierController::class, 'traiterDocument']);
            Route::post('/documents/upload', [DocumentController::class, 'uploadDocument']);
        });

    });
    Route::prefix('api/documents')->group(function () {
        Route::post('/', [DocumentController::class, 'store']);
    });

});
