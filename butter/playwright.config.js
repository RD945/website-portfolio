import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testIgnore: "performance.spec.js",
  timeout: 60000,
  use: {
    baseURL: "http://127.0.0.1:5183",
    headless: true,
  },
  webServer: {
    command: "npm run dev -- --host 127.0.0.1 --port 5183",
    url: "http://127.0.0.1:5183",
    reuseExistingServer: false,
  },
  reporter: "list",
});
