export function getWeeklyTotals(records) {

    const weeks = {};

    records.forEach(r => {

        const fecha = new Date(r.fecha);

        const inicio = new Date(fecha.getFullYear(), 0, 1);

        const dias = Math.floor(

            (fecha - inicio) / 86400000

        );

        const semana = Math.ceil((dias + 1) / 7);

        if (!weeks[semana]) {

            weeks[semana] = 0;

        }

        weeks[semana] += Number(r.cantidad || 0);

    });

    return Object.entries(weeks)

        .map(([week, total]) => ({

            week: Number(week),

            total

        }))

        .sort((a, b) => a.week - b.week);

}

export function getWeeklyAverage(records) {

    const totals = getWeeklyTotals(records);

    return totals.map(item => ({

        week: item.week,

        promedio: item.total / 7

    }));

}