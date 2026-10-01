"use client";

import { siteConfig, withBasePath } from "@/lib/site";

const shell = "mx-auto w-[calc(100%-64px)] max-w-[1216px] max-[700px]:w-[calc(100%-40px)]";
const footerItem = "text-[15px] leading-[1.45] text-white/90";

const footerColumns = [
  { title: "Dados abertos", items: ["Catálogo de dados", "Portal de dados europeu"] },
  { title: "Plataforma", items: ["Sobre nós", "Roadmap"] },
  {
    title: "Desenvolvimento",
    items: [
      "API dos dados.gov",
      "Motor de código aberto: udata (14.7.2)",
      "Interface de usuário de data.gov.pt frontend",
    ],
  },
] as const;

const fundingLogos = [
  ["PRR", "https://dados.gov.pt/assets/prr.png"],
  ["República Portuguesa", "https://dados.gov.pt/assets/logo-rp.png"],
  ["NextGenerationEU", "https://dados.gov.pt/assets/europa.png"],
  ["Compete 2020", "https://dados.gov.pt/assets/vector-1-.png"],
  ["Portugal 2020", "https://dados.gov.pt/assets/vector-2-.png"],
] as const;
function StaticSocialMarks() {
  const markClass = "inline-flex h-[28px] min-w-[28px] items-center justify-center text-[17px] font-bold leading-none text-white/90";

  return (
    <div className="flex flex-wrap items-center gap-[14px]" aria-label="Redes sociais ARTE">
      <span className={markClass} role="img" aria-label="LinkedIn">in</span>
      <span className={`${markClass} rounded-[6px] border-2 border-white/90`} role="img" aria-label="Instagram">
        <span className="h-[9px] w-[9px] rounded-full border-2 border-white/90" />
      </span>
      <span className={markClass} role="img" aria-label="Facebook">f</span>
      <span className={markClass} role="img" aria-label="X">X</span>
      <span className={`${markClass} rounded-[6px] border-2 border-white/90`} role="img" aria-label="YouTube">▶</span>
      <span className={markClass} role="img" aria-label="GitHub">
        <img src="https://dados.gov.pt/Logos/github.svg" alt="" className="h-[24px] w-[24px] brightness-0 invert" />
      </span>
    </div>
  );
}

export function PortalFooter() {
  const author = siteConfig.author;
  const prototype = siteConfig.prototype;

  return (
    <footer className="overflow-x-hidden bg-[#021c51] text-white" aria-label="Rodapé do portal">
      <section className={`${shell} pb-[36px] pt-[44px]`} aria-labelledby="footer-descobrir">
        <h2 id="footer-descobrir" className="mb-[24px] text-[1.35rem] font-bold leading-[1.3] text-white">
          Mais para descobrir no portal
        </h2>
        <div className="grid grid-cols-3 gap-x-[56px] gap-y-[28px] max-[900px]:grid-cols-2 max-[700px]:grid-cols-1">
          {footerColumns.map((column) => (
            <section key={column.title} aria-label={column.title}>
              <h3 className="mb-[10px] text-[1rem] font-bold text-white">{column.title}</h3>
              <ul className="m-0 list-none space-y-[8px] p-0">
                {column.items.map((item) => <li key={item} className={footerItem}>{item}</li>)}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-[34px] flex flex-wrap items-center gap-x-[34px] gap-y-[18px]" aria-label="Entidades institucionais">
          <img src="https://dados.gov.pt/Logos/pt-republic-color.svg" alt="República Portuguesa" className="h-[48px] w-auto object-contain" />
          <img src="https://dados.gov.pt/Logos/Logotipo_ARTE__Horizontal_branco_pt.svg" alt="Agência para a Reforma Tecnológica do Estado" className="h-[48px] max-w-[250px] object-contain" />
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className={`${shell} grid grid-cols-[minmax(0,1fr)_auto] items-center gap-[28px] py-[24px] max-[1000px]:grid-cols-1`}>
          <p className="m-0 text-[15px] text-white/60">Portal nacional de dados abertos</p>
          <div className="flex flex-wrap items-center justify-end gap-x-[18px] gap-y-[12px] max-[1000px]:justify-start" aria-label="Programas e financiamento">
            {fundingLogos.map(([alt, src]) => (
              <img key={src} src={src} alt={alt} className="h-[26px] w-auto max-w-[118px] object-contain opacity-70" />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className={`${shell} grid grid-cols-[0.8fr_1.2fr] gap-[28px] py-[24px] max-[900px]:grid-cols-1`}>
          <div>
            <p className="mb-[12px] mt-0 text-[14px] text-white/60">Redes sociais ARTE:</p>
            <StaticSocialMarks />
          </div>
          <div className="border-l border-white/10 pl-[28px] max-[900px]:border-l-0 max-[900px]:border-t max-[900px]:pl-0 max-[900px]:pt-[20px]">
            <div className="flex flex-wrap justify-end gap-x-[28px] gap-y-[8px] text-[15px] text-white/90 max-[900px]:justify-start" aria-label="Informação institucional">
              <span>Termos e condições</span>
              <span>Ajuda e contactos</span>
              <span>Mapa do site</span>
            </div>
            <p className="mb-0 mt-[18px] text-right text-[13px] leading-[1.4] text-white/55 max-[900px]:text-left">
              © 2026 - AGÊNCIA PARA A REFORMA TECNOLÓGICA DO ESTADO, I.P. Todos os direitos reservados
            </p>
          </div>
        </div>
      </section>

      <section className={`${shell} grid grid-cols-[108px_minmax(0,1fr)] grid-rows-[auto_auto] items-center gap-x-[16px] gap-y-[3px] border-t border-white/10 py-[18px] max-[420px]:grid-cols-[96px_minmax(0,1fr)]`} aria-label="Crédito de autoria">
        <img src={withBasePath(author.logo_web)} alt={author.logo_alt} className="row-span-2 h-[64px] w-[108px] rounded-[3px] object-cover max-[420px]:h-[56px] max-[420px]:w-[96px]" />
        <p className="m-0 self-end text-[13px] leading-[1.35] text-white/85">
          {author.role}:{" "}
          <a className="font-bold text-white underline underline-offset-[4px]" href={author.linkedin} target="_blank" rel="noopener noreferrer">
            {author.name}
          </a>
        </p>
        <p className="m-0 self-start text-[13px] leading-[1.35] text-white/80">
          © dados.gov.pt · Protótipo: &apos;{prototype.name}&apos; {prototype.version}
        </p>
      </section>
    </footer>
  );
}
