<?php

namespace App\Enums\Dossier;

enum TypeDocument: string
{
    case BULLETIN_NOTES = 'bulletin notes';
    case CERTIFICAT_RESIDENCE = 'certificat residence';
    case CNI_PASSEPORT = 'cni/passeport';
    case DIPLOME = 'diplome';
    case CERTIFICAT_SCOLARITE = 'certificat scolarite';
    case CASIER_JUDICIAIRE = 'casier judiciaire';
    case PHOTO_IDENTITE = 'photo identite';
    case EXTRAIT_NAISSANCE = 'extrait de naissance';
    case VISITE_CONTRE_VISITE = 'visite contre visite';
    case CERTIFICAT_DOMICILE = 'certificat domicile';
    case CERTIFICAT_TRAVAIL = 'certificat de travail';
    case VISITE_MEDICALE = 'visite medicale';
}
