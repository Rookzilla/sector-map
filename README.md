# Cowled Abyss Sector Atlas

An interactive encyclopedia of the Cowled Abyss: explore a living star-sector map, inspect system intelligence, and open detailed planetary dossiers with faction context, conflict status, and campaign lore.

## Live Deployment

https://d3hqzjp3q77og.cloudfront.net/

## What This Is

- Interactive systems map with pan and zoom
- System intelligence panel with threat, faction, and world summaries
- Planetary dossier overlay with deeper operational and lore detail
- i18n-ready content pipeline (currently English and Spanish)
- Mobile-optimized exploration flow

## Tech Stack

- React + TypeScript
- Vite
- Emotion (styled components)
- Framer Motion
- Jest + Testing Library
- AWS CDK + GitHub Actions for deployment

## Local Development

```bash
yarn install
yarn dev
```

## Quality Checks

```bash
yarn test --runInBand
yarn lint
yarn typecheck
yarn build
```

## Deployment Notes

This project deploys through GitHub Actions. Standard release flow:

1. Push to the deployment branch (typically `main`)
2. Wait for CI/CD checks to pass
3. Approve protected environment deployment when prompted
4. CloudFront serves the updated release
