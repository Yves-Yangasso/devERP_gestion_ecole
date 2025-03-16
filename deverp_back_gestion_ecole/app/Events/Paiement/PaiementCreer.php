<?php

namespace App\Events\Paiement;

use App\Models\Paiement;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PaiementCreer
{
    use Dispatchable, SerializesModels;

    /**
     * @var Paiement
     */
    public $paiement;

    public function __construct(Paiement $paiement)
    {
        $this->paiement = $paiement;
    }
}