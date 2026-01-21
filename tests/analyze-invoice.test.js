/* eslint-disable no-undef */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import handler from '../api/analyze-invoice.js';

// Mock the GoogleGenerativeAI library
vi.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: vi.fn().mockImplementation(() => ({
      getGenerativeModel: vi.fn().mockReturnValue({
        generateContent: vi.fn().mockResolvedValue({
          response: {
            text: () => JSON.stringify({ isValidInvoice: true })
          }
        })
      })
    }))
  };
});

describe('analyze-invoice API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.GEMINI_API_KEY = 'test-key';
  });

  it('should handle OPTIONS request (CORS)', async () => {
    const req = new Request('http://localhost', { method: 'OPTIONS' });
    const res = await handler(req);

    expect(res.status).toBe(204);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
    expect(res.headers.get('Access-Control-Allow-Methods')).toBe('POST, OPTIONS');
  });

  it('should reject non-POST requests', async () => {
    const req = new Request('http://localhost', { method: 'GET' });
    const res = await handler(req);

    expect(res.status).toBe(405);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
  });

  it('should validate mimeType', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({ imageBase64: 'data', mimeType: 'text/plain' })
    });
    const res = await handler(req);

    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe('Invalid mimeType');
  });

  it('should sanitize errors when API fails', async () => {
    // Force the mock to throw
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    GoogleGenerativeAI.mockImplementationOnce(() => {
      throw new Error('Secret API Key Leak: sk-12345');
    });

    const req = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({ imageBase64: 'data', mimeType: 'image/jpeg' })
    });
    const res = await handler(req);

    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toBe('Internal Server Error'); // Check that it's sanitized
    expect(body.error).not.toContain('sk-12345');
  });
});
