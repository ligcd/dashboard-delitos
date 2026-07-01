//Reutilizable (Diseño para todas las estadísticas)

export default function ChartCard({ title, subtitle, children }) {
    return (
        <div className="rounded-2xl border bg-white p-5 shadow-sm">

            {/* HEADER */}
            <div className="mb-4">
                <h3 className="text-lg font-bold text-[#032236]">
                    {title}
                </h3>

                {subtitle && (
                    <p className="text-sm text-slate-500">
                        {subtitle}
                    </p>
                )}
            </div>

            {/* CHART */}
            <div className="h-[350px]">
                {children}
            </div>

        </div>
    );
}