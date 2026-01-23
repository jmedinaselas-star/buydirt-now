import { describe, it, expect, vi, beforeEach } from 'vitest';
import handler from '../../api/analyze-invoice.js';

// Mock the GoogleGenerativeAI class
const mockGenerateContent = vi.fn();
const mockGetGenerativeModel = vi.fn(() => ({
  generateContent: mockGenerateContent,
}));

vi.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: vi.fn().mockImplementation(function() {
      return {
        getGenerativeModel: mockGetGenerativeModel,
      };
    }),
  };
});

// Mock console.error to avoid polluting test output
vi.spyOn(console, 'error').mockImplementation(() => {});

describe('analyze-invoice API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.GEMINI_API_KEY = 'test-key';
  });

  it('should return 500 with generic error message when API fails', async () => {
    // Setup mock to throw error containing sensitive info
    const sensitiveError = 'API Key sk-12345 invalid';
    mockGenerateContent.mockRejectedValue(new Error(sensitiveError));

    const req = new Request('http://localhost/api/analyze-invoice', {
      method: 'POST',
      body: JSON.stringify({
        imageBase64: 'fakebase64',
        mimeType: 'image/jpeg',
      }),
    });

    const res = await handler(req);
    const body = await res.json();

    expect(res.status).toBe(500);
    // We expect the fix to return "Internal server error"
    // Currently, this should FAIL because it returns the sensitive error
    expect(body).toEqual({ error: 'Internal server error' });
    expect(body.error).not.toContain('sk-12345');
  });

  it('should return 400 for invalid MIME type', async () => {
     const req = new Request('http://localhost/api/analyze-invoice', {
      method: 'POST',
      body: JSON.stringify({
        imageBase64: 'fakebase64',
        mimeType: 'application/x-msdownload', // Invalid type
      }),
    });

    const res = await handler(req);

    // We expect the fix to return 400
    // Currently, this should FAIL (likely 200 or 500 depending on mock)
    expect(res.status).toBe(400);
  });
});
