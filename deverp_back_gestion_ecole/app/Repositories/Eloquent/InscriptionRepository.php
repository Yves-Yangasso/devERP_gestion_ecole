<?php

namespace App\Repositories\Eloquent;

use App\Models\Inscription;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Exception;

class InscriptionRepository
{
    protected $cachePrefix = 'inscription_';
    protected $cacheDuration = 3600; // 1 heure

    public function create(array $data): Inscription
    {
        try {
            // dd($data);
            var_dump($data);
            $inscription = Inscription::create($data);
            $this->clearCache();
            return $inscription;
        } catch (Exception $e) {
            Log::error('Erreur création inscription: ' . $e->getMessage());
            throw new Exception('Erreur lors de la création de l\'inscription: ' . $e->getMessage());
        }
    }

    public function getAll(): Collection
    {
        return Cache::remember($this->cachePrefix . 'all', $this->cacheDuration, function () {
            return Inscription::with(['tuteur', 'dossier.documents'])->get();
        });
    }

    public function getById(int $id): ?Inscription
    {
        return Cache::remember($this->cachePrefix . $id, $this->cacheDuration, function () use ($id) {
            return Inscription::with(['tuteur', 'dossier.documents'])->findOrFail($id);
        });
    }

    public function findByCodeSuiviAndEmail(string $codeSuivi, string $email): ?Inscription
    {
        $cacheKey = $this->cachePrefix . "code_{$codeSuivi}_email_{$email}";

        return Cache::remember($cacheKey, $this->cacheDuration, function () use ($codeSuivi, $email) {
            return Inscription::whereHas('dossier', function ($query) use ($codeSuivi) {
                $query->where('code_suivi', $codeSuivi);
            })
                ->where('email', $email)
                ->with(['dossier.documents', 'tuteur'])
                ->first();
        });
    }

    public function updateStatut(int $id, string $statut): bool
    {
        try {
            $updated = Inscription::where('id', $id)->update(['statut' => $statut]);
            if ($updated) {
                $this->clearCache($id);
            }
            return $updated;
        } catch (Exception $e) {
            Log::error('Erreur mise à jour statut: ' . $e->getMessage());
            throw new Exception('Erreur lors de la mise à jour du statut: ' . $e->getMessage());
        }
    }

    public function getByStatut(string $statut): Collection
    {
        return Cache::remember($this->cachePrefix . "statut_{$statut}", $this->cacheDuration, function () use ($statut) {
            return Inscription::where('statut', $statut)
                ->with(['tuteur', 'dossier.documents'])
                ->get();
        });
    }

    public function getWithDossierAndDocuments(int $id): ?Inscription
    {
        return Cache::remember($this->cachePrefix . "complete_{$id}", $this->cacheDuration, function () use ($id) {
            return Inscription::with([
                'tuteur',
                'dossier.documents' => function ($query) {
                    $query->orderBy('updated_at', 'desc');
                }
            ])->findOrFail($id);
        });
    }

    protected function clearCache(?int $id = null): void
    {
        if ($id) {
            Cache::forget($this->cachePrefix . $id);
            Cache::forget($this->cachePrefix . "complete_{$id}");
        }
        Cache::forget($this->cachePrefix . 'all');
    }
}
