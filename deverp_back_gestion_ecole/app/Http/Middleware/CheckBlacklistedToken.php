<?php

namespace App\Http\Middleware;

use App\Models\BlacklistedToken;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckBlacklistedToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if ($token && BlacklistedToken::where('token', $token)->exists()) {
            return response()->json(['message' => 'Token blacklisted.'], Response::HTTP_UNAUTHORIZED);
        }

        return $next($request);
    }
}
