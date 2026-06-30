export function crimeTotals(records) {

    const map = {};

    records.forEach(r => {

        map[r.delito] =

            (map[r.delito] || 0)

            + Number(r.cantidad || 0);

    });

    return Object.entries(map)

        .map(([delito, total]) => ({

            delito,

            total

        }))

        .sort((a, b) => b.total - a.total);

}