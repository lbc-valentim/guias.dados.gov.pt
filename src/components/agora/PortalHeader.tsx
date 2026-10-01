"use client";

import { useState } from "react";
import { NavigationSection } from "@ama-pt/agora-design-system";

const nav = [
  ["Data Stories", "https://dados.gov.pt/pt/datastories"],
  ["Conjuntos de dados", "https://dados.gov.pt/pt/datasets"],
  ["APIs", "https://dados.gov.pt/pt/dataservices"],
  ["Reutilizações", "https://dados.gov.pt/pt/reuses"],
  ["Organizações", "https://dados.gov.pt/pt/organizations"],
] as const;

const resourceNav = [
  ["Como usar o portal", "https://dados.gov.pt/pt/recursos/como-usar-o-portal"],
  ["Aprender", "https://dados.gov.pt/pt/recursos/aprender"],
  ["Desenvolvimento", "https://dados.gov.pt/pt/recursos/desenvolvimento"],
  ["Publicações", "https://dados.gov.pt/pt/recursos/publicacoes"],
] as const;

const externalProps = { target: "_blank", rel: "noopener noreferrer" } as const;
const utilityAction = "inline-flex min-h-[44px] items-center gap-[8px] bg-transparent px-12 text-[14px] font-medium leading-none text-[#17253a] no-underline hover:bg-[rgba(2,28,81,0.055)] max-[700px]:min-h-[42px] max-[700px]:px-[8px]";

