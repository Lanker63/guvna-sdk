# Core/SDK Runtime Protocol Boundary

## Status

Approved Phase 1 decision. This note defines the packaging boundary and the
minimum stable local protocol contract for Phase 2 implementation. It does not
redefine Guvna semantic, Runtime, or SDK meaning.

## 1. Delivery Decision

`@guvna/core` will be delivered as a licensed compiled runtime on the
Guvna-owned side of the boundary. Hosts will access it through a stable local
runtime protocol. Third-party hosts consume only the public `@guvna/sdk`
package and do not import `@guvna/core`.

The licensed runtime may be provisioned and activated separately from the SDK.
Provisioning, licensing, and activation details are delivery concerns and are
not part of the semantic protocol.

## 2. Boundary Ownership

- Core owns semantic admission, Runtime validation, and Runtime result
  validation.
- SDK owns protocol-client behavior, serialization, request correlation, and
  translation of protocol outcomes into its public transport result types.
- The host owns local process/session lifecycle, transport setup, and
  presentation. It does not construct an applicable context or reinterpret a
  Core result.
- The protocol carries already-defined contract values. It does not add
  semantic defaults, normalization, inference, or host-specific fields.

## 3. Protocol Shape

The protocol is a request/response exchange over a local, host-managed runtime
connection. The initial wire representation is UTF-8 JSON, with one complete
JSON message per transport frame.

Every request has this envelope:

```json
{
  "protocolVersion": "1",
  "requestId": "opaque-host-generated-id",
  "operation": "operation-name",
  "context": {},
  "payload": {}
}
```

Every response has this envelope:

```json
{
  "protocolVersion": "1",
  "requestId": "opaque-host-generated-id",
  "ok": true,
  "payload": {}
}
```

A failed response has the same envelope with `ok: false` and a stable failure
reason:

```json
{
  "protocolVersion": "1",
  "requestId": "opaque-host-generated-id",
  "ok": false,
  "reason": "failure reason"
}
```

`context` and `payload` contain only values defined by the applicable SDK and
Runtime contracts. Their validation remains authoritative at the Core
boundary. `requestId` is used only to correlate a response and has no semantic
meaning.

## 4. Transport and Lifecycle

- The runtime is a separately managed local process or local runtime endpoint.
- The host starts or attaches to the runtime before issuing requests and owns
  shutdown and restart behavior.
- Requests are synchronous from the SDK contract perspective: each request
  produces one correlated response or a transport failure.
- The protocol must fail closed for malformed frames, unknown operations,
  unsupported protocol versions, missing correlation identifiers, and runtime
  unavailability.
- The SDK must not silently retry a request unless a later approved contract
  explicitly establishes retry safety.

The concrete local transport (for example, IPC or loopback communication) is an
implementation choice beneath this protocol and must not change the envelope
or contract values.

## 5. Compatibility

- `protocolVersion` is a required major protocol version.
- A runtime must reject unsupported major versions explicitly.
- Backward-compatible additions require a compatible minor revision policy and
  must preserve existing required fields and meanings.
- Breaking changes require a new major protocol version.
- SDK and runtime compatibility is established during connection setup before
  contract requests are admitted.

## 6. Phase 2 Consequences

Phase 2 may replace SDK top-level Core imports with an injected protocol/runtime
adapter. The adapter must expose the existing admission and operation/result
contract behavior without adding semantic authority to the SDK.

The published SDK package must have no runtime dependency or peer dependency on
`@guvna/core`. Core may remain available to local development fixtures through
non-published development tooling while the protocol adapter is implemented.

## 7. Explicit Non-Goals

This decision does not define:

- new Runtime operations or result fields;
- licensing terms, entitlement rules, or activation algorithms;
- a public network service;
- a specific IPC or loopback library;
- host presentation or product behavior.
