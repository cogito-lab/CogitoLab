# Security policy

This repository produces a static public website. It contains no authentication, server-side state, or private content.

## Reporting a vulnerability

Do not publish a security issue before maintainers have had a reasonable opportunity to assess it. Contact a repository administrator through GitHub and include the affected path, impact, and reproduction steps.

## Maintainer checklist

- Never commit credentials, personal access tokens, private datasets, or confidential partner material.
- Treat all Markdown and files in `public/` as internet-public.
- Review external URLs and uploaded files before merging.
- Keep automated dependency and GitHub Actions updates enabled.
- Require pull-request review and successful validation checks on `main`.
- Use GitHub Pages with HTTPS enforcement enabled.
