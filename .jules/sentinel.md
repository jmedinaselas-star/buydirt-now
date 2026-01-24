## 2026-01-24 - Committed Secrets
**Vulnerability:** `.env` file containing sensitive `GEMINI_API_KEY` was committed to the git repository.
**Learning:** The file was excluded from `.gitignore`, causing it to be tracked despite containing "server-side only" secrets.
**Prevention:** Always add `.env` to `.gitignore` during project initialization. Use `.env.example` for public configuration templates.
