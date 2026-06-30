import KPICard from "./cards/KPICard";

import {

    getTotalIncidencias,
    getTopMunicipio,
    getTopRegion,
    getDailyAverage

} from "../../services/stats/kpiEngine";

export default function DashboardSummary({ records }) {

    const total = getTotalIncidencias(records);

    const topMunicipio = getTopMunicipio(records);

    const topRegion = getTopRegion(records);

    const promedio = getDailyAverage(records);

    return (

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <KPICard

                title="Incidencia delictiva"

                value={total.toLocaleString("es-MX")}

                subtitle="Total de incidencias"

                icon="📊"

                color="#E47021"

            />

            <KPICard

                title="Municipio con mayor incidencia"

                value={topMunicipio?.[0] || "-"}

                subtitle={`${(topMunicipio?.[1] || 0).toLocaleString("es-MX")} incidencias`}

                icon="🏙"

            />

            <KPICard

                title="Región con mayor incidencia"

                value={topRegion?.[0] || "-"}

                subtitle={`${(topRegion?.[1] || 0).toLocaleString("es-MX")} incidencias`}

                icon="🗺"

            />

            <KPICard

                title="Promedio diario"

                value={Math.round(promedio).toLocaleString("es-MX")}

                subtitle="Incidencias por día"

                icon="📈"

            />

        </div>

    );

}