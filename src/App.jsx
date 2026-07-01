import { useState } from "react";

// SUBIR ARCHIVOS
import FileUploader from "./components/FileUploader";

// EXCEL
import { processExcel } from "./services/excel/excelService";
import { exportExcel } from "./services/excel/exportExcel";

// DASHBOARD
import DashboardSummary from "./components/dashboard/DashboardSummary";
import DashboardFilters from "./components/dashboard/DashboardFilters";
import ChartsSection from "./components/dashboard/ChartsSection";
import TablesSection from "./components/dashboard/TablesSection";
import WeekInfo from "./components/dashboard/WeekInfo";

// LAYOUT
import MainLayout from "./components/layout/MainLayout";
import Card from "./components/layout/Card";

// FILTROS
import { filterRecords } from "./services/stats/filterRecords";

function App() {

    const [fileName, setFileName] = useState("");

    const [sheetNames, setSheetNames] = useState([]);

    const [records, setRecords] = useState([]);

    // Tipo de comparación
    const [comparison, setComparison] = useState("previousMonth");

    const [filters, setFilters] = useState({

        mode: "range",

        startDate: "",
        endDate: "",

        year: "",
        month: "",
        week: "",

        region: "TODOS",
        municipio: "TODOS",
        delito: "TOTAL"

    });

    const filteredRecords = filterRecords(

        records,
        filters

    );

    async function handleFile(file) {

        setFileName(file.name);

        const result = await processExcel(file);

        setRecords(result.records || []);

        console.log(result.records[0]);

        setSheetNames(result.sheetNames || []);

    }

    return (

        <MainLayout>

            {/* ========================= */}
            {/* CARGAR ARCHIVO */}
            {/* ========================= */}

            <Card>

                <h2 className="mb-4 text-xl font-semibold text-[#032236]">

                    Cargar archivo

                </h2>

                <FileUploader

                    onFileSelect={handleFile}

                />

            </Card>

            {/* ========================= */}
            {/* INFORMACIÓN */}
            {/* ========================= */}

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

                            {

                                sheetNames.map(sheet => (

                                    <li key={sheet}>

                                        {sheet}

                                    </li>

                                ))

                            }

                        </ul>

                    </div>

                </div>

            </Card>

            {/* ========================= */}
            {/* FILTROS */}
            {/* ========================= */}

            <Card>

                <DashboardFilters

                    records={records}

                    filters={filters}

                    setFilters={setFilters}

                />

            </Card>

            {/* ========================= */}
            {/* INFORMACIÓN DE SEMANA */}
            {/* ========================= */}

            <WeekInfo

                filters={filters}

            />

            {/* ========================= */}
            {/* KPIs */}
            {/* ========================= */}

            <DashboardSummary

                records={filteredRecords}

            />

            {/* ========================= */}
            {/* GRÁFICAS */}
            {/* ========================= */}

            <ChartsSection

                records={filteredRecords}

            />

            {/* ========================= */}
            {/* EXPORTAR */}
            {/* ========================= */}

            <div className="flex justify-end">

                <button

                    onClick={() => exportExcel(filteredRecords)}

                    className="rounded-xl bg-[#E47021] px-6 py-3 font-semibold text-white shadow transition-all duration-300 hover:bg-[#c65f16] hover:shadow-lg"

                >

                    📥 Descargar Excel limpio

                </button>

            </div>

            {/* ========================= */}
            {/* TABLAS */}
            {/* ========================= */}

            <TablesSection

                records={records}

                filteredRecords={filteredRecords}

                filters={filters}

                comparison={comparison}

                setComparison={setComparison}

            />

        </MainLayout>

    );

}

export default App;