<?php

namespace App\Http\Middleware;

use App\Models\Dossier;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifierStatutDossier
{
    public function handle(Request $request, Closure $next): Response
    {
        $codeDossier = $request->route('codeDossier');
        
        $dossier = Dossier::where('code_suivi', $codeDossier)->first();
        
        if (!$dossier) {
            return response()->json([
                'message' => 'Dossier non trouvé'
            ], Response::HTTP_NOT_FOUND);
        }

        // Vérifier si le dossier n'est pas dans un état final
        if ($dossier->statut === 'valide' || $dossier->statut === 'rejete') {
            return response()->json([
                'message' => 'Le dossier est déjà ' . $dossier->statut . '. Aucune modification n\'est possible.'
            ], Response::HTTP_FORBIDDEN);
        }

        // Ajouter le dossier à la requête pour éviter de le recharger
        $request->attributes->set('dossier', $dossier);

        return $next($request);
    }
}