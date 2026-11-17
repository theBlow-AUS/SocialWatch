# Social Watch

A private, static Progressive Web App for Facebook Page and linked Instagram professional-account comment moderation. TweetDeck-style columns on desktop, swipeable columns on phones. Installable from Edge, Chrome or Safari; no executable, subscription, backend, database server, analytics or telemetry.

## Run locally

Use Node.js **24** and pnpm **10.26.1**.

```sh
pnpm install
pnpm dev
```

In the supplied development workspace, run from the repository root instead:

```sh
pnpm install
pnpm --filter @workspace/social-watch dev
```

The dev server binds to `PORT` when provided. Production assets use relative paths and can be hosted at a domain root or a repository subpath. All runtime dependencies are bundled; fonts are system fonts and icons are local. Development alone permits same-origin HMR sockets and injected styles; the production CSP restricts connections to Meta.

## GitHub Pages deployment

### Standalone source download

The `social-watch-source.zip` download is the standalone repository source. Unzip it, create a repository in your own GitHub account, and upload/push its contents, including the hidden `.github` directory. No account-specific URLs or credentials are included.

1. Keep your default branch named `main`, or adjust `.github/workflows/pages.yml`.
2. Under **Settings → Pages → Build and deployment → Source**, select **GitHub Actions**.
3. Push to `main`, or run **Deploy Social Watch to GitHub Pages** from Actions.
4. The workflow installs dependencies, typechecks, runs encryption tests, builds, and deploys only `dist/public`.
5. Open the URL GitHub provides after the workflow finishes. Copy this exact HTTPS URL, **including the repository path and trailing slash**, when configuring Meta Login.

### Complete development repository

The workflow in the root `.github/workflows/pages.yml` uses the workspace package and uploads `artifacts/social-watch/dist/public`. Other starter packages are development scaffolding; Social Watch never calls or deploys them. Do not deploy an API server or configure a database.

Build and test:

```sh
# Standalone
pnpm typecheck
pnpm test
pnpm build
pnpm serve

# Workspace
pnpm --filter @workspace/social-watch typecheck
pnpm --filter @workspace/social-watch test
pnpm --filter @workspace/social-watch build
```

The build output is plain static files. GitHub Pages supplies HTTPS, required for WebCrypto and service workers. Do not add scripts, trackers, remote fonts, CDNs, API proxies, or an app secret.

## Create your own Meta developer app

