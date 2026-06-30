export default function CrimeTable({ records }) {

    const map = {};

    for (const r of records) {
        if (!map[r.delito]) map[r.delito] = 0;
        map[r.delito] += Number(r.cantidad || 0);
    }

    const data = Object.entries(map)
        .sort((a, b) => b[1] - a[1]);

    return (
        <div>
            <h2>Delitos por tipo</h2>

            <table border="1">
                <thead>
                    <tr>
                        <th>Delito</th>
                        <th>Total</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map(([delito, total]) => (
                        <tr key={delito}>
                            <td>{delito}</td>
                            <td>{total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}