## 2025-02-09 - [Secure Error Handling & Secret Protection]
**Vulnerability:** The Vercel Edge Function `api/analyze-invoice.js` was returning raw error messages to the client. The `@google/generative-ai` library is known to include the API key in its error messages (e.g., "API key not valid"), leading to potential credential leakage. Additionally, `.env` was missing from `.gitignore`.
**Learning:** Third-party SDKs can inadvertently leak secrets via exception messages. Infrastructure configuration (like `.gitignore`) is as critical as code security.
**Prevention:** Always catch errors in API handlers and return generic messages (e.g., "Internal Server Error") to the client, while logging the specific error server-side. Ensure `.env` is always git-ignored.
