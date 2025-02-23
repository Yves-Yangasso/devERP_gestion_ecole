import PageContainer from "../Layout/PageContainer";
import InfosPages from "../../ui/Infos/InfosPages";

function InscriptionPage() {
    return (
        <PageContainer title="Tableau de bord">
            <InfosPages title="Tableau de bord" page="Dashboard">
            </InfosPages>
        </PageContainer>
    );
}

export default InscriptionPage;
