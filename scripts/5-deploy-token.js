import sdk from "./1-initialize-sdk.js";

const app = sdk.getAppModule("0x7aD7DDa21790fF49277c78011854CEaa995D9bB1");

(async () => {
  try {
    const tokenModule = await app.deployTokenModule({
      name: "Minno Share Token",
      symbol: "MINNO",
    });
    console.log(
      "✅ Successfully deployed token module, address:",
      tokenModule.address,
    );
  } catch (error) {
    console.error("failed to deploy token module", error);
  }
})();