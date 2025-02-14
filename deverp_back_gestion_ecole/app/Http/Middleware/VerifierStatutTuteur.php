<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Enums\Tuteur\StatutTuteur;
use Symfony\Component\HttpFoundation\Response;

class VerifierStatutTuteur
{
    public function handle(Request $request, Closure $next)
    {
        $tuteur = $request->user();

        if (!$tuteur || $tuteur->statut !== StatutTuteur::ACTIF) {
            return response()->json([
                'message' => 'Accès non autorisé. Votre compte tuteur est inactif.'
            ], Response::HTTP_FORBIDDEN);
        }

        return $next($request);
    }
}
