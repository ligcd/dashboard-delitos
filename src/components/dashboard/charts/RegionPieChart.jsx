import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import { getRegionDistribution } from "../../../services/charts/chartData";

const COLORS = ["#032236", "#E47021", "#94a3b8", "#0f172a", "#f97316"];

export default function RegionPieChart({ records }) {

    const data = getRegionDistribution(records);

    return (

        <div className="rounded-xl bg-white p-4 shadow">

            <h3 className="mb-4 font-bold text-[#032236]">
                Distribución por región
            </h3>

            <div className="h-72">

                <ResponsiveContainer>

                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="total"
                            nameKey="region"
                            outerRadius={100}
                            label
                        >

                            {data.map((_, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}

                        </Pie>

                        <Tooltip />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}