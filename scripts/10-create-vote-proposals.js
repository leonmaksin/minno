import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// Our voting contract.
const voteModule = sdk.getVoteModule(
  "0x1002F57556b9806B89B107D0E1F0FCba9549c4aB",
);

// Our ERC-20 contract.
const tokenModule = sdk.getTokenModule(
  "0xdd1E45B55106Cf70Aa9B2320E4209C6bad1Ac5Ea",
);

(async () => {
  try {
    const amount = 100_000;
    // Create proposal to mint 100,000 new token to the treasury.
    await voteModule.propose(
      "Should Minno mint an additional " + amount + " tokens into the treasury?",
      [
        {
          // Our nativeToken is ETH. nativeTokenValue is the amount of ETH we want
          // to send in this proposal. In this case, we're sending 0 ETH.
          // We're just minting new tokens to the treasury. So, set to 0.
          nativeTokenValue: 0,
          transactionData: tokenModule.contract.interface.encodeFunctionData(
            // We're doing a mint! And, we're minting to the voteModule, which is
            // acting as our treasury.
            "mint",
            [
              voteModule.address,
              ethers.utils.parseUnits(amount.toString(), 18),
            ]
          ),
          // Our token module that actually executes the mint.
          toAddress: tokenModule.address,
        },
      ]
    );

    console.log("✅ Successfully created proposal to mint tokens");
  } catch (error) {
    console.error("failed to create first proposal", error);
    process.exit(1);
  }

  try {
    const amount = 1_000;
    // Create proposal to transfer ourselves 1,000 tokens.
    await voteModule.propose(
      "Should Minno transfer " +
      amount + " tokens from the treasury to " +
      process.env.WALLET_ADDRESS + "?",
      [
        {
          // Again, we're sending ourselves 0 ETH. Just sending our own token.
          nativeTokenValue: 0,
          transactionData: tokenModule.contract.interface.encodeFunctionData(
            // We're doing a transfer from the treasury to our wallet.
            "transfer",
            [
              process.env.WALLET_ADDRESS,
              ethers.utils.parseUnits(amount.toString(), 18),
            ]
          ),

          toAddress: tokenModule.address,
        },
      ]
    );

    console.log(
      "✅ Successfully created proposal to reward ourselves from the treasury"
    );
  } catch (error) {
    console.error("failed to create second proposal", error);
  }

  try {
    const amount = 10_000;
    // Create proposal to invest 10,000 tokens in Apple.
    await voteModule.propose(
      "Should Minno invest " +
      amount + " in Apple?",
      [
        {
          // Again, we're sending ourselves 0 ETH. Just sending our own token.
          nativeTokenValue: 0,
          transactionData: tokenModule.contract.interface.encodeFunctionData(
            // We're doing a transfer from the treasury to our wallet.
            "transfer",
            [
              process.env.WALLET_ADDRESS,
              ethers.utils.parseUnits(amount.toString(), 18),
            ]
          ),

          toAddress: tokenModule.address,
        },
      ]
    );

    console.log(
      "✅ Successfully created proposal to invest in Apple (currently goes to me)"
    );
  } catch (error) {
    console.error("failed to create second proposal", error);
  }
})();