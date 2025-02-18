<?php

namespace App\Enums\Tuteur;

enum ModePaiementEnums: string
{
    case CHEQUE = 'cheque';
    case MOBILE_MONEY  = 'mobile_money';
    case LIQUIDE  = 'liquide';
    case AUTRE = 'autre';
}
