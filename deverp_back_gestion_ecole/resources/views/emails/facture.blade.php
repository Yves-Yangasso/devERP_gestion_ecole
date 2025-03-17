<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Facture Scolaire</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 800px;
            margin: auto;
            background: #fff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #007bff;
            padding-bottom: 20px;
            margin-bottom: 20px;
        }
        .header h1 {
            color: #333;
            font-size: 2em;
        }
        .details {
            font-size: 18px;
            color: #555;
            margin-bottom: 20px;
        }
        .highlight {
            color: #e74c3c;
            font-weight: bold;
        }
        .payment-details {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        .payment-details th, .payment-details td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
        }
        .payment-details th {
            background-color: #007bff;
            color: #fff;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 14px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Facture #{{ htmlspecialchars($facture['id']) }}</h1>
        </div>

        <div class="details">
            <p><strong>Montant total :</strong> <span class="highlight">{{ number_format($facture['montant_paiement'], 2, ',', ' ') }} F CFA</span></p>
            <p><strong>Statut :</strong> {{ htmlspecialchars($facture['status']) }}</p>
        </div>

        <h2>Détails du Paiement :</h2>
        @if (!empty($facture['lignes_paiement']))
            <table class="payment-details">
                <thead>
                    <tr>
                        <th>Type de Frais</th>
                        <th>Montant (F CFA)</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($facture['lignes_paiement'] as $ligne)
                        <tr>
                            <td>{{ htmlspecialchars($ligne['type_frais'] ?? 'Non spécifié') }}</td>
                            <td class="highlight">{{ number_format($ligne['montant'], 2, ',', ' ') }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
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
