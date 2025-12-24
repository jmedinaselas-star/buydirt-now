## 2024-12-24 - [CRITICAL] Hardcoded Secrets in Git
**Vulnerability:** The `.env` file containing the `GEMINI_API_KEY` was committed to the repository. This exposes the API key to anyone with access to the codebase.
**Learning:** Even in private repositories, secrets should never be committed. `.gitignore` should be configured immediately upon project creation.
**Prevention:**
1. Always add `.env` to `.gitignore` first.
2. Use `.env.example` for templates.
3. Use pre-commit hooks (like `git-secrets` or `trufflehog`) to scan for secrets before committing.
