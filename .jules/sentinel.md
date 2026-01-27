## 2026-01-27 - Prevent .env Tracking
**Vulnerability:** The `.env` file containing the `GEMINI_API_KEY` was tracked in git, exposing the secret to anyone with access to the repository.
**Learning:** Even with `.gitignore` intended, files already tracked by git remain tracked. Explicitly removing them with `git rm --cached` is required. The presence of comments like "API Keys (server-side only)" can create a false sense of security if the file itself is committed.
**Prevention:** Always verify `.gitignore` covers sensitive files BEFORE the first commit. Use `.env.example` templates immediately. Periodically audit tracked files for secrets using tools like `git ls-files`.
