## 2025-10-26 - Prevent API Key Leakage in Error Responses
**Vulnerability:** The `@google/generative-ai` library includes the full API key in its raw error messages. The `api/analyze-invoice.js` endpoint was catching these errors and returning them directly to the client: `return new Response(JSON.stringify({ error: error.message })`.
**Learning:** Third-party SDKs often include sensitive debug information in their exceptions. Simply passing `error.message` to the client is a security risk, especially with API keys.
**Prevention:** Always sanitize error messages at the edge/server boundary. Log the full error server-side for debugging, but return a generic "Internal Server Error" message to the client.
