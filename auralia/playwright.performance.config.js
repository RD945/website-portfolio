import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "performance.spec.js",
  timeout: 120_000,
  workers: 1,
  fullyParallel: false,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4175",
    headless: true,
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run build && npm run preview:worker -- --port 4175 --local",
    url: "http://127.0.0.1:4175",
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
