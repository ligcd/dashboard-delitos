/**
 * ==========================================
 * COMPARISON UTILS
 * Funciones auxiliares reutilizables
 * ==========================================
 */

/**
 * Obtiene el mes anterior.
 */
export function getPreviousMonth(year, month) {

    year = Number(year);
    month = Number(month);

    if (month === 1) {

        return {
            year: year - 1,
            month: 12
        };

    }

    return {

        year,

        month: month - 1

    };

}

/**
 * Obtiene el año anterior.
 */
export function getPreviousYear(year) {

    return Number(year) - 1;

}

/**
 * Obtiene la semana anterior.
 */
export function getPreviousWeek(year, week) {

    year = Number(year);
    week = Number(week);

    if (week > 1) {

        return {

            year,

            week: week - 1

        };

    }

    // Temporalmente suponemos 53.
    // Después podremos calcular si ese año tuvo 52 o 53.

    return {

        year: year - 1,

        week: 53

    };

}

/**
 * Nombre del mes.
 */
export function getMonthName(month) {

    const months = [

        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"

    ];

    return months[Number(month) - 1] || "";

}

/**
 * Etiqueta para mes.
 */
export function getMonthLabel(year, month) {

    return `${getMonthName(month)} ${year}`;

}

/**
 * Etiqueta para semana.
 */
export function getWeekLabel(year, week) {

    return `Semana ${week} de ${year}`;

}

/**
 * Etiqueta para año.
 */
export function getYearLabel(year) {

    return String(year);

}

/**
 * Convierte porcentaje a texto.
 */
export function formatPercentage(value) {

    if (
        value === null ||
        value === undefined ||
        Number.isNaN(value)
    ) {

        return "--";

    }

    return `${value.toFixed(1)}%`;

}

/**
 * Convierte números grandes.
 *
 * 1450 -> 1,450
 */
export function formatNumber(value) {

    return Number(value).toLocaleString("es-MX");

}

/**
 * Flecha según variación.
 */
export function getVariationIcon(value) {

    if (value > 0) {

        return "▲";

    }

    if (value < 0) {

        return "▼";

    }

    return "▬";

}

/**
 * Color según variación.
 */
export function getVariationColor(value) {

    if (value > 0) {

        return "green";

    }

    if (value < 0) {

        return "red";

    }

    return "gray";

}

/**
 * Tipo de comparación.
 */
export function getComparisonTypeLabel(type) {

    switch (type) {

        case "previousMonth":

            return "Mes anterior";

        case "sameMonthLastYear":

            return "Mismo mes del año anterior";

        case "previousWeek":

            return "Semana anterior";

        case "sameWeekLastYear":

            return "Misma semana del año anterior";

        case "previousYear":

            return "Año anterior";

        default:

            return "Comparación";

    }

}

/**
 * Título automático.
 */
export function buildComparisonTitle(filters, comparisonType) {

    switch (filters.mode) {

        case "month":

            return `${getMonthLabel(filters.year, filters.month)}
vs
${getComparisonTypeLabel(comparisonType)}`;

        case "week":

            return `${getWeekLabel(filters.year, filters.week)}
vs
${getComparisonTypeLabel(comparisonType)}`;

        case "year":

            return `${filters.year}
vs
${getComparisonTypeLabel(comparisonType)}`;

        default:

            return "Comparación";

    }

}

/**
 * Calcula porcentaje.
 */
export function calculatePercentage(previous, current) {

    previous = Number(previous);
    current = Number(current);

    if (previous === 0) {

        return null;

    }

    return ((current - previous) / previous) * 100;

}

/**
 * Diferencia absoluta.
 */
export function calculateDifference(previous, current) {

    return Number(current) - Number(previous);

}