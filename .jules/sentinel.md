## 2025-01-21 - Exposed Secrets in Git
**Vulnerability:** The `.env` file containing the `GEMINI_API_KEY` was tracked by git and not included in `.gitignore`.
**Learning:** Checking `.gitignore` is not enough; one must verify if the file is actually tracked by git. Secrets were potentially exposed in history.
**Prevention:** Always add `.env` to `.gitignore` during project initialization and use `.env.example` for templates. Use pre-commit hooks to scan for secrets.
