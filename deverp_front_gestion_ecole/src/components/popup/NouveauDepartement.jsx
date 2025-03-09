import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useCrudAxios from "../hooks/useCrudAxios";

const NouveauDepartement = ({ open, onClose }) => {
    const { create, loading, error } = useCrudAxios("departements");
    const [formData, setFormData] = useState({
        code: "",
        nom: "",
        description: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            await create({
                code: formData.code,
                nom: formData.nom,
                description: formData.description
            });
            onClose();
        } catch (err) {
            console.error("Erreur lors de la création du département", err);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nouveau Département</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label>Code du Département</label>
                            <Input name="code" placeholder="Code du Département" value={formData.code} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Nom du Département</label>
                            <Input name="nom" placeholder="Nom du Département" value={formData.nom} onChange={handleChange} />
                        </div>
                    </div>
                    <div>
                        <label>Description</label>
                        <Textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
                    </div>
                    <div className="flex justify-end">
                        <Button onClick={handleSubmit} disabled={loading} className="bg-blue-600 text-white">
                            {loading ? "Création..." : "Créer"}
                        </Button>
                    </div>
                    {error && <p className="text-red-500">Erreur: {error.message}</p>}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default NouveauDepartement;
