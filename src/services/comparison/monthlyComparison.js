import { filterComparisonRecords } from "./filterComparisonRecords";

import { getMonthRecords } from "../../utils/dateUtils";

import {
    comparePeriods
} from "../stats/comparisons";

export function getMonthlyComparison(
    records,
    filters,
    comparisonType
) {

    if (!filters.year || !filters.month) {

        return [];

    }

    const baseRecords = filterComparisonRecords(
        records,
        filters
    );

    let previousMonth = Number(filters.month);
    let previousYear = Number(filters.year);

    if (comparisonType === "previousMonth") {

        previousMonth--;

        if (previousMonth === 0) {

            previousMonth = 12;
            previousYear--;

        }

    }

    if (comparisonType === "sameMonthLastYear") {

        previousYear--;

    }

    const previousRecords = getMonthRecords(

        baseRecords,

        previousYear,

        previousMonth

    );

    const currentRecords = getMonthRecords(

        baseRecords,

        filters.year,

        filters.month

    );

    return comparePeriods(

        previousRecords,

        currentRecords,

        "delito"

    );

}