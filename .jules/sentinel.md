## 2024-01-10 - Secured Invoice Analysis API and Env File
**Vulnerability:** API leaked raw error details (including potential API keys) to the client, lacked input validation for MIME types, and the `.env` file containing secrets was tracked by git.
**Learning:** The `@google/generative-ai` library throws errors that include the full API key in the message when authentication fails. Returning `error.message` directly is a critical security risk.
**Prevention:** Always wrap external API calls in try/catch blocks that log the full error server-side but return a generic "Internal Server Error" to the client. Ensure `.env` is in `.gitignore` before the first commit.
