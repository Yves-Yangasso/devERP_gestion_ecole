<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Tuteur;
use App\Enums\Tuteur\StatutTuteur;

class TuteurFactory extends Factory
{
    protected $model = Tuteur::class;

    public function definition()
    {
        return [
            'prenom' => $this->faker->firstName,
            'nom' => $this->faker->lastName,
            'email' => $this->faker->unique()->safeEmail,
            'telephone' => $this->faker->phoneNumber,
            'adresse' => $this->faker->address,
            'fonctions' => $this->faker->jobTitle,
            'statut' => $this->faker->randomElement(array_column(StatutTuteur::cases(), 'value'))
        ];
    }
}