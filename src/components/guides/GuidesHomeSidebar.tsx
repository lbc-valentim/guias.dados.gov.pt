"use client";

type GuideOption = { id: string; title: string; href: string };
type ThemeOption = { id: string; title: string };

const selectClass = "min-h-[44px] w-full rounded-[5px] border border-[#a7bac8] bg-white px-[12px] py-[10px] text-[15px] text-[#243b50] max-[580px]:text-[16px]";
const labelClass = "mb-[8px] block text-[12px] font-bold uppercase tracking-[0.08em] text-[#526779] min-[581px]:mx-[10px]";

export function GuidesHomeSidebar({
  guides,
  themes,
}: {
  guides: GuideOption[];
  themes: ThemeOption[];
}) {
  return (
    <aside
      aria-label="Navegação dos guias"
      className="border-b border-[#dce5eb] bg-white px-0 pb-[24px] pt-[20px] min-[581px]:border-b-0 min-[581px]:border-r min-[581px]:bg-[#f4f7f9] min-[581px]:px-[20px] min-[581px]:pb-[40px] min-[581px]:pt-[32px]"
    >
      <label htmlFor="home-guide-select" className={labelClass}>
        Escolher guia
      </label>
      <select
        id="home-guide-select"
        defaultValue=""
        className={selectClass}
        onChange={(event) => {
          if (event.currentTarget.value) window.location.assign(event.currentTarget.value);
        }}
      >
        <option value="">Seleccione um guia</option>
        {guides.map((guide) => (
          <option key={guide.id} value={guide.href}>{guide.title}</option>
        ))}
      </select>

      <nav className="mt-[8px] hidden min-[581px]:grid min-[581px]:gap-[3px]" aria-label="Temas dos guias">
        {themes.map((theme) => (
          <a
            key={theme.id}
            className="block border-l-[3px] border-transparent px-[11px] py-[10px] text-[13px] leading-[1.4] text-[#243b50] no-underline hover:bg-[#eaf0f5] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#005ce6] focus-visible:outline-offset-[3px]"
            href={`#theme-${theme.id}`}
          >
            {theme.title}
          </a>
        ))}
      </nav>

      <div className="mt-[22px] hidden px-[10px] text-[17px] font-bold leading-[1.35] text-[#103454] min-[581px]:block">
        Explorar por tema
      </div>

      <div className="mt-[12px] min-[581px]:hidden">
        <label htmlFor="home-theme-select" className={labelClass}>
          Temas
        </label>
        <select
          id="home-theme-select"
          defaultValue=""
          className={selectClass}
          onChange={(event) => {
            if (event.currentTarget.value) window.location.assign(event.currentTarget.value);
          }}
        >
          <option value="">Escolher tema</option>
          {themes.map((theme) => (
            <option key={theme.id} value={`#theme-${theme.id}`}>{theme.title}</option>
          ))}
        </select>
      </div>

      <a
        className="mt-[8px] inline-flex min-h-[44px] items-center px-[10px] py-[13px] text-[13px] font-semibold text-[#005ce6] underline underline-offset-4 min-[581px]:mt-[22px]"
        href="#explorar-tema"
      >
        Ver todos os temas
      </a>
    </aside>
  );
}
