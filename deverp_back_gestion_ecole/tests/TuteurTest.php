<?php

namespace Tests\Feature\Tuteur;

use Tests\TestCase;
use App\Models\Tuteur;
use App\Enums\Tuteur\StatutTuteur;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TuteurTest extends TestCase
{
    use RefreshDatabase;

    public function test_creation_tuteur()
    {
        $tuteurData = [
            'prenom' => 'Yang',
            'nom' => 'Bao',
            'email' => 'yang.bao@example.com',
            'telephone' => '781000713',
            'fonctions' => 'Analyste Programmeur',
            'statut' => StatutTuteur::ACTIF->value
        ];

        $response = $this->postJson('/api/tuteurs', $tuteurData);

        $response->assertStatus(201)
                 ->assertJsonFragment([
                     'prenom' => 'Yang',
                     'nom' => 'Bao'
                 ]);

        $this->assertDatabaseHas('tuteurs', [
            'email' => 'yang.bao@example.com'
        ]);
    }

    public function test_modification_tuteur()
    {
        $tuteur = Tuteur::factory()->create();

        $updatedData = [
            'telephone' => '781111111',
            'fonctions' => 'Développeur Senior'
        ];

        $response = $this->putJson("/api/tuteurs/{$tuteur->id}", $updatedData);

        $response->assertStatus(200)
                 ->assertJsonFragment($updatedData);
    }

    public function test_suppression_tuteur()
    {
        $tuteur = Tuteur::factory()->create();

        $response = $this->deleteJson("/api/tuteurs/{$tuteur->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('tuteurs', ['id' => $tuteur->id]);
    }

    public function test_validation_tuteur_invalide()
    {
        $invalidData = [
            'prenom' => '',
            'email' => 'invalid-email'
        ];

        $response = $this->postJson('/api/tuteurs', $invalidData);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['prenom', 'email']);
    }
}