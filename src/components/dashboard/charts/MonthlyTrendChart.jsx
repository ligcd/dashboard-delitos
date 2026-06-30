import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

import { getMonthlyTrend } from "../../../services/charts/chartData";

export default function MonthlyTrendChart({ records }) {

    const data = getMonthlyTrend(records);

    return (

        <div className="rounded-xl bg-white p-4 shadow">

            <h3 className="mb-4 font-bold text-[#032236]">
                Tendencia mensual
            </h3>

            <div className="h-72">

                <ResponsiveContainer width="100%" height="100%">

                    <BarChart data={data}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="month" />

                        <YAxis />

                        <Tooltip />

                        <Bar
                            dataKey="total"
                            fill="#E47021"
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}