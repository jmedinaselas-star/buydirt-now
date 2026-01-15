## 2024-02-14 - Hardcoded Secrets in Tracked Files
**Vulnerability:** A `.env` file containing a valid `GEMINI_API_KEY` was tracked by git, exposing secrets to anyone with access to the repository.
**Learning:** Developers often forget to add `.env` to `.gitignore` before the first commit, or mistakenly `git add .` including it.
**Prevention:**
1. Ensure `.gitignore` includes `.env` and `.env.*` from project inception.
2. Use `.env.example` for templates.
3. Use secret scanning tools in CI/CD.
