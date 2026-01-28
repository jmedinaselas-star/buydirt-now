## 2026-01-28 - Prevent LLM Raw Output Leakage
**Vulnerability:** The API endpoint `api/analyze-invoice.js` was returning the raw text response from the Gemini API to the client in case of a JSON parsing error, as well as raw error messages.
**Learning:** Returning raw LLM output or internal error details allows attackers to inspect internal prompts, potential PII that the LLM might have hallucinated or extracted, or system paths. It violates the principle of "Fail Securely".
**Prevention:** Always catch errors server-side, log them securely for debugging, and return a generic error message (e.g., "Internal server error") to the client. Never pass `error.message` or raw responses directly to the frontend.
