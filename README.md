# Social Watch

A static, private social-moderation Progressive Web App for GitHub Pages.

The application is in [`artifacts/social-watch`](artifacts/social-watch). Read its [complete README](artifacts/social-watch/README.md) for setup, Pages deployment, Meta developer configuration, PWA installation, encryption, tests and limitations.

```sh
pnpm install
pnpm --filter @workspace/social-watch dev
pnpm --filter @workspace/social-watch typecheck
pnpm --filter @workspace/social-watch test
pnpm --filter @workspace/social-watch build
```

The root GitHub Actions workflow publishes only the static Social Watch build. Other workspace services are unused development scaffolding. There is no runtime backend.

For a minimal standalone repository use the supplied `social-watch-source.zip`; it contains only this app and its standalone GitHub Pages workflow.

Licensed under the [MIT licence](artifacts/social-watch/LICENSE).
