import DailyTrendChart from "./DailyTrendChart";
import WeeklyTrendChart from "./WeeklyTrendChart";
import MonthlyTrendChart from "./MonthlyTrendChart";
import CumulativeChart from "./CumulativeChart";
import TopMunicipiosChart from "./TopMunicipiosChart";
import TopDelitosChart from "./TopDelitosChart";
import RegionPieChart from "./RegionPieChart";

export default function ChartsDashboard({ records }) {

    return (

        <div className="grid gap-6 lg:grid-cols-2">

            <DailyTrendChart records={records} />
            <WeeklyTrendChart records={records} />

            <MonthlyTrendChart records={records} />
            <CumulativeChart records={records} />

            <TopMunicipiosChart records={records} />
            <TopDelitosChart records={records} />

            <RegionPieChart records={records} />

        </div>

    );

}