import { useState, useCallback } from 'react'
import { Upload, FileCheck, AlertCircle, Loader2, X, FileText, ArrowRight } from 'lucide-react'

// Regla de renombrado predefinida
const NAMING_RULE = "{FECHA}_{EMPRESA}_{NUMERO}_Factura"

// Función para generar el nombre sugerido
const generateSuggestedName = (data) => {
    if (!data || !data.isValidInvoice) return null

    // Limpiar y formatear la fecha (convertir a YYYY-MM-DD)
    let fecha = data.fecha || 'SIN-FECHA'
    // Intentar detectar formato DD/MM/YYYY o similar y convertir
    const dateMatch = fecha.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/)
    if (dateMatch) {
        const day = dateMatch[1].padStart(2, '0')
        const month = dateMatch[2].padStart(2, '0')
        const year = dateMatch[3].length === 2 ? '20' + dateMatch[3] : dateMatch[3]
        fecha = `${year}-${month}-${day}`
    }

    // Usar marca comercial para el nombre (solo la denominación comercial corta)
    const empresa = (data.marcaComercial || 'DESCONOCIDO')
        .replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 30)

    // Número de factura
    const numero = (data.numeroFactura || 'SN')
        .replace(/[^a-zA-Z0-9\-]/g, '')

    return NAMING_RULE
        .replace('{FECHA}', fecha)
        .replace('{EMPRESA}', empresa)
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

    const analyzeInvoice = async () => {
        if (!image) return

        setLoading(true)
        setError(null)
        setResult(null)

        try {
            const reader = new FileReader()
            reader.readAsDataURL(image)

            reader.onload = async () => {
                const base64Data = reader.result.split(',')[1]

                // Llamar a la API serverless (protege la API key)
                const response = await fetch('/api/analyze-invoice', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        imageBase64: base64Data,
                        mimeType: image.type,
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
            }
        } catch (err) {
            console.error(err)
            setError('Error al procesar la imagen. Inténtalo de nuevo.')
            setLoading(false)
        }
    }

    const reset = () => {
        setImage(null)
        setOriginalName('')
        setImagePreview(null)
        setResult(null)
        setError(null)
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
                <div className="demo-content-no-preview">
                    {/* Indicador de archivo subido */}
                    <div className="file-uploaded">
                        <div className="file-uploaded-info">
                            <FileText size={24} />
                            <div className="file-uploaded-details">
                                <span className="file-uploaded-name">{originalName}</span>
                                <span className="file-uploaded-hint">Archivo listo para analizar</span>
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
