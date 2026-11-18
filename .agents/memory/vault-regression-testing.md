---
name: Vault regression testing
description: Security boundary for testing encrypted device storage and lock races.
---

Keep storage fault injection entirely in isolated browser-test contexts. Use synthetic
profiles and passphrases with native IndexedDB and WebCrypto; never add a production
unlock bypass or use real Meta credentials.

**Why:** The vault's locking and encryption are the product's security boundary.
Mock databases and application test shortcuts can hide the browser timing failures
the regression suite is intended to catch.

**How to apply:** For new persistence regressions, control browser API timing in
the test runner and assert both the visible UI result and the persisted encrypted
record. Keep installation/offline testing separate from device-vault regressions.

Dialog keyboard and focus handling must be ready when the dialog becomes visible,
not deferred to a passive effect.

**Why:** Preact can display a dialog before passive effects run, letting a fast
Escape keypress go unhandled on CI even when local runs pass.

**How to apply:** Install critical dialog input handling in a layout effect and
assert that the dialog is gone before interacting with the desk behind it. Do not
hide these races with sleeps, forced clicks, or blanket test retries.
