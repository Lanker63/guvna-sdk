export type LifecycleState = "candidate" | "validated" | "ratified" | "applicable" | "superseded" | "rejected" | "retired";
export type LifecycleOperation = "validate" | "reject" | "ratify" | "apply" | "supersede" | "retire";
export interface AuthorityEvidence { authorityIdentity: string; decisionIdentity: string; decisionScope: string; contractIdentity: string; contractVersion: string; provenance: unknown; }
export interface LifecycleGuards { structuralAndSemanticValidation?: boolean; completeProvenance?: boolean; noBlockingGap?: boolean; explicitIncompatibility?: boolean; exactScope?: boolean; effectiveBoundary?: boolean; successor?: boolean; authority?: AuthorityEvidence; }
export interface LifecycleInput { state: LifecycleState; operation: LifecycleOperation; contractIdentity: string; contractVersion: string; scope: string; provenance: unknown; guards: LifecycleGuards; }
export type LifecycleEvaluation = { permitted: true; nextState: LifecycleState } | { permitted: false; reason: string };

export function evaluateLifecycle(input: LifecycleInput | null | undefined): LifecycleEvaluation {
  if (!input || !hasRequiredInput(input)) return { permitted: false, reason: "Required lifecycle input is absent or invalid" };
  const target = transitions[`${input.state}:${input.operation}`];
  if (!target) return { permitted: false, reason: "Transition is unsupported" };
  const guards = input.guards;
  if (input.operation === "validate" && !(guards.structuralAndSemanticValidation && guards.completeProvenance && guards.noBlockingGap)) return { permitted: false, reason: "Validation conditions are unsatisfied" };
  const authorityIsAttributable = isAttributableAuthority(guards.authority, input);
  if (input.operation === "reject" && !(authorityIsAttributable || guards.explicitIncompatibility)) return { permitted: false, reason: "Rejection conditions are unsatisfied" };
  if (["ratify", "supersede", "retire"].includes(input.operation) && !authorityIsAttributable) return { permitted: false, reason: "Attributable human authority is required" };
  if (input.operation === "apply" && !(authorityIsAttributable && guards.exactScope && guards.effectiveBoundary)) return { permitted: false, reason: "Applicability conditions are unsatisfied" };
  if (input.operation === "supersede" && !guards.successor) return { permitted: false, reason: "Successor is required" };
  return { permitted: true, nextState: target };
}

const transitions: Partial<Record<`${LifecycleState}:${LifecycleOperation}`, LifecycleState>> = { "candidate:validate": "validated", "candidate:reject": "rejected", "validated:ratify": "ratified", "validated:reject": "rejected", "ratified:apply": "applicable", "ratified:reject": "rejected", "ratified:retire": "retired", "applicable:supersede": "superseded", "applicable:retire": "retired" };
function hasRequiredInput(input: LifecycleInput): boolean { return typeof input.contractIdentity === "string" && input.contractIdentity.length > 0 && typeof input.contractVersion === "string" && input.contractVersion.length > 0 && typeof input.scope === "string" && input.scope.length > 0 && input.provenance !== undefined && typeof input.guards === "object" && input.guards !== null; }
function isAttributableAuthority(authority: AuthorityEvidence | undefined, input: LifecycleInput): boolean { return Boolean(authority && typeof authority.authorityIdentity === "string" && authority.authorityIdentity.length > 0 && typeof authority.decisionIdentity === "string" && authority.decisionIdentity.length > 0 && authority.decisionScope === input.scope && authority.contractIdentity === input.contractIdentity && authority.contractVersion === input.contractVersion && authority.provenance !== undefined); }