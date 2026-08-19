---
name: team-perspective
description: "Obtain perspectives from Don, Ollie, Doc, Martin, and Platform Architect on a Guvna topic, then synthesize them into one cogent response."
argument-hint: "Enter the topic or question for the team to examine"
agent: "agent"
---
Examine the following topic or question:

${input:topic:Enter the topic or question to examine}

Delegate the topic independently to each of these exact custom agents:

- Don
- Ollie
- Doc
- Martin
- Platform Architect

Ask every agent for:
- Their insight and interpretation of the topic
- Specific comments, risks, or objections
- A concrete proposal or recommendation
- The assumptions, evidence, and unresolved authority decisions behind their view

Use each agent's intended area of expertise, but do not ask any agent to invent Guvna semantic meaning. Treat doctrine/core as governing authority when relevant. When the topic exposes a missing semantic or authority decision, identify that gap explicitly instead of resolving it by inference.

After all five agents respond, synthesize their views into one cogent response. Do not merely concatenate or average the reports. Reconcile compatible recommendations, explain material disagreements, distinguish doctrine-backed conclusions from implementation proposals, and call out where the team lacks enough authority or evidence to decide.

Use this structure:

## Conclusion
State the clearest answer or decision available.

## Team Synthesis
Summarize the strongest convergences and the material disagreements across the five perspectives.

## Proposal
Give a concrete, scoped recommendation with rationale. Include sequencing or next steps only when they follow from the available authority and evidence.

## Open Decisions and Risks
List unresolved authority questions, assumptions, dependencies, and risks. Do not silently fill gaps.

## Agent Perspectives
For each agent, provide a concise note covering their distinctive insight, concern, and proposal. Preserve meaningful dissent.

Keep the response precise and decision-oriented. Cite relevant workspace files when they support a claim, and clearly label speculation or proposal as such.