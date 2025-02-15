<?php

return [
    'cloud_name' => env('CLOUDINARY_CLOUD_NAME', 'deverp-gestion-ecole'),
    'api_key' => env('CLOUDINARY_API_KEY'),
    'api_secret' => env('CLOUDINARY_API_SECRET'),
    'secure' => env('CLOUDINARY_SECURE', true),
    'dossier_folder' => env('CLOUDINARY_DOSSIER_FOLDER', 'dossiers-inscription'),
    'folders' => [
        'documents' => 'dossiers-etudiants/',
    ]
];