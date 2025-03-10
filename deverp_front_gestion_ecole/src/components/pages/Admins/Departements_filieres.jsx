import { useState } from "react";
import PageContainer from "../Layout/PageContainer";
import InfosPages from "../../ui/Infos/InfosPages";
import DoubleButton from "../../ui/Button/DoubleButton";
import DepartementList from "../../section/DepartementList";
import FilieresList from "../../section/FilieresList";

function Departements_filieres() {
    const [activeTab, setActiveTab] = useState("departements"); // Par défaut, onglet "Départements"

    return (
        <PageContainer title="Départements | Filières">
            <InfosPages title="Départements | Filières">
                <DoubleButton
                    labels={["Départements", "Filières"]} // 🔥 Labels dynamiques
                    values={["departements", "filieres"]} // 🔥 Valeurs dynamiques associées
                    onTabChange={setActiveTab}
                />
            </InfosPages>

            {/* ✅ Affichage conditionnel des composants */}
            {activeTab === "departements" ? <DepartementList /> : <FilieresList />}
        </PageContainer>
    );
}

export default Departements_filieres;
