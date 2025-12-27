## 2024-02-12 - Committed Secrets in .env
**Vulnerability:** The `.env` file containing the Gemini API key was committed to the repository.
**Learning:** Checking `.gitignore` is not enough; one must verify if the file is already tracked by git.
**Prevention:** Always add `.env` to `.gitignore` immediately upon project creation and use `.env.example`.
