import { filterComparisonRecords } from "./filterComparisonRecords";

import { getYearRecords } from "../../utils/dateUtils";

import {
    comparePeriods
} from "../stats/comparisons";

export function getYearlyComparison(
    records,
    filters
) {

    if (!filters.year) {

        return [];

    }

    const baseRecords = filterComparisonRecords(
        records,
        filters
    );

    const previousYear = Number(filters.year) - 1;

    const previousRecords = getYearRecords(

        baseRecords,

        previousYear

    );

    const currentRecords = getYearRecords(

        baseRecords,

        filters.year

    );

    return comparePeriods(

        previousRecords,

        currentRecords,

        "delito"

    );

}