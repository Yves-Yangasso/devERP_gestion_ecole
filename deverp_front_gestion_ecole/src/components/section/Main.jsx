function Main({ children }) {
    return (
        <main className="relative">
            <div className="w-full max-h-screen-2xl mx-auto">
                <div className="px-8 py-6">
                    {children} {/* Contenu dynamique */}
                </div>
            </div>
        </main>
    );
}

export default Main;
