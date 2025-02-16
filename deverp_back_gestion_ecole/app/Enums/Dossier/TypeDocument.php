<?php

namespace App\Enums\Dossier;

enum TypeDocument: string
{
    case BULLETIN_NOTES = 'bulletin_notes';
    case CERTIFICAT_RESIDENCE = 'certificat_residence';
    case CNI = 'Carte nationale d\'identité';
    // case CNI = 'cni';
    case DIPLOME = 'diplome';
    case DIPLOME_BAC = 'diplome_bac'; // Nouveau cas ajouté
    case CERTIFICAT_SCOLARITE = 'certificat_scolarite';
    case CASIER_JUDICIAIRE = 'casier_judiciaire';
    case PHOTO_IDENTITE = 'photo_identite';
    case CERTIFICAT_SIGNA = 'certificat_signa';
    case CERTIFICAT_VISITE = 'certificat_visite';
    case CERTIFICAT_ADRESSE = 'certificat_adresse';
    case CERTIFICAT_VILLE = 'certificat_ville';
    case CERTIFICAT_REGION = 'certificat_region';
    case CERTIFICAT_PAYS = 'certificat_pays';
}
