import '../App.css';
import { useEffect, useMemo, useState } from "react";
import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { ethers } from "ethers";
import { UnsupportedChainIdError } from "@web3-react/core";
import Header from '../Components/Header.js';
import GeneralStats from '../Components/GeneralStats.js';
import Positions from '../Components/Positions';
import Challengers from '../Components/Challengers';
import CompanyStats from '../Components/CompanyStats';
import Vote from '../Components/Vote';

const sdk = new ThirdwebSDK("rinkeby");
const bundleDropModule = sdk.getBundleDropModule(
  "0x596b5d2e3a3233dAcba3cd2676E8E5dB776dE729",
);
const tokenModule = sdk.getTokenModule(
  "0xdd1E45B55106Cf70Aa9B2320E4209C6bad1Ac5Ea"
);
const voteModule = sdk.getVoteModule(
  "0x1002F57556b9806B89B107D0E1F0FCba9549c4aB",
);

const App = () => {
  const { connectWallet, address, error, provider } = useWeb3();
  console.log("👋 Address:", address)
  const signer = provider ? provider.getSigner() : undefined;
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [memberTokenAmounts, setMemberTokenAmounts] = useState({});
  const [memberAddresses, setMemberAddresses] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const shortenAddress = (str) => {
    return str.substring(0, 6) + "..." + str.substring(str.length - 4);
  };

  // This useEffect grabs all the addresses of our members holding our NFT.
  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }
    
    bundleDropModule
      .getAllClaimerAddresses("0")
      .then((addresess) => {
        console.log("🚀 Members addresses", addresess)
        setMemberAddresses(addresess);
      })
      .catch((err) => {
        console.error("failed to get member list", err);
      });
  }, [hasClaimedNFT]);

  // This useEffect grabs the # of token each member holds.
  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    // Grab all the balances.
    tokenModule
      .getAllHolderBalances()
      .then((amounts) => {
        console.log("👜 Amounts", amounts)
        setMemberTokenAmounts(amounts);
      })
      .catch((err) => {
        console.error("failed to get token amounts", err);
      });
  }, [hasClaimedNFT]);

  // Now, we combine the memberAddresses and memberTokenAmounts into a single array
  const memberList = useMemo(() => {
    return memberAddresses.map((address) => {
      return {
        address,
        tokenAmount: ethers.utils.formatUnits(
          // If the address isn't in memberTokenAmounts, it means they don't
          // hold any of our token.
          memberTokenAmounts[address] || 0,
          18,
        ),
      };
    });
  }, [memberAddresses, memberTokenAmounts]);

  useEffect(() => {
    sdk.setProviderOrSigner(signer);
  }, [signer]);

  useEffect(() => {
    // If they don't have an connected wallet, exit!
    if (!address) {
      return;
    }
    
    // Check if the user has the NFT by using bundleDropModule.balanceOf
    return bundleDropModule
      .balanceOf(address, "0")
      .then((balance) => {
        // If balance is greater than 0, they have our NFT!
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
          console.log("🌟 this user has a membership NFT!")
        } else {
          setHasClaimedNFT(false);
          console.log("😭 this user doesn't have a membership NFT.")
        }
      })
      .catch((error) => {
        setHasClaimedNFT(false);
        console.error("failed to nft balance", error);
      });
  }, [address]);

  // Retrieve all our existing proposals from the contract.
  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }
    // A simple call to voteModule.getAll() to grab the proposals.
    voteModule
      .getAll()
      .then((proposals) => {
        setProposals(proposals);
        console.log("🌈 Proposals:", proposals)
      })
      .catch((err) => {
        console.error("failed to get proposals", err);
      });
  }, [hasClaimedNFT]);

  // Check if the user already voted.
  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    // Wait until retrieving proposals from the useEffect above
    if (!proposals.length) {
      return;
    }

    // Check if the user has already voted on the first proposal.
    voteModule
      .hasVoted(proposals[0].proposalId, address)
      .then((hasVoted) => {
        setHasVoted(hasVoted);
        if (hasVoted) {
          console.log("🥵 User has already voted")
        }
      })
      .catch((err) => {
        console.error("failed to check if wallet has voted", err);
      });
  }, [hasClaimedNFT, proposals, address]);

  if (error instanceof UnsupportedChainIdError ) {
    return (
      <div className="unsupported-network">
        <h2>Please connect to Rinkeby</h2>
        <p>
          This dapp only works on the Rinkeby network, please switch networks
          in your connected wallet.
        </p>
      </div>
    );
  }

  const mintToken = () => {
    if (hasClaimedNFT) {
      console.log("🎉 You already have a token!");
      return;
    }
    setIsClaiming(true);
    // Call bundleDropModule.claim("0", 1) to mint nft to user's wallet.
    bundleDropModule
    .claim("0", 1)
    .then(() => {
      setHasClaimedNFT(true);
      console.log(
        `🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${bundleDropModule.address}/0`
      );
    })
    .catch((err) => {
      console.error("failed to claim", err);
    })
    .finally(() => {
      setIsClaiming(false);
    });
  }

  // This is the case where the user hasn't connected their wallet
  if (!address) {
    return (
      <div className="login-page">
        <p className="login-header">Swim with the sharks</p>
        <div style={{'height':'32px'}}></div>
        <div className="fillbox clickable" onClick={ () => connectWallet("injected") }>
          <img src="./images/metamask.png" alt="metamask logo" className="fillbox-img"></img>
          <p>Continue with metamask</p>
        </div>
        <div style={{'height':'60px'}}><p className="login-gray mt-30">or</p></div>
        <div className="fillbox">
          <input className="fillbox-input" placeholder="Email"/>
        </div>
        <div style={{'height':'16px'}}></div>
        <div className="fillbox">
          <input className="fillbox-input" placeholder="Password"/>
        </div>
        <div style={{'height':'16px'}}></div>
        <div className="fillbox login clickable" onClick={ () => alert("🛠 We are still building this feature...\n🦊 Please log in with metamask...") }>
          Login
        </div>
      </div>
    );
  }

  if (hasClaimedNFT) {
    return (
      <div className="main-page">
        <div className="flex-col">
          <div className="flex-row">
            <Header selected="vote" />
          </div>
          <div className="flex-row">
            <div style={{'width':'104px'}}></div>
            <div className="flex-row">
              <Challengers />
            </div>
            <div style={{'width':'76px'}}></div>
            <div className="flex-col">
              <input className="search-stocks"></input>
              <CompanyStats />
              <Vote className="flex-row" />
            </div>
          </div>
          <div style={{'height':'40px'}}></div>
          <div className="flex-row">
            <div style={{'width':'104px'}}></div>
            <GeneralStats />
            <div style={{'width':'32px'}}></div>
            <div className="flex-right">
              <Positions />
            </div>
          </div>
          <div style={{'height':'64px'}}></div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="landing-page">
      <div className="flex-row">
        <Header selected="home" />
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
            disabled={isClaiming}
            onClick={() => mintToken()}
          >
            {isClaiming ? "Minting..." : "Mint your token"}
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
  );
};

