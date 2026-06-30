export function comparePeriods(previous = [], current = [], field = "delito") {

    const prevMap = {};
    const currMap = {};

    previous.forEach(r => {

        const key = r[field];

        prevMap[key] = (prevMap[key] || 0) + Number(r.cantidad || 0);

    });

    current.forEach(r => {

        const key = r[field];

        currMap[key] = (currMap[key] || 0) + Number(r.cantidad || 0);

    });

    const keys = new Set([
        ...Object.keys(prevMap),
        ...Object.keys(currMap)
    ]);

    return [...keys].map(key => {

        const anterior = prevMap[key] || 0;
        const actual = currMap[key] || 0;

        const diferencia = actual - anterior;

        const porcentaje =
            anterior === 0
                ? null
                : (diferencia / anterior) * 100;

        return {

            nombre: key,

            anterior,

            actual,

            diferencia,

            porcentaje

        };

    });

}

export function getLargestIncrease(data, limit = 10) {

    return [...data]

        .filter(x => x.porcentaje !== null)

        .sort((a, b) => b.porcentaje - a.porcentaje)

        .slice(0, limit);

}

export function getLargestDecrease(data, limit = 10) {

    return [...data]

        .filter(x => x.porcentaje !== null)

        .sort((a, b) => a.porcentaje - b.porcentaje)

        .slice(0, limit);

}

export function getAverageVariation(data) {

    const valid = data.filter(x => x.porcentaje !== null);

    if (!valid.length) return 0;

    return (

        valid.reduce(

            (sum, x) => sum + x.porcentaje,

            0

        ) / valid.length

    );

}