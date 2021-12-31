export default function Positions(props) {
    const stockArray = [
        [1005.50,70.34,7.49,'TSLA',19933],
        [1005.50,70.34,7.49,'TSLA',19933],
        [1005.50,70.34,7.49,'TSLA',19933],
        [1005.50,70.34,7.49,'TSLA',19933],
        [1005.50,70.34,7.49,'TSLA',19933],
        [1005.50,70.34,7.49,'TSLA',19933],
    ]
    const positionsTable = stockArray.map((stock) => {
        return <tr className="positions-row">
            <td className="flex-col" style={{'color':'#00863f'}}>
                <span style={{'font-size':'18px'}}>{stock[0].toFixed(2)}</span>
                <span style={{'font-size':'10px'}}>+ {stock[1]} ({stock[2]}%)</span>
            </td>
            <td style={{'font-size':'20px'}}>{stock[3]}</td>
            <td style={{'font-size':'18px','color':'#007e86'}}>{stock[4]}</td>
        </tr>
    })
    return (
        <div className="positions flex-row">
            <div className="flex-col">
                <span className="title">Positions</span>
                <div style={{'height':'16px'}}></div>
                <table className="positions-table">
                    <tr className="tr-border-bottom">
                        <th><img src="../images/mountain-green.png" alt="mountain"></img></th>
                        <th>Ticker</th>
                        <th><img src="../images/minno.png" alt="minno"></img></th>
                    </tr>
                    { positionsTable }
                    <tr className="growth-selector">
                        <td><span>Day</span></td>
                        <td><span>Week</span></td>
                        <td><span>Month</span></td>
                    </tr>
                </table>
            </div>
        </div>
    )
}
