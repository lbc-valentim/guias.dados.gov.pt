import type { GuidesContent, Guide, GuideTask, GuideTheme } from "./schema";
export type GuideRoute = { kind: "home"|"theme"|"guide"|"task"; path: string; segments: string[]; title: string; theme?: GuideTheme; guide?: Guide; task?: GuideTask };
export function buildRoutes(content: GuidesContent): GuideRoute[] {
  const routes: GuideRoute[] = [{ kind:"home", path:"/Guias-do-utilizador/", segments:[], title:"Guias do utilizador" }];
  const byGuide = new Map(content.guides.map((g)=>[g.id,g]));
  for (const theme of content.themes) {
    const themeBase = `/Guias-do-utilizador/${theme.slug}/`;
    routes.push({ kind:"theme", path:themeBase, segments:[theme.slug], title:theme.title, theme });
    for (const guideId of theme.guideIds) {
      const guide=byGuide.get(guideId)!; const guideBase=`${themeBase}${guide.slug}/`;
      routes.push({kind:"guide",path:guideBase,segments:[theme.slug,guide.slug],title:guide.title,theme,guide});
      for (const task of guide.fichas) routes.push({kind:"task",path:`${guideBase}${task.slug}/`,segments:[theme.slug,guide.slug,task.slug],title:task.title,theme,guide,task});
    }
  }
  return routes;
}
export function findRoute(content: GuidesContent, segments: string[]): GuideRoute | undefined {
  return buildRoutes(content).find((route)=>route.segments.join("/")===segments.join("/"));
}
export function routeForGuide(content: GuidesContent, guideId: string): GuideRoute {
  const route=buildRoutes(content).find((r)=>r.kind==="guide"&&r.guide?.id===guideId); if(!route) throw new Error(`Rota do guia ${guideId} em falta`); return route;
}
export function routeForTask(content: GuidesContent, taskId: string): GuideRoute {
  const route=buildRoutes(content).find((r)=>r.kind==="task"&&r.task?.id===taskId); if(!route) throw new Error(`Rota da ficha ${taskId} em falta`); return route;
}
