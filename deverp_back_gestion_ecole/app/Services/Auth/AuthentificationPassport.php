<?php

namespace App\Services\Auth;

use App\Contracts\Auth\AuthentificationServiceInterface;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\TokenRepository;
use Laravel\Passport\RefreshTokenRepository;

class AuthentificationPassport implements AuthentificationServiceInterface
{
    public function authenticate(array $credentials)
    {
        // Récupère l'utilisateur par login
        $user = User::where('login', $credentials['login'])->first();
        
        // Vérifie si l'utilisateur existe et si le mot de passe correspond
        if ($user && $user->password === $credentials['password']) {
            // Crée un token d'accès pour l'utilisateur
            $token = $user->createToken('auth_token')->accessToken;
            // dd($token);

            // Retourne les informations d'authentification et le token
            return [
                'user' => $user,
                'access_token' => $token,
                'token_type' => 'Bearer',
            ];
        }

        // Si l'utilisateur n'est pas trouvé ou le mot de passe ne correspond pas
        return null;
    }

    public function generateTokens($user)
    {
        // Crée un token d'accès pour l'utilisateur passé en paramètre
        $token = $user->createToken('auth_token')->accessToken;

        // Retourne le token généré
        return [
            'access_token' => $token,
            'token_type' => 'Bearer',
        ];
    }

    public function revokeTokens($user)
    {
        // Révoque le token d'accès et les tokens de rafraîchissement de l'utilisateur
        $tokenRepository = app(TokenRepository::class);
        $refreshTokenRepository = app(RefreshTokenRepository::class);

        // Récupère le token d'accès de l'utilisateur
        $token = $user->token();

        if ($token) {
            // Révoque le token d'accès
            $tokenRepository->revokeAccessToken($token->id);

            // Révoque les tokens de rafraîchissement liés à ce token
            $refreshTokenRepository->revokeRefreshTokensByAccessTokenId($token->id);
        }
    }

    public function logout()
    {
        // Récupère le token de l'utilisateur actuel
        $tokenRepository = app(TokenRepository::class);
        $refreshTokenRepository = app(RefreshTokenRepository::class);

        $token = Auth::user()->token();

        if ($token) {
            // Révoque le token d'accès
            $tokenRepository->revokeAccessToken($token->id);

            // Révoque les tokens de rafraîchissement associés
            $refreshTokenRepository->revokeRefreshTokensByAccessTokenId($token->id);
        }
    }
}
