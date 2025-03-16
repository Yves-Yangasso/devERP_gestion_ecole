<?php

namespace App\Events\Paiement;

use App\Models\ModePaiement;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ModePaiementCreer
{
    use Dispatchable, SerializesModels;

    /**
     * @var modePaiement
     */
    public $modePaiement;

    public function __construct(ModePaiement $modePaiement)
    {
        $this->modePaiement = $modePaiement;
    }
}