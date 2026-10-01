# Registo de migração de 01/10/2026

## Origem e destino
- Origem: https://github.com/Timmarcelino/Guias_dados.gov.pt
- Commit publicado de origem: `c4ba678dbc7f466b8603d56263840cc4ff70c225`.
- Destino: https://github.com/lbc-valentim/guias.dados.gov.pt
- Baseline anterior do destino: `58c65e205c38ad810e122a57f2dff4b612aa39dd`.
- Cópia de segurança do destino: `backup/pre-migration-2026-10-01`.
- PR original da revisão D01+D13: https://github.com/Timmarcelino/Guias_dados.gov.pt/pull/18

## Método e âmbito
A migração copia a árvore do commit publicado, conserva a licença e autoria, ajusta o endereço da demonstração e acrescenta documentação de entrega. A fonte editorial D01+D13 e o contrato histórico de rotas permanecem iguais à origem.

A branch de migração parte da main anterior do destino. A integração preserva esse histórico. O histórico da origem é entregue separadamente como Git bundle completo; os 256 commits originais não aparecem como antepassados do commit de migração no destino.

Não foi efectuado force push sobre main nem eliminado o repositório original. Branches experimentais da origem, PRs, issues, permissões, secrets e histórico de execuções Actions não são copiados. Não foram identificadas tags na origem no momento desta migração.

## Histórico original verificável
Arquivo: seis partes em `docs/history/`, descritas em `manifest.json`. O comando abaixo recompõe o bundle original em `.build/history/`.

- Tamanho: 10 577 260 bytes.
- SHA-256: `b0599ea22cc2009750fcb2bd22acff660b405caafeb5d6d8d61c6b6cef2b3895`.
- Ref: `refs/heads/main`.
- Commit: `c4ba678dbc7f466b8603d56263840cc4ff70c225`.
- Histórico completo: 256 commits alcançáveis a partir dessa ref.
- Verificação: `git bundle verify` e restauração offline da main, com confirmação do commit e contagem.

Para recuperar o histórico original numa pasta separada:

```bash
python scripts/v1/restore-source-history.py
git clone --branch main .build/history/source-main-2026-10-01.bundle ../guias-original
git -C ../guias-original rev-parse HEAD
git -C ../guias-original rev-list --count HEAD
```

Para consultar esse histórico dentro do clone do destino, sem alterar main:

```bash
python scripts/v1/restore-source-history.py
git fetch .build/history/source-main-2026-10-01.bundle refs/heads/main:refs/remotes/source-archive/main
git log source-archive/main
```

## Ajustes para o destino
- Origem da demonstração: `https://lbc-valentim.github.io`.
- Base path: `/guias.dados.gov.pt`.
- Workflows, preparação do site e testes alinhados com esse caminho.
- README corrigido para 96 fichas, 119 rotas e 96 entradas de pesquisa.
- Documentação histórica identificada como tal.
- Estado remoto Squidex identificado como não revalidado nesta migração.
- Guia de entrega técnica acrescentado.

Os PDFs da demonstração devem ser regenerados para que as ligações e QR codes apontem para o novo endereço. O gate de equivalência textual e paginação mantém-se activo.

## Validação e publicação
A aprovação técnica depende dos gates do PR: arquitectura v1, PDFs e build Pages. Depois da integração, confirmar as execuções em main e o endereço público, incluindo D01, D13, D01-T07, pesquisa, sitemap e os 15 PDFs.

O Pages do destino foi observado em modo legacy, branch main, pasta raiz. Para publicar o export Next.js, deve ser configurado para GitHub Actions. Não confundir o antigo site materializado da raiz com o novo export out/.

Não foi configurado um domínio oficial guias.dados.gov.pt. O nome do repositório não atribui nem configura esse domínio.

## Recuperação
A branch de backup mantém a baseline anterior do destino. Uma reversão deve ser proposta em PR e respeitar o método de publicação aprovado; a existência da branch não executa rollback.

Para reproduzir a origem sem depender de acesso ao repositório antigo, use o bundle. Os artefactos derivados podem ser reconstruídos com o guia de entrega e os workflows.

## Fora de âmbito
Esta migração não activa integrações ou permissões do CMS, não publica no portal oficial e não altera Jira, Squidex ou SharePoint. WCAG/NVDA e validação funcional no contexto institucional continuam por realizar.
