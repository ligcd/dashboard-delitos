import { getMonthlyComparison } from "./monthlyComparison";
import { getWeeklyComparison } from "./weeklyComparison";
import { getYearlyComparison } from "./yearlyComparison";
import { getPeriodComparison } from "./periodComparison";

export function getComparison(records, filters, comparisonType) {

    switch (filters.mode) {

        case "month":
            return getMonthlyComparison(records, filters, comparisonType);

        case "week":
            return getWeeklyComparison(records, filters, comparisonType);

        case "year":
            return getYearlyComparison(records, filters, comparisonType);

        case "range":
            return getPeriodComparison(records, filters);

        default:
            return [];
    }
}