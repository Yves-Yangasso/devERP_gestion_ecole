<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\BlacklistedToken;

class ValidateTokenMiddleware
{
    public function handle($request, Closure $next)
    {
        $token = $request->bearerToken();

        if ($token && BlacklistedToken::where('token', $token)->exists()) {
            return response()->json([
                'message' => 'Token invalide ou révoqué',
                'code' => 'INVALID_TOKEN'
            ], 401);
        }

        return $next($request);
    }
}
