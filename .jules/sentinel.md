## 2025-12-31 - [Error Handling Leakage]
**Vulnerability:** Raw exception messages from `@google/generative-ai` were returned directly to the client in the API response.
**Learning:** The Google Generative AI library includes the full API key in some error messages (e.g., when the key is invalid or quota is exceeded). Returning `error.message` directly exposes this secret to the frontend/user.
**Prevention:** Always catch errors in backend handlers and return a generic message (e.g., 'Internal Server Error') to the client, while logging the full error details server-side.
