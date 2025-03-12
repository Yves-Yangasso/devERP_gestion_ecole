<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Carte d'Étudiant</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .card {
            width: 300px;
            height: 180px;
            border: 2px solid #285b96;
            border-radius: 10px;
            padding: 20px;
            background-color: #f4f4f4;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #285b96;
            color: white;
            padding: 10px;
            text-align: center;
            font-size: 16px;
            font-weight: bold;
            border-radius: 5px 5px 0 0;
            margin: -20px -20px 10px -20px;
        }
        .info {
            font-size: 12px;
            margin: 5px 0;
        }
        .label {
            font-weight: bold;
            color: #285b96;
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="header">Carte d'Étudiant - Groupe ISI</div>
        <div class="info"><span class="label">Matricule :</span> {{ $matricule }}</div>
        <div class="info"><span class="label">Nom :</span> {{ $nom }}</div>
        <div class="info"><span class="label">Prénom :</span> {{ $prenom }}</div>
        <div class="info"><span class="label">Filière :</span> {{ $filiere }}</div>
        <div class="info"><span class="label">Téléphone :</span> {{ $telephone }}</div>
        <div class="info"><span class="label">Email :</span> {{ $email_institutionnel }}</div>
    </div>
</body>
</html>
