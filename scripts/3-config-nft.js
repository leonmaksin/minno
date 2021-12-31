import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0x596b5d2e3a3233dAcba3cd2676E8E5dB776dE729",
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Minno Membership Token",
        description: "Token for membership to Minno",
        image: readFileSync("scripts/assets/minno.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})()