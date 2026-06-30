export function regionTotals(records) {

    const map = {};

    records.forEach(r => {

        map[r.region] =

            (map[r.region] || 0)

            + Number(r.cantidad || 0);

    });

    return Object.entries(map)

        .map(([region, total]) => ({

            region,

            total

        }))

        .sort((a, b) => b.total - a.total);

}