Meta changes dashboard wording and permissions over time. Consult the official [manual Facebook Login flow](https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/) and [Instagram comment moderation guide](https://developers.facebook.com/docs/instagram-platform/comment-moderation/) alongside these steps.

1. Visit [Meta for Developers](https://developers.facebook.com/) and register a developer account.
2. Create an app with the Facebook Login use case/product and the Page/Instagram permissions needed for your accounts. Where offered, choose the business app/use case appropriate to managing your own Pages. Keep it in **development mode**.
3. Add your own Facebook user under the app's administrator/developer/tester roles and accept any invitation. That user must also have the appropriate Facebook Page access (including moderation tasks). Instagram must be a **business or creator** account linked to that Page.
4. Under Facebook Login settings, enable web/browser OAuth and register the exact published URL as a **Valid OAuth Redirect URI**, including subpath and trailing slash. Add its domain and website platform URL where requested. Use the published site directly, not an embedded development preview.
5. Ensure permissions are available for your app/use case:
   - `pages_show_list`
   - `pages_read_engagement`
   - `pages_read_user_content`
   - `pages_manage_engagement`
   - `instagram_basic`
   - `instagram_manage_comments`
6. Standard access in development is for accounts you own/manage and users with app roles. Other users/accounts can require Advanced Access, App Review, business verification, and different Login for Business configuration. Some business-managed Page setups may require additional permissions such as `ads_read`/`ads_management`; this app does not request those automatically. Do not assume a development app can moderate arbitrary customer accounts.
7. Copy the **App ID**, not the app secret. Social Watch has no place for an app secret and must never receive one.
8. Create/unlock your Social Watch vault. Open **Settings → General**, enter your App ID, verify the current Graph API version, and save. The included default is `v27.0`; change it if your app uses another supported version.
9. Open **Settings → Accounts → Connect with Facebook**. Select and grant access to the Pages you want. Login returns to Social Watch; unlock this device again. Pages and their linked Instagram accounts are discovered automatically.
10. Refresh to retrieve posts and comments. If no Pages are returned, check app roles, Page tasks, permission grants and the account selected during login.

Each user supplies their own app. There are no shared credentials and no Replit integration dependency at runtime.

### OAuth security and expiry

This is a browser-only, short-lived token flow (`response_type=token`). A random, single-use OAuth state is checked with a 15-minute timeout. The callback fragment is removed from the address bar immediately and held only in memory until unlock. Only a random OAuth security nonce and timestamp are temporarily stored in `sessionStorage`; they contain no user data, passphrase or token. Account tokens are encrypted before persistence. API calls use a Bearer header, not tokens in request URLs. Tokens are never logged.

No secret-based code exchange, automatic long-lived-token exchange or server-side token inspection is performed: those require a trusted server, which this project intentionally does not have. Meta's full identity/token inspection recommendations therefore cannot be implemented here without changing the serverless constraint. This app is a personal management tool, not an identity provider. A successful Graph request is still subject to Meta's permissions. If a token expires or is revoked, the visible **Reconnect / Re-authenticate** action starts a new login. Conservative local expiry is applied to Page/Instagram tokens using the browser token lifetime.

## Use the workspace

- Add, remove, rename and move columns. Types: **Moderation Queue**, **Post Comments**, **Activity**, **Launch Tiles**.
- Filter comments by account, keyword and reviewed state; post columns can follow a specific fetched post.
- Add watchlist keywords to flag/highlight matching text.
- Review locally, hide/unhide, reply, or delete on Meta. Deletion requires confirmation.
- View the local moderation audit log; export CSV or JSON intentionally. **Audit downloads are plaintext** and can contain names and reply text; protect them separately.
- Add/edit/reorder/remove HTTPS launch tiles. LinkedIn and TikTok open official admin/studio sites in new tabs; custom destinations are your responsibility.
- Choose light/dark appearance and auto-lock from 1–120 idle minutes.
- Manual refresh is the default. Optional polling is 60–3600 seconds, normally only when unlocked and visible. **Settings → Notifications** can allow best-effort inactive-tab refresh. Auto-lock still stops all monitoring. Refresh also runs after unlocking/reopening; pull down on a column to refresh on touch devices.
- `r`: refresh, `l`: lock, `?`: help, `Esc`: close a dialog. Shortcuts are ignored in input fields.
- **Try demo** is explicitly simulated, opt-in and in-memory. It never connects an account. Simulated moderation is labelled in the local audit log.

## Inactive tabs and local notifications

Social Watch remains **fully static**, as requested. It has no notification backend, Web Push subscriptions, webhooks, or background scheduler.

1. In **Settings → Notifications**, enable **Try refreshing in inactive tabs while unlocked**. If refresh was manual-only, this sets a 60-second interval. General settings can adjust the interval later.
2. Click **Allow notifications** yourself; connecting an account never prompts automatically. If blocked, change this site's permission in browser/device settings. Some mobile browsers expose notifications only from an installed Home Screen PWA.
3. Opt in independently for each connected Facebook Page or linked Instagram account. Select new comments, new replies, or restrict either category to watchlist matches.
4. Use **Send test notification** to check device permission. System Focus / Do Not Disturb can suppress delivery.
5. After each unlock, the first successful account refresh is a silent baseline. Later refreshes can notify about new matching items while the tab is inactive. Cached/reviewed comments and duplicate items do not create alerts.

Notifications show a generic item count only: **no account names, authors, tokens, or comment text** are passed to the operating system. Clicking a production notification focuses/reopens Social Watch. Notification choices are encrypted with the profile but remain device-specific: profile transfers exclude them, and importing settings preserves the destination device's current choices. New devices/accounts default to off.

**These are local notifications, not true push.** Browsers may throttle or suspend inactive tabs, and closing the app prevents new alerts. iPhone/iPad cannot reliably keep this polling loop running in the background, even when the PWA is installed and notifications are allowed. Auto-lock still takes precedence; enabling monitoring never extends the unlock period. LinkedIn and TikTok have no event access here—use their native notification settings.

## Encryption, import and export

All persistent user content is held in **IndexedDB as a single authenticated encrypted envelope**. Only random salt, IV, algorithm/version identifiers and ciphertext are stored unencrypted.

- AES-256-GCM with a fresh random 96-bit IV on every save.
- PBKDF2-SHA256 with **600,000 iterations** and a random 128-bit salt.
- Non-extractable WebCrypto keys; keys and plaintext exist only in the unlocked page's memory.
- A new browser session always starts locked. Passphrases are not persisted.
- No password reset or recovery. A strong passphrase protects exports and lost devices; it does not defend an unlocked device, malicious extensions or compromised site code.
- **Settings → Data & privacy → Export** asks for a separate 12+ character export passphrase and downloads a single `.swprofile`, using the same encryption format with a fresh salt and IV.
- Files transfer **settings only**: App ID, API version, refresh/idle times, theme, columns, watchlist and launch links. Tokens, accounts, posts, comments, audit history and account/post-specific column selections are excluded. Each destination device connects independently.
- To import on another device, first create/unlock its own vault, choose the file and export passphrase, inspect the summary, and confirm replacement. Settings are re-encrypted under that device's existing key. Its connected accounts and local history are retained.
- Import rejects unsupported versions, unsafe links, invalid schemas, wrong passwords and tampered ciphertext. Imported tokens are never accepted.
- **Wipe all data** requires typing `WIPE` and deletes the encrypted vault. It does not delete exported files, revoke permissions at Meta, or erase data from the social platforms.

## Install as an app

### Windows (Edge or Chrome)

Open the published HTTPS site, then use the address-bar install icon, or **Menu → Apps → Install this site as an app** (wording varies). It opens in its own window. There is no `.exe` or native application.

### iPhone / iPad

Open the published site in **Safari**, tap **Share → Add to Home Screen**, then launch from that icon. Browser and home-screen storage may be separate depending on iOS version; create the vault and reconnect there. No server push is used. iOS may suspend polling when the app is inactive; return to the app or pull down to refresh. Allowing notifications does not enable reliable background polling.

### Offline

The production service worker precaches only the bundled application shell. No Meta API responses or tokens enter the Cache API. Unlocking, viewing previously encrypted comments, settings, launch-link management and local reviews work offline. Remote moderation, refreshing and opening external platforms need a connection. The first visit must be online. Service workers are intentionally disabled during development; installation/offline behavior must be checked against the production build.

## Known limitations

- **No reliable background execution or server push.** Opt-in inactive-tab polling is best-effort only, stops when locked/closed, and can be delayed or suspended by the browser. Local notifications require a successful refresh and explicit device/account opt-in. Suspended mobile pages may be discarded; iPhone cannot reliably monitor while inactive.
- **LinkedIn and TikTok are launch tiles only.** There is no feed import or moderation API for those platforms.
- **Short-lived tokens require re-authentication**. No app secret, long-lived exchange, trusted backend or account synchronization.
- Meta Login and live moderation need your own correctly configured app and eligible accounts. They cannot be demonstrated or verified without those accounts. Some app types require Login for Business settings beyond a plain App ID.
- Refresh covers the **latest 20 posts/media per account**, not the entire historical feed or all ad placements. Within that window it paginates comments/replies up to 1,000 per edge; exceeding the limit shows an error and does not silently save a partial result.
- **Activity shows recently fetched comments**, not a complete mentions/notifications endpoint. Tagged media, inbox messages, Stories, live streams and platform-wide mentions are not collected.
- Rate limits produce a visible cooldown. High request volume may require manual-only refresh or using Meta's native tools; the browser-only app cannot receive Meta's recommended webhooks.
- No profile recovery; browser storage clearing, private browsing expiry, storage eviction or device loss can erase the vault. Export your setup and keep the passphrase safe.
- Opening the same vault in multiple tabs is not a supported concurrent-edit workflow: the last successful encrypted save wins. Use one active tab.
- Auto-lock clears app references and aborts in-flight requests; JavaScript cannot promise physical zeroization of garbage-collected memory.
- Audit exports are plaintext, intentional user downloads; `.swprofile` exports are encrypted.
- The strict CSP disallows CDN images/avatars and third-party widgets. Account avatars use initials.
- A PWA is not a native binary. GitHub Pages requires internet for initial loading and OAuth must run at the exact registered published URL.
- Accessibility uses semantic controls, labelled dialogs, focus management, keyboard navigation, AA-oriented color contrast and reduced-motion support. Full assistive-technology certification is not claimed.

## Tests and code

`pnpm test` runs Node's built-in unit tests for cryptographic round trips, randomized salt/IV, incorrect passwords, tampering, metadata validation, export credential exclusion, malformed import handling and unsafe URLs. Notification tests cover inactive-tab and idle-lock guards, per-account opt-ins, comment/reply categories, watchlist filtering, silent baselines, deduplication, import exclusion, generic notification text and session checks. Automated logic tests do not certify OS notification delivery on real devices.

### Browser vault regressions

`pnpm test:browser` (workspace: `pnpm --filter @workspace/social-watch test:browser`)
runs Playwright against the existing development workflow through `http://127.0.0.1:80`.
For another running development server, set `VAULT_TEST_BASE_URL` to its root URL.
Install a browser once with `pnpm exec playwright install chromium`, or set
`PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to an existing Chromium executable.
CI starts a disposable Vite server automatically and runs this suite before deployment.
`pnpm typecheck` also checks the browser tests.

Each test has a fresh, isolated browser context and uses only synthetic profiles and
passphrases. Native IndexedDB and WebCrypto exercise encrypted create/unlock/save/lock/wipe,
ordered save snapshots, concurrent creates, cancellation during encryption and database
opening, transaction abort recovery, unavailable storage, wrong-passphrase UI, failed-wipe
visibility and retrying failed saves. Browser API fault injection exists only in the test
runner: no credentials, production unlock bypass or application test hooks are added.
Failure traces go to the ignored `generated-artifacts/social-watch-browser` directory
(two levels above this package in the workspace). These tests do not verify PWA installation,
offline caching or real Meta login.

Source areas:

- `src/core/crypto.ts` — encryption envelope, key derivation and authentication.
- `src/core/vault.ts` — encrypted IndexedDB and session key lifetime.
- `src/core/profile-transfer.ts` — validated, settings-only encrypted transfer.
- `src/core/meta.ts` — browser OAuth, Graph discovery, refresh and moderation.
- `src/core/notifications.ts` — static-only refresh policy and privacy-preserving local notifications.
- `src/App.tsx`, `src/ui/` — Preact application and plain CSS.
- `vite.config.ts` — relative static build, Preact aliases, production shell caching.

## Licence

MIT. See `LICENSE`. No author contact details, credentials or author-specific links are embedded.
