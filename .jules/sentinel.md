## 2024-02-14 - API Security Hardening
**Vulnerability:** The invoice analysis API leaked internal error details (including potential API keys in stack traces) and lacked input validation for file types.
**Learning:** Cloud AI SDKs (like `@google/generative-ai`) often include sensitive context in their error objects. Returning these directly to the client is a security risk.
**Prevention:** Always wrap external API calls in try/catch blocks that log the full error server-side but return a sanitized, generic message to the client. Explicitly validate inputs (MIME types) before processing.
