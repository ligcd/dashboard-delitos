export default function Header() {

    return (

        <header className="bg-[#032236] shadow-lg">

            <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">

                <div>

                    <h1 className="text-3xl font-bold text-[#FDFFFF]">

                        Dashboard Estatal de Delitos

                    </h1>

                    <p className="mt-1 text-slate-300">

                        Consejo Estatal de Seguridad Pública
                    </p>

                </div>

                <div className="text-right">

                    <p className="text-sm text-slate-300">

                        Actualizado

                    </p>

                    <p className="font-semibold text-[#FDFFFF]">

                        {new Date().toLocaleDateString("es-MX")}

                    </p>

                </div>

            </div>

        </header>

    );

}