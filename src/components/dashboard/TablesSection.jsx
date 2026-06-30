import Card from "../layout/Card";

import MunicipalityTable from "./tables/MunicipalityTable";
import CrimeTable from "./tables/CrimeTable";

export default function TablesSection({

    records

}) {

    return (

        <div className="grid gap-6 lg:grid-cols-2">

            <Card>

                <MunicipalityTable

                    records={records}

                />

            </Card>

            <Card>

                <CrimeTable

                    records={records}

                />

            </Card>

        </div>

    );

}