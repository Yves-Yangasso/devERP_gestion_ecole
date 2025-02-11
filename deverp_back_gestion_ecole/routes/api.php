<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\Tuteur\TuteurController;

Route::prefix('api/tuteurs')->group(function () {
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