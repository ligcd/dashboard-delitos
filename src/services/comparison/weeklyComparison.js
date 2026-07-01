import { filterComparisonRecords } from "./filterComparisonRecords";

import { getWeekRecords } from "../../utils/dateUtils";

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

    // ===========================
    // RESPETAR FILTROS DEL DASHBOARD
    // (Región, Municipio y Delito)
    // ===========================

    const baseRecords = filterComparisonRecords(
        records,
        filters
    );

    let previousWeek = Number(filters.week);
    let previousYear = Number(filters.year);

    // ===========================
    // SEMANA ANTERIOR
    // ===========================

    if (comparisonType === "previousWeek") {

        previousWeek--;

        if (previousWeek === 0) {

            // Temporalmente usamos 53.
            // Después haremos una función que calcule
            // si el año tiene 52 o 53 semanas.

            previousWeek = 53;
            previousYear--;

        }

    }

    // ===========================
    // MISMA SEMANA AÑO ANTERIOR
    // ===========================

    if (comparisonType === "sameWeekLastYear") {

        previousYear--;

    }

    // ===========================
    // OBTENER REGISTROS
    // ===========================

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

    // ===========================
    // COMPARACIÓN
    // ===========================

    return comparePeriods(

        previousRecords,

        currentRecords,

        "delito"

    );

}