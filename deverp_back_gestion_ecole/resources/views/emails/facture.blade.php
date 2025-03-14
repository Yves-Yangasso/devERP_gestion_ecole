<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Facture Scolaire</title>
    <style>
        body {
            font-family: 'Roboto', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f7f7f7;
        }
        .container {
            max-width: 800px;
            margin: 50px auto;
            background: #ffffff;
            border-radius: 10px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
            padding: 30px;
            animation: fadeIn 1s ease-out;
        }
        h1, h2 {
            color: #2c3e50;
            text-align: center;
        }
        h1 {
            font-size: 2.5em;
            margin-bottom: 20px;
        }
        h2 {
            font-size: 1.6em;
            margin-top: 40px;
        }
        p {
            font-size: 18px;
            color: #34495e;
            line-height: 1.6;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            background: #ecf0f1;
            margin: 10px 0;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease-in-out;
        }
        li:hover {
            transform: scale(1.05);
        }
        .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 14px;
            color: #95a5a6;
        }
        .footer p {
            margin: 5px 0;
        }
        .highlight {
            color: #e74c3c;
            font-weight: bold;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Facture #{{ htmlspecialchars($facture['id']) }}</h1>
        <p><strong>Montant total :</strong> <span class="highlight">{{ number_format($facture['montant_paiement'], 2, ',', ' ') }} €</span></p>
        <p><strong>Statut :</strong> {{ htmlspecialchars($facture['status']) }}</p>

        <h2>Détails du Paiement :</h2>
        @if (!empty($facture['lignes_paiement']))
            <ul>
                @foreach ($facture['lignes_paiement'] as $ligne)
                    <li>
                        <strong>{{ htmlspecialchars($ligne['type_frais'] ?? 'Non spécifié') }}</strong> : 
                        <span class="highlight">{{ number_format($ligne['montant'], 2, ',', ' ') }} €</span>
                    </li>
                @endforeach
            </ul>
        @else
            <p>Aucun détail de paiement disponible.</p>
        @endif

        <div class="footer">
            <p>Merci pour votre paiement.</p>
            <p>École ISI - 123 Rue de l'Éducation, Paris - +221 78 100 07 13</p>
        </div>
    </div>
</body>
</html>
