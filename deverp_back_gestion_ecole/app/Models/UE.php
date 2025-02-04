<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UE extends Model
{
    use HasFactory;

    protected $fillable = [
        'code_ue',
        'nom_ue',
        'credits',
    ];

    public function filieres()
    {
        return $this->belongsToMany(Filiere::class, 'ligne_ue');
    }
}