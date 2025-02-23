<?php

namespace App\Services\Auth;

use App\Contracts\Auth\AuthentificationServiceInterface;
use App\Models\User;
use App\Models\BlacklistedToken;
use App\Models\HistoriqueAction;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\TokenRepository;
use Laravel\Passport\RefreshTokenRepository;
use Carbon\Carbon;
use Illuminate\Support\Str;

class AuthentificationPassport implements AuthentificationServiceInterface
{
    protected $tokenRepository;
    protected $refreshTokenRepository;

    public function __construct(
        TokenRepository $tokenRepository,
        RefreshTokenRepository $refreshTokenRepository
    ) {
        $this->tokenRepository = $tokenRepository;
        $this->refreshTokenRepository = $refreshTokenRepository;
    }

    public function authenticate(array $credentials)
    {
        $user = User::where('login', $credentials['login'])->first();

        if (!$user || $user->password !== $credentials['password']) {
            return null;
        }

        // Vérifier si l'utilisateur a une session active
        if ($this->hasActiveSession($user)) {
            $this->revokeTokens($user);
        }

        $tokenResult = $user->createToken('auth_token');
        $token = $tokenResult->token;

        // Définir l'expiration à 1 heure
        $token->expires_at = Carbon::now()->addHour();
        $token->save();

        // Générer un refresh token
        $refreshToken = $this->generateRefreshToken($user);

        // Enregistrer l'action de connexion
        $this->logAction($user->id, 'LOGIN', 'Connexion utilisateur');

        return [
            'user' => $user,
            'access_token' => $tokenResult->accessToken,
            'refresh_token' => $refreshToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse($token->expires_at)->toDateTimeString()
        ];
    }

    public function generateTokens($user)
    {
        $tokenResult = $user->createToken('auth_token');
        $token = $tokenResult->token;
        $token->expires_at = Carbon::now()->addHour();
        $token->save();

        $refreshToken = $this->generateRefreshToken($user);

        return [
            'access_token' => $tokenResult->accessToken,
            'refresh_token' => $refreshToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse($token->expires_at)->toDateTimeString()
        ];
    }

    public function revokeTokens($user)
    {
        $tokens = $user->tokens;

        foreach ($tokens as $token) {
            $this->tokenRepository->revokeAccessToken($token->id);
            $this->refreshTokenRepository->revokeRefreshTokensByAccessTokenId($token->id);

            // Ajouter à la liste noire
            BlacklistedToken::updateOrCreate(
                ['token' => $token->id],
                [
                    'type' => 'access',
                    'revoked_at' => now()
                ]
            );
        }

        $this->logAction($user->id, 'REVOKE_TOKENS', 'Révocation des tokens');
    }

    public function logout()
    {
        $user = Auth::user();
        if ($user) {
            $this->revokeTokens($user);
            $this->logAction($user->id, 'LOGOUT', 'Déconnexion utilisateur');
        }
    }

    public function refreshToken(string $refreshToken)
    {
        // Vérifier si le refresh token est dans la liste noire
        if (BlacklistedToken::where('token', $refreshToken)->exists()) {
            return null;
        }

        $user = User::where('refresh_token', $refreshToken)->first();
        if (!$user) {
            return null;
        }

        // Révoquer l'ancien refresh token
        BlacklistedToken::create([
            'token' => $refreshToken,
            'type' => 'refresh',
            'revoked_at' => now()
        ]);

        return $this->generateTokens($user);
    }

    public function validateToken(string $token)
    {
        // Vérifier si le token est dans la liste noire
        if (BlacklistedToken::where('token', $token)->exists()) {
            return false;
        }

        return true;
    }

    public function checkInactivity($user)
    {
        $lastActivity = session('last_activity');
        if ($lastActivity) {
            $inactiveTime = Carbon::parse($lastActivity)->diffInMinutes(now());
            if ($inactiveTime >= 5) {
                $this->revokeTokens($user);
                return false;
            }
        }

        session(['last_activity' => now()]);
        return true;
    }

    protected function hasActiveSession($user)
    {
        return $user->tokens()->where('revoked', false)->exists();
    }

    protected function generateRefreshToken($user)
    {
        $refreshToken = Str::random(60);
        $user->update(['refresh_token' => $refreshToken]);
        return $refreshToken;
    }

    protected function logAction($userId, $action, $details)
    {
        HistoriqueAction::create([
            'user_id' => $userId,
            'type_action' => $action,
            'entite' => 'auth',
            'entite_id' => $userId,
            'nouvelles_valeurs' => json_encode(['details' => $details]),
            'created_at' => now()
        ]);
    }
}
