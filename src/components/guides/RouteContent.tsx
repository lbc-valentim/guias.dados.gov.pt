import { GuideSearch } from "@/components/guides/GuideSearch";
import { GuidesBreadcrumb } from "@/components/guides/GuidesBreadcrumb";
import { ThemeGuideNavigation } from "@/components/guides/ThemeGuideNavigation";
import { loadContent } from "@/lib/content/repository";
import { getGuidePublicationStatus } from "@/lib/content/publication-status";
import {
  routeForGuide,
  routeForTask,
  type GuideRoute,
} from "@/lib/content/routes";
import type { SearchItem } from "@/lib/content/search";
import { withBasePath } from "@/lib/site";

function guideCardDescription(guide: { id: string; intro: string }): string {
  const status = getGuidePublicationStatus(guide.id);
  return status ? `${status.label}. ${guide.intro}` : guide.intro;
}

function CompactGuideCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <a href={href} className="group flex min-h-[118px] items-start justify-between gap-[18px] rounded-[6px] border border-[#dce5eb] bg-white p-[20px] text-inherit no-underline hover:border-[#005ce6] hover:bg-[#f7faff]">
      <span className="min-w-0">
        <strong className="mb-[6px] block text-[15px] font-bold leading-[1.4] text-[#103454]">{title}</strong>
        <span className="block text-[12px] leading-[1.5] text-[#526779]">{description}</span>
      </span>
      <span aria-hidden="true" className="shrink-0 text-[20px] leading-none text-[#005ce6]">→</span>
    </a>
  );
}

function TaskChoiceCard({ index, title, description, href }: { index: number; title: string; description: string; href: string }) {
  return (
    <a href={href} className="flex min-h-[108px] gap-[13px] rounded-[6px] border border-[#dce5eb] bg-white px-[18px] py-[20px] text-inherit no-underline hover:border-[#005ce6] hover:bg-[#f7faff]">
      <span aria-hidden="true" className="flex h-[29px] w-[29px] shrink-0 items-center justify-center rounded-full bg-[#eaf1fd] text-[12px] font-bold text-[#005ce6]">{String(index + 1).padStart(2, "0")}</span>
      <span className="min-w-0"><strong className="mb-[6px] block text-[14px] font-bold leading-[1.4] text-[#103454]">{title}</strong><span className="block text-[12px] leading-[1.4] text-[#526779]">{description}</span></span>
    </a>
  );
}

function GuidePublicationNotice({ guideId }: { guideId: string }) {
  const status = getGuidePublicationStatus(guideId);
  if (!status) return null;

  return (
    <aside
      className="my-24 rounded border border-l-4 border-primary-500 p-16"
      aria-labelledby={`guide-publication-status-${guideId}`}
    >
      <h2 id={`guide-publication-status-${guideId}`} className="text-l-semibold mb-8">
        {status.label}
      </h2>
      <p>{status.message}</p>
    </aside>
  );
}

function ContentBreadcrumb({ route }: { route: GuideRoute }) {
  const parts = ["Guias do utilizador"];
  if (route.theme) parts.push(route.theme.title);
  if (route.guide) parts.push(route.guide.title);
  if (route.kind === "task" && route.task && route.guide) {
    const index = route.guide.fichas.findIndex((item) => item.id === route.task?.id);
    parts.push(`Ficha ${Math.max(index, 0) + 1} de ${route.guide.fichas.length}`);
  }
  return (
    <p className="mb-[28px] text-[12px] leading-[1.5] text-[#526779] max-[580px]:mb-[18px]">
      {parts.join(" / ")}
    </p>
  );
}

