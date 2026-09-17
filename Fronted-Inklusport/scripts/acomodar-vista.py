"""
acomodar-vista.py — convierte un `*.component.html` que quedó pegado como
documento HTML completo (prototipo) en un componente Angular válido:

  * saca el bloque <style> al `*.component.scss` hermano (:root -> :host,
    body -> :host) y le antepone una nota.
  * deja en el `.html` solo el contenido interno de <body>, sin
    <!DOCTYPE>/<html>/<head>/<base>/<link>/<meta>/<title>/<script>.
  * no toca el `.component.ts`.

Uso:
  python scripts/acomodar-vista.py <ruta-al-*.component.html> [más rutas...]
  python scripts/acomodar-vista.py --all      # recorre src/app/features/**
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FEATURES = ROOT / "src" / "app" / "features"

STYLE_RE = re.compile(r"<style[^>]*>(.*?)</style>", re.S | re.I)
BODY_RE = re.compile(r"<body[^>]*>(.*?)</body>", re.S | re.I)
SCRIPT_RE = re.compile(r"<script[^>]*>.*?</script>", re.S | re.I)
# \b tras el nombre para NO tragarse <header>/<hgroup>/<base...>-como-clase, etc.
DOCLEVEL_RE = re.compile(
    r"<!DOCTYPE[^>]*>|</?html\b[^>]*>|</?head\b[^>]*>|</?body\b[^>]*>|"
    r"<base\b[^>]*>|<link\b[^>]*>|<meta\b[^>]*>|<title\b[^>]*>.*?</title\s*>",
    re.S | re.I,
)


def is_full_doc(html: str) -> bool:
    return bool(re.search(r"<!DOCTYPE|<html[\s>]", html, re.I))


def acomodar(html_path: Path) -> str:
    src = html_path.read_text(encoding="utf-8")
    if not is_full_doc(src):
        return f"skip (ya es Angular): {html_path.relative_to(ROOT)}"

    scss_path = html_path.with_suffix(".scss")
    stem = html_path.stem  # p.ej. organizer-analysis.component

    # --- estilos -> .scss ---
    styles = "\n\n".join(m.group(1).strip() for m in STYLE_RE.finditer(src))
    if styles:
        styles = styles.replace(":root", ":host")
        styles = re.sub(r"(^|\})\s*body\s*\{", r"\1\n:host {", styles)
        scss = (
            f"/* Portado del prototipo — acomodado a Angular por scripts/acomodar-vista.py */\n"
            f":host {{ display: block; }}\n\n{styles}\n"
        )
        scss_path.write_text(scss, encoding="utf-8")

    # --- cuerpo -> .html ---
    body_match = BODY_RE.search(src)
    body = body_match.group(1) if body_match else DOCLEVEL_RE.sub("", src)
    had_script = bool(SCRIPT_RE.search(body))
    body = SCRIPT_RE.sub("", body)
    body = DOCLEVEL_RE.sub("", body).strip()
    html_path.write_text(
        f"<!-- {stem} · portado del prototipo, acomodado a Angular -->\n{body}\n",
        encoding="utf-8",
    )

    warn = "  ⚠ tenía <script> (eliminado, reimplementa la lógica en el .ts)" if had_script else ""
    return f"ok: {html_path.relative_to(ROOT)}  (+ {scss_path.name}){warn}"


def main(argv: list[str]) -> int:
    if not argv:
        print(__doc__)
        return 1
    if argv[0] == "--all":
        targets = sorted(FEATURES.rglob("*.component.html"))
    else:
        targets = [Path(a).resolve() for a in argv]

    for t in targets:
        if not t.exists():
            print(f"no existe: {t}")
            continue
        print(acomodar(t))
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
