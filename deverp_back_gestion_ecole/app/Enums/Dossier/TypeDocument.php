<?php

namespace App\Enums\Dossier;

enum TypeDocument: string
{
    case BULLETIN_NOTES = 'bulletin_notes';
    case CERTIFICAT_RESIDENCE = 'certificat_residence';
    case CNI_PASSEPORT = 'cni_passeport';
    case DIPLOME = 'diplome';
    case CERTIFICAT_SCOLARITE = 'certificat_scolarite';
    case CASIER_JUDICIAIRE = 'casier_judiciaire';
    case PHOTO_IDENTITE = 'photo_identite';
}
