<?php

namespace App\Contracts\Auth;

interface AuthentificationServiceInterface
{
    public function authenticate(array $credentials);
    public function logout();
    public function generateTokens($user);
    public function revokeTokens($user);
    public function refreshToken(string $refreshToken);
    public function validateToken(string $token);
    public function checkInactivity($user);
}