import json
import subprocess
import sys

SCRIPT = ".github/hooks/scripts/conformance-auditor-guard.py"

CASES = [
    ("allowed read tool", {"tool_name": "read_file", "tool_input": {"filePath": "foo.ts"}}, "allow"),
    ("create_file by name", {"tool_name": "create_file", "tool_input": {"filePath": "x.ts", "content": "y"}}, "deny"),
    ("replace_string_in_file by name", {"tool_name": "replace_string_in_file", "tool_input": {}}, "deny"),
    ("safe terminal command", {"tool_name": "run_in_terminal", "tool_input": {"command": "pnpm -C core test"}}, "allow"),
    ("safe chained git read", {"tool_name": "run_in_terminal", "tool_input": {"command": "git status && git diff"}}, "allow"),
    ("dangerous rm -rf", {"tool_name": "run_in_terminal", "tool_input": {"command": "rm -rf core/runtime"}}, "deny"),
    ("git commit via terminal", {"tool_name": "run_in_terminal", "tool_input": {"command": "git add -A && git commit -m x"}}, "deny"),
    ("chained safe+unsafe", {"tool_name": "run_in_terminal", "tool_input": {"command": "git status && rm -rf /"}}, "deny"),
    ("gitkraken commit tool by name", {"tool_name": "mcp_gitkraken_cli_git_commit", "tool_input": {}}, "deny"),
    ("memory view", {"tool_name": "memory", "tool_input": {"command": "view", "path": "/memories/"}}, "allow"),
    ("memory create", {"tool_name": "memory", "tool_input": {"command": "create", "path": "/memories/x.md"}}, "deny"),
    ("session_store_sql reindex", {"tool_name": "session_store_sql", "tool_input": {"action": "reindex"}}, "deny"),
    ("session_store_sql query", {"tool_name": "session_store_sql", "tool_input": {"action": "query"}}, "allow"),
    ("send_to_terminal safe", {"tool_name": "send_to_terminal", "tool_input": {"command": "ls"}}, "allow"),
    ("send_to_terminal unsafe", {"tool_name": "send_to_terminal", "tool_input": {"command": "sudo rm -rf /"}}, "deny"),
]

failures = []
for label, payload, expected in CASES:
    proc = subprocess.run(
        [sys.executable, SCRIPT],
        input=json.dumps(payload),
        capture_output=True,
        text=True,
    )
    try:
        out = json.loads(proc.stdout.strip().splitlines()[-1])
        decision = out["hookSpecificOutput"]["permissionDecision"]
    except Exception as e:
        decision = f"<parse error: {e}; stdout={proc.stdout!r}>"
    ok = decision == expected
    print(f"{'OK ' if ok else 'FAIL'} | {label:35s} | expected={expected:5s} got={decision}")
    if not ok:
        failures.append(label)

# unparsable input
proc = subprocess.run([sys.executable, SCRIPT], input="not json", capture_output=True, text=True)
out = json.loads(proc.stdout.strip())
decision = out["hookSpecificOutput"]["permissionDecision"]
ok = decision == "deny"
print(f"{'OK ' if ok else 'FAIL'} | {'unparsable input':35s} | expected=deny  got={decision}")
if not ok:
    failures.append("unparsable input")

print()
if failures:
    print(f"{len(failures)} FAILURE(S): {failures}")
    sys.exit(1)
else:
    print("All cases passed.")
