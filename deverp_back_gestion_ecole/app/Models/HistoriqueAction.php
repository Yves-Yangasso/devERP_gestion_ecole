<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HistoriqueAction extends Model
{
    protected $fillable = [
        'user_id',
        'type_action',
        'entite',
        'entite_id',
        'anciennes_valeurs',
        'nouvelles_valeurs'
    ];

    protected $casts = [
        'anciennes_valeurs' => 'array',
        'nouvelles_valeurs' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
