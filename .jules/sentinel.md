## 2024-05-23 - Hardcoded Gemini API Key
**Vulnerability:** A real `GEMINI_API_KEY` was hardcoded in the `.env` file and committed to the repository.
**Learning:** Even "private" repositories can leak secrets if `.env` files are not properly ignored. Developers often forget to check `.gitignore` before committing configuration files.
**Prevention:** Always add `.env` to `.gitignore` during project initialization. Use `.env.example` for templates. Use pre-commit hooks to scan for high-entropy strings or known key patterns.
