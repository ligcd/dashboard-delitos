export function getTotalIncidencias(records) {

    return records.reduce((sum, r) =>

        sum + (Number(r.cantidad) || 0)

    , 0);

}

// =====================================
// MUNICIPIO CON MAYOR INCIDENCIA
// =====================================

export function getTopMunicipio(records) {

    const map = {};

    for (const r of records) {

        if (!r.municipio) continue;

        map[r.municipio] =
            (map[r.municipio] || 0) +
            Number(r.cantidad || 0);

    }

    return Object.entries(map)
        .sort((a, b) => b[1] - a[1])[0];

}

// =====================================
// REGIÓN CON MAYOR INCIDENCIA
// =====================================

export function getTopRegion(records) {

    const map = {};

    for (const r of records) {

        if (!r.region) continue;

        map[r.region] =
            (map[r.region] || 0) +
            Number(r.cantidad || 0);

    }

    return Object.entries(map)
        .sort((a, b) => b[1] - a[1])[0];

}

// =====================================
// PROMEDIO DIARIO
// =====================================

export function getDailyAverage(records) {

    if (!records.length) return 0;

    const total = getTotalIncidencias(records);

    const dias = new Set(

        records.map(r => r.fecha)

    ).size;

    if (!dias) return 0;

    return total / dias;

}