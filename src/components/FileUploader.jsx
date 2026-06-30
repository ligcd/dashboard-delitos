import { useRef } from "react";
import { FaFileExcel } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";

function FileUploader({ onFileSelect }) {

    const inputRef = useRef(null);

    function handleChange(event) {

        const file = event.target.files[0];

        if (!file) return;

        onFileSelect(file);

    }

    function openExplorer() {
        inputRef.current.click();
    }

    return (

        <div className="flex justify-center">

            <div className="w-full max-w-xl rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-10 text-center">

                <FiUploadCloud className="mx-auto text-6xl text-emerald-600" />

                <h2 className="mt-4 text-2xl font-semibold">

                    Cargar archivo Excel

                </h2>

                <p className="mt-2 text-slate-500">

                    Selecciona la base de delitos para comenzar el análisis.

                </p>

                <button

                    onClick={openExplorer}

                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"

                >

                    <FaFileExcel />

                    Seleccionar archivo

                </button>

                <input

                    ref={inputRef}

                    type="file"

                    accept=".xlsx,.xls,.csv"

                    onChange={handleChange}

                    className="hidden"

                />

                <p className="mt-5 text-sm text-slate-400">

                    Formatos permitidos: XLSX, XLS y CSV

                </p>

            </div>

        </div>

    );

}

export default FileUploader;