<?php

namespace App\Models;

use App\Enums\Dossier\TypeDocument;
use App\Enums\Dossier\StatutDocument;
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
        'url_secure',
        'url_public',
        'folder_path',
        'public_id',
        'format',
        'statut',
        'commentaire',
        'date_validation',
        'preview_url',
        'upload_timestamp'
    ];

    protected $casts = [
        'date_validation' => 'datetime',
        'type' => TypeDocument::class,
        'statut' => StatutDocument::class,
        // 'statut' => ResultatValidation::class,
    ];

    protected $attributes = [
        'statut' => StatutDocument::EN_ATTENTE
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
