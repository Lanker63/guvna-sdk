# Runtime Gateway Host

This package hosts the Core Runtime gateway over HTTP. It does not provide
semantic rules, projection artifacts, or Runtime operation inputs. Those values
must come from production-owned configuration and modules.

## Start

Build the package, then provide all required configuration:

```sh
pnpm build
GUVNA_RUNTIME_PROJECTION=/path/to/runtime-projection.json \
GUVNA_RUNTIME_RULES_MODULE=/path/to/runtime-rules.mjs \
GUVNA_RUNTIME_BIND_ADDRESS=127.0.0.1 \
GUVNA_RUNTIME_PORT=4317 \
pnpm start
```

The rules module must default-export an approved `RuntimeSemanticRules`
implementation. The projection must be a Core-exported artifact with current
freshness metadata and ratified contracts. No test fixture or mock service is
used by this startup path.

The VS Code host must be configured separately with `guvna.runtimeEndpoint`
pointing at the running gateway endpoint.
