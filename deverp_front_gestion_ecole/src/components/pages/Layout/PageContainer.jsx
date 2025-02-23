import { useState, useEffect } from "react";
import SideNav from "../../section/SideNav";
import Header from "../../section/Header";
import Footer from "../../section/Footer";

function PageContainer({ children }) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
        () => JSON.parse(localStorage.getItem("isSidebarCollapsed")) || false
    );

    useEffect(() => {
        localStorage.setItem("isSidebarCollapsed", JSON.stringify(isSidebarCollapsed));
    }, [isSidebarCollapsed]);

    return (
        <div className="relative h-screen w-screen flex bg-center bg-cover" style={{ backgroundImage: 'url("/images/fond_ecran.png")' }}>
            <SideNav isCollapsed={isSidebarCollapsed} className="fixed left-0 top-0 h-full" />

            <div className={`flex-1 flex flex-col transition-all duration-300`}>
                <Header
                    onMenuClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    name="John Doe"
                    role="Admin"
                    profile="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fHx8&auto=format&fit=crop&w=880&q=80"
                    className="fixed top-0 left-0 w-full z-10 bg-white shadow-md"
                />

                <div className="flex-1 px-8 py-6">{children}</div>

                <Footer className="fixed bottom-0 left-0 w-full bg-white shadow-md" />
            </div>
        </div>
    );
}

export default PageContainer;
