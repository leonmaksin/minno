import sdk from "./1-initialize-sdk.js";

// Grab the app module address.
const appModule = sdk.getAppModule(
  "0x7aD7DDa21790fF49277c78011854CEaa995D9bB1",
);

(async () => {
  try {
    const voteModule = await appModule.deployVoteModule({
      name: "Minno Weekly Stock Picks",

      votingTokenAddress: "0xdd1E45B55106Cf70Aa9B2320E4209C6bad1Ac5Ea",

      // After a proposal is created, when can members start voting?
      proposalStartWaitTimeInSeconds: 0,
      // How long do members have to vote on a proposal when it's created?
      // Here, we set it to 7 days (7*86400 seconds)
      proposalVotingTimeInSeconds: 7 * 24 * 60 * 60,
      // Will explain more below.
      votingQuorumFraction: 0,

      // What's the minimum # of tokens a user needs to be allowed to create a proposal? Keep 0 for now !!potentially change
      minimumNumberOfTokensNeededToPropose: "0",
    });

    console.log(
      "✅ Successfully deployed vote module, address:",
      voteModule.address,
    );
  } catch (err) {
    console.error("Failed to deploy vote module", err);
  }
})();