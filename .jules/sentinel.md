## 2026-01-23 - Prevent Information Leakage in API Errors
**Vulnerability:** The `analyze-invoice` endpoint was returning raw `error.message` to the client. This is a critical risk because the `@google/generative-ai` library can include the API key in error messages.
**Learning:** Third-party SDKs often include sensitive configuration details (like API keys) in their error objects. Trusting `error.message` is dangerous.
**Prevention:** Always sanitize error responses in public APIs. Log the full error server-side, but return a generic "Internal server error" message to the client.
