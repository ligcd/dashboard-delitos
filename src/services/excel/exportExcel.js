import * as XLSX from "xlsx";

/**
 * Exporta registros a Excel limpio
 */
export function exportExcel(records, fileName = "DELITOS_LIMPIOS.xlsx") {

    // 1. convertir a hoja
    const worksheet = XLSX.utils.json_to_sheet(records);

    // 2. crear libro
    const workbook = XLSX.utils.book_new();

    // 3. agregar hoja
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registros");

    // 4. descargar archivo
    XLSX.writeFile(workbook, fileName);
}