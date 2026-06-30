import { useState } from "react";

import ChartCard from "./charts/ChartCard";
import ChartModal from "./charts/ChartModal";

import DailyTrendChart from "./charts/DailyTrendChart";
import WeeklyTrendChart from "./charts/WeeklyTrendChart";
import MonthlyTrendChart from "./charts/MonthlyTrendChart";
import CumulativeChart from "./charts/CumulativeChart";
import RegionPieChart from "./charts/RegionPieChart";
import TopDelitosChart from "./charts/TopDelitosChart";
import TopMunicipiosChart from "./charts/TopMunicipiosChart";

export default function ChartsSection({ records }) {

    const [modal, setModal] = useState(null);

    const charts = [
        {
            title: "Tendencia diaria",
            desc: "Evolución diaria de incidencias",
            component: <DailyTrendChart records={records} />
        },
        {
            title: "Tendencia semanal",
            desc: "Análisis por semanas epidemiológicas",
            component: <WeeklyTrendChart records={records} />
        },
        {
            title: "Tendencia mensual",
            desc: "Comparación mensual",
            component: <MonthlyTrendChart records={records} />
        },
        {
            title: "Acumulado",
            desc: "Crecimiento total",
            component: <CumulativeChart records={records} />
        },
        {
            title: "Regiones",
            desc: "Distribución territorial",
            component: <RegionPieChart records={records} />
        },
        {
            title: "Top delitos",
            desc: "Delitos más frecuentes",
            component: <TopDelitosChart records={records} />
        },
        {
            title: "Top municipios",
            desc: "Municipios más afectados",
            component: <TopMunicipiosChart records={records} />
        }
    ];

    return (
        <>
            <div className="grid gap-6 mt-6 lg:grid-cols-2">

                {charts.map((chart, i) => (
                    <div
                        key={i}
                        onClick={() => setModal(chart)}
                        className="cursor-pointer transition hover:scale-[1.01]"
                    >
                        <ChartCard
                            title={chart.title}
                            subtitle="Click para ver en detalle"
                        >
                            {chart.component}
                        </ChartCard>
                    </div>
                ))}

            </div>

            {/* MODAL */}
            <ChartModal
                open={!!modal}
                title={modal?.title}
                description={modal?.desc}
                onClose={() => setModal(null)}
            >
                {modal?.component}
            </ChartModal>
        </>
    );
}