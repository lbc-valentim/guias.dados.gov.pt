type Item = { label: string; href?: string };

export function GuidesBreadcrumb() {
  const items: Item[] = [
    { label: "Início", href: "https://dados.gov.pt/pt" },
    { label: "Recursos", href: "https://dados.gov.pt/pt/recursos" },
    { label: "Guias do utilizador" },
  ];

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 bg-[#f0f4ff] text-[#25354a]">
      <div className="mx-auto flex min-h-[160px] w-[calc(100%-64px)] max-w-[1216px] items-center max-[700px]:min-h-[132px] max-[700px]:w-[calc(100%-40px)]">
        <nav aria-label="Breadcrumb" className="min-w-0 text-[13px] leading-[1.4]">
          <ol className="flex flex-wrap items-center gap-x-[9px] gap-y-[6px] max-[700px]:gap-x-[6px]">
            {items.map((item, index) => (
              <li key={item.label} className="flex items-center gap-[9px] max-[700px]:gap-[6px]">
                {index > 0 ? <span aria-hidden="true">›</span> : null}
                {item.href ? (
                  <a
                    className={index === 0 ? "relative inline-flex min-h-[44px] items-center after:absolute after:bottom-[1px] after:left-0 after:h-[2px] after:w-[30px] after:bg-[#25354a]" : "inline-flex min-h-[44px] items-center hover:underline hover:underline-offset-[5px]"}
                    href={item.href}
                  >
                    {item.label}
                  </a>
                ) : (
                  <span aria-current="page">{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}
