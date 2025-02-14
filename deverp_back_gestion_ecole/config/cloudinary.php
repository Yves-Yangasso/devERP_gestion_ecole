<?php

return [
    'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
    'api_key' => env('CLOUDINARY_API_KEY'),
    'api_secret' => env('CLOUDINARY_API_SECRET'),
    'secure' => true,
    'dossier_folder' => 'dossiers_inscription',
    'folders' => [
        'documents' => 'dossiers_etudiants/',
    ]
];
