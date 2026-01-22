## 2025-02-18 - Google Generative AI Error Leaks
**Vulnerability:** The `@google/generative-ai` library includes the full API key in its error messages (e.g., 403 Forbidden or validation errors).
**Learning:** Simply returning `error.message` to the client in a catch block exposes the API key to end-users if the Gemini API call fails.
**Prevention:** Always catch errors from `GoogleGenerativeAI` calls and return a generic "Internal Server Error" message to the client, while logging the full error details server-side for debugging.
