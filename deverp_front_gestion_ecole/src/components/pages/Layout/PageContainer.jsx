import { useState } from "react";
import SideNav from "../../section/SideNav";
import Header from "../../section/Header";
import Footer from "../../section/Footer";

function PageContainer({ title, page, children }) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <div
            className="relative min-h-screen flex bg-center bg-cover"
            style={{ backgroundImage: 'url("images/fond_ecran.png")' }}
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
