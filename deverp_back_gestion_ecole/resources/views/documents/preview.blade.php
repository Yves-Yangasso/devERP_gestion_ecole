<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prévisualisation du document</title>
    <style>
        body,
        html {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
        }

        .document-container {
            width: 100%;
            height: 100vh;
        }
    </style>
</head>

<body>
    <div class="document-container">
        <iframe src="{{ $previewUrl }}" width="100%" height="100%" style="border: none;"
            title="Prévisualisation du document">
        </iframe>
    </div>
</body>

</html>
