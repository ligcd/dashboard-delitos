export function getPreviousTotal(data = []) {
    return data.reduce((sum, item) => sum + Number(item.anterior || 0), 0);
}

export function getCurrentTotal(data = []) {
    return data.reduce((sum, item) => sum + Number(item.actual || 0), 0);
}

export function getTotalDifference(data = []) {
    return getCurrentTotal(data) - getPreviousTotal(data);
}

export function getGlobalVariation(data = []) {
    const prev = getPreviousTotal(data);
    const curr = getCurrentTotal(data);

    if (prev === 0) return null;

    return ((curr - prev) / prev) * 100;
}

export function getIncreaseCount(data = []) {
    return data.filter(i => i.diferencia > 0).length;
}

export function getDecreaseCount(data = []) {
    return data.filter(i => i.diferencia < 0).length;
}

export function getEqualCount(data = []) {
    return data.filter(i => i.diferencia === 0).length;
}

export function getLargestIncrease(data = []) {
    return [...data]
        .filter(i => i.porcentaje !== null)
        .sort((a, b) => b.porcentaje - a.porcentaje)[0] || null;
}

export function getLargestDecrease(data = []) {
    return [...data]
        .filter(i => i.porcentaje !== null)
        .sort((a, b) => a.porcentaje - b.porcentaje)[0] || null;
}

export function getAverageVariation(data = []) {
    const valid = data.filter(i => i.porcentaje !== null);
    if (!valid.length) return 0;

    return valid.reduce((s, i) => s + i.porcentaje, 0) / valid.length;
}

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