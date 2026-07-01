/**
 * ==========================================
 * COMPARISON STATS
 * Estadísticas derivadas de comparePeriods()
 * ==========================================
 */

/**
 * Total del periodo anterior.
 */
export function getPreviousTotal(data = []) {

    if (!Array.isArray(data)) {

        return 0;

    }

    return data.reduce(

        (sum, item) =>

            sum + Number(item.anterior || 0),

        0

    );

}

/**
 * Total del periodo actual.
 */
export function getCurrentTotal(data = []) {

    if (!Array.isArray(data)) {

        return 0;

    }

    return data.reduce(

        (sum, item) =>

            sum + Number(item.actual || 0),

        0

    );

}

/**
 * Diferencia absoluta global.
 */
export function getTotalDifference(data = []) {

    return getCurrentTotal(data) - getPreviousTotal(data);

}

/**
 * Variación porcentual global.
 */
export function getGlobalVariation(data = []) {

    const previous = getPreviousTotal(data);
    const current = getCurrentTotal(data);

    if (previous === 0) {

        return null;

    }

    return ((current - previous) / previous) * 100;

}

/**
 * Cantidad de delitos que aumentaron.
 */
export function getIncreaseCount(data = []) {

    if (!Array.isArray(data)) {

        return 0;

    }

    return data.filter(

        item => item.diferencia > 0

    ).length;

}

/**
 * Cantidad de delitos que disminuyeron.
 */
export function getDecreaseCount(data = []) {

    if (!Array.isArray(data)) {

        return 0;

    }

    return data.filter(

        item => item.diferencia < 0

    ).length;

}

/**
 * Cantidad sin cambios.
 */
export function getEqualCount(data = []) {

    if (!Array.isArray(data)) {

        return 0;

    }

    return data.filter(

        item => item.diferencia === 0

    ).length;

}

/**
 * Mayor incremento.
 */
export function getLargestIncrease(data = []) {

    if (!data.length) return null;

    return [...data]

        .filter(item => item.porcentaje !== null)

        .sort((a, b) => b.porcentaje - a.porcentaje)[0] || null;

}

/**
 * Mayor disminución.
 */
export function getLargestDecrease(data = []) {

    if (!data.length) return null;

    return [...data]

        .filter(item => item.porcentaje !== null)

        .sort((a, b) => a.porcentaje - b.porcentaje)[0] || null;

}

/**
 * Variación promedio.
 */
export function getAverageVariation(data = []) {

    if (!Array.isArray(data)) {

        return 0;

    }

    const valid = data.filter(

        item => item.porcentaje !== null

    );

    if (!valid.length) {

        return 0;

    }

    return (

        valid.reduce(

            (sum, item) =>

                sum + item.porcentaje,

            0

        )

        /

        valid.length

    );

}

/**
 * Top incrementos.
 */
export function getTopIncreases(

    data = [],

    limit = 10

) {

    return [...data]

        .filter(item => item.porcentaje !== null)

        .sort((a, b) => b.porcentaje - a.porcentaje)

        .slice(0, limit);

}

/**
 * Top disminuciones.
 */
export function getTopDecreases(

    data = [],

    limit = 10

) {

    return [...data]

        .filter(item => item.porcentaje !== null)

        .sort((a, b) => a.porcentaje - b.porcentaje)

        .slice(0, limit);

}

/**
 * Devuelve un resumen ejecutivo.
 */
export function getComparisonSummary(data = []) {

    return {

        previousTotal: getPreviousTotal(data),

        currentTotal: getCurrentTotal(data),

        totalDifference: getTotalDifference(data),

        globalVariation: getGlobalVariation(data),

        increases: getIncreaseCount(data),

        decreases: getDecreaseCount(data),

        equals: getEqualCount(data),

        averageVariation: getAverageVariation(data),

        largestIncrease: getLargestIncrease(data),

        largestDecrease: getLargestDecrease(data)

    };

}