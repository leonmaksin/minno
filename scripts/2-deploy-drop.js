import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const app = sdk.getAppModule("0x7aD7DDa21790fF49277c78011854CEaa995D9bB1");

(async () => {
  try {
    const bundleDropModule = await app.deployBundleDropModule({
      name: "Minno Membership",
      description: "Own the market",
      image: readFileSync("scripts/assets/minno.png"),
      // set this our wallet address if we want to charge for minno membership token
      primarySaleRecipientAddress: ethers.constants.AddressZero,
    });
    
    console.log(
      "✅ Successfully deployed bundleDrop module, address:",
      bundleDropModule.address,
    );
    console.log(
      "✅ bundleDrop metadata:",
      await bundleDropModule.getMetadata(),
    );
  } catch (error) {
    console.log("failed to deploy bundleDrop module", error);
  }
})()