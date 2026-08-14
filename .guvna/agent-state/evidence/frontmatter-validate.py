import glob
import sys
import yaml

REQUIRED_DESCRIPTION = {"agent", "instruction", "prompt", "skill"}

files = []
files += glob.glob(".github/agents/*.agent.md")
files += glob.glob(".github/skills/*/SKILL.md")
files += glob.glob(".github/prompts/*.prompt.md")
files += glob.glob(".github/instructions/*.instructions.md")

failures = []
for path in sorted(files):
    text = open(path, encoding="utf-8").read()
    if not text.startswith("---\n"):
        failures.append((path, "does not start with '---' frontmatter delimiter"))
        continue
    end = text.find("\n---", 4)
    if end == -1:
        failures.append((path, "no closing '---' frontmatter delimiter"))
        continue
    fm_text = text[4:end]
    try:
        fm = yaml.safe_load(fm_text)
    except Exception as e:
        failures.append((path, f"YAML parse error: {e}"))
        continue
    if not isinstance(fm, dict):
        failures.append((path, "frontmatter did not parse to a mapping"))
        continue
    if "description" not in fm or not fm["description"]:
        failures.append((path, "missing required 'description'"))

    # SKILL.md-specific: name must match folder name
    if path.endswith("SKILL.md"):
        folder = path.split("/")[-2]
        if fm.get("name") != folder:
            failures.append((path, f"name '{fm.get('name')}' does not match folder '{folder}'"))

    print(f"OK   | {path} | keys={sorted(fm.keys())}")

print()
if failures:
    print(f"{len(failures)} FAILURE(S):")
    for path, reason in failures:
        print(f"  FAIL | {path} | {reason}")
    sys.exit(1)
else:
    print(f"All {len(files)} customization files have valid frontmatter.")
