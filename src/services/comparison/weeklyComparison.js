import { comparePeriods } from "../stats/comparisons";
import { filterComparisonRecords } from "./filterComparisonRecords";
import { getWeekRecords } from "../../utils/dateUtils";

export function getWeeklyComparison(records, filters, comparisonType) {

    if (!filters.year || !filters.week) {
        return [];
    }

    const baseRecords = filterComparisonRecords(records, filters);

    let previousWeek = Number(filters.week);
    let previousYear = Number(filters.year);

    switch (comparisonType) {

        case "previousWeek":

            previousWeek--;

            if (previousWeek === 0) {
                previousWeek = 52;
                previousYear--;
            }

            break;

        case "sameWeekLastYear":

            previousYear--;

            break;

        default:

            break;

    }

    const previousRecords = getWeekRecords(
        baseRecords,
        previousYear,
        previousWeek
    );

    const currentRecords = getWeekRecords(
        baseRecords,
        Number(filters.year),
        Number(filters.week)
    );

    return comparePeriods(
        previousRecords,
        currentRecords,
        "delito"
    );

}