import { getMonthRecords } from "../../utils/dateUtils";
import { comparePeriods } from "../stats/comparisons";

export function getMonthlyComparison(records, filters, comparisonType) {

    if (!filters.year || !filters.month) return [];

    let prevMonth = Number(filters.month);
    let prevYear = Number(filters.year);

    if (comparisonType === "previousMonth") {
        prevMonth--;
        if (prevMonth === 0) {
            prevMonth = 12;
            prevYear--;
        }
    }

    if (comparisonType === "sameMonthLastYear") {
        prevYear--;
    }

    const previous = getMonthRecords(records, prevYear, prevMonth);
    const current = getMonthRecords(records, filters.year, filters.month);

    return comparePeriods(previous, current, "delito");
}