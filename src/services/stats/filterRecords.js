export function filterRecords(records, filters) {

    return records.filter(record => {

        // ===========================
        // FILTRO POR MODO
        // ===========================

        if (filters.mode === "range") {

            if (
                filters.startDate &&
                record.fecha < filters.startDate
            ) {
                return false;
            }

            if (
                filters.endDate &&
                record.fecha > filters.endDate
            ) {
                return false;
            }

        }

        else if (filters.mode === "year") {

            if (
                filters.year &&
                record.anio !== Number(filters.year)
            ) {
                return false;
            }

        }

        else if (filters.mode === "month") {

            if (
                filters.year &&
                record.anio !== Number(filters.year)
            ) {
                return false;
            }

            if (
                filters.month &&
                record.mes !== Number(filters.month)
            ) {
                return false;
            }

        }

        // ===========================
        // REGIÓN
        // ===========================

        if (
            filters.region !== "TODOS" &&
            record.region !== filters.region
        ) {
            return false;
        }

        // ===========================
        // MUNICIPIO
        // ===========================

        if (
            filters.municipio !== "TODOS" &&
            record.municipio !== filters.municipio
        ) {
            return false;
        }

        // ===========================
        // DELITO
        // ===========================

        if (
            filters.delito !== "TODOS" &&
            record.delito !== filters.delito
        ) {
            return false;
        }

        return true;

    });

}