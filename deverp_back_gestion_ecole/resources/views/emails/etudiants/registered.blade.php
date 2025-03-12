@component('mail::message')
# Bienvenue au Groupe ISI, {{ $student->prenom }} {{ $student->nom }} !

Nous sommes ravis de vous accueillir parmi nous. Votre inscription a été validée avec succès, et voici vos informations de connexion pour accéder à votre espace personnel :

@component('mail::panel')
**Nom** : {{ $student->nom }}
**Prénom** : {{ $student->prenom }}
**Matricule** : {{ $student->matricule }}
**Email institutionnel** : {{ $student->email_institutionnel }}
**Mot de passe par défaut** : {{ $defaultPassword }}
@endcomponent

Pour des raisons de sécurité, nous vous recommandons de modifier votre mot de passe dès votre première connexion.

@component('mail::button', ['url' => $loginUrl])
Accéder à mon compte
@endcomponent

Si vous avez des questions, n’hésitez pas à contacter notre support à l’adresse **support@groupeisi.sn**.

Cordialement,
**L’équipe du Groupe ISI**

@component('mail::subcopy')
Ceci est un email automatique, merci de ne pas y répondre directement.
@endcomponent
@endcomponent
