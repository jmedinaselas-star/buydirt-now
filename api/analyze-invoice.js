/* eslint-disable no-undef */
import { GoogleGenerativeAI } from '@google/generative-ai';

export const config = {
    runtime: 'edge',
};

export default async function handler(request) {
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const { imageBase64, mimeType } = await request.json();

        if (!imageBase64 || !mimeType) {
            return new Response(JSON.stringify({ error: 'Missing imageBase64 or mimeType' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
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
        } catch (parseError) { // eslint-disable-line no-unused-vars
            console.error('Failed to parse response:', text);
            return new Response(JSON.stringify({ error: 'Failed to parse response from AI service' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify(jsonData), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Gemini API error:', error);
        // Return a generic error message to avoid leaking sensitive details
        return new Response(JSON.stringify({ error: 'Failed to process invoice. Please try again later.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
