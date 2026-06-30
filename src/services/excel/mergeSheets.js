import { crimeConfig } from "./crimeConfig";

export function mergeSheets(records) {

    const result = [...records];

    const virtuals = crimeConfig.virtualCrimes;

    const groups = {};

    // agrupar
    for (const r of records) {

        const key = `${r.municipio}_${r.fecha}`;

        if (!groups[key]) {
            groups[key] = [];
        }

        groups[key].push(r);
    }

    const created = new Set();

    for (const [newCrime, sources] of Object.entries(virtuals)) {

        for (const key in groups) {

            const group = groups[key];
            const base = group[0];

            let total = 0;

            for (const crime of sources) {

                const match = group.find(r => r.delito === crime);

                if (match) {
                    total += Number(match.cantidad || 0);
                }
            }

            const uniqueKey = `${base.municipio}_${base.fecha}_${newCrime}`;

            if (created.has(uniqueKey)) continue;

            created.add(uniqueKey);

            result.push({
                delito: newCrime,
                municipio: base.municipio,
                fecha: base.fecha,
                anio: base.anio,
                mes: base.mes,
                dia: base.dia,
                cantidad: total
            });
        }
    }

    return result;
}