<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StatusDossier extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom_status',
    ];

    public function dossiers()
    {
        return $this->hasMany(Dossier::class);
    }
}
