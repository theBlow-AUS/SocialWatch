# Social Watch

A static, private social-moderation Progressive Web App for GitHub Pages.

Social Watch runs in your browser or in its own installed app window. It supports
Facebook Page and linked Instagram professional-account comment moderation.
LinkedIn and TikTok are launch links only, not imported feeds.

**There is no Windows `.exe`, Mac `.dmg`, iOS `.ipa`, or App Store download.**
Publish the website once, then install that same HTTPS website on each device.
End users do not need Git, Node.js, a terminal, Xcode, or an Apple developer account.

Your vault is encrypted and stored on the device. There is no runtime backend,
database server, cloud account sync, analytics, or notification service.

> **Background alerts have limits.** This fully static app cannot deliver reliable
> push notifications while closed or suspended. On iPhone/iPad, expect refresh only
> while the app is active. Installing the app or allowing notifications does not
> remove that restriction. See [notification setup](#notification-setup).

## Contents

- [Before installing](#before-installing)
- [Screenshots and illustrated walkthrough](docs/visual-guide.md)
- [Deploy the website to GitHub Pages](#deploy-the-website-to-github-pages)
- [Install on Windows](#install-on-windows)
- [Install on macOS](#install-on-macos)
- [Install on iPhone or iPad](#install-on-iphone-or-ipad)
- [First launch and account setup](#first-launch-and-account-setup)
- [Setting Up a Meta App ID](#setting-up-a-meta-app-id)
- [Notification setup](#notification-setup)
- [Offline use, backups, and multiple devices](#offline-use-backups-and-multiple-devices)
- [Updates and uninstalling](#updates-and-uninstalling)
- [Run or build from source on Windows and Mac](#run-or-build-from-source-on-windows-and-mac)
- [Troubleshooting](#troubleshooting)

## Before installing

1. Use an up-to-date operating system and browser.
2. Get the **published website URL** from the person hosting Social Watch, or deploy
   your own copy using the next section.
3. Open that URL over **HTTPS** in a normal browser session, not private/incognito
   mode or an embedded browser inside another app.
4. Keep the full URL, including any repository subpath and trailing slash.
   A GitHub repository's code page is not the installed app's URL.
5. Have a strong passphrase ready. There is **no password reset or recovery**.

If the website is already published, skip deployment and go directly to your
device's installation section.

## See what to expect

The [visual walkthrough](docs/visual-guide.md) shows the **real app interface**
with fictional Harbour Lane Bakery Facebook and Instagram demo content, reply
composition, watchlist highlights, settings, and a phone-sized layout.

![Real Social Watch app screenshot with fictional Facebook and Instagram demo data, clearly labeled as simulated.](docs/images/app-03-desktop-demo.jpg)

No live accounts were connected for these captures. LinkedIn/TikTok remain
**launch links only**, not imported feeds. Device and GitHub installation images
below are **labeled illustrations**, not screenshots of those systems.

## Deploy the website to GitHub Pages

This is a one-time task for the repository owner. The same website serves
Windows, Mac, iPhone, and iPad; you do not deploy a separate iOS build.

### First-time setup, step by step

You need a GitHub account. These steps use GitHub in a web browser; you do not
need to install Git or run commands.

![Installation illustration, not a GitHub screenshot: eight numbered steps from forking the repository to opening the published app.](docs/images/install-github-pages.svg)

1. **Create your own copy.** Open the
   [Social Watch repository](https://github.com/theBlow-AUS/SocialWatch) while
   signed in to GitHub. Select **Fork** near the top-right, then **Create fork**.
   This makes a copy under your account. If you already own a copy of the full
   repository, use that instead.
2. **Open your copy.** Check that the page shows your GitHub username as the
   owner. The default branch should be named `main`. Keep the full repository
   together, including the hidden `.github` folder; the deployment instructions
   depend on it.
3. **Allow the deployment workflow to run.** In your copy, select **Actions**.
   If GitHub shows a notice that workflows are disabled, review the workflow in
   [`.github/workflows/pages.yml`](.github/workflows/pages.yml), then select
   **I understand my workflows, go ahead and enable them** (or the equivalent
   button GitHub shows).
4. **Tell GitHub to publish with Actions.** Select **Settings** in your
   repository. In the left sidebar, select **Pages**. Under **Build and
   deployment**, set **Source** to **GitHub Actions**. If GitHub asks to save the
   setting, select **Save**. Do not choose **Deploy from a branch** or a `/docs`
   folder.
5. **Start the first build.** Select the **Actions** tab. In the workflow list,
   select **Deploy Social Watch to GitHub Pages**. Select **Run workflow**,
   leave the branch set to `main`, and select the green **Run workflow** button.
   If you do not see the workflow, refresh the page after enabling Actions and
   check that `.github/workflows/pages.yml` exists in your repository.
6. **Wait for both jobs.** Open the new run at the top of the workflow list.
   Wait for **build** and then **deploy** to finish with green check marks. Select
   a failed job to read the first error; do not treat a red or still-running
   result as a published site.
7. **Open the published website.** Return to **Settings → Pages** and select
   **Visit site**. You can also open the successful run's **github-pages**
   deployment link. Copy the exact HTTPS address GitHub opens; do not guess it
   from the repository name. Keep any repository path and final slash.
8. **Open it once, then install it.** Visit that exact address online in the
   browser you plan to use. Continue to [install on Windows](#install-on-windows),
   [install on macOS](#install-on-macos), or
   [install on iPhone or iPad](#install-on-iphone-or-ipad).

The source repository or published website may be publicly accessible. Do not
put passwords, access tokens, Meta app secrets, or other private information in
the repository. Do not change a private repository to public just to make Pages
work; ask its owner to check the account's Pages availability instead.

### Updates and workflow details

After setup, each push to `main` starts a new build and deployment. You can also
start one manually from **Actions → Deploy Social Watch to GitHub Pages → Run
workflow**. If you use a different default branch, update the workflow's branch
filter first.

For this complete workspace, the workflow:

1. Uses Node.js **24** and pnpm **10.26.1**.
2. Installs the locked dependencies.
3. Runs the app's type checks, unit tests, and Chromium vault regression tests.
4. Builds the PWA.
5. Uploads only `artifacts/social-watch/dist/public` and deploys it to Pages.

It does **not** deploy the API server, a database, or the component-preview
service. Do not upload the source folder or run `vite dev` as a production
server. Use the exact published HTTPS URL for Meta's valid OAuth redirect URI.

For a minimal standalone repository, the separately supplied
`social-watch-source.zip` contains just the app. Extract its contents into the
repository root, including `.github`, and use the standalone workflow and
lockfile from that archive. See the
[standalone deployment instructions](artifacts/social-watch/README.md#github-pages-deployment).

GitHub supplies HTTPS. The relative asset paths support both domain-root and
repository-subpath hosting. If using a custom domain, configure it in Pages,
wait for HTTPS to work, and register the new exact URL with Meta before logging in.
The new hostname is a separate browser-storage location; export settings before
moving away from the old one.

## Install on Windows

Use a supported Windows release with an up-to-date **Microsoft Edge** or
**Google Chrome**. Administrator rights are normally not needed for browser-app
installation, although a work/school policy may block it.

### Microsoft Edge

![Installation illustration, not a Windows screenshot: open the live site, select Edge installation, confirm, pin, launch and create a vault.](docs/images/install-windows-edge.svg)

1. Open the published HTTPS URL in Edge.
2. Click the **Install app** icon in the address bar if shown.
3. Alternatively, open **… → Apps → Install this site as an app**. In some Edge
   versions, **Apps** is under **More tools**.
4. Confirm the name **Social Watch** and select **Install**.
5. If offered, pin it to **Start** or the **taskbar**, or create a desktop shortcut.
6. Open Social Watch from that shortcut and complete the first-launch steps below.
   You can also find it at `edge://apps`.

### Google Chrome

![Installation illustration, not a Chrome screenshot: open the site, choose Install page as app, confirm and launch.](docs/images/install-chrome.svg)

1. Open the published HTTPS URL in Chrome.
2. Click the address-bar **Install** icon, or open **⋮ → Cast, save, and share →
   Install page as app** / **Install Social Watch**. Wording varies by version.
3. Confirm **Install**, then launch it from the installed shortcut or Start menu.

The browser supplies the app window and updates. This is not a native executable.
If your browser does not offer installation, you can still use the live website
in a normal tab.

## Install on macOS

### Safari on macOS Sonoma 14 or later

![Installation illustration, not a Mac screenshot: Safari Add to Dock, confirm the name, launch and create the vault in the installed window.](docs/images/install-mac-safari.svg)

1. Open the published HTTPS URL in **Safari**.
2. Choose **File → Add to Dock**, or **Share → Add to Dock**.
3. Name it **Social Watch** and click **Add**.
4. Open it from the **Dock** or your user's **Applications** folder.
5. Set up/unlock the vault inside that app window and connect your accounts there.

The installed Safari web app can have its own storage. Do not assume a vault or
login created in a Safari tab will automatically appear in the Dock app.

### Chrome or Edge on Mac

Open the published site and use the browser's address-bar **Install** icon or its
**Install page as app** / **Install this site as an app** menu. Launch it from the
shortcut created by the browser; pin it to the Dock if desired.

On older macOS versions without Safari's **Add to Dock**, use a supported current
Chrome/Edge installation if available, or use the website in a normal browser tab.
No `.dmg`, Homebrew package, signing certificate, or Xcode project is required.

## Install on iPhone or iPad

Use an up-to-date iOS/iPadOS release and **Safari**. Home Screen notification APIs
require iOS/iPadOS **16.4 or later**, but this app still has no reliable background
push service.

![Installation illustration, not an iPhone screenshot: Safari Share, Add to Home Screen, Open as Web App if shown, Add and launch the app.](docs/images/install-ios-safari.svg)

1. Open the published HTTPS URL directly in **Safari**. If the link opened inside
   a messaging/social app, choose **Open in Safari** first.
2. Tap **Share**. Depending on Safari's layout, you may first need to open its menu
   to find Share.
3. Scroll down and tap **Add to Home Screen**. If missing, look under **Edit Actions**.
4. If shown, turn on **Open as Web App**.
5. Keep the name **Social Watch** and tap **Add**.
6. Return to the Home Screen and open the new **Social Watch** icon.
7. Create/unlock the vault and connect your accounts from that installed app.
   Home Screen and browser-tab storage can differ; do not assume data transfers.

There is no App Store submission, TestFlight build, provisioning profile, or
separate iOS deployment. Closing, locking, or suspending the app stops or delays
monitoring. Reopen and refresh to fetch new comments.

## First launch and account setup

The [first-launch screenshots](docs/visual-guide.md#5-first-launch-create-the-vault)
show the actual create-vault form, empty desk and fictional demo. The
[account setup screenshots](docs/visual-guide.md#7-set-up-real-accounts-separately)
show General and Accounts before entering any real credentials.

The General settings section in the walkthrough also shows how to add an optional
company/brand logo (PNG, JPEG or WebP up to 1 MB) and choose **Automatic**, **Light**
or **Dark** appearance. Automatic follows the device theme; manual choices are
saved locally in the encrypted vault.

1. Open the installed app while online.
2. Create an encrypted vault with a unique passphrase of at least **12 characters**.
   Store it securely; the project owner cannot reset it.
3. To inspect the interface without real accounts, choose **Try demo**. Demo data is
   simulated, in-memory, and not connected to Meta.
4. Before creating a Meta app, read [Setting Up a Meta App ID](#setting-up-a-meta-app-id).
   They identify the Page and Instagram use cases and permissions, and explain an
   important login compatibility requirement. Meta's current Pages/Instagram setup
   uses Facebook Login for Business; the current Social Watch build does not yet
   support its configuration, so an App ID alone will not complete live login.
   **Never enter an app secret.**
5. Use **Try demo** to explore the app until its Business Login integration is
   available. After that update, save your App ID and supported Graph API version
   under **Settings → General**, then connect under **Settings → Accounts**.
6. The Facebook Page must be one you can manage, and Instagram must be a professional
   account linked to that Page. Other users' accounts may require App Review and
   additional access.
7. Once connected, refresh to fetch posts/comments and configure your columns and
   watchlist.

An installation on a second device does not sign in automatically. No credentials
are shared by the project or synchronized between devices.

## Setting Up a Meta App ID

This section is for the person configuring live Facebook Page and linked
Instagram professional-account access. You do **not** need a Meta App ID to install
Social Watch, use its local vault, or try the fictional demo.

> **Current build limitation — read before starting:** Social Watch currently
> redirects to Facebook using a browser-only OAuth flow. It does not yet send a
> Facebook Login for Business configuration ID (`config_id`), and has no setting
> for one. The Meta setup below identifies the correct use cases, but is
> preparation, **not a working end-to-end live-login procedure for this build**.
> An App ID alone cannot complete this integration. Use **Try demo** until a
> compatible login integration is implemented. Do not switch use cases or expose
> an app secret to try to work around this limitation.

### 1. Have the right accounts and website ready

1. Publish Social Watch over HTTPS using the GitHub Pages instructions above.
   Copy the exact address shown under your repository's **Settings → Pages**,
   including the repository subpath and trailing slash.
2. Sign in to Facebook as the person who can manage the intended Facebook Page.
   Having a personal Facebook profile alone does not give access to a Page.
3. For Instagram, use a **business or creator** account and link it to that
   Facebook Page. A personal Instagram account is not sufficient for this route.
4. Open [Meta for Developers](https://developers.facebook.com/), register as a
   developer if prompted, then open **My Apps → Create App**.
5. Enter an app name, such as `Social Watch for My Brand`, and a contact email.
   Click **Next**. This creates a developer integration; it does not publish a
   mobile app to the Apple App Store.

### 2. Select these exact use cases

In the list of options supplied with this guide, select the following:

| Option shown by Meta | What to do | Why |
| --- | --- | --- |
| **Manage everything on your Page** | **Select** | Supplies the Pages API use case for Facebook Page posts and comment moderation. |
| **Manage messaging & content on Instagram** | **Select** for linked Instagram moderation | Supplies the Instagram API use case. Social Watch uses comments, not direct messages. |
| **Authenticate and request data from users with Facebook Login** | **Do not select** | This generic login use case is incompatible with the Page-management use case. The Facebook Login for Business setup below is different. |
| **Create an app without a use case** | **Do not select** for this setup | Creates an ID without the permissions, features or products needed for moderation. |
| Ads options: Marketing API, ad performance, ad leads, app ads, ads MCP server, Audience Network | **Leave unselected** | Advertising and monetization are not Social Watch features. |
| Threads, Messenger, WhatsApp, Catalog, Instant Game, fundraisers, Live Video, embeds/oEmbed, data transfer, ThreatExchange | **Leave unselected** | Not used by Social Watch. A Meta use case does not add an unsupported platform to this app. |

For Facebook-only use, start with **Manage everything on your Page**; Instagram's
use case can be added later if Meta lists it as compatible. For both platforms,
select both recommended choices now if the picker permits it.

**Before clicking Next:** Meta greys out incompatible choices. If the second
recommended choice is unavailable, do not select a similar-looking replacement.
Check that you have not selected generic Facebook Login. You can add compatible
use cases later from the dashboard, but **Meta does not allow removing a use case
after the app is created**. For an existing app with the wrong incompatible use
case, create a separate correctly configured app rather than deleting the old
one or its credentials.

### 3. Complete the creation wizard

1. Click **Next** after choosing the use cases.
2. On **Business**, select the business portfolio that owns/manages the assets
   if appropriate. For a personal development test, choose **I don't want to
   connect a business portfolio yet** only if Meta offers it and permits you to
   continue. Do not select another business's portfolio.
3. Read **Requirements**, then review **Overview** and choose **Go to dashboard**
   (or the equivalent final creation button).
4. Keep the app unpublished/in development while setting it up. Follow any
   dashboard checks for your chosen use cases; creating the app is not approval
   to access arbitrary users' accounts.
5. If using accounts outside those you own/manage, Meta requires a connected
   business portfolio and may require business verification, Advanced Access,
   App Review or Tech Provider/access verification. Follow the requirements
   shown for your app before inviting customers.

### 4. Customize the Page and Instagram use cases

1. In the app dashboard, open **Use cases** (or select the use-case card under
   **Dashboard**), then **Customize** for Page management.
2. Under **Permissions and features**, check the permissions listed below.
   Meta may automatically add required permissions such as `public_profile`
   and `business_management`; do not remove required defaults.
3. Open **Customize** for **Manage messaging & content on Instagram**.
4. Select **API setup with Facebook Login**. This is the route matching Social
   Watch's linked-Page account discovery. **Do not select API setup with Instagram
   Login**: that is a different integration and permission family
   (`instagram_business_*`), which this build does not implement.
   Meta documents only one Instagram login setup per app.
5. Check the comment permissions below in **Permissions and features**.
   Do not add direct-message, publishing, advertising or webhook permissions
   merely because the dashboard offers them.

These are the scopes Social Watch's current code requests:

| Permission | Purpose in Social Watch |
| --- | --- |
| `pages_show_list` | Discover Pages the signed-in person can manage. |
| `pages_read_engagement` | Read Page content and engagement. |
| `pages_read_user_content` | Read user-generated content/comments on the Page. |
| `pages_manage_engagement` | Moderate Page comments and reply. |
| `instagram_basic` | Discover/read the linked Instagram professional account and media. |
| `instagram_manage_comments` | Read, reply to and moderate Instagram comments. |

A use case makes permissions available; selecting it does not itself grant
access. The user must consent, have the necessary Page tasks, and meet Meta's
access requirements. If Meta reports missing permissions, resolve the specific
requirement rather than selecting an ads use case as a workaround.

#### Permissions and features: what to do on this screen

The **Permissions and features** screen is a list of capabilities available to
your app, not a checklist where everything should be enabled. Use the following
table for the Page-management screen supplied with this guide.

| Row on the Meta screen | Required action for Social Watch |
| --- | --- |
| `pages_show_list` | **Keep/add** for discovering managed Pages. |
| `pages_read_engagement` | **Keep/add** for reading Page posts and engagement. |
| `pages_read_user_content` | **Keep/add** for reading comments and other user-generated Page content. |
| `pages_manage_engagement` | **Keep/add** for replying to and moderating Page comments. This is not the same as managing Page posts. |
| `public_profile` | **Keep the default.** Meta supplies this baseline login permission automatically; it is not access to everyone's profile. |
| `business_management` | **Keep if required by the use case/configuration.** Meta's Page use case includes this as a required permission. Social Watch's current OAuth scope list does not explicitly request it, so a dashboard entry alone does not mean the browser token has it. Do not remove required defaults or assume this fixes the login blocker. |
| **Business Asset User Profile Access** | **Relevant for Facebook commenter identity fields.** Social Watch requests a comment's `from` information and displays the author's name when returned. Check this feature's access requirements if those fields are needed or Meta returns a related error. See the access note below; ordinary comment permissions do not guarantee access to profile fields. |
| `pages_manage_metadata` | **Do not add for Social Watch.** Used for Page settings and webhook subscriptions. This static app does not receive webhooks; this permission will not enable background push. |
| `pages_manage_posts` | **Do not add for Social Watch.** It does not create, edit or delete Page posts. Comment moderation uses `pages_manage_engagement`. |
| `read_insights` | **Do not add for Social Watch.** No Page Insights analytics dashboard is implemented. |
| `email` | **Do not add for Social Watch.** It does not use a Facebook email address to create or unlock the local vault. |
| **Live Video API** | **Do not add for Social Watch.** No live-video broadcasting is implemented. |
| **Page Mentions** | **Do not add for Social Watch.** This feature concerns mentioning Pages when publishing; it is not needed for local keyword/watchlist matching. |
| `facebook_branded_content_ads_brand` | **Do not add for Social Watch.** No partnership-ad management is implemented. |
| `facebook_creator_marketplace_discovery` | **Do not add for Social Watch.** No creator marketplace discovery is implemented. |

**Business Asset User Profile Access is a feature, not an OAuth scope to paste
into the login URL.** Meta's feature-specific documentation requires App Review
and business verification for live data access. Meta's general feature guidance
also describes limited pre-review access for app/business-role users; do not
treat a development test as approval to read real customers' profile fields.
Follow the restrictions shown for this feature in your dashboard. Social Watch
displays **Platform user** when Facebook does not return an author name; that
label neither grants missing access nor resolves an API permission error.
It does not currently display Facebook commenter profile pictures.

For **Instagram**, open **Manage messaging & content on Instagram → Customize →
API setup with Facebook Login → Permissions and features** as applicable. Ensure
`instagram_basic` and `instagram_manage_comments` are available in addition to
the shared Page permissions above. Their absence from the Page-only screen is
not a reason to choose a different login route. The same permission marked
**Found in 2 use cases** is shared by those use cases, not two separate grants.
Do not add `instagram_manage_messages` for comment replies: direct messages are
not supported. Do not substitute `instagram_business_*` scopes from the
Instagram Login route.

**How to proceed, step by step**

1. Locate each of the four required `pages_*` rows above. If Meta offers an
   **Add** action for a missing permission, use it. If already present, leave it.
   Leave required `public_profile`/`business_management` defaults in place.
2. Check the Business Asset User Profile Access requirements separately if
   Facebook commenter names/identity fields are part of your intended use.
3. Repeat the check for the two Instagram permissions in the Instagram use case.
   Save changes if the dashboard offers a save button.
4. Leave unrelated optional features unselected. If Meta already added one,
   there is no need to request its review/access for Social Watch. Do not remove
   anything marked required by Meta.
5. Use **Ready for testing** to open Meta's test/checklist page and read its
   requirements. This is not an instruction to make every row show that label,
   nor is it a button that automatically grants production access.
6. Keep setup/testing separate from live Social Watch sign-in. The current
   Business Login integration blocker still applies. Once a compatible
   integration exists, test read-only Page discovery/posts/comments first on
   assets you control. Test replies/hide/unhide only on disposable test comments
   you created; these actions affect Meta, not just this device. Do not delete
   real comments just to obtain a test count.

**What the columns and labels mean**

| Label | How to interpret it |
| --- | --- |
| **API Calls: 0** | No calls are recorded for that row in the dashboard's displayed reporting context. This is not a missing-permission error. Adding a row does not generate calls; dashboard reporting may lag. |
| **Ready for testing** | The item links to Meta's testing workflow. It does **not** mean testing passed, App Review was approved, users granted consent, or Social Watch login is compatible. |
| **Found in 2 use cases** | The capability is associated with two selected use cases. Do not create another app or duplicate the permission because of this label. |
| No action/status shown in the pasted list | The pasted text is not enough to establish whether the item is added, required or approved. Open that row's details and inspect the available action/access level. |
| **Standard Access** / development or role-limited access, if shown | Limited testing access subject to the permission's rules, eligible assets and accepted app/business roles. It is not access to arbitrary customer accounts. |
| **Advanced Access**, **Request access**, or **App Review**, if shown | Follow the displayed review and verification requirements before serving users outside the permitted test scope. The exact requirements differ by permission/feature. |

Do not aim for an arbitrary API-call count. Follow the actual **Review → Testing**
checklist for your app. Meta's Graph API Explorer can help test permitted API
reads with the correct app and authorized assets, but it is a developer tool,
not a workaround for Social Watch's missing login integration. Never paste an
Explorer access token into the App ID field, commit it, or include it in a screenshot.

Before seeking broader access, prepare the required app details (including a
privacy policy and data-deletion information where requested), business
verification, a truthful explanation of each requested permission, reviewer
instructions and a screen recording demonstrating the working integration.
Do not submit fictional demo data as proof of live Meta API functionality.
Do not claim that App Review has passed until Meta has approved the relevant
permission/feature. Publishing the GitHub Pages website and publishing/approving
the Meta developer app are separate steps.

References: [Meta feature access rules](https://developers.facebook.com/documentation/development/features-reference),
[Business Asset User Profile Access requirements](https://developers.facebook.com/documentation/development/features-reference/business-asset-user-profile-access),
[Instagram customization and testing](https://developers.facebook.com/docs/development/create-an-app/instagram-use-case).
This guidance maps the supplied screen to the current Social Watch implementation;
it does not claim that live API tests or App Review have been completed.

### 5. Configure website access and test roles

1. In the app's basic settings, locate the **App ID**. It is a numeric identifier.
   **Do not copy the App Secret into Social Watch, GitHub, screenshots or chat.**
   An Instagram-specific app ID is not a substitute for the Meta App ID used by
   this Facebook Login route.
2. Add a **Website** platform/site URL and **App Domains** where requested.
   The domain field takes only the hostname, not `https://` or a repository path.
   The site URL takes the full published HTTPS address.
3. Open **Facebook Login for Business** settings; Meta may have added this product
   automatically. Set **Valid OAuth Redirect URIs** to the exact Social Watch
   published address, including its subpath and trailing slash. Do not use the
   repository's code URL or an embedded development preview.
4. Under app roles, ensure your testing Facebook user has an appropriate app role
   and has accepted any invitation. That person must also have access to the
   intended Page, including moderation tasks. An app role does not grant Page access.
5. Follow Meta's Business Login configuration instructions as preparation, but
   **stop before attempting live Social Watch sign-in**: this build cannot consume
   the resulting configuration ID. A configuration that requires a server-side
   secret/token exchange also cannot run on GitHub Pages alone. Do not enter the
   Pages URL as a webhook endpoint; this static app cannot receive webhooks.

### 6. Connect only after the login integration is compatible

Once Social Watch supports the required Business Login configuration and documents
its supported browser-only flow, save the **Meta App ID** and a supported
**Graph API version** in **Settings → General**. Configure any additional fields
introduced by that update, then use **Settings → Accounts → Connect with Facebook**.
Grant only the intended assets, return to Social Watch, unlock and refresh.
Expected results are the selected Facebook Pages and their linked professional
Instagram accounts—not personal-profile feeds, Messenger inboxes or Threads.

If login fails today, the missing Business Login integration is a known blocker,
not evidence that you should choose a different use case. If a future compatible
login succeeds but no Pages appear, check the Facebook identity, Page access,
accepted app roles, granted assets and permission/access status.

**Official references:** [Create an App with Meta](https://developers.facebook.com/docs/development/create-an-app),
[Customize the Instagram use case](https://developers.facebook.com/docs/development/create-an-app/instagram-use-case),
[Facebook Login for Business](https://developers.facebook.com/documentation/facebook-login/facebook-login-for-business/).
The use-case names above match the supplied picker text and were checked against
Meta's documentation on 19 November 2026. Dashboard labels and requirements can change.

## Notification setup

See the [notification settings screenshot and limitations](docs/visual-guide.md#8-notifications-understand-the-limits-before-opting-in).

Notification permission is separate from Facebook/Instagram login and from PWA
installation. Choices are **off by default and per device/account**.

1. Connect the Facebook Pages/linked Instagram accounts you manage.
2. Open **Settings → Notifications** in the installed app.
3. Click/tap **Allow notifications**, then approve the browser/OS prompt if supported.
4. Enable **Notify for this account** separately for each desired account.
5. Choose **New comments**, **New replies**, and optionally **Only watchlist matches**.
   Watchlist-only alerts require at least one watchlist keyword.
6. On desktop, optionally enable **Try refreshing in inactive tabs while unlocked**.
   This selects a 60-second interval if polling was previously manual-only.
   You can adjust polling in General settings.
7. Use **Send test notification** and check OS notification settings and
   Focus / Do Not Disturb. A successful test request does not guarantee later delivery.

**What to expect:**

- The first successful refresh after each unlock establishes a silent baseline.
  Later matching new comments/replies can alert after a successful refresh.
- Notifications contain a generic count, not account names or comment text.
- Desktop inactive-tab refresh is best-effort: the browser or sleeping computer
  can suspend it. Auto-lock always stops monitoring.
- On iPhone/iPad, expect refresh only while active. An installed icon and granted
  permission do not create an always-running background process.
- Closed apps cannot discover new comments or deliver new event alerts.
- LinkedIn and TikTok have no event access here; use those platforms' own alerts.

Reliable notifications while closed would require a trusted notification backend
or another architecture. This project intentionally remains fully static.

## Offline use, backups, and multiple devices

### Check offline startup

1. Open the **published production app** online and let it finish loading.
2. Create your vault, fetch any data you want available offline, and allow saves to
   finish. Reload once online so the service worker can take control.
3. Disconnect Wi-Fi/network access or enable airplane mode.
4. Reopen the installed app and unlock with the same passphrase.
5. The cached app shell and previously saved encrypted data should be available.
   Refreshing, live moderation, account login, and external links need internet.

The service worker caches the app shell only, not Meta responses or tokens.
Offline support is disabled in the development server; use a production build.
These are expected behaviors, not a claim of certification on every physical device.

### Protect your data

- Keep the vault passphrase safe. There is no recovery or cloud copy.
- **Settings → Data & privacy → Export** creates an encrypted `.swprofile`
  **settings-only** transfer with its own export passphrase.
- It is **not a full vault/history backup**: credentials, account data, cached
  posts/comments, audit history, and notification opt-ins are excluded.
- Transfer that file securely, create/unlock the destination device's vault, import
  it, reconnect your accounts, and opt into notifications on that device.
- Intentional audit CSV/JSON exports are **plaintext**; protect them separately.
- Use one active editing tab per vault. Concurrent tabs are not a supported
  synchronization mechanism.
- Clearing site data, removing a browser profile, deleting the app's storage,
  storage eviction, or losing a device can erase the vault. Private browsing is
  unsuitable for durable storage.

## Updates and uninstalling

### Update

The host pushes changes to `main`; GitHub Actions rebuilds and deploys them.
Reconnect to the internet, finish any edits, lock and reopen/reload Social Watch
to pick up the updated app shell. If an older version remains visible, close all
its windows and try again online. Export settings before troubleshooting storage;
**do not clear site data as a routine update step**.

### Uninstall

Export settings first if needed; it does not preserve credentials/history.

- **Windows Edge:** open `edge://apps`, find Social Watch, select **Details →
  Uninstall**. Deleting app history/data is a separate, destructive choice.
  Chrome also exposes an uninstall option in the installed app's menu.
- **Mac Safari:** quit the app, then use Finder **Go → Home → Applications** and
  move Social Watch to the Trash. Removing a Dock icon alone only removes its shortcut.
- **iPhone/iPad:** touch and hold the Home Screen icon, then use the offered
  **Remove App / Delete App / Delete Bookmark** action. Wording varies.

Removing an icon is not proof that stored data was erased, and clearing storage
can permanently lose your vault. To intentionally erase local data, use the app's
**Wipe all data** action and follow its confirmation before removing the app.
Neither uninstalling nor wiping revokes Meta access or deletes social-platform
content. Manage permission revocation separately in your Meta account.

## Run or build from source on Windows and Mac

This section is for maintainers/developers, not ordinary app installation.

### Prerequisites

- [Git](https://git-scm.com/downloads).
- [Node.js 24](https://nodejs.org/en/download), including npm.
- pnpm **10.26.1** (matching CI).
- On **Windows**, install Git for Windows and use **Git Bash** for these commands:
  the workspace's install script uses a POSIX `sh` shell.
- On **macOS**, use **Terminal** with Git installed.

Install/check the tools:

```sh
git --version
node --version
npm install --global pnpm@10.26.1
pnpm --version
```

Clone this repository (use your fork's HTTPS URL instead if maintaining a fork):

```sh
git clone https://github.com/theBlow-AUS/SocialWatch.git
cd SocialWatch
pnpm install --frozen-lockfile
pnpm --filter @workspace/social-watch dev
```

Open the local URL printed by Vite. Stop the server with **Ctrl+C**.
The dev server is not a deployment and does not enable service-worker caching.
Do not open `index.html` or the build output by double-clicking it as a `file://` URL.

Check and preview a production build:

```sh
pnpm --filter @workspace/social-watch typecheck
pnpm --filter @workspace/social-watch test
pnpm --filter @workspace/social-watch build
pnpm --filter @workspace/social-watch serve
```

For the CI browser regressions, install Chromium once:

```sh
pnpm --filter @workspace/social-watch exec playwright install chromium
```

The browser tests default to Replit's local proxy, not the standalone Vite port.
Keep the local development server running in another terminal and provide its
printed URL, for example in Git Bash or macOS Terminal:

```sh
VAULT_TEST_BASE_URL=http://localhost:5173 pnpm --filter @workspace/social-watch test:browser
```

If Vite printed another port, substitute it. Browser tests exercise vault logic;
they do not certify OS installation, offline behavior, or real Meta access.

### Commit and push documentation or code changes

From the full repository root:

```sh
git status
git add README.md artifacts/social-watch/README.md
git commit -m "Update installation documentation"
git push origin main
```

The `git add` command above stages only those two README files; stage intended
source files explicitly when changing code. Verify the current branch is `main`
before pushing. A push triggers the Pages workflow; watch **Actions** for its result.

Do not create a second `main` branch or run `git init` again inside a clone.
If the remote has new commits, stop and review/fetch/merge them before pushing;
do not force-push over other work. In Replit, **Sync/Pull** may run a rebase:
after a history-preserving merge of separately initialized repositories, prefer
a plain `git push origin main` when the remote history is already included.

For a standalone source checkout, run `pnpm dev`, `pnpm typecheck`, `pnpm test`,
`pnpm build`, and `pnpm serve` without the workspace filter. Its output is
`dist/public`, rather than `artifacts/social-watch/dist/public`.

## Troubleshooting

| Problem | What to check |
| --- | --- |
| Pages returns 404 or shows repository documentation | Set Pages source to **GitHub Actions**, wait for a successful deploy, and use **Visit site**, not the GitHub code page. Keep the URL subpath/trailing slash. |
| Actions build/deploy is red | Open the first failed step in Actions. Check the default branch, locked dependency installation, test output, and repository permission to deploy Pages. Do not skip failing security/vault tests to publish. |
| No install / Add to Dock / Add to Home Screen option | Use the real HTTPS site in a supported browser, outside private mode. Update the browser/OS; on iPhone open Safari directly. macOS Safari Add to Dock needs Sonoma 14+. |
| No accounts after Meta login | Check the exact redirect URL, app role invitation, Page access/tasks, granted permissions, and linked Instagram professional account. See the detailed Meta guide below. |
| No notifications | Check both browser/OS permission and each account/event opt-in. Check the refresh interval, silent baseline, watchlist, auto-lock, Focus mode, and browser suspension. Closed-app monitoring is unsupported. |
| Vault looks empty on another device or in the installed app | Storage is local to the device/browser/profile/origin. Reconnect accounts there; transfer settings intentionally. There is no automatic sync. |
| Offline launch fails | First load/reload the production app online and allow caching to finish. The dev server deliberately has no offline worker. Storage eviction/private browsing can remove cached files. |
| Forgot the vault passphrase | There is no reset. Wiping starts a new empty vault and loses the old local data; it cannot recover it. |
| Git says `DIRTY_WORKTREE` or `BRANCH_ALREADY_EXISTS` | Inspect `git status`; preserve local files before switching. Select an existing branch rather than creating it again. Do not discard data blindly. |
| Git rejects an OAuth workflow update | The GitHub authorization needs workflow access. Reconnecting does not necessarily grant it. See GitHub's [workflow scope rules](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps#available-scopes); never paste credentials into chat or source. |

## Further documentation

- [Application, Meta setup, security, and technical limitations](artifacts/social-watch/README.md)
- [Apple: Safari web apps on Mac](https://support.apple.com/en-us/104996)
- [Apple: Turn a website into an app on iPhone](https://support.apple.com/guide/iphone/open-as-web-app-iphea86e5236/ios)
- [Microsoft: Install and manage apps in Edge](https://support.microsoft.com/en-us/edge/install-manage-or-uninstall-apps-in-microsoft-edge)

Licensed under the [MIT licence](artifacts/social-watch/LICENSE).
