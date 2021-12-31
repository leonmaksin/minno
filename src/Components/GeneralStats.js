export default function GeneralStats(props) {
    return (
        <div className="general-stats flex-row">
            <div className="flex-col">
                <span className="title">Performance</span>
                <div style={{'height':'16px'}}></div>
                <span className="earnings earnings-primary">$115 Million AUM</span>
                <span className="earnings">+ $15,000,000 (15.0%)</span>
                <div style={{'height':'16px'}}></div>
                <img src="../images/stock-chart-template.png" alt="stock" className="stock-image"></img>
            </div>
            <div className="flex-col">
                <span className="title">Growth</span>
                <div className="growth-category">
                    <span>New Investors</span>
                    <div className="flex-row">
                        <img src="../images/plus-person.png" alt="plus-person" className="general-stats-icon"></img>
                        <span>3823</span>
                    </div>
                </div>
                <div className="growth-category">
                    <span>Votes</span>
                    <div className="flex-row">
                        <img src="../images/checkbox.png" alt="checkbox" className="general-stats-icon"></img>
                        <span>58395</span>
                    </div>
                </div>
                <div className="growth-category">
                    <span>Top Competitor</span>
                    <div className="flex-row">
                        <img src="../images/mountain.png" alt="mountain" className="general-stats-icon"></img>
                        <span>SOPA</span>
                    </div>
                </div>
                <div className="flex-row growth-selector">
                    <span>Day</span>
                    <span>Week</span>
                    <span>Month</span>
                </div>
            </div>
        </div>
    )
}
