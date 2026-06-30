import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

import { getCumulativeTrend } from "../../../services/charts/chartData";

export default function CumulativeChart({ records }) {

    const data = getCumulativeTrend(records);

    return (

        <div className="rounded-xl bg-white p-4 shadow">

            <h3 className="mb-4 font-bold text-[#032236]">
                Acumulado
            </h3>

            <div className="h-72">

                <ResponsiveContainer width="100%" height="100%">

                    <LineChart data={data}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="date" />

                        <YAxis />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="total"
                            stroke="#0f172a"
                            strokeWidth={3}
                            dot={false}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}