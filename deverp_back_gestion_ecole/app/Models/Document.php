<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'type_document',
        'date_creation',
        'chemin_acces',
    ];

    public function dossier()
    {
        return $this->belongsTo(Dossier::class);
    }
}
