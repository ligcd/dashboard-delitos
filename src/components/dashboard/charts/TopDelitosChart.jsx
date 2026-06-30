import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import { getTopDelitos } from "../../../services/charts/chartData";

export default function TopDelitosChart({ records }) {

    const data = getTopDelitos(records);

    return (

        <div className="rounded-xl bg-white p-4 shadow">

            <h3 className="mb-4 font-bold text-[#032236]">
                Top Delitos
            </h3>

            <div className="h-72">

                <ResponsiveContainer>

                    <BarChart data={data} layout="vertical">

                        <XAxis type="number" />

                        <YAxis dataKey="delito" type="category" />

                        <Tooltip />

                        <Bar dataKey="total" fill="#E47021" />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}