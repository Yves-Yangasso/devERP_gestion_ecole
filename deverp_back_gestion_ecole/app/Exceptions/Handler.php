<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpFoundation\JsonResponse;

class Handler extends ExceptionHandler
{
    /**
     * Liste des types d'exceptions qui ne doivent pas être signalés.
     *
     * @var array<int, class-string<Throwable>>
     */
    protected $dontReport = [
        ValidationException::class,
        AuthenticationException::class,
    ];

    /**
     * Liste des types d'exceptions qui ne doivent pas être enregistrés pour la journalisation.
     *
     * @var array<int, class-string<Throwable>>
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Signaler ou enregistrer une exception.
     */
    public function report(Throwable $exception): void
    {
        parent::report($exception);
    }

    /**
     * Rendre une exception en réponse HTTP.
     */
    public function render($request, Throwable $exception): JsonResponse
    {
        if ($exception instanceof NotFoundHttpException) {
            return response()->json([
                'error' => 'Ressource non trouvée',
                'message' => 'L\'URL demandée est introuvable.'
            ], 404);
        }

        if ($exception instanceof AuthenticationException) {
            return response()->json([
                'error' => 'Non authentifié',
                'message' => 'Vous devez être connecté pour accéder à cette ressource.'
            ], 401);
        }

        return parent::render($request, $exception);
    }
}
