import Card from "../layout/Card";

import MunicipalityTable from "./tables/MunicipalityTable";
import CrimeTable from "./tables/CrimeTable";
import ComparisonTable from "./tables/ComparisonTable";

import ComparisonSelector from "./ComparisonSelector";
import ComparisonSummary from "./comparison/ComparisonSummary";

import {
    getComparison
} from "../../services/comparison/comparisonEngine";

import {
    getLargestIncrease,
    getLargestDecrease
} from "../../services/stats/comparisons";

export default function TablesSection({

    records,
    filteredRecords,
    filters,

    comparison,
    setComparison

}) {

    const comparisonData = getComparison(

        records,
        filters,
        comparison

    );

    const increases = getLargestIncrease(

        comparisonData,
        10

    );

    const decreases = getLargestDecrease(

        comparisonData,
        10

    );

    return (

        <div className="space-y-6">

            {/* ============================= */}
            {/* SELECTOR DE COMPARACIÓN */}
            {/* ============================= */}

            <Card>

                <ComparisonSelector

                    filters={filters}

                    comparison={comparison}

                    setComparison={setComparison}

                />

            </Card>

            {/* ============================= */}
            {/* TABLAS PRINCIPALES */}
            {/* ============================= */}

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

            {/* ============================= */}
            {/* RESUMEN DEL PERIODO */}
            {/* ============================= */}

            <Card>

                <ComparisonSummary

                    comparison={comparisonData}

                />

            </Card>

            {/* ============================= */}
            {/* TABLAS DE COMPARACIÓN */}
            {/* ============================= */}

            <div className="grid gap-6 lg:grid-cols-2">

                <Card>

                    <ComparisonTable

                    title="📉 Delitos con mayor disminución"
                        data={decreases}
                        mode={filters.mode}

                    />

                </Card>

                <Card>

                    <ComparisonTable

                        title="📉 Delitos con Menor disminución"

                        data={decreases}

                    />

                </Card>

            </div>

        </div>

    );

}