## 2024-05-22 - Hardcoded API Key Exposure
**Vulnerability:** A hardcoded Google Gemini API key was found in the `.env` file, which was committed to the repository.
**Learning:** Developers often commit `.env` files by mistake if not explicitly added to `.gitignore` early in the project.
**Prevention:** Always add `.env` to `.gitignore` immediately upon project creation. Use `.env.example` for templates.
