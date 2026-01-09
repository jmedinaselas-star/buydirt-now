## 2025-02-18 - @google/generative-ai Error Leakage
**Vulnerability:** The @google/generative-ai library includes the full API key in raw error messages when the API call fails (e.g., quota exceeded).
**Learning:** This specific library behavior transforms a generic 500 error into a Critical Information Disclosure vulnerability if the error.message is returned to the client.
**Prevention:** Always wrap Google Generative AI calls in try/catch blocks that log the full error server-side but return a generic sanitised message to the client.
