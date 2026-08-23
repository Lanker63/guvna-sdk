# Changelog

## 0.9.0

- Add pre-governance Domain Pack request encoding for eligible discovery,
	installation, and compatibility reporting.
- Add correlated, fail-closed decoding for pre-governance Domain Pack
	responses.

## 0.8.0

- Add adapter-free Runtime operation request encoding and result receipt.
- Preserve request correlation and fail closed for malformed remote results.

## 0.7.0

- Add the distinct adapter-free `receiveRuntimeAdmissionDecision` API for
	Core-backed Runtime admission responses.
- Require and preserve validated projection provenance for remote admission.

## 0.6.0

- Add asynchronous Runtime admission transport with request correlation.
- Preserve and validate projection freshness and provenance in admission responses.
- Add a distinct adapter-free receiver for Core-backed Runtime admission decisions.

## 0.5.1

- Publish the acceptance-record discovery response codecs added for host
	candidate presentation.

## 0.5.0

- Add repository-scoped acceptance-record discovery response types and
	fail-closed codecs.

## 0.4.0

- Add versioned authority freshness and acceptance-decision transport operations.

## 0.3.0

- Add versioned acceptance-record transport types and codecs.
- Validate repository-scoped authority context and change-set manifests.

## 0.2.1

- Add opaque Domain Pack installation response decoding.

## 0.2.0

- Add generic Runtime protocol request and response envelopes.
- Add correlated Domain Pack discovery and installation transport requests.
- Preserve SDK admission and delegate semantic validation to the injected Runtime adapter.