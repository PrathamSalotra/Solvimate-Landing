import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

// Import dynamically after env is loaded to prevent hoisted import execution from failing
async function run() {
  try {
    const dbConnect = (await import("../src/lib/mongodb")).default;
    const Admin = (await import("../src/models/Admin")).default;
    const AdminLoginChallenge = (await import("../src/models/AdminLoginChallenge")).default;
    const Certificate = (await import("../src/models/Certificate")).default;

    console.log("Connecting to DB...");
    const conn = await dbConnect();
    console.log(`Connected to MongoDB: ${conn.connection.host}`);
    
    // Just verify models are registered
    console.log("Registered models:", Object.keys(conn.models));
    
    // Quick count to verify query works
    const adminCount = await Admin.countDocuments();
    console.log(`Found ${adminCount} admins in database.`);
    
    process.exit(0);
  } catch (error) {
    console.error("DB connection error:", error);
    process.exit(1);
  }
}

run();
