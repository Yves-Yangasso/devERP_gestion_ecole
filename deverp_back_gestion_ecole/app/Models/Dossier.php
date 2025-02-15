<?php

namespace App\Models;

use App\Enums\Dossier\StatutDossier;
use App\Traits\Dossier\GestionDocuments;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{HasMany, BelongsTo};
use Illuminate\Database\Eloquent\SoftDeletes;

class Dossier extends Model
{
    use HasFactory, SoftDeletes, GestionDocuments;
    protected $table = 'dossiers';

    protected $fillable = [
        'inscription_id',
        'titre',
        'commentaire',
        'code_suivi',
        'statut',
        'mode_validation',
        'date_soumission'
    ];

    protected $casts = [
        'statut' => StatutDossier::class,
        'date_soumission' => 'datetime',
        'inscription_id' => 'integer',
    ];


    protected $attributes = [
        'statut' => 'en_attente',
        'mode_validation' => 'manuel',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($dossier) {
            if (!$dossier->code_suivi) {
                $dossier->genererCodeSuivi();
            }
        });
    }

    public function inscription()
    {
        return $this->belongsTo(Inscription::class);
    }

    public function documents(): HasMany
    {
        return $this->hasMany(Document::class);
    }

    public function validations(): HasMany
    {
        return $this->hasMany(ValidationDocument::class);
    }

    public function genererCodeSuivi(): void
    {
        $this->code_suivi = 'DOS-' . strtoupper(uniqid());
    }

    public function estComplet(): bool
    {
        $documentsRequis = config('dossier.documents_requis');
        $documentsPresents = $this->documents->pluck('type')->toArray();

        return count(array_diff($documentsRequis, $documentsPresents)) === 0;
    }
}
