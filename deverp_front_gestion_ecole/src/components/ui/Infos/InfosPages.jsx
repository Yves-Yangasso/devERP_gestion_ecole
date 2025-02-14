function InfosPages({ title, children, page }) {
    return (
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
                <h1 className="text-2xl font-semibold text-[#2a3547]">{title}</h1>
                {children}
            </div>
            <h6 className="text-sm text-[#2a3547]"> {title} / {page}</h6>
        </div>
    )
}

export default InfosPages;