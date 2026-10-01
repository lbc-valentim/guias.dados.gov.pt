import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { PortalHeader } from "@/components/agora/PortalHeader";
import { PortalFooter } from "@/components/agora/PortalFooter";

export const metadata: Metadata = {
  title: { default: "Guias do utilizador | dados.gov.pt", template: "%s | Guias dados.gov.pt" },
  description: "Guias práticos do dados.gov.pt",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-PT">
      <body>
        <a className="skip-link" href="#conteudo">
          Saltar para o conteúdo
        </a>
        <PortalHeader />
        <main id="conteudo" tabIndex={-1} className="container mx-auto min-h-[60vh] px-16 lg:px-0">
          {children}
        </main>
        <PortalFooter />
      </body>
    </html>
  );
}
