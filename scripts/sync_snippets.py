#!/usr/bin/env python3
"""Copy compiled Kotlin regions into the skill's markdown.

In a reference file, a code block preceded by `<!-- snippet: NAME -->` is replaced with the
`// region NAME` ... `// endregion` block from verify/snippets. That keeps every sample an agent
reads identical to code that compiles against the pinned material3 version.

    python3 scripts/sync_snippets.py          # rewrite the markdown
    python3 scripts/sync_snippets.py --check  # exit 1 if any block is out of date (CI)
"""
import pathlib
import re
import sys
import textwrap

ROOT = pathlib.Path(__file__).resolve().parent.parent
KOTLIN = ROOT / "verify" / "snippets" / "src" / "main" / "java"
DOCS = ROOT / "skills"

REGION = re.compile(r"^[ \t]*// region (\S+)\n(.*?)^[ \t]*// endregion", re.M | re.S)
BLOCK = re.compile(r"(<!-- snippet: (\S+) -->\n```kotlin\n)(.*?)(```)", re.S)


def load_regions():
    regions = {}
    for path in sorted(KOTLIN.rglob("*.kt")):
        for match in REGION.finditer(path.read_text()):
            name = match.group(1)
            if name in regions:
                sys.exit(f"duplicate region '{name}' in {path}")
            regions[name] = textwrap.dedent(match.group(2)).rstrip() + "\n"
    return regions


def main():
    check = "--check" in sys.argv
    regions = load_regions()
    used, stale, missing = set(), [], []

    for md in sorted(DOCS.rglob("*.md")):
        text = md.read_text()

        def replace(match):
            name = match.group(2)
            if name not in regions:
                missing.append(f"{md.relative_to(ROOT)}: {name}")
                return match.group(0)
            used.add(name)
            return match.group(1) + regions[name] + match.group(4)

        new = BLOCK.sub(replace, text)
        if new != text:
            stale.append(str(md.relative_to(ROOT)))
            if not check:
                md.write_text(new)

    for item in missing:
        print(f"missing region: {item}")
    for name in sorted(set(regions) - used):
        print(f"region not used in any .md: {name}")
    if check and stale:
        print("out of date, run scripts/sync_snippets.py:\n  " + "\n  ".join(stale))
    if missing or (check and stale):
        sys.exit(1)
    if not check:
        print(f"synced {len(used)} snippets" + (f" into {', '.join(stale)}" if stale else ", nothing changed"))


if __name__ == "__main__":
    main()
