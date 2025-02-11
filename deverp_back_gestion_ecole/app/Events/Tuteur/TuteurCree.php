<?php

namespace App\Events\Tuteur;

use App\Models\Tuteur;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TuteurCree
{
    use Dispatchable, SerializesModels;

    public function __construct(public Tuteur $tuteur) {}
}
