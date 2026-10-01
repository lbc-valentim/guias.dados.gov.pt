"use client";

import { useMemo, useState } from "react";
import type { SearchItem } from "@/lib/content/search";
import { withBasePath } from "@/lib/site";

export function GuideSearch({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState("");
  const hits = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-PT");
    return normalized
      ? items.filter((item) => item.text.toLocaleLowerCase("pt-PT").includes(normalized)).slice(0, 12)
      : [];
  }, [query, items]);

  return (
    <section
      aria-labelledby="pesquisa-guias"
      className="relative left-1/2 w-screen -translate-x-1/2 border-b border-[#dce5eb] bg-white"
    >
      <div className="mx-auto flex w-[calc(100%-64px)] max-w-[1216px] justify-end py-[16px] max-[800px]:w-[calc(100%-48px)] max-[580px]:w-[calc(100%-64px)]">
        <div className="w-full max-w-[420px]">
          <h2 id="pesquisa-guias" className="sr-only">Pesquisar nos guias</h2>
          <form
            role="search"
            className="grid grid-cols-[minmax(0,1fr)_auto] gap-[8px] max-[420px]:grid-cols-1"
            onSubmit={(event) => event.preventDefault()}
          >
            <label htmlFor="guide-search-input" className="sr-only">Pesquisar nos guias</label>
            <input
              id="guide-search-input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.currentTarget.value)}
              placeholder="Pesquisar nestes guias"
              className="h-[45px] min-w-0 w-full rounded-[5px] border border-[#a7bac8] bg-white px-[12px] text-[15px] leading-[1.55] text-[#243b50] outline-none focus:border-[#005ce6]"
            />
            <button
              type="submit"
              className="h-[45px] rounded-[5px] border-0 bg-[#005ce6] px-[14px] text-[15px] font-semibold text-white hover:bg-[#004aaa] max-[580px]:min-w-[88px] max-[420px]:w-full"
            >
              Pesquisar
            </button>
          </form>
          {query ? (
            <p className="mt-[8px] text-s-regular" role="status" aria-live="polite">
              {`${hits.length} ${hits.length === 1 ? "resultado" : "resultados"}`}
            </p>
          ) : null}
          {hits.length > 0 ? (
            <ul className="mt-[12px] flex flex-col gap-[8px] border-t border-[#dce5eb] pt-[12px]">
              {hits.map((item) => (
                <li key={item.id}>
                  <a className="block rounded-sm px-[8px] py-[8px] hover:bg-[#f4f7f9]" href={withBasePath(item.url)}>
                    <strong>{item.title}</strong>
                    <span className="block text-s-regular text-gray-medium">{item.intro}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
