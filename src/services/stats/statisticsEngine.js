// src/services/stats/statisticsEngine.js

/**
 * Convierte fecha a objeto Date seguro
 */

function clean(records) {
    return records.filter(r =>
        r.delito &&
        r.delito !== "TOTAL"
    );
}

function parseDate(dateStr) {
    return new Date(dateStr);
}

/**
 * Agrupa por clave genérica
 */
function groupBy(array, keyFn) {
    return array.reduce((acc, item) => {

        const key = keyFn(item);

        if (!acc[key]) acc[key] = [];

        acc[key].push(item);

        return acc;

    }, {});
}

/**
 * 1. ESTADÍSTICAS MENSUALES
 */
export function getMonthlyStats(records) {

    const grouped = groupBy(records, r => `${r.delito}_${r.anio}_${r.mes}`);

    const result = {};

    for (const key in grouped) {

        const [delito, anio, mes] = key.split("_");

        const total = grouped[key].reduce((sum, r) => sum + Number(r.cantidad || 0), 0);

        if (!result[delito]) result[delito] = {};

        result[delito][`${anio}-${mes}`] = total;
    }

    return result;
}

/**
 * 2. ESTADÍSTICAS SEMANALES
 */
export function getWeeklyStats(records) {

    const grouped = groupBy(records, r => {

        const date = parseDate(r.fecha);

        const oneJan = new Date(date.getFullYear(), 0, 1);

        const week = Math.ceil((((date - oneJan) / 86400000) + oneJan.getDay() + 1) / 7);

        return `${r.delito}_W${week}_${date.getFullYear()}`;
    });

    const result = {};

    for (const key in grouped) {

        const [delito, week, year] = key.split("_");

        const total = grouped[key].reduce((sum, r) => sum + Number(r.cantidad || 0), 0);

        if (!result[delito]) result[delito] = {};

        result[delito][`${year}-${week}`] = total;
    }

    return result;
}

/**
 * 3. PROMEDIO DIARIO POR DELITO
 */
export function getDailyAverage(records) {

    const grouped = groupBy(records, r => r.delito);

    const result = {};

    for (const delito in grouped) {

        const total = grouped[delito].reduce((sum, r) => sum + Number(r.cantidad || 0), 0);

        const uniqueDays = new Set(grouped[delito].map(r => r.fecha)).size;

        result[delito] = uniqueDays ? total / uniqueDays : 0;
    }

    return result;
}

/**
 * 4. VARIACIÓN PORCENTUAL (MES A MES)
 */
export function getMonthlyVariation(monthlyStats, delito, monthA, monthB) {

    const a = monthlyStats?.[delito]?.[monthA] || 0;
    const b = monthlyStats?.[delito]?.[monthB] || 0;

    if (a === 0) return null;

    return ((b - a) / a) * 100;
}

/**
 * 5. TOP DELITOS
 */
export function getTopCrimes(records, limit = 10) {

    const grouped = groupBy(records, r => r.delito);

    const totals = Object.entries(grouped).map(([delito, items]) => {

        const total = items.reduce((sum, r) => sum + Number(r.cantidad || 0), 0);

        return { delito, total };
    });

    return totals
        .sort((a, b) => b.total - a.total)
        .slice(0, limit);
}

//POR FECHA 
export function getDailyStats(records) {

    const map = {};

    for (const r of records) {

        const date = r.fecha; // ya viene normalizada

        if (!map[date]) map[date] = 0;

        map[date] += Number(r.cantidad || 0);
    }

    return Object.entries(map)
        .map(([date, total]) => ({ date, total }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));
}

export function getMonthlyTrend(records) {

    const map = {};

    for (const r of records) {

        const key = `${r.anio}-${String(r.mes).padStart(2, "0")}`;

        if (!map[key]) map[key] = 0;

        map[key] += Number(r.cantidad || 0);
    }

    return Object.entries(map)
        .map(([month, total]) => ({ month, total }))
        .sort((a, b) => a.month.localeCompare(b.month));
}

export function getCumulativeTrend(records) {

    const daily = getDailyStats(records);

    let sum = 0;

    return daily.map(item => {

        sum += item.total;

        return {
            date: item.date,
            cumulative: sum
        };
    });
}