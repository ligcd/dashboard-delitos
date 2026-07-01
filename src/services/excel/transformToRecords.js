import {
    normalizeDate,
    getYear,
    getMonth,
    getDay,
    getWeekNumber,
    getDayName,
    getWeekStart,
    getWeekEnd
} from "../../utils/dateUtils";

export function transformToRecords(data, sheetName, analysis) {

    const records = [];

    const {
        municipioColumn,
        dateColumns,
        firstDataRow
    } = analysis;

    for (let row = firstDataRow; row < data.length; row++) {

        const currentRow = data[row];

        const municipio = currentRow[municipioColumn];

        if (!municipio) continue;

        for (const column of dateColumns) {

            const cantidad = Number(currentRow[column.index] ?? 0);

            if (cantidad <= 0) continue;

            const fecha = normalizeDate(column.date);

            records.push({

                delito: sheetName,

                municipio,

                fecha,

                anio: getYear(column.date),

                mes: getMonth(column.date),

                dia: getDay(column.date),

                semana: getWeekNumber(column.date),

                diaSemana: getDayName(column.date),

                inicioSemana: getWeekStart(column.date),

                finSemana: getWeekEnd(column.date),

                cantidad

            });

        }

    }

    return records;

}