<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BlacklistedToken extends Model
{
    protected $fillable = [
        'token',
        'type',
        'revoked_at'
    ];

    protected $casts = [
        'revoked_at' => 'datetime'
    ];
}
