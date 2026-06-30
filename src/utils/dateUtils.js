/**
 * Convierte una fecha del Excel
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
 * Obtiene el año
 */

export function getYear(dateString) {

    const date = normalizeDate(dateString);

    if (!date) return null;

    return Number(date.substring(0,4));

}

/**
 * Obtiene el mes
 */

export function getMonth(dateString){

    const date = normalizeDate(dateString);

    if(!date) return null;

    return Number(date.substring(5,7));

}

/**
 * Obtiene el día
 */

export function getDay(dateString){

    const date = normalizeDate(dateString);

    if(!date) return null;

    return Number(date.substring(8,10));

}