import { regions } from "../../config/regions";

export function assignRegions(records) {

    return records.map(record => ({

        ...record,

        region: regions[record.municipio] || "SIN REGION"

    }));

}