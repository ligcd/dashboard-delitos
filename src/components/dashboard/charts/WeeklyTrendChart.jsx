import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

import { getWeeklyTrend } from  "../../../services/charts/chartData";

export default function WeeklyTrendChart({ records }) {

    const data = getWeeklyTrend(records);

    return (

        <div className="rounded-xl bg-white p-4 shadow">

            <h3 className="mb-4 font-bold text-[#032236]">
                Tendencia semanal
            </h3>

            <div className="h-72">

                <ResponsiveContainer width="100%" height="100%">

                    <LineChart data={data}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="week" />

                        <YAxis />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="total"
                            stroke="#032236"
                            strokeWidth={3}
                            dot={false}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}