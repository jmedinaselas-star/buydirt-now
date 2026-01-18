# Sentinel Journal

## 2025-02-18 - Hardcoded Secrets in Committed Env Files
**Vulnerability:** A valid `GEMINI_API_KEY` was hardcoded in the `.env` file, which was committed to the repository.
**Learning:** Simply adding `.env` to `.gitignore` is insufficient if the file is already tracked by Git. The file must be explicitly removed from the repository (untracked) to prevent future modifications from being committed and to signal that it should not be there.
**Prevention:** Always verify if sensitive files are already tracked before assuming `.gitignore` will protect them. Use `git rm --cached .env` (or delete and re-create locally) to stop tracking. Ensure `.env.example` is used for templates.
