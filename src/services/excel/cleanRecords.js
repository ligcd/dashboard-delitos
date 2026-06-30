const INVALID_MUNICIPALITIES = [
    "TOTAL GENERAL"
];

export function cleanRecords(records) {

    return records.filter(record => {

        const municipio = (record.municipio || "")
            .toString()
            .trim()
            .toUpperCase();

        return !INVALID_MUNICIPALITIES.includes(municipio);

    });

}