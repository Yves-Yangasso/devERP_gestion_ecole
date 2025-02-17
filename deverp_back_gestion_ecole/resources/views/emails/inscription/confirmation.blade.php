<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmation d'Inscription</title>
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
            font-size: 18px;
            font-weight: bold;
            color: #285b96;
            text-align: center;
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

        .social-icons {
            margin: 10px 5px;
            font-size: 20px;
            color: white;
            transition: 0.3s;
        }

        .social-icons:hover {
            color: #ccc;
        }

        @media (max-width: 600px) {
            .email-container {
                width: 100%;
                border-radius: 0;
            }
        }
    </style>
</head>

<body>

    <div class="email-container">
        <!-- En-tête -->
        <div class="email-header">
            Gestion_Ecole_ERP
        </div>

        <!-- Corps de l'email -->
        <div class="email-body">
            <h1>🎉 Confirmation de votre inscription</h1>
            <p>Bonjour <strong>{{ $inscription->prenom }} {{ $inscription->nom }}</strong>,</p>
            <p>Nous sommes ravis de vous compter parmi nous ! Votre dossier d'inscription a été <strong>créé avec
                    succès</strong>.
            </p>

            <div class="panel">
                📍 <strong>Code de suivi</strong> : <strong>{{ $inscription->dossier->code_suivi }}</strong>
            </div>

            <p>Ce code est <strong>indispensable</strong> pour suivre l'évolution de votre dossier.</p>

            <!-- Bouton -->
            <div class="btn-container">
                <a href="{{ url('/suivi-dossier/' . $inscription->dossier->code_suivi) }}" class="btn">📂 Suivre mon
                    dossier</a>
            </div>

            <h3>📌 Que se passe-t-il ensuite ?</h3>
            <ul style="text-align: left; display: inline-block; margin: 0 auto; color: #555;">
                <li>🔹 Votre dossier est en cours de traitement.</li>
                <li>🔹 Vous recevrez des notifications par email.</li>
                <li>🔹 Vous pouvez suivre votre dossier en ligne 24/7.</li>
            </ul>

            <h3>💡 Besoin d'aide ?</h3>
            <p>Notre équipe est là pour vous aider !</p>
            <div class="btn-container">
                <a href="{{ url('/contact') }}" class="btn" style="background-color: #2D68C4;">📞 Contacter le
                    support</a>
            </div>

            <p>Merci de votre confiance !</p>

            <p>Cordialement,<br>
                <strong>gestion_ecole_erp</strong>
            </p>
        </div>

        <!-- Pied de page avec icônes FontAwesome -->
        <div class="email-footer">
            © 2025 gestion_ecole_erp. Tous droits réservés.
        </div>
    </div>

</body>

</html>
