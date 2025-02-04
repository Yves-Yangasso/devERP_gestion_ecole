<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dossier extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'date_creation',
        'status_dossier_id',
    ];

    public function status()
    {
        return $this->belongsTo(StatusDossier::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }
}