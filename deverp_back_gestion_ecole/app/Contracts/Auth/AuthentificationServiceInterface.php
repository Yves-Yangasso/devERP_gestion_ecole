<?php

namespace App\Contracts\Auth;

interface AuthentificationServiceInterface
{
    public function authenticate(array $credentials);
    public function logout();
    
    // Ajouter les signatures des méthodes
    public function generateTokens($user);
    public function revokeTokens($user);
}
