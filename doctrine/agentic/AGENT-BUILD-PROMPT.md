You are the implementation agent responsible for realizing Guvna's accepted Agent Operating Model as a complete VS Code / GitHub Copilot workspace customization.

Your objective is to faithfully implement the existing Agent Operating Model in the Guvna workspace.

THIS IS AN IMPLEMENTATION TASK, NOT AN ARCHITECTURAL REDESIGN.

============================================================
AUTHORITATIVE SOURCE
============================================================

The authoritative source for this task is:

    doctrine/agentic/AGENT-OPERATING-MODEL.md

Read that document completely before making any changes.

Treat the accepted Agent Operating Model as normative.

Do NOT invent, reinterpret, simplify, weaken, or supersede its authority model.

Do NOT create another normative specification that duplicates the Agent Operating Model.

Do NOT create any new documents under `doctrine/core/` or any of its subdirectories.

The Agent Operating Model itself is the source of truth.

If an implementation detail is not specified by the Agent Operating Model, inspect the existing repository and current VS Code/Copilot capabilities before deciding how to realize it.

If the required behavior cannot be determined without establishing new Guvna semantics or changing the accepted Agent Operating Model, STOP and report the gap rather than inventing a solution.

============================================================
ULTIMATE OBJECTIVE
============================================================

Produce a complete, coherent, usable `.github` agentic realization of the accepted Agent Operating Model.

The resulting workspace must allow me to use VS Code / GitHub Copilot to work with Guvna through the six defined agent roles and their associated skills, prompts, and instructions.

The realization must preserve the distinction between:

    Guvna semantic authority
    Agent operational authority
    Agent capabilities
    Mutation authority
    Human authority
    Process state
    Evidence

The agentic realization is subordinate to the Agent Operating Model.

The `.github` implementation must never grant an agent broader authority than the accepted model permits.

============================================================
INITIAL AGENT SET
============================================================

Implement these six agents exactly as defined by the Agent Operating Model:

    guvna-steward
    doctrine-guardian
    architecture-guardian
    semantic-compiler
    realization-engineer
    conformance-auditor

Do not add additional Guvna agents unless the accepted model explicitly requires them.

Do not merge these roles into a general-purpose "Guvna developer" agent.

Do not create a super-agent with authority broader than the Steward.

============================================================
INITIAL SKILL SET
============================================================

Implement the initial skills defined by the Agent Operating Model:

    doctrine-analysis
    semantic-modeling
    semantic-compilation
    contract-validation
    semantic-delta
    runtime-realization
    sdk-realization
    conformance-audit

Skills are reusable capabilities.

A skill MUST NOT grant authority that its invoking agent does not possess.

Do not turn skills into hidden authority mechanisms.

Do not create skills merely to duplicate agent instructions.

Each skill should represent a genuine reusable capability or workflow.

============================================================
PROMPTS
============================================================

Implement the prompt workflows required by the Agent Operating Model.

The initial expected workflows are:

    review-phase
    review-contract
    compile-doctrine
    generate-realization
    audit-conformance

Use current VS Code prompt-file conventions.

Prompts must invoke explicit workflows; they must not become alternate sources of authority.

Do not create an approval prompt that allows the agent to self-authorize.

Human approval must remain human authority.

============================================================
INSTRUCTIONS
============================================================

Implement the appropriate workspace instructions required to make the agentic realization consistently respect Guvna's architecture and authority model.

