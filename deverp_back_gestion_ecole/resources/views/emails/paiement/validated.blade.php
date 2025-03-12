<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Facture de Paiement</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/js/all.min.js" crossorigin="anonymous"></script>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            width: 90%;
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
            border: 1px solid #ddd;
        }
        .email-header {
            background-color: #285b96;
            color: white;
            padding: 25px;
            font-size: 22px;
            font-weight: bold;
        }
        .email-body {
            padding: 30px;
            color: #333;
            text-align: left;
        }
        h1 {
            color: #285b96;
            font-size: 24px;
            text-align: center;
        }
        .panel {
            background: #E3E9F3;
            padding: 15px;
            border-left: 5px solid #285b96;
            margin: 20px 0;
            font-size: 16px;
            color: #285b96;
        }
        .btn-container {
            text-align: center;
            margin: 30px 0;
        }
        .btn {
            display: inline-block;
            background-color: #285b96;
            color: #fff;
            padding: 12px 25px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            font-size: 16px;
            transition: 0.3s;
        }
        .btn:hover {
            background-color: #14202B;
        }
        .email-footer {
            text-align: center;
            padding: 15px;
            background: #285b96;
            color: #fff;
            font-size: 12px;
            border-radius: 0 0 10px 10px;
        }
        .table-details {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        .table-details th, .table-details td {
            padding: 10px;
            border: 1px solid #ddd;
            text-align: left;
        }
        .table-details th {
            background-color: #285b96;
            color: white;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- En-tête -->
        <div class="email-header">
            Groupe ISI - Facture
        </div>

        <!-- Corps de l'email -->
        <div class="email-body">
            <h1>✅ Confirmation de votre paiement</h1>
            <p>Bonjour <strong>{{ $paiement->inscription->prenom }} {{ $paiement->inscription->nom }}</strong>,</p>
            <p>Nous vous confirmons que votre paiement a été <strong>validé avec succès</strong>. Voici les détails de votre facture :</p>

            <div class="panel">
                📍 <strong>Référence du paiement</strong> : {{ $paiement->id }}<br>
                📅 <strong>Date</strong> : {{ $paiement->date_paiement->format('d/m/Y H:i') }}
            </div>

            <table class="table-details">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Montant</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($paiement->lignesPaiement as $ligne)
                        <tr>
                            <td>{{ $ligne->type_frais ?? 'Frais divers' }}</td>
                            <td>{{ number_format($ligne->montant, 2) }} FCFA</td>
                        </tr>
                    @endforeach
                    <tr>
                        <td><strong>Total</strong></td>
                        <td><strong>{{ number_format($paiement->montant_paiement, 2) }} FCFA</strong></td>
                    </tr>
                </tbody>
            </table>

            <p><strong>Mode de paiement</strong> : {{ $paiement->modePaiement->nom ?? 'Non spécifié' }}</p>

            <!-- Bouton -->
            <div class="btn-container">
                <a href="{{ url('/paiements/' . $paiement->id) }}" class="btn">📄 Voir mon paiement</a>
            </div>

            <h3>💡 Besoin d'aide ?</h3>
            <p>Notre équipe est là pour vous accompagner !</p>
            <div class="btn-container">
                <a href="{{ url('/contact') }}" class="btn" style="background-color: #2D68C4;">📞 Contacter le support</a>
            </div>

            <p>Merci de votre confiance !</p>
        </div>

        <!-- Pied de page -->
        <div class="email-footer">
            © 2025 Groupe ISI. Tous droits réservés.
        </div>
    </div>
</body>
</html>
