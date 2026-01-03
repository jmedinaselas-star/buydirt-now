/* eslint-disable no-undef */
import { GoogleGenerativeAI } from '@google/generative-ai';

export const config = {
    runtime: 'edge',
};

// Helper function to get secure CORS headers based on origin
function getCorsHeaders(request) {
    const origin = request.headers.get('Origin');
    const allowedOrigins = [
        'http://localhost:5173', // Local Vite dev
        'http://localhost:4173', // Local Vite preview
        // Add production domains here if known, e.g.:
        // 'https://metallic-interstellar.vercel.app',
    ];

    // Check if origin matches allowed list or if it's a Vercel preview deployment
    const isAllowed = origin && (
        allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app') // Allow Vercel preview/production domains
    );

    return {
        'Access-Control-Allow-Origin': isAllowed ? origin : 'null',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };
}

export default async function handler(request) {
    const corsHeaders = getCorsHeaders(request);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers: corsHeaders
        });
    }

    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: corsHeaders,
        });
    }

    try {
        const { imageBase64, mimeType } = await request.json();

        if (!imageBase64 || !mimeType) {
            return new Response(JSON.stringify({ error: 'Missing imageBase64 or mimeType' }), {
                status: 400,
                headers: corsHeaders,
            });
        }

        if (!process.env.GEMINI_API_KEY) {
            console.error('Missing GEMINI_API_KEY');
            return new Response(JSON.stringify({ error: 'Server configuration error' }), {
                status: 500,
                headers: corsHeaders,
            });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // IMPORTANTE: Usar siempre gemini-2.5-flash - NO CAMBIAR
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
            generationConfig: {
                maxOutputTokens: 500,
                temperature: 0.1,
            }
        });

        const prompt = `Extrae datos de esta factura española en JSON.

BUSCA: Fecha (DD/MM/YYYY), NIF emisor, empresa, nº factura, base imponible, IVA, total.

RESPONDE SOLO JSON:
{"isValidInvoice":true,"nifEmisor":"X","nombreEmpresa":"X","marcaComercial":"X","fechaFactura":"DD/MM/YYYY","numeroFactura":"X","baseImponible":"X €","iva":"X €","total":"X €"}

Si NO es factura: {"isValidInvoice":false,"reason":"X"}`;

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    mimeType,
                    data: imageBase64,
                },
            },
        ]);

        const response = await result.response;
        const text = response.text();

        // Intentar parsear el JSON
        let jsonData;
        try {
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                jsonData = JSON.parse(jsonMatch[0]);
            } else {
                throw new Error('No JSON found in response');
            }
        } catch {
            return new Response(JSON.stringify({ error: 'Failed to parse response' }), {
                status: 500,
                headers: corsHeaders,
            });
        }

        return new Response(JSON.stringify(jsonData), {
            status: 200,
            headers: corsHeaders,
        });
    } catch (error) {
        console.error('Gemini API error:', error);
        return new Response(JSON.stringify({ error: 'Error processing invoice' }), {
            status: 500,
            headers: corsHeaders,
        });
    }
}
