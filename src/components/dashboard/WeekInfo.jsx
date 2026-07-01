import {

    getWeekRange

} from "../../utils/dateUtils";

export default function WeekInfo({

    filters

}) {

    if (

        filters.mode !== "week" ||

        !filters.year ||

        !filters.week

    ) {

        return null;

    }

    const range = getWeekRange(

        Number(filters.year),

        Number(filters.week)

    );

    if (!range) return null;

    return (

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">

            <h3 className="text-lg font-semibold text-[#032236]">

                📅 Información de la semana

            </h3>

            <div className="mt-4 grid gap-4 md:grid-cols-3">

                <div>

                    <span className="font-semibold">

                        Semana

                    </span>

                    <p>

                        {filters.week}

                    </p>

                </div>

                <div>

                    <span className="font-semibold">

                        Inicio

                    </span>

                    <p>

                        {range.start}

                    </p>

                </div>

                <div>

                    <span className="font-semibold">

                        Fin

                    </span>

                    <p>

                        {range.end}

                    </p>

                </div>

            </div>

        </div>

    );

}