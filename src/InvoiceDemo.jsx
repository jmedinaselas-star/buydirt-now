import { useState, useCallback, useEffect } from 'react'
import { Upload, FileCheck, AlertCircle, Loader2, X, FileText, ArrowRight } from 'lucide-react'

// Regla de renombrado predefinida: YYYYMMDD_NumFactura
const NAMING_RULE = "{FECHA}_{NUMERO}"

// Datos mock para demo sin API
const MOCK_INVOICES = [
    {
        isValidInvoice: true,
        nifEmisor: "B-87654321",
        nombreEmpresa: "ASADOR LOS LEÑOS S.L.",
        marcaComercial: "Asador Los Leños",
        fechaFactura: "22/12/2024",
        numeroFactura: "F/2024-8921",
        baseImponible: "77,73 €",
        iva: "7,77 €",
        total: "85,50 €",
        imagePath: "/demo-invoices/invoice_restaurant_real.png",
        fileName: "scan_restaurante_lenos.jpg"
    },
    {
        isValidInvoice: true,
        nifEmisor: "B-91234567",
        nombreEmpresa: "TECHNOVA SOLUCIONES S.L.",
        marcaComercial: "TechNova",
        fechaFactura: "10/01/2025",
        numeroFactura: "FACT-25-0042",
        baseImponible: "450,00 €",
        iva: "94,50 €",
        total: "544,50 €",
        imagePath: "/demo-invoices/invoice_tech_real.png",
        fileName: "factura_technova_enero.pdf"
    },
    {
        isValidInvoice: true,
        nifEmisor: "A-20245567",
        nombreEmpresa: "ALMACENES EL MARTILLO S.A.",
        marcaComercial: "El Martillo Construcción",
        fechaFactura: "15/12/2024",
        numeroFactura: "A-2024/5567",
        baseImponible: "103,64 €",
        iva: "21,76 €",
        total: "125,40 €",
        imagePath: "/demo-invoices/invoice_construction_real.png",
        fileName: "albaran_martillo_cemento.jpg"
    }
]



// Función para generar el nombre sugerido
const generateSuggestedName = (data) => {
    if (!data || !data.isValidInvoice) return null

    // Convertir fecha a formato YYYYMMDD
    let fecha = data.fecha || 'SINFECHA'
    const dateMatch = fecha.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/)
    if (dateMatch) {
        const day = dateMatch[1].padStart(2, '0')
        const month = dateMatch[2].padStart(2, '0')
        const year = dateMatch[3].length === 2 ? '20' + dateMatch[3] : dateMatch[3]
        fecha = `${year}${month}${day}`
    }

    // Número de factura (limpiar caracteres especiales)
    const numero = (data.numeroFactura || 'SN')
        .replace(/[^a-zA-Z0-9]/g, '')

    return NAMING_RULE
        .replace('{FECHA}', fecha)
        .replace('{NUMERO}', numero)
        + '.pdf'
}

