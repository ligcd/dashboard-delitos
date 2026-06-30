export function municipalityTotals(records) {

    const map = {};

    records.forEach(r => {

        map[r.municipio] =

            (map[r.municipio] || 0)

            + Number(r.cantidad || 0);

    });

    return Object.entries(map)

        .map(([municipio, total]) => ({

            municipio,

            total

        }))

        .sort((a, b) => b.total - a.total);

}