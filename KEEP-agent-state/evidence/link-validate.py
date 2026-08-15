import glob
import os
import re
import sys

LINK_RE = re.compile(r"\]\(([^)]+)\)")

files = []
files += glob.glob(".github/**/*.md", recursive=True)

failures = []
checked = 0
for path in sorted(files):
    text = open(path, encoding="utf-8").read()
    base_dir = os.path.dirname(path)
    for m in LINK_RE.finditer(text):
        target = m.group(1)
        if target.startswith(("http://", "https://", "#")):
            continue
        target_path = target.split("#")[0]
        resolved = os.path.normpath(os.path.join(base_dir, target_path))
        checked += 1
        if not os.path.exists(resolved):
            failures.append((path, target, resolved))

print(f"Checked {checked} relative links across {len(files)} files.")
if failures:
    print(f"{len(failures)} BROKEN LINK(S):")
    for path, target, resolved in failures:
        print(f"  FAIL | {path} -> {target} (resolved: {resolved})")
    sys.exit(1)
else:
    print("All relative links resolve to existing files.")
