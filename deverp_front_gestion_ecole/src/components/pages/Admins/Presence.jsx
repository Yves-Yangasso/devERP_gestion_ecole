import { useState } from "react";
import PageContainer from "../Layout/PageContainer";
import InfosPages from "../../ui/Infos/InfosPages";
import DoubleButton from "../../ui/Button/DoubleButton";
import InscriptionStudent from "../../section/Inscription_student";
import InscriptionDemandes from "../../section/Inscription_demandes";

function InscriptionPage() {
    const [activeTab, setActiveTab] = useState("students");

    return (
        <PageContainer title="Présences">
            <InfosPages title="Présences" page="Absence">
            <DoubleButton onTabChange={setActiveTab} />
            </InfosPages>

            {/* ✅ Affichage conditionnel des composants */}
            {activeTab === "students" ? <InscriptionStudent /> : <InscriptionDemandes />}
        </PageContainer>
    );
}

export default InscriptionPage;
