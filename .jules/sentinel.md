## 2024-02-14 - Hardcoded Secrets & API Error Leaks
**Vulnerability:**
1. The `.env` file containing the Gemini API key was tracked in git (missing from `.gitignore`).
2. The `api/analyze-invoice.js` endpoint returned raw `error.message` to the client, which could expose the API key or internal details.

**Learning:**
Vercel Edge Functions running in a local environment or without strict CORS might need manual OPTIONS handling. More importantly, simply ignoring `.env` isn't enough if it's already in the repo history; you must `git rm --cached` it. API libraries (like `@google/generative-ai`) often include the key in error messages, making generic error responses mandatory.

**Prevention:**
Always start with `.env` in `.gitignore`. Use a `validate-env` script or pre-commit hook to check for secrets. Always catch errors at the API boundary and return generic messages ("Internal Server Error") while logging full details server-side.
