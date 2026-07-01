import {
    getRegions,
    getMunicipios,
    getDelitos,
    getYears,
    getMonths,
    getWeeks
} from "../../services/stats/options";

export default function DashboardFilters({

    records,
    filters,
    setFilters

}) {

    const regiones = getRegions(records);
    const municipios = getMunicipios(records, filters.region);
    const delitos = getDelitos(records);
    const years = getYears(records);
    const months = getMonths();
    const weeks = getWeeks(records, filters.year);

    function resetFilters() {

        setFilters({

            mode: "range",

            startDate: "",
            endDate: "",

            year: "",
            month: "",
            week: "",

            region: "TODOS",
            municipio: "TODOS",
            delito: "TODOS"

        });

    }

    const inputStyle = `
        w-full
        rounded-xl
        border
        border-slate-300
        bg-white
        px-4
        py-3
        text-sm
        shadow-sm
        transition
        outline-none
        focus:border-[#E47021]
        focus:ring-4
        focus:ring-[#E47021]/20
    `;

    return (

        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

            {/* CABECERA */}

            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div>

                    <h2 className="text-2xl font-bold text-[#032236]">

                        Filtros de consulta

                    </h2>

                    <p className="mt-1 text-sm text-slate-500">

                        Selecciona el periodo y los criterios para analizar la información.

                    </p>

                </div>

                <button

                    onClick={resetFilters}

                    className="rounded-xl bg-[#032236] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#E47021]"

                >

                    Limpiar filtros

                </button>

            </div>

            {/* FILTROS */}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                {/* MODO */}

                <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">

                        Tipo de búsqueda

                    </label>

                    <select

                        value={filters.mode}

                        onChange={(e) =>
                            setFilters({

                                ...filters,

                                mode: e.target.value

                            })
                        }

                        className={inputStyle}

                    >

                        <option value="range">

                            Rango de fechas

                        </option>

                        <option value="year">

                            Año

                        </option>

                        <option value="month">

                            Mes

                        </option>

                        <option value="week">

                            Semana

                        </option>

                    </select>

                </div>

                {/* RANGO */}

                {filters.mode === "range" && (

                    <>

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">

                                Fecha inicio

                            </label>

                            <input

                                type="date"

                                value={filters.startDate}

                                onChange={(e) =>
                                    setFilters({

                                        ...filters,

                                        startDate: e.target.value

                                    })
                                }

                                className={inputStyle}

                            />

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">

                                Fecha fin

                            </label>

                            <input

                                type="date"

                                value={filters.endDate}

                                onChange={(e) =>
                                    setFilters({

                                        ...filters,

                                        endDate: e.target.value

                                    })
                                }

                                className={inputStyle}

                            />

                        </div>

                    </>

                )}

                {/* AÑO */}

                {filters.mode === "year" && (

                    <div>

                        <label className="mb-2 block text-sm font-semibold text-slate-700">

                            Año

                        </label>

                        <select

                            value={filters.year}

                            onChange={(e) =>
                                setFilters({

                                    ...filters,

                                    year: e.target.value

                                })
                            }

                            className={inputStyle}

                        >

                            <option value="">

                                Todos

                            </option>

                            {years.map((year) => (

                                <option

                                    key={year}

                                    value={year}

                                >

                                    {year}

                                </option>

                            ))}

                        </select>

                    </div>

                )}

                {/* MES */}

                {filters.mode === "month" && (

                    <>

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">

                                Año

                            </label>

                            <select

                                value={filters.year}

                                onChange={(e) =>
                                    setFilters({

                                        ...filters,

                                        year: e.target.value

                                    })
                                }

                                className={inputStyle}

                            >

                                <option value="">

                                    Seleccione

                                </option>

                                {years.map((year) => (

                                    <option

                                        key={year}

                                        value={year}

                                    >

                                        {year}

                                    </option>

                                ))}

                            </select>

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">

                                Mes

                            </label>

                            <select

                                value={filters.month}

                                onChange={(e) =>
                                    setFilters({

                                        ...filters,

                                        month: e.target.value

                                    })
                                }

                                className={inputStyle}

                            >

                                <option value="">

                                    Seleccione

                                </option>

                                {months.map((month) => (

                                    <option

                                        key={month.value}

                                        value={month.value}

                                    >

                                        {month.label}

                                    </option>

                                ))}

                            </select>

                        </div>

                    </>

                )}


                {/* SEMANA */}

                {filters.mode === "week" && (

                    <>

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">

                                Año

                            </label>

                            <select

                                value={filters.year}

                                onChange={(e) =>

                                    setFilters({

                                        ...filters,

                                        year: e.target.value,

                                        week: ""

                                    })

                                }

                                className={inputStyle}

                            >

                                <option value="">

                                    Seleccione

                                </option>

                                {

                                    years.map(year => (

                                        <option

                                            key={year}

                                            value={year}

                                        >

                                            {year}

                                        </option>

                                    ))

                                }

                            </select>

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">

                                Semana

                            </label>

                            <select

                                value={filters.week}

                                onChange={(e) =>

                                    setFilters({

                                        ...filters,

                                        week: e.target.value

                                    })

                                }

                                className={inputStyle}

                            >

                                <option value="">

                                    Seleccione

                                </option>

                                {

                                    weeks.map(week => (

                                        <option

                                            key={week}

                                            value={week}

                                        >

                                            Semana {week}

                                        </option>

                                    ))

                                }

                            </select>

                        </div>

                    </>

                )}

                {/* REGIÓN */}

                <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">

                        Región

                    </label>

                    <select

                        value={filters.region}

                        onChange={(e) =>
                            setFilters({

                                ...filters,

                                region: e.target.value,

                                municipio: "TODOS"

                            })
                        }

                        className={inputStyle}

                    >

                        {regiones.map((region) => (

                            <option

                                key={region}

                                value={region}

                            >

                                {region}

                            </option>

                        ))}

                    </select>

                </div>

                {/* MUNICIPIO */}

                <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">

                        Municipio

                    </label>

                    <select

                        value={filters.municipio}

                        onChange={(e) =>
                            setFilters({

                                ...filters,

                                municipio: e.target.value

                            })
                        }

                        className={inputStyle}

                    >

                        {municipios.map((municipio) => (

                            <option

                                key={municipio}

                                value={municipio}

                            >

                                {municipio}

                            </option>

                        ))}

                    </select>

                </div>

                {/* DELITO */}

                <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">

                        Delito

                    </label>

                    <select

                        value={filters.delito}

                        onChange={(e) =>
                            setFilters({

                                ...filters,

                                delito: e.target.value

                            })
                        }

                        className={inputStyle}

                    >

                        {delitos.map((delito) => (

                            <option

                                key={delito}

                                value={delito}

                            >

                                {delito}

                            </option>

                        ))}

                    </select>

                </div>

            </div>

            {/* RESUMEN */}

            <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">

                <h3 className="mb-4 font-semibold text-[#032236]">

                    Resumen de la consulta

                </h3>

                <div className="grid gap-4 text-sm md:grid-cols-2 xl:grid-cols-4">

                    <div>

                        <span className="font-semibold">Modo:</span><br />

                        {filters.mode}

                    </div>

                    <div>

                        <span className="font-semibold">Región:</span><br />

                        {filters.region}

                    </div>

                    <div>

                        <span className="font-semibold">Municipio:</span><br />

                        {filters.municipio}

                    </div>

                    <div>

                        <span className="font-semibold">Delito:</span><br />

                        {filters.delito}

                    </div>

                </div>

            </div>

        </div>

    );

}