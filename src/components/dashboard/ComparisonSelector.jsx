export default function ComparisonSelector({

    filters,
    comparison,
    setComparison

}) {

    let options = [];

    switch (filters.mode) {

        case "month":

            options = [

                {
                    value: "previousMonth",
                    label: "Mes anterior"
                },

                {
                    value: "sameMonthLastYear",
                    label: "Mismo mes del año anterior"
                }

            ];

            break;

        case "week":

            options = [

                {
                    value: "previousWeek",
                    label: "Semana anterior"
                },

                {
                    value: "sameWeekLastYear",
                    label: "Misma semana del año anterior"
                }

            ];

            break;

        case "year":

            options = [

                {
                    value: "previousYear",
                    label: "Año anterior"
                }

            ];

            break;

        case "range":

            options = [

                {
                    value: "previousPeriod",
                    label: "Periodo anterior"
                },

                {
                    value: "samePeriodLastYear",
                    label: "Mismo periodo del año anterior"
                }

            ];

            break;

        default:

            options = [];

    }

    return (

        <div className="mb-6">

            <label className="mb-2 block text-sm font-semibold text-slate-700">

                Comparar contra

            </label>

            <select

                value={comparison}

                onChange={(e)=>setComparison(e.target.value)}

                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 shadow-sm"

            >

                {

                    options.map(option=>(

                        <option

                            key={option.value}

                            value={option.value}

                        >

                            {option.label}

                        </option>

                    ))

                }

            </select>

        </div>

    );

}