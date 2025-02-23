<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prévisualisation - {{ $documentName }}</title>
    <script src="{{ asset('js/pdfjs/build/pdf.js') }}"></script>
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

        .actions {
            display: flex;
            gap: 10px;
        }

        .btn {
            background: #4285f4;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 4px;
            cursor: pointer;
            text-decoration: none;
        }

        #canvas-container {
            flex: 1;
            overflow: auto;
            background: #e9e9e9;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
        }

        canvas {
            margin: 5px 0;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="toolbar">
            <div class="title">{{ $documentName }}</div>
            <div class="actions">
                <button id="prev" class="btn">Précédent</button>
                <span id="page-info">Page <span id="page-num">1</span> / <span id="page-count">?</span></span>
                <button id="next" class="btn">Suivant</button>
                <a href="{{ $pdfUrl }}" class="btn" download>Télécharger</a>
            </div>
        </div>
        <div id="canvas-container"></div>
    </div>

    <script>
        const pdfUrl = '{{ $pdfUrl }}';
        const container = document.getElementById('canvas-container');
        const pageNumSpan = document.getElementById('page-num');
        const pageCountSpan = document.getElementById('page-count');
        const prevButton = document.getElementById('prev');
        const nextButton = document.getElementById('next');

        let pdfDoc = null;
        let pageNum = 1;
        let pageRendering = false;
        let pageNumPending = null;

        pdfjsLib.GlobalWorkerOptions.workerSrc = '{{ asset('js/pdfjs/build/pdf.worker.js') }}';

        function renderPage(num) {
            pageRendering = true;

            pdfDoc.getPage(num).then(function(page) {
                const viewport = page.getViewport({
                    scale: 1.5
                });
                const canvas = document.createElement('canvas');
                canvas.id = `page-${num}`;
                const ctx = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // Supprimer les pages précédentes
                while (container.firstChild) {
                    container.removeChild(container.firstChild);
                }

                container.appendChild(canvas);

                const renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };

                const renderTask = page.render(renderContext);

                renderTask.promise.then(function() {
                    pageRendering = false;
                    if (pageNumPending !== null) {
                        renderPage(pageNumPending);
                        pageNumPending = null;
                    }
                });
            });

            pageNumSpan.textContent = num;
        }

        function queueRenderPage(num) {
            if (pageRendering) {
                pageNumPending = num;
            } else {
                renderPage(num);
            }
        }

        function onPrevPage() {
            if (pageNum <= 1) {
                return;
            }
            pageNum--;
            queueRenderPage(pageNum);
        }

        function onNextPage() {
            if (pageNum >= pdfDoc.numPages) {
                return;
            }
            pageNum++;
            queueRenderPage(pageNum);
        }

        prevButton.addEventListener('click', onPrevPage);
        nextButton.addEventListener('click', onNextPage);

        // Charger le PDF
        pdfjsLib.getDocument(pdfUrl).promise.then(function(pdf) {
            pdfDoc = pdf;
            pageCountSpan.textContent = pdf.numPages;
            renderPage(pageNum);
        });
    </script>
</body>

</html>