export default function InvoiceDemo() {
    const [image, setImage] = useState(null)
    const [originalName, setOriginalName] = useState('')
    const [imagePreview, setImagePreview] = useState(null)
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(null)
    const [error, setError] = useState(null)
    const [dragActive, setDragActive] = useState(false)

    // En modo mock, cargar automáticamente una factura de demo al iniciar
    const isMockMode = import.meta.env.VITE_DEMO_MOCK_MODE === 'true'

    useEffect(() => {
        if (isMockMode) {
            // Seleccionar una factura aleatoria
            const randomIndex = Math.floor(Math.random() * MOCK_INVOICES.length)
            const mockInvoice = MOCK_INVOICES[randomIndex]

            // Establecer la preview y los datos
            setImagePreview(mockInvoice.imagePath)
            setOriginalName(mockInvoice.fileName)
            setResult({ ...mockInvoice, fecha: mockInvoice.fechaFactura })
        }
    }, [isMockMode])

    const handleDrag = useCallback((e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }, [])

    const handleDrop = useCallback((e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0])
        }
    }, [])

    const handleFile = (file) => {
        const isImage = file.type.startsWith('image/')
        const isPDF = file.type === 'application/pdf'

        if (!isImage && !isPDF) {
            setError('Por favor, sube una imagen (JPG, PNG) o un PDF')
            return
        }

        setImage(file)
        setOriginalName(file.name)
        setResult(null)
        setError(null)

        const reader = new FileReader()
        reader.onload = (e) => {
            setImagePreview(e.target.result)
        }
        reader.readAsDataURL(file)
    }

    const handleInputChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0])
        }
    }

    // Función para comprimir imagen antes de enviar a la API (optimizada para Vercel Edge límite ~4MB)
    const compressImage = (file, maxWidth = 600, quality = 0.5) => {
        return new Promise((resolve) => {
            // Si es PDF, no comprimir
            if (file.type === 'application/pdf') {
                const reader = new FileReader()
                reader.onload = (e) => resolve({
                    base64: e.target.result.split(',')[1],
                    mimeType: file.type
                })
                reader.readAsDataURL(file)
                return
            }

            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            const img = new Image()

            img.onload = () => {
                // Calcular nuevo tamaño manteniendo proporción
                let width = img.width
                let height = img.height

                if (width > maxWidth) {
                    height = (height * maxWidth) / width
                    width = maxWidth
                }

                canvas.width = width
                canvas.height = height

                // Dibujar imagen comprimida
                ctx.drawImage(img, 0, 0, width, height)

                // Convertir a base64 con compresión
                const compressedDataUrl = canvas.toDataURL('image/jpeg', quality)
                resolve({
                    base64: compressedDataUrl.split(',')[1],
                    mimeType: 'image/jpeg'
                })
            }

            // Cargar imagen desde file
            const reader = new FileReader()
            reader.onload = (e) => {
                img.src = e.target.result
            }
            reader.readAsDataURL(file)
        })
    }

    const analyzeInvoice = async () => {
        if (!image) return

        setLoading(true)
        setError(null)
        setResult(null)

        // Modo mock para demos sin dependencia de API
        const isMockMode = import.meta.env.VITE_DEMO_MOCK_MODE === 'true'

        if (isMockMode) {
            // Simular delay de procesamiento
            await new Promise(resolve => setTimeout(resolve, 1500))

            // Seleccionar una factura mock aleatoria
            const randomIndex = Math.floor(Math.random() * MOCK_INVOICES.length)
            const mockData = { ...MOCK_INVOICES[randomIndex] }
            mockData.fecha = mockData.fechaFactura

            setResult(mockData)
            setLoading(false)
            return
        }

        // Modo real: llamar a Gemini API
        try {
            // Comprimir imagen antes de enviar
            const { base64: compressedBase64, mimeType: compressedMimeType } = await compressImage(image)

            // Llamar a la API serverless (protege la API key)
            const response = await fetch('/api/analyze-invoice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    imageBase64: compressedBase64,
                    mimeType: compressedMimeType,
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Error al analizar la factura')
            }

            const data = await response.json()

            // Añadir flag de factura válida para compatibilidad
            if (data.nombreEmpresa || data.marcaComercial) {
                data.isValidInvoice = true
                data.fecha = data.fechaFactura
            } else {
                data.isValidInvoice = false
            }

            setResult(data)
            setLoading(false)
        } catch (err) {
            console.error(err)
            setError('Error al procesar la imagen. Inténtalo de nuevo.')
            setLoading(false)
        }
    }

    const reset = () => {
        // En modo mock, cargar otra factura aleatoria directamente
        if (isMockMode) {
            const randomIndex = Math.floor(Math.random() * MOCK_INVOICES.length)
            const mockInvoice = MOCK_INVOICES[randomIndex]
            setImagePreview(mockInvoice.imagePath)
            setOriginalName(mockInvoice.fileName)
            setResult({ ...mockInvoice, fecha: mockInvoice.fechaFactura })
            setError(null)
        } else {
            // En modo real, volver al formulario de subida
            setImage(null)
            setOriginalName('')
            setImagePreview(null)
            setResult(null)
            setError(null)
        }
    }

    const suggestedName = result ? generateSuggestedName(result) : null

    return (
        <div className="demo-card">
            {/* Regla de renombrado */}
            <div className="naming-rule">
                <span className="naming-rule-label">Regla de renombrado:</span>
                <code className="naming-rule-pattern">{NAMING_RULE}</code>
            </div>

            {!imagePreview ? (
                <div
                    className={`drop-zone ${dragActive ? 'active' : ''}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        id="invoice-upload"
                        accept="image/*,.pdf,application/pdf"
                        onChange={handleInputChange}
                        className="drop-input"
                    />
                    <label htmlFor="invoice-upload" className="drop-label">
                        <div className="drop-icon">
                            <Upload size={40} />
                        </div>
                        <p className="drop-text">
                            <strong>Arrastra una imagen aquí</strong>
                            <span>o haz clic para seleccionar</span>
                        </p>
                        <div className="drop-formats">
                            <span className="format-badge">JPG</span>
                            <span className="format-badge">PNG</span>
                            <span className="format-badge">PDF</span>
                            <span className="format-size">Máximo 10MB</span>
                        </div>
                    </label>
                </div>
            ) : (
                <div className="demo-content-with-preview">
                    {/* Preview de la imagen */}
                    <div className="invoice-preview">
                        <img
                            src={imagePreview}
                            alt="Preview de factura"
                            className="invoice-preview-image"
                        />
                    </div>

                    {/* Indicador de archivo subido */}
                    <div className="file-uploaded">
                        <div className="file-uploaded-info">
                            <FileText size={24} />
                            <div className="file-uploaded-details">
                                <span className="file-uploaded-name">{originalName}</span>
                                <span className="file-uploaded-hint">Archivo analizado</span>
                            </div>
                        </div>
                        <button className="file-uploaded-change" onClick={reset}>
                            Cambiar
                        </button>
                    </div>

                    <div className="demo-actions">
                        {!result && !loading && (
                            <button className="btn btn-primary" onClick={analyzeInvoice}>
                                Analizar Factura
                            </button>
                        )}

                        {loading && (
                            <div className="demo-loading">
                                <Loader2 className="spin" size={24} />
                                <span>Analizando...</span>
                            </div>
                        )}

                        {error && (
                            <div className="demo-error">
                                <AlertCircle size={20} />
                                <span>{error}</span>
                            </div>
                        )}

                        {result && !result.isValidInvoice && (
                            <div className="demo-error">
                                <AlertCircle size={20} />
                                <div>
                                    <strong>No es una factura válida</strong>
                                    <p>{result.reason}</p>
                                </div>
                            </div>
                        )}

                        {result && result.isValidInvoice && (
                            <div className="demo-results">
                                <div className="results-header">
                                    <FileCheck size={24} />
                                    <span>Datos Extraídos</span>
                                </div>
                                <div className="results-grid">
                                    <div className="result-item">
                                        <span className="result-label">NIF Emisor</span>
                                        <span className="result-value">{result.nifEmisor || '-'}</span>
                                    </div>
                                    <div className="result-item">
                                        <span className="result-label">Empresa</span>
                                        <span className="result-value">{result.nombreEmpresa || '-'}</span>
                                    </div>
                                    <div className="result-item">
                                        <span className="result-label">Fecha</span>
                                        <span className="result-value">{result.fecha || '-'}</span>
                                    </div>
                                    <div className="result-item">
                                        <span className="result-label">Nº Factura</span>
                                        <span className="result-value">{result.numeroFactura || '-'}</span>
                                    </div>
                                    <div className="result-item">
                                        <span className="result-label">Base Imponible</span>
                                        <span className="result-value">{result.baseImponible || '-'}</span>
                                    </div>
                                    <div className="result-item">
                                        <span className="result-label">IVA</span>
                                        <span className="result-value">{result.iva || '-'}</span>
                                    </div>
                                    <div className="result-item highlight">
                                        <span className="result-label">Total</span>
                                        <span className="result-value">{result.total || '-'}</span>
                                    </div>
                                </div>

                                {/* Renombrado sugerido */}
                                <div className="rename-section">
                                    <div className="rename-header">
                                        <FileText size={20} />
                                        <span>Renombrado Automático</span>
                                    </div>
                                    <div className="rename-comparison">
                                        <div className="rename-original">
                                            <span className="rename-label">Original</span>
                                            <span className="rename-name">{originalName}</span>
                                        </div>
                                        <ArrowRight size={20} className="rename-arrow" />
                                        <div className="rename-suggested">
                                            <span className="rename-label">Sugerido</span>
                                            <span className="rename-name">{suggestedName}</span>
                                        </div>
                                    </div>
                                </div>

                                <button className="btn btn-secondary" onClick={reset}>
                                    Probar otra factura
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
