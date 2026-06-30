import { useState } from "react";

// SUBIR ARCHIVOS
import FileUploader from "./components/FileUploader";

// COMPONENTES EXCEL
import { processExcel } from "./services/excel/excelService";
import { exportExcel } from "./services/excel/exportExcel";

// COMPONENTES DASHBOARD
import DashboardSummary from "./components/dashboard/DashboardSummary";
import DashboardFilters from "./components/dashboard/DashboardFilters";
import MunicipalityTable from "./components/dashboard/tables/MunicipalityTable";
import CrimeTable from "./components/dashboard/tables/CrimeTable";

// LAYOUT
import MainLayout from "./components/layout/MainLayout";
import Card from "./components/layout/Card";

// SERVICIOS
import { filterRecords } from "./services/stats/filterRecords";

import {
    getDailyStats,
    getMonthlyTrend,
    getCumulativeTrend
} from "./services/stats/statisticsEngine";

function App() {

    const [fileName, setFileName] = useState("");
    const [sheetNames, setSheetNames] = useState([]);
    const [records, setRecords] = useState([]);

    const [filters, setFilters] = useState({

        mode: "range",

        startDate: "",
        endDate: "",

        year: "",
        month: "",

        region: "TODOS",
        municipio: "TODOS",
        delito: "TODOS"

    });

    const filteredRecords = filterRecords(records, filters);

    const [stats, setStats] = useState({
        daily: [],
        monthly: [],
        cumulative: []
    });

    async function handleFile(file) {

        setFileName(file.name);

        const result = await processExcel(file);

        const data = result.records || [];

        setRecords(data);
        setSheetNames(result.sheetNames || []);

        setStats({
            daily: getDailyStats(data),
            monthly: getMonthlyTrend(data),
            cumulative: getCumulativeTrend(data)
        });

    }

    return (

        <MainLayout>

            {/* CARGA DEL ARCHIVO */}

            <Card>

                <h2 className="mb-4 text-xl font-semibold text-[#032236]">

                    Cargar archivo

                </h2>

                <FileUploader onFileSelect={handleFile} />

            </Card>

            {/* INFORMACIÓN DEL ARCHIVO */}

            <Card>

                <div className="grid gap-8 md:grid-cols-2">

                    <div>

                        <h3 className="font-semibold text-[#032236]">

                            Archivo seleccionado

                        </h3>

                        <p className="mt-2 text-slate-600">

                            {fileName || "Ninguno"}

                        </p>

                    </div>

                    <div>

                        <h3 className="font-semibold text-[#032236]">

                            Hojas encontradas

                        </h3>

                        <ul className="mt-2 list-disc pl-5 text-slate-600">

                            {sheetNames.map(sheet => (

                                <li key={sheet}>{sheet}</li>

                            ))}

                        </ul>

                    </div>

                </div>

            </Card>

            {/* FILTROS + KPIs */}

            <Card>

                <DashboardFilters

                    records={records}
                    filters={filters}
                    setFilters={setFilters}

                />

                <DashboardSummary

                    records={filteredRecords}

                />

            </Card>

            {/* BOTÓN EXPORTAR */}

            <div className="flex justify-end">

                <button

                    onClick={() => exportExcel(filteredRecords)}

                    className="
                        rounded-xl
                        bg-[#E47021]
                        px-6
                        py-3
                        font-semibold
                        text-white
                        shadow
                        transition-all
                        duration-300
                        hover:bg-[#c65f16]
                        hover:shadow-lg
                    "

                >

                    📥 Descargar Excel limpio

                </button>

            </div>

            {/* TABLAS */}

            <div className="grid gap-6 lg:grid-cols-2">

                <Card>

                    <MunicipalityTable

                        records={filteredRecords}

                    />

                </Card>

                <Card>

                    <CrimeTable

                        records={filteredRecords}

                    />

                </Card>

            </div>

        </MainLayout>

    );

}

export default App;