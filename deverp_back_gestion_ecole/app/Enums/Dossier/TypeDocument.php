<?php

namespace App\Enums\Dossier;

enum TypeDocument: string
{
    case BULLETIN_NOTES = 'bulletin_notes';
    case CERTIFICAT_RESIDENCE = 'certificat_residence';
    case CNI_PASSEPORT = 'Carte nationale d\'identité';
    case DIPLOME = 'diplome';
    case DIPLOME_BAC = 'diplome_bac'; // Nouveau cas ajouté
    case CERTIFICAT_SCOLARITE = 'certificat_scolarite';
    case CASIER_JUDICIAIRE = 'casier_judiciaire';
    case PHOTO_IDENTITE = 'photo_identite';
}
