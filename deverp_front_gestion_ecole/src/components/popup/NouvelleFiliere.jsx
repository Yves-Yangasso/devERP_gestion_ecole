import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import useCrudAxios from "../hooks/useCrudAxios";

const NouvelleFiliere = ({ open, onClose }) => {
    const { create, loading, error } = useCrudAxios("filieres");
    const { data: departements } = useCrudAxios("departements");

    const [formData, setFormData] = useState({
        code: "",
        nom: "",
        description: "",
        departement_id: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            await create(formData);
            onClose();
        } catch (err) {
            console.error("Erreur lors de la création de la filière", err);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nouvelle Filière</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                    <Input name="nom" placeholder="Nom du Filière" value={formData.nom} onChange={handleChange} />
                    <Input name="code" placeholder="Code du Filière" value={formData.code} onChange={handleChange} />
                    <Textarea name="description" placeholder="Description de la Filière" value={formData.description} onChange={handleChange} />
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, departement_id: value }))}>
                        <SelectTrigger placeholder="Veuillez choisir parmi ces options" />
                        <SelectContent>
                            {departements?.map(dept => (
                                <SelectItem key={dept.id} value={dept.id.toString()}>
                                    {dept.nom}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex justify-end mt-4">
                    <Button onClick={handleSubmit} disabled={loading} className="bg-blue-600 text-white">
                        {loading ? "Création..." : "Créer"}
                    </Button>
                </div>
                {error && <p className="text-red-500">Erreur: {error.message}</p>}
            </DialogContent>
        </Dialog>
    );
};

export default NouvelleFiliere;
