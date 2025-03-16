<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TypeDocument extends Model
{
    protected $table = 'types_documents';

    protected $fillable = [
        'libelle', 
        'code', 
        'description', 
        'obligatoire'
    ];

    protected $casts = [
        'obligatoire' => 'boolean'
    ];

    public function documents()
    {
        return $this->hasMany(Document::class);
    }
}