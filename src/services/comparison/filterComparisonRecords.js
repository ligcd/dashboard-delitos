import {

    getWeekRecords

} from "../../utils/dateUtils";

import {

    comparePeriods

} from "../stats/comparisons";

export function getWeeklyComparison(

    records,

    filters,

    comparisonType

) {

    if (

        !filters.year ||

        !filters.week

    ) {

        return [];

    }

    let previousWeek = Number(filters.week);

    let previousYear = Number(filters.year);

    if (

        comparisonType ===

        "previousWeek"

    ) {

        previousWeek--;

        if (previousWeek === 0) {

            previousWeek = 53;

            previousYear--;

        }

    }

    if (

        comparisonType ===

        "sameWeekLastYear"

    ) {

        previousYear--;

    }

    const previousRecords =

        getWeekRecords(

            records,

            previousYear,

            previousWeek

        );

    const currentRecords =

        getWeekRecords(

            records,

            filters.year,

            filters.week

        );

    return comparePeriods(

        previousRecords,

        currentRecords,

        "delito"

    );

}

export function filterComparisonRecords(records, filters) {

    return records.filter(record => {

        // Región
        if (
            filters.region &&
            filters.region !== "TODOS" &&
            record.region !== filters.region
        ) {
            return false;
        }

        // Municipio
        if (
            filters.municipio &&
            filters.municipio !== "TODOS" &&
            record.municipio !== filters.municipio
        ) {
            return false;
        }

        // Delito
        if (
            filters.delito &&
            filters.delito !== "TODOS" &&
            record.delito !== filters.delito
        ) {
            return false;
        }

        return true;

    });

}