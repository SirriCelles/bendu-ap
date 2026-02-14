import { config } from "dotenv";

function loadEnvFiles(): void {
  const isProduction = process.env.NODE_ENV === "production";

  if (!isProduction) {
    // Prefer local developer overrides first.
    config({ path: ".env.local", override: false });
  }

  // Keep base defaults available when local overrides are absent.
  config({ path: ".env", override: false });
}

loadEnvFiles();
