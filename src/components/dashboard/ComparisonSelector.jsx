export default function ComparisonSelector({
    filters,
    comparison,
    setComparison
}) {

    let options = [];

    switch (filters.mode) {

        case "month":
            options = [
                { value: "previousMonth", label: "Mes anterior" },
                { value: "sameMonthLastYear", label: "Mismo mes año anterior" }
            ];
            break;

        case "week":
            options = [
                { value: "previousWeek", label: "Semana anterior" },
                { value: "sameWeekLastYear", label: "Misma semana año anterior" }
            ];
            break;

        case "year":
            options = [
                { value: "previousYear", label: "Año anterior" }
            ];
            break;

        case "range":
            options = [
                { value: "previousPeriod", label: "Periodo anterior" },
                { value: "samePeriodLastYear", label: "Mismo periodo año anterior" }
            ];
            break;
    }

    return (
        <div className="mb-6">

            <label className="block mb-2 font-semibold">
                Comparar contra
            </label>

            <select
                value={comparison}
                onChange={(e) => setComparison(e.target.value)}
                className="w-full border rounded-xl p-3"
            >
                {options.map(o => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>

        </div>
    );
}