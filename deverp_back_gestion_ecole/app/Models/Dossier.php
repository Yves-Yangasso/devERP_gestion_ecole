<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dossier extends Model
{
    use HasFactory;

    protected $fillable = [
        'inscription_id',
        'nom',
        'description'
    ];

    public function inscription()
    {
        return $this->belongsTo(Inscription::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }
}
