<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BlacklistedToken;
use Laravel\Passport\Token;

class BlacklistedTokenController extends Controller
{
    public function blacklistToken(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
            'type' => 'required|in:expired,revoked',
        ]);

        BlacklistedToken::create([
            'token' => $request->token,
            'type' => $request->type,
        ]);

        return response()->json(['message' => 'Token blacklisted successfully.']);
    }

    public function revokeCurrentToken(Request $request)
    {
        $token = $request->user()->token();
        if ($token) {
            $token->revoke();

            BlacklistedToken::create([
                'token' => $token->id,
                'type' => 'revoked',
            ]);

            return response()->json(['message' => 'Token revoked and blacklisted.']);
        }

        return response()->json(['message' => 'No active token found.'], 400);
    }
}
