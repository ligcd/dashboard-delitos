export default function MunicipalityTable({ records }) {

    const map = {};

    for (const r of records) {
        if (!map[r.municipio]) map[r.municipio] = 0;
        map[r.municipio] += Number(r.cantidad || 0);
    }

    const data = Object.entries(map)
        .sort((a, b) => b[1] - a[1]);

    return (
        <div>
            <h2>Delitos por municipio</h2>

            <table border="1">
                <thead>
                    <tr>
                        <th>Municipio</th>
                        <th>Total</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map(([muni, total]) => (
                        <tr key={muni}>
                            <td>{muni}</td>
                            <td>{total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}