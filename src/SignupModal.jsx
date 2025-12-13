import { useState, useEffect } from 'react'
import { X, Mail, Building2, Users, ArrowRight, Check } from 'lucide-react'

export default function SignupModal({ isOpen, onClose, initialEmail = '', onOpenLegal }) {
    const [step, setStep] = useState(initialEmail ? 2 : 1)
    const [email, setEmail] = useState(initialEmail)
    const [businessName, setBusinessName] = useState('')
    const [clientSize, setClientSize] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isComplete, setIsComplete] = useState(false)
    const [privacyAccepted, setPrivacyAccepted] = useState(initialEmail ? true : false)

    // Sincronizar cuando cambia initialEmail (ej: viene del CTA form)
    useEffect(() => {
        if (initialEmail) {
            setEmail(initialEmail)
            setStep(2)
            setPrivacyAccepted(true)
        } else {
            setStep(1)
            setPrivacyAccepted(false)
        }
    }, [initialEmail, isOpen])

    if (!isOpen) return null

    const handleStep1Submit = async (e) => {
        e.preventDefault()
        if (!privacyAccepted) return
        setIsSubmitting(true)

        // Simular guardado del email (aquí iría la llamada a la API)
        await new Promise(resolve => setTimeout(resolve, 500))

        console.log('Email registrado:', email)
        setIsSubmitting(false)
        setStep(2)
    }

    const handleStep2Submit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simular guardado de datos adicionales
        await new Promise(resolve => setTimeout(resolve, 500))

        console.log('Datos adicionales:', { email, businessName, clientSize })
        setIsSubmitting(false)
        setIsComplete(true)

        // Cerrar después de mostrar confirmación
        setTimeout(() => {
            handleClose()
        }, 2000)
    }

    const handleSkip = () => {
        console.log('Usuario omitió paso 2')
        setIsComplete(true)
        setTimeout(() => {
            handleClose()
        }, 2000)
    }

    const handleClose = () => {
        setStep(1)
        setEmail('')
        setBusinessName('')
        setClientSize('')
        setIsComplete(false)
        setPrivacyAccepted(false)
        onClose()
    }

    const clientSizeOptions = [
        { value: '<50', label: 'Menos de 50' },
        { value: '50-100', label: '50 - 100' },
        { value: '100-500', label: '100 - 500' },
        { value: '>500', label: 'Más de 500' }
    ]

    return (
        <div className="signup-modal-overlay" onClick={handleClose}>
            <div className="signup-modal-content" onClick={e => e.stopPropagation()}>
                <button className="signup-modal-close" onClick={handleClose}>
                    <X size={24} />
                </button>

                {/* Progress indicator */}
                {!isComplete && (
                    <div className="signup-progress">
                        <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
                            <span className="progress-number">1</span>
                        </div>
                        <div className="progress-line"></div>
                        <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
                            <span className="progress-number">2</span>
                        </div>
                    </div>
                )}

                {/* Step 1: Email */}
                {step === 1 && !isComplete && (
                    <div className="signup-step">
                        <div className="signup-icon">
                            <Mail size={32} />
                        </div>
                        <h2>Reserva tu plaza en la beta</h2>
                        <p>Te avisaremos cuando esté lista.</p>

                        <form onSubmit={handleStep1Submit} className="signup-form">
                            <input
                                type="email"
                                placeholder="Tu email profesional"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoFocus
                            />
                            <div className="privacy-checkbox modal-privacy">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={privacyAccepted}
                                        onChange={(e) => setPrivacyAccepted(e.target.checked)}
                                    />
                                    <span>He leído y acepto la <button type="button" className="privacy-link" onClick={onOpenLegal}>Política de Privacidad</button></span>
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting || !privacyAccepted}>
                                {isSubmitting ? 'Guardando...' : (
                                    <>
                                        Continuar <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                )}

                {/* Step 2: Additional info (optional) */}
                {step === 2 && !isComplete && (
                    <div className="signup-step">
                        <div className="signup-icon">
                            <Building2 size={32} />
                        </div>
                        <h2>¡Genial! Ya estás en la lista</h2>
                        <p>Ayúdanos a conocerte mejor <span className="optional-text">(opcional)</span></p>

                        <form onSubmit={handleStep2Submit} className="signup-form">
                            <input
                                type="text"
                                placeholder="Nombre de tu gestoría"
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                autoFocus
                            />

                            <div className="client-size-group">
                                <label className="client-size-label">
                                    <Users size={16} /> ¿Cuántos clientes gestionas?
                                </label>
                                <div className="client-size-options">
                                    {clientSizeOptions.map(option => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            className={`size-option ${clientSize === option.value ? 'selected' : ''}`}
                                            onClick={() => setClientSize(option.value)}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="signup-actions">
                                <button type="button" className="btn-skip" onClick={handleSkip}>
                                    Saltar
                                </button>
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                    {isSubmitting ? 'Enviando...' : 'Enviar'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Success state */}
                {isComplete && (
                    <div className="signup-step signup-success">
                        <div className="success-icon">
                            <Check size={40} />
                        </div>
                        <h2>¡Perfecto!</h2>
                        <p>Te contactaremos pronto con novedades.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
