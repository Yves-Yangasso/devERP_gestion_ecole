<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Contracts\Auth\AuthentificationServiceInterface;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthentificationServiceInterface $authService)
    {
        $this->authService = $authService;
    }

    public function login(Request $request)
    {
        $request->validate([
            'login' => 'required',
            'password' => 'required',
        ]);

        $result = $this->authService->authenticate($request->only('login', 'password'));

        if (!$result) {
            return response()->json([
                'message' => 'Identifiants incorrects'
            ], 401);
        }

        return response()->json($result);
    }

    public function refresh(Request $request)
    {
        $request->validate([
            'refresh_token' => 'required'
        ]);

        $result = $this->authService->refreshToken($request->refresh_token);

        if (!$result) {
            return response()->json([
                'message' => 'Refresh token invalide'
            ], 401);
        }

        return response()->json($result);
    }

    public function logout()
    {
        $this->authService->logout();
        return response()->json(['message' => 'Déconnexion réussie']);
    }
}
