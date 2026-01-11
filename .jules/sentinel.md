## 2025-02-14 - Hardcoded Secret in .env not Ignored
**Vulnerability:** The `.env` file containing `GEMINI_API_KEY` was not listed in `.gitignore`, risking exposure of the API key if the file is committed.
**Learning:** Developers often assume `.env` is ignored by default or forget to add it to `.gitignore` when initializing a project. Tools like Vite or Next.js often provide `.gitignore` templates, but they might be modified or missing.
**Prevention:** Always verify `.gitignore` includes `.env` and other secret files immediately upon project setup. Use `.env.example` for templates.
