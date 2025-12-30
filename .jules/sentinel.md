## 2024-02-14 - Hardcoded Secrets & API Security
**Vulnerability:** Found `GEMINI_API_KEY` hardcoded in `.env` which was NOT in `.gitignore`.
**Learning:** Checking `.gitignore` is the first step in any security audit. Even if `.env` exists, it might be exposed.
**Prevention:** Always verify `.gitignore` contains `.env` and sensitive config files immediately upon project setup. Added `.env.example` for safe templating.
