import Header from '../Components/Header.js';
import GeneralStats from '../Components/GeneralStats.js';
import Positions from '../Components/Positions';
import mintToken from '../App.js';

export default function LandingPage(props) {
return(
<div className="landing-page">
    <div className="flex-row">
      <Header />
    </div>
    <div className="flex-row">
      <div style={{'width':'104px'}}></div>
      <div className="flex-col landing-text">
        <p className="title">Minno</p>
        <div style={{'height':'20px'}}></div>
        <p className="title-subtext">Strength in numbers</p>
        <div style={{'height':'20px'}}></div>
        <p className="title-subtext">Mint a membership token to join the shoal, buy $MINNO to gain
        voting power and choose stocks for the portfolio</p>
        <div style={{'height':'35px'}}></div>
        <button className="clickable"
          disabled={props.isClaiming}
          onClick={() => mintToken()}
        >
          {props.isClaiming ? "Minting..." : "Mint your token"}
        </button>
      </div>
      <div style={{'width':'76px'}}></div>
      <div className="flex-row">
        <GeneralStats />
      </div>
      <div style={{'width':'48px'}}></div>
      <div className="flex-row">
        <Positions />
      </div>
    </div>
</div>
);}