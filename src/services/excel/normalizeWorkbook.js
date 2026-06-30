/**
 * Analiza la estructura de una hoja del Excel.
 */

export function analyzeSheet(data) {

    if (!data || data.length < 3) {
        return null;
    }

    // Fila 0 = Año
    const yearRow = data[0];

    // Fila 1 = Fechas
    const dateRow = data[1];

    // Buscar columna MUNICIPIO
    const municipioColumn = yearRow.findIndex(cell =>
        String(cell).toUpperCase().includes("MUNICIPIO")
    );

    const dateColumns = [];

    dateRow.forEach((cell, index) => {

        if (index === municipioColumn) return;

        if (cell && String(cell).includes("/")) {

            dateColumns.push({
                index,
                date: String(cell)
            });

        }

    });

    return {

        municipioColumn,

        firstDataRow: 2,

        totalMunicipios: data.length - 2,

        totalFechas: dateColumns.length,

        dateColumns

    };

}