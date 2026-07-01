export default function ComparisonTable({
    title,
    data = [],
    mode = "month"
}) {

    const formatPercentage = (value) => {
        if (value === null || value === undefined) {
            return "--";
        }
        return `${value.toFixed(1)}%`;
    };

    const getLabels = () => {
        switch (mode) {

            case "month":
                return ["Mes anterior", "Mes actual"];

            case "week":
                return ["Semana anterior", "Semana actual"];

            case "year":
                return ["Año anterior", "Año actual"];

            case "range":
                return ["Periodo A", "Periodo B"];

            default:
                return ["Anterior", "Actual"];
        }
    };

    const [prevLabel, currentLabel] = getLabels();

    return (
        <div>

            <h3 className="mb-4 text-lg font-semibold text-[#032236]">
                {title}
            </h3>

            <div className="overflow-x-auto rounded-lg border">

                <table className="min-w-full text-sm">

                    <thead>

                        <tr className="bg-slate-100">

                            <th className="px-4 py-3 text-left">
                                Delito
                            </th>

                            <th className="px-4 py-3 text-center">
                                {prevLabel}
                            </th>

                            <th className="px-4 py-3 text-center">
                                {currentLabel}
                            </th>

                            <th className="px-4 py-3 text-center">
                                Variación
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {data.length === 0 && (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="py-6 text-center text-gray-500"
                                >
                                    Sin información
                                </td>
                            </tr>
                        )}

                        {data.map((item, index) => {

                            const positive = item.diferencia >= 0;

                            return (
                                <tr
                                    key={index}
                                    className="border-t hover:bg-slate-50"
                                >

                                    <td className="px-4 py-3 font-medium">
                                        {item.nombre}
                                    </td>

                                    <td className="px-4 py-3 text-center">
                                        {item.anterior}
                                    </td>

                                    <td className="px-4 py-3 text-center">
                                        {item.actual}
                                    </td>

                                    <td className="px-4 py-3 text-center">

                                        <span
                                            className={
                                                positive
                                                    ? "rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700"
                                                    : "rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700"
                                            }
                                        >

                                            {positive ? "▲" : "▼"}{" "}
                                            {formatPercentage(item.porcentaje)}

                                        </span>

                                    </td>

                                </tr>
                            );

                        })}

                    </tbody>

                </table>

            </div>

        </div>
    );
}