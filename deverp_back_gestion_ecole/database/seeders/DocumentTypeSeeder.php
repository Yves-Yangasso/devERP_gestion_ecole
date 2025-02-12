<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DocumentTypeSeeder extends Seeder
{
    public function run(): void
    {
        $typesDocuments = [
            [
                'nom' => 'Bulletins de notes',
                'code' => 'bulletin_notes',
                'description' => 'Bulletins de notes de l\'année précédente',
                'obligatoire' => true,
                'formats_autorises' => json_encode(['pdf', 'jpg', 'jpeg', 'png']),
                'taille_max' => 10240, // 10 Mo
            ],
            [
                'nom' => 'Certificat de Résidence',
                'code' => 'certificat_residence',
                'description' => 'Certificat de résidence actuel',
                'obligatoire' => true,
                'formats_autorises' => json_encode(['pdf', 'jpg', 'jpeg', 'png']),
                'taille_max' => 5120, // 5 Mo
            ],
            [
                'nom' => 'CNI/Passeport',
                'code' => 'cni_passeport',
                'description' => 'Copie de la CNI ou du passeport légalisée',
                'obligatoire' => true,
                'formats_autorises' => json_encode(['pdf', 'jpg', 'jpeg', 'png']),
                'taille_max' => 5120,
            ],
            // ... autres types de documents
        ];

        DB::table('types_documents')->insert($typesDocuments);
    }
}