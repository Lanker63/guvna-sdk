#!/usr/bin/env python3
"""PreToolUse hook scoped to the conformance-auditor agent.

Deterministically enforces that the auditor cannot mutate anything, even
though it is granted terminal (execute) access to run existing verification
commands. A tool-list grant alone cannot constrain what a shell command does,
so this hook inspects every tool call and denies anything that looks like a
mutation of a governed artifact.

Default posture: allow read/search-shaped tools; deny anything that looks
like a write; for terminal/execute tools, allow only a small read-only
command allowlist and deny everything else.
"""
import json
import re
import sys


def deny(reason):
    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "deny",
            "permissionDecisionReason": reason,
        }
    }))
    sys.exit(0)


def allow():
    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "allow",
        }
    }))
    sys.exit(0)


# Tool names that mutate or take governed action regardless of arguments.
DENY_NAME_PATTERNS = re.compile(
    r"create_file|create_directory|create_new_|replace_string_in_file|"
    r"multi_replace_string_in_file|edit_notebook_file|run_notebook_cell|"
    r"rename_?symbol|install_extension|"
    r"git_add|git_commit|git_push|git_checkout|git_stash|git_branch|"
    r"git_resolve|git_worktree|git_fetch|"
    r"issues_add_comment|issues_create|pull_request_create|"
    r"pull_request_create_review|"
    r"use_figma|upload_assets|add_code_connect_map|send_code_connect_mappings|"
    r"download_assets|export_video|create_new_file|"
    r"handle_dialog|click_element|type_in_page|drag_element|navigate_page",
    re.IGNORECASE,
)

# Broad fallback: deny unrecognized tool names that look mutating by name.
MUTATING_WORD_PATTERNS = re.compile(
    r"\b(edit|write|delete|remove|rename|create|commit|push|merge|resolve|"
    r"stash|checkout|install|publish|reset|drop|migrate|apply|patch)\b",
    re.IGNORECASE,
)

EXEC_NAME_PATTERNS = re.compile(
    r"run_in_terminal|send_to_terminal|terminal|execute|shell", re.IGNORECASE
)

# Whole shell-command segments (split on && ; | ||) must match one of these.
SAFE_COMMAND_PATTERNS = [
    re.compile(r"^git\s+(status|diff|log|show|branch(\s+--list)?)(\s|$)", re.IGNORECASE),
    re.compile(r"^pnpm(\s+-r)?\s+(build|test|typecheck|lint)(\s|$)", re.IGNORECASE),
    re.compile(r"^pnpm\s+(--filter\s+\S+|-C\s+\S+)\s+(build|test|typecheck|lint|validate:platform)(\s|$)", re.IGNORECASE),
    re.compile(r"^npx\s+vitest\s+run(\s|$)", re.IGNORECASE),
    re.compile(r"^tsc\b.*--noEmit", re.IGNORECASE),
    re.compile(r"^(ls|cat|find|grep|wc|head|tail|echo|pwd)\b", re.IGNORECASE),
]

FORBIDDEN_SUBSTRINGS = [
    ">", ">>", "rm ", "rm\t", " mv ", " cp ", "sed -i", " dd ", "chmod",
    "chown", ":(){", "curl", "wget", "ssh ", "scp ", "sudo", "--force",
    "git commit", "git push", "git add", "git checkout", "git reset",
    "git stash", "git merge", "git rebase", "npm publish", "pnpm publish",
    "kill ",
]


def check_exec_command(command):
    if not command:
        deny("Terminal command missing or unreadable; denying by default.")
    lowered = command.lower()
    for bad in FORBIDDEN_SUBSTRINGS:
        if bad in lowered:
            deny(f"Command contains disallowed pattern: {bad!r}")
    segments = re.split(r"&&|\|\||;|\|", command)
    for seg in segments:
        seg = seg.strip()
        if not seg:
            continue
        if not any(p.match(seg) for p in SAFE_COMMAND_PATTERNS):
            deny(f"Command segment not in read-only allowlist: {seg!r}")
    allow()


def main():
    try:
        raw = sys.stdin.read()
        data = json.loads(raw) if raw else {}
    except Exception:
        deny("Could not parse hook input; denying by default.")
        return

    tool_name = str(data.get("tool_name", ""))
    tool_input = data.get("tool_input") or {}

    if DENY_NAME_PATTERNS.search(tool_name):
        deny(f"Tool '{tool_name}' is a mutating operation; conformance-auditor is read-only.")

    if tool_name == "memory":
        if str(tool_input.get("command", "")) != "view":
            deny("conformance-auditor may only use the memory tool's 'view' command.")
        allow()

    if tool_name == "session_store_sql":
        if str(tool_input.get("action", "query")) == "reindex":
            deny("conformance-auditor may only query the session store, not reindex it.")
        allow()

    if EXEC_NAME_PATTERNS.search(tool_name):
        command = str(tool_input.get("command", "") or tool_input.get("cmd", ""))
        check_exec_command(command)
        return

    if MUTATING_WORD_PATTERNS.search(tool_name):
        deny(f"Tool '{tool_name}' name suggests mutation; conformance-auditor is read-only.")

    allow()


if __name__ == "__main__":
    main()
