<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeDocument extends Model
{
    use HasFactory;

    protected $table = 'type_documents';

    protected $fillable = [
        'nom_type_document',
        'description_type_document',
        'created_at',
    ];


    public function documents(){
        return $this->hasMany(Document::class);
    }
}
