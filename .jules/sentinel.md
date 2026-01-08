## 2024-05-23 - [CRITICAL] Hardcoded Secrets in Version Control
**Vulnerability:** The `.env` file containing the `GEMINI_API_KEY` was being tracked by git, exposing the secret key in the repository history.
**Learning:** Checking `.gitignore` alone is insufficient; one must verify what files are actually tracked by git (`git ls-files .env`). Even "standard" ignores can be missed in initial setup.
**Prevention:** Always verify `.gitignore` includes `.env` during project initialization. Use tools like `git-secrets` or pre-commit hooks to scan for secrets before committing. Ensure `.env.example` is used for templates.