function TaskNavigation({ route }: { route: GuideRoute }) {
  if (!route.guide || !route.task) return null;
  const content = loadContent();
  const overview = routeForGuide(content, route.guide.id);
  const ref = route.task.nextRef;
  const next =
    ref.type === "task"
      ? routeForTask(content, ref.id)
      : routeForGuide(content, ref.id);

  return (
    <nav
      aria-label="Navegação da tarefa"
      className="mt-[30px] flex flex-col gap-[12px] border-t border-[#dce5eb] pt-[20px] min-[581px]:flex-row min-[581px]:items-center min-[581px]:justify-between"
    >
      <a className="inline-flex min-h-[44px] items-center text-[13px] text-[#005ce6] underline underline-offset-[4px]" href={withBasePath(overview.path)}>
        Visão geral do guia
      </a>
      <a className="inline-flex min-h-[44px] items-center justify-center rounded-[5px] bg-[#005ce6] px-[18px] py-[12px] text-[13px] font-bold text-white no-underline min-[581px]:text-right" href={withBasePath(next.path)}>
        {next.title} →
      </a>
    </nav>
  );
}

export function RouteContent({ route, searchItems }: { route: GuideRoute; searchItems: SearchItem[] }) {
  const content = loadContent();

  if (route.kind === "theme" && route.theme) {
    const guides = route.theme.guideIds.map((id) => content.guides.find((guide) => guide.id === id)!);
    return (
      <>
        <GuidesBreadcrumb />
        <GuideSearch items={searchItems} />
        <div className="grid gap-0 border-x border-[#dce5eb] min-[581px]:grid-cols-[224px_minmax(0,1fr)] min-[801px]:grid-cols-[264px_minmax(0,1fr)] max-[800px]:mx-[8px] max-[580px]:mx-[16px] max-[580px]:border-x-0">
          <ThemeGuideNavigation route={route} />
          <div className="min-w-0 px-0 pb-[40px] pt-[28px] min-[581px]:px-[32px] min-[581px]:py-[32px] min-[801px]:px-[48px] min-[801px]:pb-[56px] min-[801px]:pt-[40px]">
            <header className="mb-[32px] max-w-[760px]">
              <ContentBreadcrumb route={route} />
              <p className="mb-[8px] text-[11px] font-bold uppercase tracking-[0.12em] leading-[1.4] text-[#006a4c]">Tema</p>
              <h1 className="mb-[16px] text-[32px] font-bold leading-[1.2] tracking-[-0.7px] text-[#103454] max-[800px]:text-[27px] max-[580px]:text-[26px]">{route.theme.title}</h1>
              <p className="max-w-[760px] text-[17px] leading-[1.55] text-[#526779] max-[580px]:text-[16px]">{route.theme.intro}</p>
            </header>
            <section aria-labelledby="guias-do-tema">
              <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
                <h2 id="guias-do-tema" className="text-[20px] font-bold leading-[1.3] text-[#103454]">Guias deste tema</h2>
                <p className="text-s-regular text-gray-medium">{guides.length} {guides.length === 1 ? "guia" : "guias"}</p>
              </div>
              <div className="grid gap-[12px] min-[1000px]:grid-cols-2">
                {guides.map((guide) => {
                  const guideRoute = routeForGuide(content, guide.id);
                  return <CompactGuideCard key={guide.id} title={guide.title} description={guideCardDescription(guide)} href={withBasePath(guideRoute.path)} />;
                })}
              </div>
            </section>
          </div>
        </div>
      </>
    );
  }

  if (route.kind === "guide" && route.guide) {
    const guide = route.guide;
    const related = guide.relatedGuideIds.map((id) => content.guides.find((item) => item.id === id)!).filter(Boolean);
    const pdfName = `${guide.slug.toLocaleLowerCase("pt-PT")}.pdf`;

    return (
      <>
        <GuidesBreadcrumb />
        <GuideSearch items={searchItems} />
        <div className="grid gap-0 border-x border-[#dce5eb] min-[581px]:grid-cols-[224px_minmax(0,1fr)] min-[801px]:grid-cols-[264px_minmax(0,1fr)] max-[800px]:mx-[8px] max-[580px]:mx-[16px] max-[580px]:border-x-0">
          <ThemeGuideNavigation route={route} />
          <div className="min-w-0 px-0 pb-[40px] pt-[28px] min-[581px]:px-[32px] min-[581px]:py-[32px] min-[801px]:px-[48px] min-[801px]:pb-[56px] min-[801px]:pt-[40px]">
            <header className="mb-[25px] max-w-[760px]">
              <ContentBreadcrumb route={route} />
              <p className="mb-[8px] text-[11px] font-bold uppercase tracking-[0.12em] leading-[1.4] text-[#006a4c]">Guia prático</p>
              <h1 className="mb-[16px] text-[32px] font-bold leading-[1.2] tracking-[-0.7px] text-[#103454] max-[800px]:text-[27px] max-[580px]:text-[26px]">{guide.title}</h1>
              <p className="max-w-[760px] text-[17px] leading-[1.55] text-[#526779] max-[580px]:text-[16px]">{guide.intro}</p>
              <p className="mb-[25px] mt-[17px] max-w-[720px] text-[13px] leading-[1.5] text-[#243b50]">{guide.audience}</p>
            </header>
            <GuidePublicationNotice guideId={guide.id} />
            <p className="mb-[28px] rounded-[6px] border border-[#dce5eb] bg-[#f4f7f9] px-[16px] py-[14px] text-[14px]">
              <a
                className="font-bold underline underline-offset-4"
                href={withBasePath(`/assets/pdf/${pdfName}`)}
                download
              >
                Descarregar este guia em PDF
              </a>
            </p>

            <section aria-labelledby="tarefas-do-guia">
              <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
                <h2 id="tarefas-do-guia" className="text-[20px] font-bold leading-[1.3] text-[#103454]">O que pretende fazer?</h2>
                <p className="text-s-regular text-gray-medium">{guide.fichas.length} {guide.fichas.length === 1 ? "tarefa" : "tarefas"}</p>
              </div>
              <div className="my-[20px] grid gap-[16px] min-[1000px]:grid-cols-2">
                {guide.fichas.map((task, index) => {
                  const taskRoute = routeForTask(content, task.id);
                  return <TaskChoiceCard key={task.id} index={index} title={task.title} description={task.intro} href={withBasePath(taskRoute.path)} />;
                })}
              </div>
            </section>

        {related.length > 0 ? (
          <section className="mt-[32px] border-t border-[#dce5eb] pt-[28px]" aria-labelledby="guias-relacionados">
            <h2 id="guias-relacionados" className="mb-[16px] text-[20px] font-bold leading-[1.3] text-[#103454]">
              Guias relacionados
            </h2>
            <div className="grid gap-[12px] min-[1000px]:grid-cols-2">
              {related.map((item) => {
                const relatedRoute = routeForGuide(content, item.id);
                return <CompactGuideCard key={item.id} title={item.title} description={guideCardDescription(item)} href={withBasePath(relatedRoute.path)} />;
              })}
            </div>
          </section>
        ) : null}

        {guide.resources?.length ? (
          <section className="mt-[32px] rounded-[8px] border border-[#dce5eb] bg-[#f4f7f9] p-[18px] text-[14px]" aria-labelledby="recursos-uteis">
            <h2 id="recursos-uteis" className="mb-[16px] text-[20px] font-bold leading-[1.3] text-[#103454]">
              Recursos úteis
            </h2>
            <ul className="list-disc space-y-8 pl-24">
              {guide.resources.map((resource) => (
                <li key={resource.url}>
                  <a className="underline underline-offset-4" href={resource.url}>
                    {resource.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
          </div>
        </div>
      </>
    );
  }

  if (route.kind === "task" && route.guide && route.task) {
    const task = route.task;
    return (
      <>
        <GuidesBreadcrumb />
        <GuideSearch items={searchItems} />
        <div className="grid gap-0 border-x border-[#dce5eb] min-[581px]:grid-cols-[224px_minmax(0,1fr)] min-[801px]:grid-cols-[264px_minmax(0,1fr)] max-[800px]:mx-[8px] max-[580px]:mx-[16px] max-[580px]:border-x-0">
          <ThemeGuideNavigation route={route} />
          <article className="min-w-0 px-0 pb-[40px] pt-[28px] min-[581px]:px-[32px] min-[581px]:py-[32px] min-[801px]:px-[48px] min-[801px]:pb-[56px] min-[801px]:pt-[40px]">
            <header className="mb-[32px] max-w-[760px]">
              <ContentBreadcrumb route={route} />
              <p className="mb-[8px] text-[11px] font-bold uppercase tracking-[0.12em] leading-[1.4] text-[#006a4c]">Tarefa</p>
              {task.roles ? <p className="mb-[13px] inline-flex min-h-[28px] items-center rounded-[4px] bg-[#eaf5ef] px-[9px] py-[4px] text-[12px] font-semibold text-[#175a44]">{task.roles}</p> : null}
              <h1 className="mb-[16px] text-[32px] font-bold leading-[1.2] tracking-[-0.7px] text-[#103454] max-[800px]:text-[27px] max-[580px]:text-[26px]">{task.title}</h1>
              <p className="max-w-[760px] text-[17px] leading-[1.55] text-[#526779] max-[580px]:text-[16px]">{task.intro}</p>
            </header>
            <GuidePublicationNotice guideId={route.guide.id} />

            <section aria-labelledby="como-fazer" className="my-32">
              <h2 id="como-fazer" className="mb-[15px] text-[20px] font-bold leading-[1.3] text-[#103454]">Como fazer</h2>
              <ol className="grid list-none gap-[16px] p-0">
                {task.steps.map((step, index) => (
                  <li key={index} className="grid grid-cols-[28px_minmax(0,1fr)] items-start gap-[12px] text-[14px] leading-[1.65]">
                    <span aria-hidden="true" className="flex h-[27px] items-center justify-center rounded-full bg-[#e9f1fc] text-[12px] font-bold text-[#0050b9]">{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>

        {task.table?.length ? (
          <div className="my-[24px] overflow-x-auto">
            <table className="w-full table-fixed border-collapse text-[13px]">
              <thead>
                <tr>
                  {task.table[0].map((cell, index) => (
                    <th key={index} scope="col" className="border-b border-[#dce5eb] bg-[#f4f7f9] px-[12px] py-[10px] text-left font-bold">
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {task.table.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border-b border-[#dce5eb] px-[12px] py-[10px] align-top">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {task.example ? (
          <section className="my-[25px] rounded-[8px] bg-[#edf4fd] px-[21px] py-[18px] text-[14px]" aria-labelledby="exemplo-tarefa">
            <h2 id="exemplo-tarefa" className="mb-[8px] text-[16px] font-bold leading-[1.3] text-[#103454]">
              Exemplo
            </h2>
            <p>{task.example}</p>
          </section>
        ) : null}

        {task.media ? (
          <section className="mt-[23px] min-h-[120px] rounded-[7px] border border-dashed border-[#9fb5c6] bg-white p-[20px] text-[12px] text-[#526779]" aria-labelledby="media-previsto">
            <h2 id="media-previsto" className="mb-[5px] text-[11px] font-bold uppercase tracking-[0.08em] text-[#435d73]">
              Imagem ou vídeo previsto
            </h2>
            <p>{task.media}</p>
          </section>
        ) : null}

        {task.tip ? (
          <aside className="my-[22px] rounded-[7px] bg-[#eaf5ef] px-[20px] py-[17px] text-[13px]">
            <strong className="mb-[5px] block text-[#175a44]">Dica</strong>
            <p className="m-0">{task.tip}</p>
          </aside>
        ) : null}

            <TaskNavigation route={route} />
          </article>
        </div>
      </>
    );
  }

  return <h1>Conteúdo não encontrado</h1>;
}
