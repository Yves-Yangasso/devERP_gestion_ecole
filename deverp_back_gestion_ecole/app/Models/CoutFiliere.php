<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CoutFiliere extends Model
{
    use HasFactory;

    protected $fillable = [
        'filiere_id',
        'montant',
        'date_mise_a_jour',
    ];

    public function filiere()
    {
        return $this->belongsTo(Filiere::class);
    }
}
