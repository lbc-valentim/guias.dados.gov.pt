import { expect, test } from "@playwright/test";

const prefix = "/guias.dados.gov.pt";
const routes = [
  ["entrada", "/Guias-do-utilizador/"],
  ["tema", "/Guias-do-utilizador/Encontrar-consultar-e-explorar-dados/"],
  ["guia", "/Guias-do-utilizador/Encontrar-consultar-e-explorar-dados/Encontrar-e-consultar-dados/"],
  ["tarefa", "/Guias-do-utilizador/Encontrar-consultar-e-explorar-dados/Encontrar-e-consultar-dados/Aceder-aos-dados/"],
] as const;

const viewports = [
  { name: "mobile", width: 360, height: 800 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 },
] as const;

for (const [routeName, route] of routes) {
  for (const viewport of viewports) {
    test(`contrato UX: ${routeName} em ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      const response = await page.goto(`${prefix}${route}`);
      expect(response?.ok()).toBeTruthy();
      await page.waitForLoadState("networkidle");

      await expect(page.locator("main#conteudo")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.getByRole("banner")).toBeVisible();
      await expect(page.locator('footer[aria-label="Rodapé do portal"]')).toBeVisible();

      const geometry = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.clientWidth);
    });
  }
}

test("entrada mantém pesquisa funcional", async ({ page }) => {
  await page.goto(`${prefix}/Guias-do-utilizador/`);
  const search = page.getByRole("searchbox", { name: "Pesquisar nos guias" });
  await expect(search).toBeVisible();
  await search.fill("publicar dados");
  await expect(page.getByRole("status")).toContainText(/resultado/);
});

test("tema, guia e tarefa mantêm contexto hierárquico", async ({ page }) => {
  for (const [, route] of routes.slice(1)) {
    await page.goto(`${prefix}${route}`);
    await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toBeVisible();
  }
});


test("raiz apresenta directamente a experiência dos Guias", async ({ page }) => {
  await page.goto(`${prefix}/`);
  await expect(page.getByRole("heading", { level: 1, name: "Como podemos ajudar?" })).toBeVisible();
  await expect(page.getByRole("searchbox", { name: "Pesquisar nos guias" })).toBeVisible();
  await expect(page.getByText("Abrir os Guias", { exact: true })).toHaveCount(0);
  const canonical = page.locator('link[rel="canonical"]');
  await expect(canonical).toHaveAttribute("href", /\/Guias-do-utilizador\/$/);
});

test("tema, guia e tarefa expõem navegação Escolher guia com contexto correcto", async ({ page }) => {
  const cases = [
    [routes[1][1], 0],
    [routes[2][1], 1],
    [routes[3][1], 0],
  ] as const;
  for (const [route, expectedCurrent] of cases) {
    await page.goto(`${prefix}${route}`);
    const nav = page.getByRole("navigation", { name: "Escolher guia" });
    await expect(nav).toBeVisible();
    await expect(nav.locator("a")).toHaveCount(2);
    await expect(nav.locator('a[aria-current="page"]')).toHaveCount(expectedCurrent);
  }
});

test("B4 preserva hierarquia e recursos de tema, guia e tarefa", async ({ page }) => {
  await page.goto(`${prefix}${routes[1][1]}`);
  await expect(page.getByRole("heading", { level: 2, name: "Guias deste tema" })).toBeVisible();
  await expect(page.getByText("2 guias", { exact: true })).toBeVisible();

  await page.goto(`${prefix}${routes[2][1]}`);
  await expect(page.getByRole("heading", { level: 2, name: "O que pretende fazer?" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Descarregar este guia em PDF" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Guias relacionados" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Recursos úteis" })).toBeVisible();

  await page.goto(`${prefix}${routes[3][1]}`);
  await expect(page.getByRole("heading", { level: 2, name: "Como fazer" })).toBeVisible();
  const taskNav = page.getByRole("navigation", { name: "Navegação da tarefa" });
  await expect(taskNav).toBeVisible();
  await expect(taskNav.locator("a")).toHaveCount(2);
});


test("entrada expõe descoberta directa dos 15 guias", async ({ page }) => {
  await page.goto(`${prefix}/Guias-do-utilizador/`);
  const discovery = page.locator('section[aria-labelledby="descobrir-guias"]');
  await expect(discovery.getByRole("heading", { level: 2, name: "Descobrir os guias" })).toBeVisible();
  await expect(discovery.getByRole("heading", { level: 3 })).toHaveCount(7);
  await expect(discovery.getByRole("link", { name: /^Abrir:/ })).toHaveCount(15);
});
