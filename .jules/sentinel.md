## 2025-05-23 - Hardcoded Secrets in Git
**Vulnerability:** The `.env` file containing the real `GEMINI_API_KEY` was missing from `.gitignore`, posing a critical risk of accidental exposure if committed.
**Learning:** Even if a file isn't currently tracked, if it's not in `.gitignore`, a simple `git add .` can expose secrets. Always verify `.gitignore` explicitly lists secret files.
**Prevention:** Added `.env`, `.env.development`, and `.env.production` to `.gitignore`. Created `.env.example` to provide a safe template for other developers.
