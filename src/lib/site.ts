import site from "../../content/site.json";

export const siteConfig = site;

export function withBasePath(pathname: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${pathname}`.replace(/\/{2,}/g, "/");
}

export function canonicalUrl(pathname: string): string {
  const { reviewOrigin, basePath } = site.site;
  return `${reviewOrigin}${basePath}${pathname}`;
}
