import { useState, useEffect } from "react";

import FileUploader from "./components/FileUploader";

import { processExcel } from "./services/excel/excelService";
import { exportExcel } from "./services/excel/exportExcel";

import DashboardSummary from "./components/dashboard/DashboardSummary";
import DashboardFilters from "./components/dashboard/DashboardFilters";
import ChartsSection from "./components/dashboard/ChartsSection";
import TablesSection from "./components/dashboard/TablesSection";
import WeekInfo from "./components/dashboard/WeekInfo";

import MainLayout from "./components/layout/MainLayout";
import Card from "./components/layout/Card";

import { filterRecords } from "./services/stats/filterRecords";

function App() {

    const [fileName, setFileName] = useState("");
    const [sheetNames, setSheetNames] = useState([]);
    const [records, setRecords] = useState([]);

    // Comparación seleccionada
    const [comparison, setComparison] = useState("previousMonth");

    // Filtros
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

    // 🔥 Cambiar automáticamente la comparación según el modo
    useEffect(() => {

        switch (filters.mode) {

            case "month":
                setComparison("previousMonth");
                break;

            case "week":
                setComparison("previousWeek");
                break;

            case "year":
                setComparison("previousYear");
                break;

            case "range":
                setComparison("previousPeriod");
                break;

            default:
                break;
        }

    }, [filters.mode]);

    const filteredRecords = filterRecords(records, filters);

    async function handleFile(file) {

        setFileName(file.name);

        const result = await processExcel(file);

        console.log("PRIMER REGISTRO:", result.records[0]);

        setRecords(result.records || []);
        setSheetNames(result.sheetNames || []);

    }

    return (

        <MainLayout>

            <Card>

                <h2 className="mb-4 text-xl font-semibold text-[#032236]">
                    Cargar archivo
                </h2>

                <FileUploader onFileSelect={handleFile} />

            </Card>

            <Card>

                <div className="grid gap-8 md:grid-cols-2">

                    <div>

                        <h3 className="font-semibold">
                            Archivo
                        </h3>

                        <p>{fileName || "Ninguno"}</p>

                    </div>

                    <div>

                        <h3 className="font-semibold">
                            Hojas
                        </h3>

                        <ul>

                            {sheetNames.map(sheet => (

                                <li key={sheet}>
                                    {sheet}
                                </li>

                            ))}

                        </ul>

                    </div>

                </div>

            </Card>

            <Card>

                <DashboardFilters
                    records={records}
                    filters={filters}
                    setFilters={setFilters}
                />

            </Card>

            <DashboardSummary records={filteredRecords} />

            <WeekInfo filters={filters} />

            <TablesSection
                records={records}
                filteredRecords={filteredRecords}
                filters={filters}
                comparison={comparison}
                setComparison={setComparison}
            />

            <ChartsSection
                records={filteredRecords}
            />

            <div className="flex justify-end">

                <button
                    onClick={() => exportExcel(filteredRecords)}
                    className="rounded-xl bg-[#E47021] px-6 py-3 text-white"
                >
                    📥 Exportar Excel
                </button>

            </div>

        </MainLayout>

    );

}

export default App;