## 2025-01-26 - Critical Secrets Exposure and Error Leakage

**Vulnerability:** The `GEMINI_API_KEY` was hardcoded in the `.env` file, which was tracked by git. Additionally, the backend API `api/analyze-invoice.js` was leaking raw error messages and internal response data to the client.

**Learning:** Hardcoded secrets in tracked files are a common but critical vulnerability that can lead to immediate compromise of external services. Libraries like `@google/generative-ai` often include sensitive data (like keys) in their error objects, making it dangerous to pass `error.message` directly to the client.

**Prevention:**
1. Always add `.env` to `.gitignore` before creating it.
2. Use `.env.example` for templates.
3. Sanitize all error messages in API handlers (return "Internal Server Error" to client, log actual error server-side).
