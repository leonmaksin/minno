export default function GeneralStats(props) {
    console.log(props)
    return (
        <div className="flex-row vote-bar">
            <img src="../images/thumb-down.png" alt="thumb-down" className="vote-image clickable"></img>
            <span style={{'color':'#AC0712'}}>Pass</span>
            <div style={{'width':'200px'}}></div>
            <img src="../images/thumb-up.png" alt="thumb-up" className="vote-image clickable"></img>
            <span style={{'color':'#00863F'}}>Vote</span>
        </div>
    )
}
