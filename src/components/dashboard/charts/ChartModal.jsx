export default function ChartModal({ open, title, description, children, onClose }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-[95%] max-w-5xl rounded-2xl bg-white p-6 shadow-2xl">

                {/* HEADER */}
                <div className="mb-4 flex items-start justify-between">

                    <div>
                        <h2 className="text-xl font-bold text-[#032236]">
                            {title}
                        </h2>

                        {description && (
                            <p className="text-sm text-slate-500">
                                {description}
                            </p>
                        )}
                    </div>

                    <button
                        onClick={onClose}
                        className="text-xl font-bold text-slate-500 hover:text-red-500"
                    >
                        ✕
                    </button>

                </div>

                {/* CHART GRANDE */}
                <div className="h-[500px]">
                    {children}
                </div>

            </div>

        </div>
    );
}