<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Carte Étudiant</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f0f0f0;
            margin: 0;
            padding: 20px;
        }
        .card {
            width: 350px;
            height: 200px;
            background: #ffffff;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            display: flex;
            justify-content: space-between;
        }
        .card img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
        }
        .card .details {
            margin-left: 20px;
        }
        .card .details h3 {
            margin: 0;
            font-size: 18px;
            color: #2c3e50;
        }
        .card .details p {
            margin: 5px 0;
            font-size: 14px;
            color: #34495e;
        }
        .footer {
            margin-top: 10px;
            font-size: 12px;
            text-align: center;
            color: #7f8c8d;
        }
    </style>
</head>
<body>
    <div class="card">
        <img src="{{ $student->photo_url }}" alt="Photo Étudiant">
        <div class="details">
            <h3>{{ $student->full_name }}</h3>
            <p><strong>ID Étudiant:</strong> {{ $student->student_id }}</p>
            <p><strong>Programme:</strong> {{ $student->program }}</p>
            <p><strong>Date d'Inscription:</strong> {{ \Carbon\Carbon::parse($student->registration_date)->format('d/m/Y') }}</p>
        </div>
    </div>
    <div class="footer">
        <p>Université XYZ - 123 Rue de l'Éducation, Paris</p>
    </div>
</body>
</html>