export default App;




      // <div className="member-page">
      //   <div>
      //     <div>
      //       <h2>Member List</h2>
      //       <table className="card">
      //         <thead>
      //           <tr>
      //             <th>Address</th>
      //             <th>Token Amount</th>
      //           </tr>
      //         </thead>
      //         <tbody>
      //           {memberList.map((member) => {
      //             return (
      //               <tr key={member.address}>
      //                 <td>{shortenAddress(member.address)}</td>
      //                 <td>{member.tokenAmount}</td>
      //               </tr>
      //             );
      //           })}
      //         </tbody>
      //       </table>
      //     </div>
      //     <div>
      //       <h2>Active Proposals</h2>
      //       <form
      //         onSubmit={async (e) => {
      //           e.preventDefault();
      //           e.stopPropagation();
      //           setIsVoting(true);
      //           const votes = proposals.map((proposal) => {
      //             let voteResult = {
      //               proposalId: proposal.proposalId,
      //               vote: 2,
      //             };
      //             proposal.votes.forEach((vote) => {
      //               const elem = document.getElementById(
      //                 proposal.proposalId + "-" + vote.type
      //               );

      //               if (elem.checked) {
      //                 voteResult.vote = vote.type;
      //                 return;
      //               }
      //             });
      //             return voteResult;
      //           });

      //           try {
      //             const delegation = await tokenModule.getDelegationOf(address);
      //             if (delegation === ethers.constants.AddressZero) {
      //               await tokenModule.delegateTo(address);
      //             }
      //             try {
      //               await Promise.all(
      //                 votes.map(async (vote) => {
      //                   const proposal = await voteModule.get(vote.proposalId);
      //                   // check if the proposal is open for voting (state === 1 means it is open)
      //                   if (proposal.state === 1) {
      //                     return voteModule.vote(vote.proposalId, vote.vote);
      //                   }
      //                   return;
      //                 })
      //               );
      //               try {
      //                 // if any of the propsals are ready to be executed we'll need to execute them
      //                 // a proposal is ready to be executed if it is in state 4
      //                 await Promise.all(
      //                   votes.map(async (vote) => {
      //                     // we'll first get the latest state of the proposal again, since we may have just voted before
      //                     const proposal = await voteModule.get(
      //                       vote.proposalId
      //                     );

      //                     //if the state is in state 4 (meaning that it is ready to be executed), we'll execute the proposal
      //                     if (proposal.state === 4) {
      //                       return voteModule.execute(vote.proposalId);
      //                     }
      //                   })
      //                 );
      //                 // if we get here that means we successfully voted, so let's set the "hasVoted" state to true
      //                 setHasVoted(true);
      //                 // and log out a success message
      //                 console.log("successfully voted");
      //               } catch (err) {
      //                 console.error("failed to execute votes", err);
      //               }
      //             } catch (err) {
      //               console.error("failed to vote", err);
      //             }
      //           } catch (err) {
      //             console.error("failed to delegate tokens");
      //           } finally {
      //             // in *either* case we need to set the isVoting state to false to enable the button again
      //             setIsVoting(false);
      //           }
      //         }}
      //       >
      //         {proposals.map((proposal, index) => (
      //           <div key={proposal.proposalId} className="card">
      //             <h5>{proposal.description}</h5>
      //             <div>
      //               {proposal.votes.map((vote) => (
      //                 <div key={vote.type}>
      //                   <input
      //                     type="radio"
      //                     id={proposal.proposalId + "-" + vote.type}
      //                     name={proposal.proposalId}
      //                     value={vote.type}
      //                     //default the "abstain" vote to chedked
      //                     defaultChecked={vote.type === 2}
      //                   />
      //                   <label htmlFor={proposal.proposalId + "-" + vote.type}>
      //                     {vote.label}
      //                   </label>
      //                 </div>
      //               ))}
      //             </div>
      //           </div>
      //         ))}
      //         <button disabled={isVoting || hasVoted} type="submit">
      //           {isVoting
      //             ? "Voting..."
      //             : hasVoted
      //               ? "You Already Voted"
      //               : "Submit Votes"}
      //         </button>
      //         <small>
      //           This will trigger multiple transactions that you will need to
      //           sign.
      //         </small>
      //       </form>
      //     </div>
      //   </div>
      // </div>