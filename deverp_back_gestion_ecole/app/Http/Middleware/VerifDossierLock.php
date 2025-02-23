<?php

// Middleware pour vérifier le verrouillage des dossiers
// namespace App\Http\Middleware;

// use Closure;
// use App\Models\HistoriqueAction;

// class VerifDossierLock
// {
//     public function handle($request, Closure $next)
//     {
//         $dossierId = $request->route('dossierId');

//         // Vérifier si le dossier est en cours de traitement par un autre admin
//         $traitement = HistoriqueAction::where('dossier_id', $dossierId)
//             ->where('statut_traitement', 'en_cours')
//             ->where('admin_id', '!=', auth()->id())
//             ->first();

//         if ($traitement) {
//             return response()->json([
//                 'message' => 'Ce dossier est en cours de traitement par un autre administrateur',
//                 'admin' => $traitement->admin->name
//             ], 423);
//         }

//         return $next($request);
//     }
// }
