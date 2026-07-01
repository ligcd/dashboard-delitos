import Card from "../layout/Card";

import ComparisonTable from "./tables/ComparisonTable";
import ComparisonSelector from "./ComparisonSelector";
import ComparisonSummary from "./comparison/ComparisonSummary";

import { getComparison } from "../../services/comparison/comparisonEngine";

import {
    getLargestIncrease,
    getLargestDecrease
} from "../../services/stats/comparisons";

export default function TablesSection({
    records,
    filters,
    comparison,
    setComparison
}) {

    const comparisonData = getComparison(
        records,
        filters,
        comparison
    );

    console.log("comparison:", comparison);

    const increases = getLargestIncrease(comparisonData, 10);
    const decreases = getLargestDecrease(comparisonData, 10);

    return (
        <div className="space-y-6">

            <Card>
                <ComparisonSelector
                    filters={filters}
                    comparison={comparison}
                    setComparison={setComparison}
                />
            </Card>

            <Card>
                <ComparisonSummary comparison={comparisonData} />
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">

                <Card>
                    <ComparisonTable
                        title="Comparación de delitos"
                        data={comparisonData}
                        mode={filters.mode}
                    />
                </Card>

                <Card>
                    <ComparisonTable
                        title="Mayores disminuciones"
                        data={decreases}
                        mode={filters.mode}
                    />
                </Card>

            </div>

        </div>
    );
}