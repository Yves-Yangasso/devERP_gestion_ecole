<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Etudiant\InscriptionEtudiantController;
use App\Http\Controllers\API\Tuteur\TuteurController;
use App\Http\Controllers\API\Dossier\DossierController;

Route::prefix('/inscription')->group(function () {
    // Liste des inscription
    Route::get('/', [InscriptionEtudiantController::class, 'index']);

    // Détails d'un tuteur
    Route::get('/{id}', [InscriptionEtudiantController::class, 'show']);

    // Créer un tuteur
    Route::post('/', [InscriptionEtudiantController::class, 'store']);

    // Modifier un tuteur
    //Route::put('/{id}', [InscriptionEtudiantController::class, 'modifier']);

    // Supprimer un tuteur
    //Route::delete('/{id}', [InscriptionEtudiantController::class, 'supprimer']);
});
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


Route::prefix('api/v1')->group(function () {
    Route::prefix('dossiers')->group(function () {
        // Création d'un nouveau dossier
        Route::post('/', [DossierController::class, 'store'])
            ->name('dossiers.store');
        
        // Récupération d'un dossier par code de suivi
        Route::get('/{codeSuivi}', [DossierController::class, 'show'])
            ->name('dossiers.show');
        
        // Soumission d'un document
        Route::post('/{codeSuivi}/documents', [DossierController::class, 'soumettreDocument'])
            ->name('dossiers.soumettre-document');
        
        // Liste des dossiers d'un étudiant
        Route::get('/etudiant/{etudiantId}', [DossierController::class, 'getDossiersEtudiant'])
            ->name('dossiers.etudiant');
    });
});