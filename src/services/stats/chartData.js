// src/services/stats/chartData.js

function sumCantidad(records) {
    return records.reduce(
        (sum, r) => sum + Number(r.cantidad || 0),
        0
    );
}

/*
|--------------------------------------------------------------------------
| Tendencia diaria
|--------------------------------------------------------------------------
*/

export function getDailyTrend(records) {

    const map = {};

    for (const r of records) {

        map[r.fecha] = (map[r.fecha] || 0) + Number(r.cantidad || 0);

    }

    return Object.entries(map)
        .map(([date, total]) => ({
            date,
            total
        }))
        .sort((a, b) => a.date.localeCompare(b.date));

}

/*
|--------------------------------------------------------------------------
| Tendencia mensual
|--------------------------------------------------------------------------
*/

export function getMonthlyTrend(records) {

    const map = {};

    for (const r of records) {

        const month = `${r.anio}-${String(r.mes).padStart(2, "0")}`;

        map[month] = (map[month] || 0) + Number(r.cantidad || 0);

    }

    return Object.entries(map)
        .map(([month, total]) => ({
            month,
            total
        }))
        .sort((a, b) => a.month.localeCompare(b.month));

}

/*
|--------------------------------------------------------------------------
| Tendencia acumulada
|--------------------------------------------------------------------------
*/

export function getCumulativeTrend(records) {

    const daily = getDailyTrend(records);

    let acumulado = 0;

    return daily.map(item => {

        acumulado += item.total;

        return {

            date: item.date,

            total: acumulado

        };

    });

}

/*
|--------------------------------------------------------------------------
| Top Municipios
|--------------------------------------------------------------------------
*/

export function getTopMunicipios(records, limit = 10) {

    const map = {};

    for (const r of records) {

        map[r.municipio] = (map[r.municipio] || 0) + Number(r.cantidad || 0);

    }

    return Object.entries(map)

        .map(([municipio, total]) => ({
            municipio,
            total
        }))

        .sort((a, b) => b.total - a.total)

        .slice(0, limit);

}

/*
|--------------------------------------------------------------------------
| Top Delitos
|--------------------------------------------------------------------------
*/

export function getTopDelitos(records, limit = 10) {

    const map = {};

    for (const r of records) {

        map[r.delito] = (map[r.delito] || 0) + Number(r.cantidad || 0);

    }

    return Object.entries(map)

        .map(([delito, total]) => ({
            delito,
            total
        }))

        .sort((a, b) => b.total - a.total)

        .slice(0, limit);

}

/*
|--------------------------------------------------------------------------
| Distribución por Región
|--------------------------------------------------------------------------
*/

export function getRegionDistribution(records) {

    const map = {};

    for (const r of records) {

        map[r.region] = (map[r.region] || 0) + Number(r.cantidad || 0);

    }

    return Object.entries(map)

        .map(([region, total]) => ({
            region,
            total
        }))

        .sort((a, b) => b.total - a.total);

}

/*
|--------------------------------------------------------------------------
| Tendencia semanal
|--------------------------------------------------------------------------
*/

export function getWeeklyTrend(records) {

    const map = {};

    for (const r of records) {

        const date = new Date(r.fecha);

        const firstDay = new Date(date.getFullYear(), 0, 1);

        const week = Math.ceil(

            (((date - firstDay) / 86400000)

                + firstDay.getDay()

                + 1) / 7

        );

        const key = `${date.getFullYear()}-S${week}`;

        map[key] = (map[key] || 0) + Number(r.cantidad || 0);

    }

    return Object.entries(map)

        .map(([week, total]) => ({
            week,
            total
        }))

        .sort((a, b) => a.week.localeCompare(b.week));

}