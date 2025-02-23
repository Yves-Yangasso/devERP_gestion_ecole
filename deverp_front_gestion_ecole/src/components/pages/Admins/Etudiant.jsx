import PageContainer from "../Layout/PageContainer";
import InfosPages from "../../ui/Infos/InfosPages";

function InscriptionPage() {
    return (
        <PageContainer title="Etudiants">
            <InfosPages title="Etudiants" page="Etudiant">
            </InfosPages>
        </PageContainer>
    );
}

export default InscriptionPage;
