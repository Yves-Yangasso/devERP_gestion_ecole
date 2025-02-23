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

        .viewer-container {
            flex: 1;
            overflow: hidden;
            background: #e9e9e9;
        }

        iframe {
            width: 100%;
            height: 100%;
            border: none;
        }

        .fallback {
            display: none;
            padding: 20px;
            text-align: center;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="toolbar">
            <div class="title">{{ $documentName }}</div>
            <a href="{{ $downloadUrl }}" class="download-btn" download>Télécharger</a>
        </div>
        <div class="viewer-container">
            <iframe id="pdf-viewer" src="{{ $viewerUrl }}" allowfullscreen title="Prévisualisation PDF"
                onerror="document.getElementById('fallback').style.display='block';this.style.display='none';"></iframe>
            <div id="fallback" class="fallback">
                <p>Impossible de charger la prévisualisation.</p>
                <p>
                    <a href="{{ $downloadUrl }}" class="download-btn" download>
                        Télécharger le document
                    </a>
                </p>
            </div>
        </div>
    </div>

    <script>
        // Vérifier si la prévisualisation fonctionne après 3 secondes
        setTimeout(() => {
            const iframe = document.getElementById('pdf-viewer');
            if (iframe.contentDocument && iframe.contentDocument.body.innerHTML === '') {
                document.getElementById('fallback').style.display = 'block';
                iframe.style.display = 'none';
            }
        }, 3000);
    </script>
</body>

</html>
