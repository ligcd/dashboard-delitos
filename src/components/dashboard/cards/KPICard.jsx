import { TrendingDown } from "lucide-react";

export default function KPICard({

    title,
    value,
    subtitle,
    icon,
    color = "#032236",
    trend, 
    loagind

}) {

    return (

        <div className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-6
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-lg
        ">

            <div className="flex items-start justify-between">

                <div>

                    <p className="text-sm font-medium text-slate-500">

                        {title}

                    </p>

                    <h2
                        className="mt-3 text-3xl font-bold"
                        style={{ color }}
                    >

                        {value}

                    </h2>

                    {subtitle && (

                        <p className="mt-2 text-sm text-slate-500">

                            {subtitle}

                        </p>

                    )}

                </div>

                <div
                    className="flex h-14 w-14 items-center justify-center rounded-xl text-2xl"
                    style={{
                        backgroundColor: `${color}15`,
                        color
                    }}
                >

                    {icon}

                </div>

            </div>

        </div>

    );

}