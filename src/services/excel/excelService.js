import { readWorkbook, sheetToArray } from "./readWorkbook";
import { analyzeSheet } from "./normalizeWorkbook";
import { transformToRecords } from "./transformToRecords";
import { cleanRecords } from "./cleanRecords";
import { mergeSheets } from "./mergeSheets";
import { assignRegions } from "./assignRegions";

export async function processExcel(file) {

    const workbook = await readWorkbook(file);

    let records = [];

    for (const sheetName of workbook.SheetNames) {

        const data = sheetToArray(workbook, sheetName);

        const analysis = analyzeSheet(data);

        if (!analysis) continue;

        const currentRecords = transformToRecords(
            data,
            sheetName,
            analysis
        );

        records.push(...currentRecords);
    }

    // Eliminar registros no válidos
    const cleanedRecords = cleanRecords(records);

    // Crear delitos virtuales (ej. VICTIMAS TOTALES)
    const mergedRecords = mergeSheets(cleanedRecords);

    //Asignar regiones a partir de los municipio
    const finalRecords = assignRegions(mergedRecords);

    return {
        records: finalRecords,
        sheetNames: workbook.SheetNames
    };
}