import assert from "node:assert/strict";
import { formatSquidexIfMatchVersion } from "../../src/lib/content/squidex-import-concurrency";

function main(): void {
  assert.equal(formatSquidexIfMatchVersion("0"), '"0"');
  assert.equal(formatSquidexIfMatchVersion("6"), '"6"');
  assert.equal(formatSquidexIfMatchVersion("123"), '"123"');

  assert.throws(() => formatSquidexIfMatchVersion(""), /Versão Squidex inválida/);
  assert.throws(() => formatSquidexIfMatchVersion("06"), /Versão Squidex inválida/);
  assert.throws(() => formatSquidexIfMatchVersion('W/"HASH"'), /Versão Squidex inválida/);
  assert.throws(() => formatSquidexIfMatchVersion('"6"'), /Versão Squidex inválida/);

  console.log('Squidex If-Match: OK; versão 6 => "6"');
}

main();
