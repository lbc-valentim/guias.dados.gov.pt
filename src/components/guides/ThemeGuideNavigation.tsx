import { loadContent } from "@/lib/content/repository";
import { routeForGuide, type GuideRoute } from "@/lib/content/routes";
import { withBasePath } from "@/lib/site";

export function ThemeGuideNavigation({ route }: { route: GuideRoute }) {
  if (!route.theme) return null;

  const content = loadContent();
  const guides = route.theme.guideIds.map(
    (id) => content.guides.find((guide) => guide.id === id)!,
  );

  return (
    <aside
      aria-label="Navegação dos guias"
      className="border-b border-[#dce5eb] bg-white px-0 pb-[24px] pt-[20px] min-[581px]:min-h-full min-[581px]:border-b-0 min-[581px]:border-r min-[581px]:bg-[#f4f7f9] min-[581px]:px-[20px] min-[581px]:pb-[40px] min-[581px]:pt-[32px]"
    >
      <nav aria-labelledby="escolher-guia">
        <h2
          id="escolher-guia"
          className="mb-[8px] block text-[12px] font-bold uppercase tracking-[0.08em] text-[#526779] min-[581px]:mx-[10px]"
        >
          Escolher guia
        </h2>
        <ul className="grid gap-[3px]">
          {guides.map((guide) => {
            const guideRoute = routeForGuide(content, guide.id);
            const isCurrentGuide = guide.id === route.guide?.id;
            const isCurrentPage = isCurrentGuide && route.kind === "guide";
            return (
              <li key={guide.id}>
                <a
                  href={withBasePath(guideRoute.path)}
                  aria-current={isCurrentPage ? "page" : undefined}
                  className={`block min-h-[44px] border-l-[3px] px-[11px] py-[10px] text-[13px] leading-[1.4] no-underline focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#005ce6] focus-visible:outline-offset-[3px] ${
                    isCurrentGuide
                      ? "border-[#005ce6] bg-[#e4eefc] font-bold text-[#004aaa]"
                      : "border-transparent text-[#243b50] hover:bg-[#eaf0f5]"
                  }`}
                >
                  {guide.title}
                  {isCurrentGuide && route.kind === "task" ? (
                    <span className="sr-only"> (guia actual)</span>
                  ) : null}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <a
        href={withBasePath("/Guias-do-utilizador/#explorar-tema")}
        className="mt-[8px] inline-flex min-h-[44px] items-center px-[10px] py-[13px] text-[13px] font-semibold text-[#005ce6] underline underline-offset-4 min-[581px]:mt-[22px]"
      >
        Ver todos os temas
      </a>
    </aside>
  );
}
