import PageContainer from "../Layout/PageContainer";
import InfosPages from "../../ui/Infos/InfosPages";

function InscriptionPage() {
    return (
        <PageContainer title="Professeurs">
            <InfosPages title="Professeurs" page="Professeur">
            </InfosPages>
        </PageContainer>
    );
}

export default InscriptionPage;
