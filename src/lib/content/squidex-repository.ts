import type { GuidesContent } from "./schema";
import { validateReferences } from "./repository";
import {
  mapSquidexPayload,
  type SquidexPayloadMapper,
} from "./squidex-mapper";

export interface SquidexTransport {
  fetchContent(): Promise<unknown>;
}

export interface AsyncContentRepository {
  load(): Promise<GuidesContent>;
}

/**
 * Repositório remoto para Squidex, consumido pela fronteira configurável da UI.
 *
 * O transporte e o mapper mantêm o formato do CMS fora do domínio e permitem
 * validar referências antes de devolver GuidesContent aos consumidores.
 */
export class SquidexRepository implements AsyncContentRepository {
  constructor(
    private readonly transport: SquidexTransport,
    private readonly mapper: SquidexPayloadMapper,
  ) {}

  async load(): Promise<GuidesContent> {
    const payload = await this.transport.fetchContent();
    const content = mapSquidexPayload(payload, this.mapper);
    validateReferences(content);
    return content;
  }
}
