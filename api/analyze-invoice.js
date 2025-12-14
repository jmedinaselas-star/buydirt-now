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
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const prompt = `Analiza este documento y determina si es una factura válida.

Si ES una factura, extrae los siguientes datos en formato JSON:
{
  "isValidInvoice": true,
  "nifEmisor": "NIF/CIF del emisor",
  "nombreEmpresa": "Nombre completo/razón social de la empresa emisora",
  "marcaComercial": "SOLO la denominación comercial corta o marca conocida de la empresa, por ejemplo: si es 'REPSOL Comercial de Productos Petrolíferos S.A.' devuelve solo 'Repsol', si es 'Vodafone España S.A.U.' devuelve solo 'Vodafone', si es 'Supermercados DIA S.A.' devuelve solo 'DIA'",
  "fecha": "Fecha de la factura en formato DD/MM/YYYY",
  "numeroFactura": "Número de factura",
  "baseImponible": "Base imponible en euros",
  "iva": "Importe del IVA",
  "total": "Total de la factura"
}

Si NO es una factura (es otra cosa como una foto, documento diferente, etc.), responde:
{
  "isValidInvoice": false,
  "reason": "Breve explicación de por qué no es una factura"
}

Responde SOLO con el JSON, sin texto adicional.`;

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
        } catch (parseError) {
            return new Response(JSON.stringify({ error: 'Failed to parse response', raw: text }), {
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
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
