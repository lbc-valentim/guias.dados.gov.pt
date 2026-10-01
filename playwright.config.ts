import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  workers: 1,
  timeout: 30_000,
  reporter: "line",
  use: {
    baseURL: "http://127.0.0.1:4173",
    browserName: "chromium",
    headless: true,
  },
  webServer: {
    command: "python -m http.server 4173 --directory .build/site",
    url: "http://127.0.0.1:4173/guias.dados.gov.pt/Guias-do-utilizador/",
    reuseExistingServer: false,
    timeout: 15_000,
  },
});
