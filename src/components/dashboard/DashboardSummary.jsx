import KPICard from "./cards/KPICard";

export default function DashboardSummary({ records }) {

    // Total de incidencias
    const total = records.reduce(
        (sum, r) => sum + Number(r.cantidad || 0),
        0
    );

    // Delito con mayor incidencia
    const crimeMap = {};

    for (const r of records) {
        crimeMap[r.delito] =
            (crimeMap[r.delito] || 0) + Number(r.cantidad || 0);
    }

    const topCrime = Object.entries(crimeMap)
        .sort((a, b) => b[1] - a[1])[0];

    // Municipio con mayor incidencia
    const muniMap = {};

    for (const r of records) {
        muniMap[r.municipio] =
            (muniMap[r.municipio] || 0) + Number(r.cantidad || 0);
    }

    const topMunicipio = Object.entries(muniMap)
        .sort((a, b) => b[1] - a[1])[0];

    // Formato de datos
    const totalRecords = records.length.toLocaleString("es-MX");
    const totalIncidencia = total.toLocaleString("es-MX");

    const topCrimeName = topCrime?.[0] || "Sin datos";
    const topCrimeValue = (topCrime?.[1] || 0).toLocaleString("es-MX");

    const topMunicipioName = topMunicipio?.[0] || "Sin datos";
    const topMunicipioValue = (topMunicipio?.[1] || 0).toLocaleString("es-MX");

    return (

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <KPICard
                title="Registros procesados"
                value={totalRecords}
                subtitle="Registros cargados"
                icon="📄"
            />

            <KPICard
                title="Incidencia delictiva"
                value={totalIncidencia}
                subtitle="Total de incidencias"
                icon="📊"
                color="#E47021"
            />

            <KPICard
                title="Delito con mayor incidencia"
                value={topCrimeName}
                subtitle={`${topCrimeValue} incidencias`}
                icon="🚨"
            />

            <KPICard
                title="Municipio con mayor incidencia"
                value={topMunicipioName}
                subtitle={`${topMunicipioValue} incidencias`}
                icon="🏙"
            />

        </div>

    );

}