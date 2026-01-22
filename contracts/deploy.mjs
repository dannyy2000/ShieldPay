import {
  Account,
  ProgramManager,
  AleoKeyProvider,
  AleoNetworkClient,
  NetworkRecordProvider,
} from "@provablehq/sdk";
import fs from "fs";

const PRIVATE_KEY = "APrivateKey1zkp7Pxt42wg1Wc2ymfKa4m7qwo1sswFpXnVS3scSUeQwRe2";
const ENDPOINT = "https://api.explorer.provable.com/v1";

async function deploy() {
  console.log("Starting deployment...");

  // Read the compiled program
  const program = fs.readFileSync("./build/main.aleo", "utf8");
  console.log("Program loaded, length:", program.length);

  // Setup providers
  const keyProvider = new AleoKeyProvider();
  keyProvider.useCache(true);

  const networkClient = new AleoNetworkClient(ENDPOINT);

  // Create account from private key
  const account = new Account({ privateKey: PRIVATE_KEY });
  console.log("Account address:", account.address().to_string());

  const recordProvider = new NetworkRecordProvider(account, networkClient);

  // Initialize program manager
  const programManager = new ProgramManager(ENDPOINT, keyProvider, recordProvider);
  programManager.setAccount(account);

  // Deploy with fee (17 credits needed)
  const fee = 17.5;

  console.log("Deploying program with fee:", fee, "credits...");

  try {
    const tx_id = await programManager.deploy(program, fee);
    console.log("Deployment transaction ID:", tx_id);
    return tx_id;
  } catch (error) {
    console.error("Deployment failed:", error.message);
    throw error;
  }
}

deploy()
  .then((txId) => console.log("Success! TX:", txId))
  .catch((err) => console.error("Failed:", err));
