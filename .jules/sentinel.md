## 2025-01-06 - Exposed API Keys in Git
**Vulnerability:** The `.env` file containing the `GEMINI_API_KEY` was committed to the git repository because it was missing from `.gitignore`.
**Learning:** Even with "server-side only" comments, files must be explicitly ignored. Relying on developer discipline is insufficient.
**Prevention:** Added `.env` to `.gitignore` and removed it from the cache. Added `.env.example` to provide a safe template.

## 2025-01-06 - Leaking Internal Errors to Client
**Vulnerability:** `api/analyze-invoice.js` was returning `error.message` directly to the client. The `@google/generative-ai` SDK can include the API key in validation error messages.
**Learning:** Third-party SDKs often include sensitive context in exceptions. Never pipe `error.message` to the client in production.
**Prevention:** Replaced specific error messages with a generic "Failed to process invoice" response for the client, while keeping `console.error` for server-side debugging.
