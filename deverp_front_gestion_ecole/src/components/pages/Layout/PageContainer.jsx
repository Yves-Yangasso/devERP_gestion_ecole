import { useState } from "react";
import SideNav from "../../section/SideNav";
import Header from "../../section/Header";
import Footer from "../../section/Footer";

function PageContainer({ title, page, children }) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <div
            className="relative min-h-screen flex overflow-hidden bg-center bg-cover"
            style={{ backgroundImage: 'url("/images/fond_ecran.png")' }}
        >
            {/* Sidebar */}
            <SideNav isCollapsed={isSidebarCollapsed} />

            <div className="flex-1 flex flex-col justify-between">
                <div className="w-full h-full">
                    {/* Header */}
                    <Header
                        onMenuClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        name="John Doe"
                        role="Admin"
                        profile={"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"}
                    />

                    {/* Contenu principal */}
                    <main className="relative">
                        <div className="w-full max-h-screen-2xl mx-auto px-8 py-6">
                            {children}
                        </div>
                    </main>
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
}

export default PageContainer;
