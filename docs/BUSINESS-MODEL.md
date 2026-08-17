# Business Model

Guvna is positioned as an asymmetric digital business model: the public SDK is distributed as the developer artifact for third-party host adoption, while `@guvna/core` is a licensed, compiled runtime on the Guvna-owned side of the boundary. The preferred host exposure for the runtime is a stable local runtime protocol. This document is business-model and positioning language only. It does not define doctrine, runtime semantics, SDK semantics, or host realization boundaries.

```text
Guvna
|-- PUBLIC SDK
|   `-- Third-party hosts
|       |-- Acme Host
|       |-- Beta Host
|       `-- Gamma Host
`-- LICENSED COMPILED RUNTIME
   `-- @guvna/core
      `-- Stable local runtime protocol
```

Third-party hosts are complements. They consume the public SDK independently and realize transport, presentation, and lifecycle around the SDK boundary. The runtime is monetized as a licensed compiled product rather than as a public developer dependency.

The exact licensing terms for the runtime are governed outside this document and are not established here.

Boundary note: this page does not redefine doctrine, runtime semantics, SDK semantics, or host realization boundaries.