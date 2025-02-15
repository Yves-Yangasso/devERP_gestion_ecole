<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo};

class ValidationDocument extends Model
{
    use HasFactory;

    protected $fillable = [
        'document_id',
        'validateur_type',
        'validateur_id',
        'resultats_validation',
        'score_confiance',
        'commentaire',
    ];

    protected $casts = [
        'resultats_validation' => 'array',
        'score_confiance' => 'decimal:2',
    ];

    public function document(): BelongsTo
    {
        return $this->belongsTo(Document::class);
    }

    public function validateur()
    {
        return $this->morphTo();
    }
}