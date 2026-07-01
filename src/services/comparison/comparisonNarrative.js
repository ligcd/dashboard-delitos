import {

    getComparisonSummary

} from "./comparisonStats";

import {

    formatPercentage

} from "./comparisonUtils";

/**
 * ==========================================
 * Genera una narrativa ejecutiva
 * ==========================================
 */
export function getComparisonNarrative(data = []) {

    if (!data.length) {

        return {

            title: "Sin información",

            summary:
                "No existe información suficiente para realizar una comparación.",

            highlights: []

        };

    }

    const stats = getComparisonSummary(data);

    const highlights = [];

    // ==========================
    // Variación global
    // ==========================

    if (stats.globalVariation > 0) {

        highlights.push(

            `La incidencia aumentó ${formatPercentage(
                stats.globalVariation
            )} respecto al periodo comparado.`

        );

    }

    else if (stats.globalVariation < 0) {

        highlights.push(

            `La incidencia disminuyó ${formatPercentage(
                Math.abs(stats.globalVariation)
            )} respecto al periodo comparado.`

        );

    }

    else {

        highlights.push(

            "La incidencia permaneció sin cambios respecto al periodo comparado."

        );

    }

    // ==========================
    // Delitos con incremento
    // ==========================

    highlights.push(

        `${stats.increases} delitos presentaron incremento.`

    );

    // ==========================
    // Delitos con disminución
    // ==========================

    highlights.push(

        `${stats.decreases} delitos presentaron disminución.`

    );

    // ==========================
    // Delitos sin cambios
    // ==========================

    highlights.push(

        `${stats.equals} delitos permanecieron sin cambios.`

    );

    // ==========================
    // Mayor incremento
    // ==========================

    if (stats.largestIncrease) {

        highlights.push(

            `Mayor incremento: ${stats.largestIncrease.nombre} (${formatPercentage(
                stats.largestIncrease.porcentaje
            )}).`

        );

    }

    // ==========================
    // Mayor disminución
    // ==========================

    if (stats.largestDecrease) {

        highlights.push(

            `Mayor disminución: ${stats.largestDecrease.nombre} (${formatPercentage(
                Math.abs(stats.largestDecrease.porcentaje)
            )}).`

        );

    }

    return {

        title: "Resumen ejecutivo",

        summary:

            `Se compararon ${data.length} delitos entre ambos periodos.`,

        highlights

    };

}