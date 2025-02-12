<?php

namespace App\Models;

use App\Enums\Dossier\TypeDocument;
use App\Enums\Dossier\ResultatValidation;
use App\Services\Storage\CloudinaryStorageService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\{HasMany, BelongsTo};

class Document extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'dossier_id',
        'type',
        'chemin',
        'public_id', // Ajout du public_id Cloudinary
        'statut',
        'commentaire',
        'date_validation'
    ];

    protected $casts = [
        'date_validation' => 'datetime',
        'type' => TypeDocument::class, 
        'statut' => ResultatValidation::class,
    ];

    protected static function boot()
    {
        parent::boot();

        // Suppression du fichier sur Cloudinary lors de la suppression du modèle
        static::deleting(function ($document) {
            if ($document->public_id) {
                app(CloudinaryStorageService::class)->deleteDocument($document->public_id);
            }
        });
    }

    public function dossier(): BelongsTo
    {
        return $this->belongsTo(Dossier::class);
    }

    public function validations(): HasMany
    {
        return $this->hasMany(ValidationDocument::class);
    }

    public function dernierResultatValidation()
    {
        return $this->validations()->latest()->first();
    }
}