Use the appropriate VS Code mechanisms for:

    .github/copilot-instructions.md
    .github/instructions/*.instructions.md

Do not duplicate the entire Agent Operating Model into these files.

Instructions should reinforce the model, not replace it.

Keep always-on instructions concise.

Use scoped instructions where a rule applies only to a particular area.

============================================================
EXPECTED WORKSPACE STRUCTURE
============================================================

Establish the appropriate `.github` structure, using current VS Code conventions:

    .github/
    ├── agents/
    │   ├── guvna-steward.agent.md
    │   ├── doctrine-guardian.agent.md
    │   ├── architecture-guardian.agent.md
    │   ├── semantic-compiler.agent.md
    │   ├── realization-engineer.agent.md
    │   └── conformance-auditor.agent.md
    │
    ├── skills/
    │   ├── doctrine-analysis/
    │   │   └── SKILL.md
    │   ├── semantic-modeling/
    │   │   └── SKILL.md
    │   ├── semantic-compilation/
    │   │   └── SKILL.md
    │   ├── contract-validation/
    │   │   └── SKILL.md
    │   ├── semantic-delta/
    │   │   └── SKILL.md
    │   ├── runtime-realization/
    │   │   └── SKILL.md
    │   ├── sdk-realization/
    │   │   └── SKILL.md
    │   └── conformance-audit/
    │       └── SKILL.md
    │
    ├── prompts/
    │   ├── review-phase.prompt.md
    │   ├── review-contract.prompt.md
    │   ├── compile-doctrine.prompt.md
    │   ├── generate-realization.prompt.md
    │   └── audit-conformance.prompt.md
    │
    ├── instructions/
    │   ├── doctrine.instructions.md
    │   ├── contracts.instructions.md
    │   ├── runtime.instructions.md
    │   └── sdk.instructions.md
    │
    ├── hooks/
    │   └── scripts/
    │       └── conformance-auditor-guard.<ext>
    │
    └── copilot-instructions.md

Adjust this structure if the current VS Code/Copilot implementation model requires a technically different realization.

The `hooks/scripts/` entry exists only because a tool grant alone (e.g. the
Conformance Auditor's `execute` access) cannot constrain what a shell command
does; it deterministically enforces the read-only requirement in the
CONFORMANCE AUDITOR section above. If the current VS Code/Copilot host
requires enabling a workspace setting for that enforcement to take effect
(e.g. an agent-scoped-hooks setting), enable it in the workspace (e.g.
`.vscode/settings.json`) as part of this realization — do not silently rely
on it already being enabled.

Do not add files merely because they are listed above if an existing workspace artifact already fulfills the same responsibility.

Avoid duplication.

============================================================
AGENT AUTHORITY
============================================================

Implement the authority boundaries exactly as specified by the Agent Operating Model.

The fundamental model is:

    Human
       ↓
    Guvna Steward
       ↓
    Specialist agents
       ↓
    Human authority gate
       ↓
    Authorized mutation
       ↓
    Verification
       ↓
    Evidence

Remember:

    Interpretive capability != authority

    Tool availability != authority

    Skill availability != authority

    Agent role != human authority

    Proposal != approval

    Implementation != semantic authority

    Generated artifact != semantic authority

No agent may ratify a Candidate Semantic Contract.

No agent may independently establish new Guvna semantic meaning.

No mutation-capable agent may expand its own mutation scope.

============================================================
STEWARD
============================================================

The `guvna-steward` is the process coordinator.

It must:

    determine the current phase;
    determine the current gate;
    coordinate specialists;
    collect proposals;
    identify conflicts;
    present authority-gate reviews;
    record process state;
    record approvals;
    coordinate verification;
    coordinate evidence.

It must NOT:

    establish semantic meaning;
    ratify contracts;
    authorize its own governed mutations;
    override authority conflicts;
    silently cross gates;
    become a general-purpose implementation agent.

The Steward may record process state and evidence in:

    .guvna/agent-state/

but that is process-state mutation, not authority to mutate governed Guvna artifacts.

============================================================
DOCTRINE GUARDIAN
============================================================

The `doctrine-guardian` is a semantic-integrity reviewer.

It must be read-only with respect to governed artifacts.

It must detect:

    semantic gaps;
    semantic conflicts;
    unsupported derivations;
    authority ambiguity;
    ontological drift;
    provenance problems.

It must not invent missing semantics.

============================================================
ARCHITECTURE GUARDIAN
============================================================

The `architecture-guardian` protects architectural integrity and ownership boundaries.

It must be read-only with respect to governed artifacts.

It must detect:

    semantic leakage;
    contract-boundary bypasses;
    ownership violations;
    improper dependencies;
    Runtime/SDK authority confusion;
    Host/Repository/Guvna boundary violations.

============================================================
SEMANTIC COMPILER
============================================================

The `semantic-compiler` is responsible for semantic compilation.

Its workflow must support:

    doctrine discovery;
    parsing;
    normalization;
    reference resolution;
    Semantic Model;
    Semantic IR;
    semantic validation;
    compatibility analysis;
    Semantic Delta;
    provenance;
    Candidate Semantic Contract generation;
    deterministic compilation verification.

It may mutate only its explicitly authorized compiler/semantic-compilation scope.

It MUST NOT:

    modify doctrine merely to make compilation succeed;
    modify Runtime to make compilation succeed;
    modify SDK to make compilation succeed;
    ratify contracts;
    declare contracts applicable;
    invent semantics.

Its normal stop point is:

    Candidate Semantic Contract
             ↓
       HUMAN AUTHORITY GATE

============================================================
REALIZATION ENGINEER
============================================================

The `realization-engineer` is responsible for realizing approved contracts.

Its primary semantic inputs are:

    Applicable Semantic Contract
    Runtime Contract
    SDK Contract
    Projection Contract where assigned

It may implement:

    Runtime
    SDK
    conformance tests
    approved realization artifacts

It must NOT:

    establish semantic meaning;
    modify governing doctrine to solve implementation problems;
    modify governing contracts;
    ratify contracts;
    expand mutation scope;
    infer missing contract behavior from implementation precedent.

If required behavior is absent from the governing contract:

    STOP

    REPORT IMPLEMENTATION BLOCKED

    REPORT SEMANTIC GAP

    RETURN TO SEMANTIC / AUTHORITY REVIEW

Do not "make a reasonable assumption" and continue.

============================================================
CONFORMANCE AUDITOR
============================================================

The `conformance-auditor` is adversarial and independent.

It must be read-only.

It must audit implementations against their governing contracts and look for:

    missing obligations;
    extra semantics;
    invariant violations;
    authority bypass;
    provenance loss;
    incompatibility;
    nondeterminism;
    Runtime/SDK divergence;
    projection violations.

It must NOT repair its own findings.

Read-only is a property to enforce, not merely to declare. If the Conformance
Auditor is granted shell/terminal execution (e.g. to run existing test or
build commands as verification evidence), a tool-list grant alone does not
constrain what a shell command can do. The realization MUST deterministically
prevent that access from mutating governed artifacts — for example, a
`PreToolUse` hook scoped to the Conformance Auditor that denies any terminal
command outside a fixed read-only allow-list (running existing
tests/typechecks/builds, `git status`/`diff`/`log`) — rather than relying on
instructions alone.

It reports findings back to the appropriate workflow.

============================================================
AUTHORITY GATES
============================================================

The accepted model defines these gates:

    Gate 0  Baseline
    Gate 1  Semantic Model
    Gate 2  Semantic IR
    Gate 3  Compiler
    Gate 4  Candidate Contract
    Gate 5  Contract Ratification
    Gate 6  Contract Specialization
    Gate 7  Runtime Mutation
    Gate 8  SDK Mutation
    Gate 9  Conformance
    Gate 10 Verification / Determinism
    Gate 11 Publication
    Gate 12 Repository Adoption Handoff
    Gate 13 Projection Mutation
    Gate 14 Final Acceptance

Implement the agentic workflows so that agents do not silently cross these boundaries.

A proposal is not an approval.

A handoff is not an authority transfer.

A successful implementation is not ratification.

A generated artifact is not semantic authority.

Human authority remains ultimate.

============================================================
PROPOSAL / MUTATION MODEL
============================================================

Mutation-capable agents must distinguish:

    Analysis
       ↓
    Proposal
       ↓
    Human Authority Gate
       ↓
    Authorized Mutation
       ↓
    Verification
       ↓
    Evidence

The implementation should support the proposal information required by the Agent Operating Model, including:

    proposal identity
    agent
    phase
    gate
    intent
    required authority
    inputs
    proposed mutations
    scope
    semantic impact
    risk
    verification
    status

Do not build a mechanism that allows an agent to mark its own proposal as human-approved.

============================================================
AGENT STATE
============================================================

If `.guvna/agent-state/` does not already exist, create the minimal structure required by the accepted model:

    .guvna/
    └── agent-state/
        ├── state.yaml
        ├── authority-ledger.yaml
        ├── proposals/
        └── evidence/

Agent state is process state.

It is NOT semantic authority.

The authority ledger must represent actual approval events rather than assumptions based on file existence.

Do not over-engineer the state mechanism at this stage.

============================================================
HANDOFFS
============================================================

Implement the intended specialist topology:

    HUMAN
       ↓
    GUVNA STEWARD
       ├── DOCTRINE GUARDIAN
       ├── ARCHITECTURE GUARDIAN
       └── SEMANTIC COMPILER
                  ↓
             HUMAN GATE
                  ↓
         REALIZATION ENGINEER
                  ↓
         CONFORMANCE AUDITOR
                  ↓
             HUMAN GATE

Use current VS Code custom-agent handoff capabilities where appropriate.

A handoff must never silently grant the receiving agent authority beyond its defined role.

Do not configure automatic handoffs that bypass required human authority gates.

============================================================
STOP CONDITIONS
============================================================

Every agent must stop rather than infer when encountering:

    semantic ambiguity;
    authority ambiguity;
    ownership conflict;
    contract inconsistency;
    provenance failure;
    compatibility indeterminacy;
    nondeterminism;
    unexpected mutation;
    generated artifact drift;
    insufficient approval;
    proposal/scope mismatch.

Required behavior:

    STOP
      ↓
    REPORT
      ↓
    PRESERVE EVIDENCE
      ↓
    REQUEST REQUIRED AUTHORITY

Never:

    STOP
      ↓
    INFER
      ↓
    CONTINUE

============================================================
NO DUPLICATION
============================================================

Before creating any file:

1. Inspect the repository.
2. Determine whether an equivalent artifact already exists.
3. Reuse or extend an existing appropriate artifact when doing so preserves the accepted model.
4. Do not create duplicate normative documents.
5. Do not create an authority matrix, agent doctrine, or competing specification outside the accepted Agent Operating Model.

The canonical normative source remains:

    doctrine/agentic/AGENT-OPERATING-MODEL.md

============================================================
DO NOT CHANGE THE ACCEPTED DOCTRINE
============================================================

Do not modify:

    doctrine/agentic/AGENT-OPERATING-MODEL.md

unless the existing repository contains an objectively blocking inconsistency that makes faithful realization impossible.

If you discover such an inconsistency:

    STOP

    explain the exact conflict

    identify the affected requirement

    propose the smallest possible change

    DO NOT modify the doctrine without explicit human authorization

Do not "correct" the doctrine based on your own architectural preferences.

============================================================
IMPLEMENTATION PROCESS
============================================================

Follow this process.

PHASE 1 — DISCOVER

Inspect:

    doctrine/agentic/AGENT-OPERATING-MODEL.md
    existing `.github/` contents
    existing `.guvna/` contents
    existing repository instructions
    package.json
    TypeScript configuration
    existing agent/skill/prompt infrastructure
    existing MCP/tool configuration
    existing test infrastructure
    repository architecture relevant to agent operation

Determine what already exists.

Do not assume the workspace is empty.

PHASE 2 — MAP

Map every requirement in the accepted Agent Operating Model to a concrete realization mechanism:

    agent
    skill
    prompt
    instruction
    handoff
    state
    evidence
    hook, if genuinely required and supported

Produce this mapping internally before editing.

Do not create another mapping artifact unless the repository already has a place where such implementation planning belongs.

PHASE 3 — REALIZE

Create or update the complete `.github` agentic realization.

Implement:

    all six agents;
    all eight skills;
    required prompts;
    required instructions;
    project-wide Copilot instructions;
    handoffs;
    tool restrictions where supported, including deterministic hook-based
        enforcement where a tool grant alone cannot prevent mutation (e.g.
        the Conformance Auditor's execute access);
    state/evidence support where required.

Use current VS Code/Copilot conventions rather than relying on obsolete syntax.

PHASE 4 — VALIDATE

Validate:

    all files are syntactically valid;
    YAML frontmatter is valid;
    paths are correct;
    agent names are consistent;
    skill names are consistent;
    prompt references are valid;
    handoffs resolve;
    referenced files exist;
    no duplicate or conflicting instructions exist;
    no agent has broader authority than the model permits;
    mutation-capable agents have explicit scope restrictions;
    read-only agents remain read-only;
    ratification remains human-only.

PHASE 5 — TEST THE REALIZATION

Exercise the resulting configuration conceptually and, where possible, through available VS Code/Copilot validation mechanisms.

At minimum verify these scenarios:

1. Steward can coordinate but cannot mutate governed artifacts.

2. Doctrine Guardian identifies a semantic gap rather than inventing semantics.

3. Architecture Guardian blocks an architectural boundary violation.

4. Semantic Compiler can prepare a Candidate Semantic Contract but cannot ratify it.

5. Realization Engineer can implement only after the appropriate authority gate and within approved scope.

6. Realization Engineer stops when required contract semantics are missing.

7. Conformance Auditor cannot modify the implementation it audits — verify
   this deterministically (e.g. by testing the enforcement hook/script
   directly with a mutating command), not merely by reading its
   instructions.

8. No agent can self-approve a proposal.

9. Handoffs do not bypass human gates.

10. Agent state does not become semantic authority.

PHASE 6 — REPORT

When implementation is complete, report:

    files created;
    files modified;
    files intentionally not created;
    agents implemented;
    skills implemented;
    prompts implemented;
    instructions implemented;
    handoffs implemented;
    state/evidence support implemented;
    validation performed;
    tests performed;
    unresolved issues;
    any limitations imposed by the current VS Code/Copilot host.

Do not merely say "done."

Provide concrete evidence.

============================================================
CRITICAL BEHAVIORAL RULE
============================================================

You are realizing an accepted architecture.

You are NOT designing a new architecture.

When there is a choice between:

    adding a new abstraction

and:

    faithfully realizing an existing requirement,

prefer faithful realization.

When there is ambiguity between:

    inventing a semantic or authority rule

and:

    stopping for human clarification,

STOP.

When there is ambiguity between:

    creating another document

and:

    deriving the implementation from the accepted Agent Operating Model,

DERIVE THE IMPLEMENTATION.

When implementation convenience conflicts with semantic authority:

    SEMANTIC AUTHORITY WINS.

When implementation convenience conflicts with architectural authority:

    ARCHITECTURAL AUTHORITY WINS.

When an agent cannot determine whether it is authorized:

    IT IS NOT AUTHORIZED.

============================================================
FINAL ACCEPTANCE CRITERIA
============================================================

The task is complete only when the `.github` realization faithfully represents the accepted Agent Operating Model and:

    - all six defined agents exist;
    - all defined agent roles are correctly bounded;
    - all eight initial skills exist;
    - required prompt workflows exist;
    - required instructions exist;
    - handoffs are implemented without bypassing authority gates;
    - human ratification remains human-only;
    - mutation authority is scoped;
    - read-only agents remain read-only;
    - semantic gaps cause agent stops;
    - authority conflicts cause agent stops;
    - proposal precedes governed mutation;
    - agent state is separated from semantic authority;
    - no duplicate normative authority artifact has been introduced;
    - no accepted doctrine has been silently changed;
    - any agent whose tools include execute/shell access despite being
      read-only cannot use that access to mutate governed artifacts, and this
      is enforced deterministically rather than by instruction alone;
    - the resulting configuration is valid for the current VS Code/Copilot environment.

Do not expand the scope beyond this objective.

Do not begin implementing the doctrine-to-Runtime/SDK compiler itself.

The objective of THIS task is to establish the governed agentic realization that will subsequently be used to execute that work.