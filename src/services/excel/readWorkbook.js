import * as XLSX from "xlsx";

/**
 * Lee un archivo Excel (.xlsx, .xls o .csv)
 */
export async function readWorkbook(file) {

    const data = await file.arrayBuffer();

    const workbook = XLSX.read(data, {
        type: "array",
        cellDates: true
    });

    return workbook;

}

/**
 * Convierte una hoja a una matriz
 */
export function sheetToArray(workbook, sheetName) {

    const sheet = workbook.Sheets[sheetName];

    return XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        defval: "",
        raw: false
    });

}