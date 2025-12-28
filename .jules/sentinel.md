## 2024-05-23 - Critical Configuration Vulnerability
**Vulnerability:** `.env` file containing real API keys was not in `.gitignore`.
**Learning:** Default project templates sometimes omit `.env` from gitignore, or users create it without realizing it's tracked.
**Prevention:** Always check `.gitignore` first thing. Use `.env.example` for templates.

## 2024-05-23 - Information Leakage in API
**Vulnerability:** API endpoints returning raw `error.message` and raw AI output.
**Learning:** Serverless functions often default to simple error returns, but this leaks stack traces or internal logic (like "Quota exceeded" or parsing errors).
**Prevention:** Implement a global error handler or specific try/catch blocks that log the real error but return a generic "Internal Server Error" to the client.
