/**
 * ==========================================
 * NORMALIZACIÓN DE FECHAS
 * ==========================================
 */

/**
 * Convierte una fecha del Excel.
 * Ejemplo:
 * 1/5/21 -> 2021-01-05
 */
export function normalizeDate(dateString) {

    if (!dateString) return null;

    const parts = String(dateString).split("/");

    if (parts.length !== 3) return null;

    let [month, day, year] = parts;

    month = month.padStart(2, "0");
    day = day.padStart(2, "0");

    if (year.length === 2) {
        year = "20" + year;
    }

    return `${year}-${month}-${day}`;

}

/**
 * Convierte una fecha normalizada
 * a objeto Date.
 */
export function toDate(dateString) {

    if (!dateString) return null;

    const normalized =
        dateString.includes("/")
            ? normalizeDate(dateString)
            : dateString;

    if (!normalized) return null;

    return new Date(normalized + "T00:00:00");

}

/**
 * ==========================================
 * COMPONENTES DE FECHA
 * ==========================================
 */

export function getYear(dateString) {

    const date = normalizeDate(dateString);

    if (!date) return null;

    return Number(date.substring(0, 4));

}

export function getMonth(dateString) {

    const date = normalizeDate(dateString);

    if (!date) return null;

    return Number(date.substring(5, 7));

}

export function getDay(dateString) {

    const date = normalizeDate(dateString);

    if (!date) return null;

    return Number(date.substring(8, 10));

}

/**
 * ==========================================
 * DÍA DE LA SEMANA
 * ==========================================
 */

export function getDayName(dateString) {

    const date = toDate(dateString);

    if (!date) return null;

    const days = [

        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado"

    ];

    return days[date.getDay()];

}

/**
 * ==========================================
 * SEMANA ISO (LUNES-DOMINGO)
 * ==========================================
 */

export function getWeekNumber(dateString) {

    const date = toDate(dateString);

    if (!date) return null;

    const current = new Date(date);

    current.setHours(0, 0, 0, 0);

    current.setDate(

        current.getDate() +

        3 -

        ((current.getDay() + 6) % 7)

    );

    const firstThursday =

        new Date(current.getFullYear(), 0, 4);

    return (

        1 +

        Math.round(

            (

                (

                    current -

                    firstThursday

                ) /

                86400000

                -

                3

                +

                (

                    (firstThursday.getDay() + 6) % 7

                )

            ) / 7

        )

    );

}

/**
 * ==========================================
 * LUNES DE LA SEMANA
 * ==========================================
 */

export function getWeekStart(dateString) {

    const date = toDate(dateString);

    if (!date) return null;

    const monday = new Date(date);

    const day =

        (monday.getDay() + 6) % 7;

    monday.setDate(

        monday.getDate() - day

    );

    return monday

        .toISOString()

        .substring(0, 10);

}

/**
 * ==========================================
 * DOMINGO DE LA SEMANA
 * ==========================================
 */

export function getWeekEnd(dateString) {

    const date = toDate(dateString);

    if (!date) return null;

    const sunday = new Date(date);

    const day =

        (sunday.getDay() + 6) % 7;

    sunday.setDate(

        sunday.getDate() +

        (6 - day)

    );

    return sunday

        .toISOString()

        .substring(0, 10);

}

/**
 * ==========================================
 * OBTENER REGISTROS
 * ==========================================
 */

export function getWeekRecords(records, year, week) {

    return records.filter(record =>

        record.anio === Number(year) &&
        record.semana === Number(week)

    );

}

export function getMonthRecords(records, year, month) {

    return records.filter(record =>

        record.anio === Number(year) &&
        record.mes === Number(month)

    );

}

export function getYearRecords(records, year) {

    return records.filter(record =>

        record.anio === Number(year)

    );

}

/**
 * ==========================================
 * SEMANAS DISPONIBLES
 * ==========================================
 */

export function getWeeksInYear(year) {

    const date = new Date(

        year,

        11,

        31

    );

    const week = getWeekNumber(

        `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

    );

    return week === 1

        ? 52

        : week;

}

export function getWeeks(year) {

    const totalWeeks =

        getWeeksInYear(year);

    return Array.from(

        {

            length: totalWeeks

        },

        (_, index) => ({

            value: index + 1,

            label: `Semana ${index + 1}`

        })

    );

}

/**
 * ==========================================
 * RANGO DE FECHAS
 * DE UNA SEMANA
 * ==========================================
 */

export function getWeekRangeFromRecords(

    records,

    year,

    week

) {

    const weekRecords =

        records.filter(record =>

            record.anio === Number(year) &&

            record.semana === Number(week)

        );

    if (!weekRecords.length) {

        return null;

    }

    const ordered =

        [...weekRecords]

            .sort(

                (a, b) =>

                    a.fecha.localeCompare(

                        b.fecha

                    )

            );

    return {

        inicio:

            ordered[0].fecha,

        fin:

            ordered[

                ordered.length - 1

            ].fecha

    };

}

/**
 * ==========================================
 * FORMATEAR FECHA
 * ==========================================
 */

export function formatDate(date) {

    if (!date) return "";

    return new Date(date)

        .toLocaleDateString(

            "es-MX",

            {

                day: "numeric",

                month: "long",

                year: "numeric"

            }

        );

}

/**
 * ==========================================
 * RANGO TEÓRICO
 * DE UNA SEMANA ISO
 * ==========================================
 */

export function getWeekRange(year, week) {

    const simple =

        new Date(

            year,

            0,

            1 + (week - 1) * 7

        );

    const day =

        simple.getDay();

    const monday =

        new Date(simple);

    if (day <= 4) {

        monday.setDate(

            simple.getDate()

            -

            simple.getDay()

            +

            1

        );

    }

    else {

        monday.setDate(

            simple.getDate()

            +

            8

            -

            simple.getDay()

        );

    }

    const sunday =

        new Date(monday);

    sunday.setDate(

        monday.getDate() + 6

    );

    const format =

        date =>

            date.toLocaleDateString(

                "es-MX",

                {

                    day: "2-digit",

                    month: "long",

                    year: "numeric"

                }

            );

    return {

        start: format(monday),

        end: format(sunday)

    };

}