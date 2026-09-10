import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

async function run() {
  try {
    const dbConnect = (await import("../src/lib/mongodb")).default;
    const { getDashboardOverview } = await import("../src/services/dashboard.service");

    console.log("Connecting to MongoDB...");
    await dbConnect();

    console.log("Fetching dashboard overview...");
    const overview = await getDashboardOverview();

    console.log("=== Dashboard Overview ===");
    console.log(JSON.stringify(overview, null, 2));
    
    process.exit(0);
  } catch (error) {
    console.error("Test failed:", error);
    process.exit(1);
  }
}

run();
