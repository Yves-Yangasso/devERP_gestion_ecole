<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\Guard;
use App\Contracts\Auth\AuthentificationServiceInterface;

class CheckActivityMiddleware
{
    protected $authService;
    protected $auth;

    public function __construct(
        AuthentificationServiceInterface $authService,
        Guard $auth
    ) {
        $this->authService = $authService;
        $this->auth = $auth;
    }

    public function handle(Request $request, Closure $next)
    {
        if ($this->auth->check()) {
            if (!$this->authService->checkInactivity($this->auth->user())) {
                return response()->json([
                    'message' => 'Session expirée pour inactivité',
                    'code' => 'INACTIVE_SESSION'
                ], 401);
            }
        }

        return $next($request);
    }
}
