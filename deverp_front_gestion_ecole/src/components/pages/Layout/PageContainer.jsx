import { useState } from "react";
import SideNav from "../../section/SideNav";
import Header from "../../section/Header";
import Footer from "../../section/Footer";

function PageContainer({ title, page, children }) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <div
            className="relative h-screen w-screen flex bg-center bg-cover"
            style={{ backgroundImage: 'url("/images/fond_ecran.png")' }}
        >
            {/* Sidebar - Fixe à gauche */}
            <SideNav isCollapsed={isSidebarCollapsed} className="fixed left-0 top-0 h-full" />

            {/* Contenu principal */}
            <div className={`flex-1 flex flex-col transition-all duration-300`}>
                
                {/* Header - Fixe en haut */}
                <Header
                    onMenuClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    name="John Doe"
                    role="Admin"
                    profile={"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"}
                    className="fixed top-0 left-0 w-full z-10 bg-white shadow-md"
                />

                {/* Conteneur avec scroll */}
                <div className="flex-1 px-8 py-6">
                    {children}
                </div>

                {/* Footer - Fixe en bas */}
                <Footer className="fixed bottom-0 left-0 w-full bg-white shadow-md" />
            </div>
        </div>
    );
}

export default PageContainer;
