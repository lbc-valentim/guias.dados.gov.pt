import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RouteContent } from "@/components/guides/RouteContent";
import { loadConfiguredContent } from "@/lib/content/config";
import { buildRoutes, findRoute } from "@/lib/content/routes";
import { buildSearchIndex } from "@/lib/content/search";
import { canonicalUrl } from "@/lib/site";

export const dynamicParams = false;

export async function generateStaticParams() {
  const content = await loadConfiguredContent();
  return buildRoutes(content)
    .filter((route) => route.segments.length > 0)
    .map((route) => ({ segments: route.segments }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ segments: string[] }>;
}): Promise<Metadata> {
  const { segments } = await params;
  const content = await loadConfiguredContent();
  const route = findRoute(content, segments);
  if (!route) return {};
  return {
    title: route.title,
    alternates: { canonical: canonicalUrl(route.path) },
  };
}

export default async function GuideRoutePage({
  params,
}: {
  params: Promise<{ segments: string[] }>;
}) {
  const { segments } = await params;
  const content = await loadConfiguredContent();
  const route = findRoute(content, segments);
  if (!route) notFound();
  const search = buildSearchIndex(content);
  return <RouteContent route={route} searchItems={search} />;
}
