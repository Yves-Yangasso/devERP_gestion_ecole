<?php
// app/Events/Dossier/DossierValide.php
namespace App\Events\Dossier;

use App\Models\Dossier;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DossierValide implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $dossier;

    /**
     * Create a new event instance.
     */
    public function __construct(Dossier $dossier)
    {
        $this->dossier = $dossier;
    }

    /**
     * Get the channels the event should broadcast on.
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('dossier.' . $this->dossier->id),
            new PrivateChannel('inscription.' . $this->dossier->inscription_id),
        ];
    }

    /**
     * The event's broadcast name.
     */
    public function broadcastAs(): string
    {
        return 'dossier.valide';
    }

    /**
     * Get the data to broadcast.
     */
    public function broadcastWith(): array
    {
        return [
            'dossier_id' => $this->dossier->id,
            'inscription_id' => $this->dossier->inscription_id,
            'code_suivi' => $this->dossier->code_suivi,
            'date_validation' => $this->dossier->date_validation,
            'statut' => $this->dossier->statut,
        ];
    }
}
