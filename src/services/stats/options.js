export function getRegions(records) {

    return [

        "TODOS",

        ...new Set(
            records.map(r => r.region)
        )

    ].sort();

}

export function getMunicipios(records, region = "TODOS") {

    let municipios = records;

    if (region !== "TODOS") {

        municipios = municipios.filter(
            r => r.region === region
        );

    }

    return [

        "TODOS",

        ...new Set(
            municipios.map(r => r.municipio)
        )

    ].sort();

}

export function getDelitos(records) {

    return [


        ...new Set(
            records.map(r => r.delito)
        )

    ].sort();

}

export function getYears(records){

    return [

        ...new Set(
            records.map(r => r.anio)
        )

    ].sort();

}

export function getMonths(){

    return [

        { value:1,label:"Enero"},
        { value:2,label:"Febrero"},
        { value:3,label:"Marzo"},
        { value:4,label:"Abril"},
        { value:5,label:"Mayo"},
        { value:6,label:"Junio"},
        { value:7,label:"Julio"},
        { value:8,label:"Agosto"},
        { value:9,label:"Septiembre"},
        { value:10,label:"Octubre"},
        { value:11,label:"Noviembre"},
        { value:12,label:"Diciembre"}

    ];

}