## 2025-02-18 - API Error Leakage & Input Validation
**Vulnerability:** The `api/analyze-invoice.js` endpoint leaked raw error details from the Google Generative AI library to the client, potentially exposing API keys or internal stack traces. It also lacked input validation for MIME types.
**Learning:** Vercel Edge Functions require explicit CORS handling (OPTIONS + headers). The `@google/generative-ai` library includes sensitive info in error messages (like `API_KEY_INVALID`).
**Prevention:** Always sanitize error messages in API handlers. Validate all inputs against a whitelist before processing.