export function PortalHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const focusGuideSearch = () => {
    document.getElementById("guide-search-input")?.focus();
  };

  return (
    <header className="sticky top-0 z-[1000] bg-white shadow-[0_1px_0_rgba(2,28,81,0.08)]" aria-label="Cabeçalho do portal">
      <div className="border-b border-[#e6e9ef] bg-[#f1f3f7] text-[#18263a]">
        <div className="mx-auto flex min-h-[52px] w-[calc(100%-64px)] max-w-[1216px] items-center justify-between gap-[28px] max-[700px]:min-h-[50px] max-[700px]:w-[calc(100%-40px)] max-[700px]:gap-10">
          <a className="inline-flex min-h-[44px] items-center whitespace-nowrap text-[14px] font-medium leading-[1.2] text-[#13233a] no-underline hover:underline max-[700px]:max-w-[48%] max-[700px]:whitespace-normal max-[700px]:text-[12px]" href="https://dados.gov.pt/pt" {...externalProps}>
            Portal nacional de dados abertos
          </a>
          <div className="ml-auto flex items-center justify-end gap-4" aria-label="Opções de navegação geral">
            <button className={utilityAction} type="button" onClick={focusGuideSearch} aria-label="Pesquisar">
              <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" className="fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.8]">
                <circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" />
              </svg>
              <span className="max-[700px]:hidden">Pesquisar</span>
            </button>
            <span className={`${utilityAction} cursor-default hover:!bg-transparent`}>
              <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" className="fill-current">
                <circle cx="5" cy="5" r="1.6" /><circle cx="12" cy="5" r="1.6" /><circle cx="19" cy="5" r="1.6" /><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /><circle cx="5" cy="19" r="1.6" /><circle cx="12" cy="19" r="1.6" /><circle cx="19" cy="19" r="1.6" />
              </svg>
              <span className="max-[700px]:hidden">Ecossistema</span><strong className="ml-1 text-[1.05rem] font-extrabold lowercase tracking-[-0.06em] max-[700px]:hidden">arte</strong>
            </span>
            <a className={utilityAction} href="https://dados.gov.pt/pt/login" aria-label="Autenticar" {...externalProps}>
              <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" className="fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.8]">
                <circle cx="12" cy="8" r="3.5" /><path d="M5.5 20c.6-4.1 3-6.1 6.5-6.1s5.9 2 6.5 6.1" />
              </svg>
              <span className="max-[700px]:hidden">Autenticar</span>
            </a>
          </div>
        </div>
      </div>

      <div className="border-b border-[#eef0f4] bg-white">
        <div className="relative mx-auto flex min-h-[88px] w-[calc(100%-64px)] max-w-[1216px] items-center gap-[34px] max-[1100px]:gap-20 max-[900px]:min-h-[76px] max-[700px]:min-h-[70px] max-[700px]:w-[calc(100%-40px)]">
          <a className="inline-flex flex-none items-center no-underline" href="https://dados.gov.pt/pt" aria-label="dados.gov.pt" {...externalProps}>
            <img src="https://dados.gov.pt/Logos/Dados.gov_logocores.png" alt="dados.gov.pt" width="251" height="43" className="h-auto w-[190px] max-[900px]:w-[178px] max-[700px]:w-[165px]" />
          </a>
          <button
            className="ml-auto hidden min-h-[44px] items-center gap-[8px] bg-transparent px-[8px] font-semibold text-[#17253a] max-[900px]:inline-flex"
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="portal-primary-nav"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span>Menu</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" className="fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.8]"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
          <nav
            id="portal-primary-nav"
            aria-label="Navegação principal do portal"
            className={`${mobileOpen ? "flex" : "flex max-[900px]:hidden"} ml-auto items-center justify-end gap-2 max-[900px]:absolute max-[900px]:left-[-32px] max-[900px]:right-[-32px] max-[900px]:top-full max-[900px]:z-50 max-[900px]:m-0 max-[900px]:flex-col max-[900px]:items-stretch max-[900px]:border-y max-[900px]:border-[#dfe4eb] max-[900px]:bg-white max-[900px]:px-32 max-[900px]:pb-18 max-[900px]:pt-10 max-[900px]:shadow-[0_18px_30px_rgba(18,35,58,0.12)] max-[700px]:left-[-20px] max-[700px]:right-[-20px] max-[700px]:px-20`}
          >
            <NavigationSection>
            {nav.map(([label, href]) => (
              <a key={href} href={href} {...externalProps} className="inline-flex min-h-[48px] items-center whitespace-nowrap px-[13px] text-[14px] font-semibold leading-[1.2] text-[#101a2b] no-underline hover:text-[#0c02cb] hover:underline hover:decoration-2 hover:underline-offset-8 max-[1100px]:px-[9px] max-[1100px]:text-[13px] max-[900px]:min-h-[46px] max-[900px]:w-full max-[900px]:px-[8px] max-[900px]:text-[15px]">
                {label}
              </a>
            ))}
            <div className="relative flex max-[900px]:block">
              <button
                type="button"
                aria-expanded={resourcesOpen}
                aria-controls="menu-recursos"
                onClick={() => setResourcesOpen((open) => !open)}
                className="inline-flex min-h-[48px] items-center gap-[7px] whitespace-nowrap bg-transparent px-[13px] text-[14px] font-semibold leading-[1.2] text-[#101a2b] hover:text-[#0c02cb] max-[1100px]:px-[9px] max-[1100px]:text-[13px] max-[900px]:min-h-[46px] max-[900px]:w-full max-[900px]:justify-between max-[900px]:px-[8px] max-[900px]:text-[15px]"
              >
                <span>Recursos</span>
                <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" className={`${resourcesOpen ? "rotate-180" : ""} fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.8]`}><path d="m7 9 5 5 5-5" /></svg>
              </button>
              <div
                id="menu-recursos"
                hidden={!resourcesOpen}
                className="absolute right-0 top-[calc(100%+10px)] z-20 min-w-[270px] border border-[#d9dee7] bg-white p-10 shadow-[0_18px_38px_rgba(18,35,58,0.16)] max-[900px]:static max-[900px]:mb-6 max-[900px]:border-0 max-[900px]:border-l-[3px] max-[900px]:border-l-[#dfe5ee] max-[900px]:p-0 max-[900px]:pl-12 max-[900px]:shadow-none"
              >
                <ul className="m-0 list-none p-0">
                  {resourceNav.map(([label, href]) => (
                    <li key={href} className="[&+&]:mt-2">
                      <a href={href} {...externalProps} className="block px-12 py-[10px] text-[14px] font-medium text-[#17253a] no-underline hover:bg-[#f1f3f7] hover:text-[#0c02cb]">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            </NavigationSection>
          </nav>
        </div>
      </div>
    </header>
  );
}
