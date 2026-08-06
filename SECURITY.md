# Security Policy

## Reporting Vulnerabilities

If you discover a security vulnerability within **CreateDOT**, please notify our technical team responsibly rather than opening a public issue.

### Disclosure Process
1. Email security issues to: `security@createdot.app` (or contact repository owners).
2. Include steps to reproduce the vulnerability, sample requests/payloads, and affected endpoints.
3. Allow up to 48 hours for an initial response before taking secondary action.

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Security Controls
- **Row Level Security (RLS)**: Enforced across all Supabase database tables.
- **Service Role Key**: Isolated to server-side routes (`/app/api/...`) and never exposed to the client bundle.
- **Environment Secrets**: Managed via encrypted `.env.local` / CI secrets.
