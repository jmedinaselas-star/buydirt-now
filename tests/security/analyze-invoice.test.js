/* eslint-disable no-undef */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import handler from '../../api/analyze-invoice.js';

// Use vi.hoisted to create mocks that can be referenced in vi.mock
const { mockGenerateContent, mockGetGenerativeModel } = vi.hoisted(() => {
    const mockGenerateContent = vi.fn();
    const mockGetGenerativeModel = vi.fn().mockReturnValue({
        generateContent: mockGenerateContent
    });
    return { mockGenerateContent, mockGetGenerativeModel };
});

vi.mock('@google/generative-ai', () => ({
  // Must use a regular function to support 'new'
  GoogleGenerativeAI: vi.fn().mockImplementation(function() {
    return { getGenerativeModel: mockGetGenerativeModel };
  })
}));

describe('analyze-invoice security', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.GEMINI_API_KEY = 'test-key';

    // Reset implementations
    mockGetGenerativeModel.mockReturnValue({
        generateContent: mockGenerateContent
    });

    // Reset GoogleGenerativeAI mock implementation if needed, but it's set in vi.mock
  });

  it('should not leak internal error details on API failure', async () => {
    // Setup mock to throw a specific error that should NOT be leaked
    const sensitiveError = 'API key expired: sk-12345';
    mockGenerateContent.mockRejectedValue(new Error(sensitiveError));

    // Mock request
    const request = {
      method: 'POST',
      json: async () => ({
        imageBase64: 'fake-base64',
        mimeType: 'image/jpeg'
      })
    };

    const response = await handler(request);

    let body;
    if (typeof response.json === 'function') {
        body = await response.json();
    } else {
        body = JSON.parse(await response.text());
    }

    expect(response.status).toBe(500);
    expect(body.error).toBe('Internal Server Error');
    expect(body.error).not.toContain('sk-12345');
  });

  it('should not leak raw text on parse failure', async () => {
      // Mock successful generation but invalid JSON
      mockGenerateContent.mockResolvedValue({
          response: {
              text: () => 'Invalid JSON here with sensitive info: SecretProjectX'
          }
      });

      const request = {
          method: 'POST',
          json: async () => ({
              imageBase64: 'fake-base64',
              mimeType: 'image/jpeg'
          })
      };

      const response = await handler(request);

      let body;
      if (typeof response.json === 'function') {
          body = await response.json();
      } else {
          body = JSON.parse(await response.text());
      }

      expect(response.status).toBe(500);
      expect(body.error).toBe('Failed to parse invoice data');
      // Ensure 'raw' field is gone
      expect(body).not.toHaveProperty('raw');
  });
});
