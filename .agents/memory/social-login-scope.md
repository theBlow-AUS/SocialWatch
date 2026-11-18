---
name: Social login scope
description: Product boundaries for connecting Meta accounts in a fully static installation.
---

Offer optional two-step entry: Facebook authorization first, then the encrypted
local vault passphrase. Facebook must not replace the vault passphrase or
establish a synchronized Social Watch user account. Keep the runtime fully static
for both GitHub Pages and self-hosting, with passphrase-only offline access.

**Why:** The user chose “Keep it fully static” and subsequently approved “Yes,
keep both steps” for Facebook entry followed by the vault passphrase.

**How to apply:** Use browser-compatible User access token configurations for
Business Login. Do not introduce a backend, App Secret, cloud account or vault
recovery dependency without a new explicit scope decision.
