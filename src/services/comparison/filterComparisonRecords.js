export function filterComparisonRecords(records, filters) {

    return records.filter(record => {

        // Región
        if (
            filters.region &&
            filters.region !== "TODOS" &&
            record.region !== filters.region
        ) return false;

        // Municipio
        if (
            filters.municipio &&
            filters.municipio !== "TODOS" &&
            record.municipio !== filters.municipio
        ) return false;

        // ❌ IMPORTANTE:
        // NO filtramos por delito aquí
        // porque queremos ver TODOS los delitos en la comparación

        return true;
    });
}