<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prévisualisation - {{ $documentName }}</title>
    <style>
        body,
        html {
            margin: 0;
            padding: 0;
            height: 100%;
            font-family: Arial, sans-serif;
            background: #f0f0f0;
        }

        .container {
            display: flex;
            flex-direction: column;
            height: 100vh;
        }

        .toolbar {
            background: #f0f0f0;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #ddd;
        }

        .title {
            font-weight: bold;
        }

        .download-btn {
            background: #4285f4;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 4px;
            cursor: pointer;
            text-decoration: none;
        }

        .image-container {
            flex: 1;
            overflow: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #e9e9e9;
            padding: 20px;
        }

        img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="toolbar">
            <div class="title">{{ $documentName }}</div>
            <a href="{{ $imageUrl }}" class="download-btn" download>Télécharger</a>
        </div>
        <div class="image-container">
            <img src="{{ $imageUrl }}" alt="{{ $documentName }}" />
        </div>
    </div>
</body>

</html>
