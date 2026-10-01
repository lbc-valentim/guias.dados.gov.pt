"""Reconstitui e verifica o arquivo Git da origem, sem alterar branches."""
from pathlib import Path
import hashlib
import json
import subprocess

ROOT = Path(__file__).resolve().parents[2]
MANIFEST = ROOT / "docs/history/manifest.json"

def main():
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    target = ROOT / ".build/history/source-main-2026-10-01.bundle"
    target.parent.mkdir(parents=True, exist_ok=True)
    digest = hashlib.sha256()
    size = 0
    with target.open("wb") as output:
        for part in manifest["parts"]:
            path = MANIFEST.parent / part["file"]
            data = path.read_bytes()
            if len(data) != part["bytes"] or hashlib.sha256(data).hexdigest() != part["sha256"]:
                raise ValueError(f"Parte do histórico inválida: {path.name}")
            output.write(data)
            digest.update(data)
            size += len(data)
    if size != manifest["bytes"] or digest.hexdigest() != manifest["sha256"]:
        raise ValueError("O bundle reconstruído não corresponde ao histórico original")
    subprocess.run(["git", "bundle", "verify", str(target)], cwd=ROOT, check=True)
    print(f"Histórico verificado: {manifest['commits']} commits; {target}")

if __name__ == "__main__":
    main()
