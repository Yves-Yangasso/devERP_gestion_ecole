<?php
// Models/Document.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Document extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'etudiant_id',
        'type_document_id',
        'nom',
        'chemin_fichier',
        'cloudinary_id',
        'taille',
        'format',
        'statut',
        'date_expiration'
    ];

    protected $casts = [
        'date_expiration' => 'datetime',
    ];

    // Relations
    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }

    public function typeDocument()
    {
        return $this->belongsTo(TypeDocument::class);
    }
}