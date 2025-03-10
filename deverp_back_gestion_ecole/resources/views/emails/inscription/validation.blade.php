<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Validation de votre inscription</title>
</head>
<body>
    <h2>Félicitations, {{ $inscription->prenom }} ! 🎉</h2>
    <p>Votre dossier a été validé avec succès.</p>

    <h3>📝 Détails de votre inscription :</h3>
    <ul>
        <li><strong>Nom :</strong> {{ $inscription->nom }}</li>
        <li><strong>Prénom :</strong> {{ $inscription->prenom }}</li>
        <li><strong>Email :</strong> {{ $inscription->email }}</li>
        <li><strong>Date de soumission :</strong> {{ $dossier->date_soumission }}</li>
        <li><strong>Date de validation :</strong> {{ now() }}</li>
        <li><strong>Code de suivi :</strong> {{ $dossier->code_suivi }}</li>
    </ul>

    <h3>🔑 Vos accès :</h3>
    <p>Email : <strong>{{ $inscription->email }}</strong></p>
    <p>Mot de passe : <strong>{{ $password }}</strong> (vous pourrez le changer après connexion)</p>

    <h3>📌 Poursuivez votre inscription :</h3>
    <a href="{{ $url }}" style="display:inline-block; padding:10px 20px; background-color:#007BFF; color:white; text-decoration:none; border-radius:5px;">
        Finaliser mon inscription
    </a>

    <p>Merci et bienvenue parmi nous ! 😊</p>
</body>
</html>
