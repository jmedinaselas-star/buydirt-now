## 2025-02-18 - Hardcoded Secrets in Git
**Vulnerability:** The `.env` file containing API keys was not in `.gitignore`.
**Learning:** Checking in `.env` files is a common but critical mistake that exposes secrets to anyone with repo access.
**Prevention:** Always add `.env` to `.gitignore` immediately upon project creation. Use `.env.example` for templates.
