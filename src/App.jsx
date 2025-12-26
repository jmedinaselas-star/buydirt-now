import { useState } from 'react'
import InvoiceDemo from './InvoiceDemo'
import LegalModal from './LegalModal'
import SignupModal from './SignupModal'
import {
    Mail,
    MessageCircle,
    BrainCircuit,
    UserCheck,
    Menu,
    Calendar,
    BellRing,
    Upload,
    FileCheck,
    FileText,
    HardDrive,
    Clock,
    AlertCircle,
    Zap,
    Shield,
    ArrowRight,
    Smartphone,
    X,
    Lock,
    Server,
    KeyRound,
    ShieldCheck,
    Eye,
    Database
} from 'lucide-react'

function App() {
    const [invoices, setInvoices] = useState(100)
    const [timePerInvoice, setTimePerInvoice] = useState(5)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isLegalModalOpen, setIsLegalModalOpen] = useState(false)
    const [privacyAccepted, setPrivacyAccepted] = useState(false)
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)
    const [signupEmail, setSignupEmail] = useState('')
    const [ctaEmail, setCtaEmail] = useState('')

    const savedHours = Math.round((invoices * timePerInvoice) / 60)
    const savedMoney = savedHours * 20

    return (
        <div className="app">
            {/* HEADER */}
            <header className="header">
                <div className="container header-inner">
                    <div className="logo">rady<span>x</span></div>

                    <nav className="nav-links">
                        <a href="#problema">El Problema</a>
                        <a href="#como-funciona">Cómo Funciona</a>
                        <a href="#beneficios">Beneficios</a>
                    </nav>

                    <div className="header-actions">
                        <button onClick={() => { setSignupEmail(''); setIsSignupModalOpen(true); }} className="btn btn-primary">Solicitar Acceso</button>
                    </div>

                    <button
                        className="mobile-menu-btn"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* MOBILE MENU OVERLAY */}
            {mobileMenuOpen && (
                <div className="mobile-menu-overlay" style={{
                    position: 'fixed',
                    top: '70px',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'var(--color-bg-dark)',
                    zIndex: 99,
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                    borderTop: '1px solid var(--color-border-dark)'
                }}>
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1.25rem', fontWeight: 500 }}>
                        <a href="#problema" style={{ color: 'white', textDecoration: 'none' }} onClick={() => setMobileMenuOpen(false)}>El Problema</a>
                        <a href="#como-funciona" style={{ color: 'white', textDecoration: 'none' }} onClick={() => setMobileMenuOpen(false)}>Cómo Funciona</a>
                        <a href="#beneficios" style={{ color: 'white', textDecoration: 'none' }} onClick={() => setMobileMenuOpen(false)}>Beneficios</a>
                    </nav>
                    <button
                        onClick={() => { setMobileMenuOpen(false); setSignupEmail(''); setIsSignupModalOpen(true); }}
                        className="btn btn-primary"
                        style={{ width: '100%', justifyContent: 'center' }}
                    >
                        Solicitar Acceso
                    </button>
                </div>
            )}

            <main>
                {/* HERO SECTION */}
                <section className="hero">
                    <div className="hero-bg">
                        <div className="hero-gradient-1"></div>
                        <div className="hero-gradient-2"></div>
                        <div className="hero-grid"></div>
                    </div>

                    <div className="container">
                        <div className="hero-content">
                            <div className="hero-text">
                                <div className="badge">
                                    <span className="animate-pulse">●</span>
                                    Beta Cerrada 2025
                                </div>

                                <h1>
                                    Deja de perseguir a tus clientes por sus{' '}
                                    <span className="gradient-text">facturas</span>
                                </h1>

                                <p>
                                    Radyx reclama, pre-valida, renombra y archiva documentos automáticamente.
                                    <strong> Tú solo validas.</strong>
                                </p>

                                <div className="hero-buttons">
                                    <button onClick={() => { setSignupEmail(''); setIsSignupModalOpen(true); }} className="btn btn-primary btn-lg">
                                        Solicitar Acceso Anticipado
                                        <ArrowRight size={20} />
                                    </button>
                                    <a href="#como-funciona" className="btn btn-secondary btn-lg">
                                        Ver Cómo Funciona
                                    </a>
                                </div>

                                <div className="hero-stats">
                                    <div className="stat-item">
                                        <h4>30+</h4>
                                        <p>Horas ahorradas/mes</p>
                                    </div>
                                    <div className="stat-item">
                                        <h4>0</h4>
                                        <p>Llamadas de reclamo</p>
                                    </div>
                                    <div className="stat-item">
                                        <h4>100%</h4>
                                        <p>Documentos organizados</p>
                                    </div>
                                </div>
                            </div>

                            <div className="hero-visual">
                                <div className="dashboard-preview">
                                    <div className="dashboard-header">
                                        <div className="dashboard-dots">
                                            <span className="red"></span>
                                            <span className="yellow"></span>
                                            <span className="green"></span>
                                        </div>
                                        <span className="dashboard-title">Dashboard de Recepción</span>
                                    </div>

                                    <div className="dashboard-body">
                                        <div className="dashboard-item">
                                            <div className="item-icon email">
                                                <Mail size={20} />
                                            </div>
                                            <div className="item-content">
                                                <h4>Nuevo Email</h4>
                                                <p>Factura de Proveedor</p>
                                            </div>
                                            <span className="item-status processing">Procesando...</span>
                                        </div>

                                        <div className="dashboard-item">
                                            <div className="item-icon whatsapp">
                                                <MessageCircle size={20} />
                                            </div>
                                            <div className="item-content">
                                                <h4>WhatsApp</h4>
                                                <p>Ticket de Comida</p>
                                            </div>
                                            <span className="item-status processing">Procesando...</span>
                                        </div>

                                        <div className="dashboard-item">
                                            <div className="item-icon ai">
                                                <BrainCircuit size={20} />
                                            </div>
                                            <div className="item-content">
                                                <h4>Análisis IA</h4>
                                                <p>Factura validada - €1,250.00</p>
                                            </div>
                                            <span className="item-status valid">✓ Válido</span>
                                        </div>

                                        <div className="dashboard-item">
                                            <div className="item-icon check">
                                                <UserCheck size={20} />
                                            </div>
                                            <div className="item-content">
                                                <h4>Tu Validación</h4>
                                                <p>Esperando tu OK...</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PAIN POINT SECTION */}
                <section id="problema" className="pain-section">
                    <div className="container">
                        <div className="pain-container">
                            <div className="pain-visual">
                                <div className="chaos-card">
                                    <div className="chaos-header">
                                        <AlertCircle size={24} />
                                        <h3>Tu día a día actual</h3>
                                    </div>

                                    <div className="chaos-item">
                                        <span><Smartphone size={16} className="chaos-icon" /> "Juan, ¿me puedes pasar las facturas?"</span>
                                        <span className="time">+15 min</span>
                                    </div>
                                    <div className="chaos-item">
                                        <span><Mail size={16} className="chaos-icon" /> Buscando emails con adjuntos...</span>
                                        <span className="time">+10 min</span>
                                    </div>
                                    <div className="chaos-item">
                                        <span><FileText size={16} className="chaos-icon" /> Renombrando IMG_2094.jpg...</span>
                                        <span className="time">+5 min</span>
                                    </div>
                                    <div className="chaos-item">
                                        <span><Clock size={16} className="chaos-icon" /> 3ª llamada de seguimiento...</span>
                                        <span className="time">+20 min</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pain-content">
                                <h2>Tu gestoría <span className="gradient-text">no debería ser</span> un call center</h2>
                                <p>
                                    Cada trimestre es lo mismo: perseguir clientes, organizar documentos
                                    mal nombrados y perder horas en tareas que no deberían existir.
                                </p>

                                <ul className="pain-list">
                                    <li>
                                        <Clock className="icon" size={24} />
                                        <div>
                                            <h4>30+ horas perdidas al mes</h4>
                                            <p>Tiempo que podrías dedicar a asesorar y hacer crecer tu negocio.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <AlertCircle className="icon" size={24} />
                                        <div>
                                            <h4>Documentos caóticos</h4>
                                            <p>"IMG_2094.jpg" no te dice nada. Pierdes tiempo descifrando archivos.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <MessageCircle className="icon" size={24} />
                                        <div>
                                            <h4>WhatsApp infinito</h4>
                                            <p>Escribir, esperar, reenviar, volver a pedir... un ciclo agotador.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* WORKFLOW SECTION */}
                <section id="como-funciona" className="workflow-section">
                    <div className="container">
                        <div className="section-header">
                            <div className="badge">Así funciona</div>
                            <h2>Un día en la vida de una factura con <span className="gradient-text">Radyx</span></h2>
                            <p>De caos a orden en 7 pasos automáticos. Tú solo validas.</p>
                        </div>

                        <div className="timeline">
                            <div className="timeline-line"></div>

                            {/* Step 1 */}
                            <div className="timeline-step">
                                <div className="step-content left">
                                    <h4>1. Configuras el calendario</h4>
                                    <p>Define las fechas clave una sola vez. Nosotros llevamos la cuenta atrás.</p>
                                </div>
                                <div className="step-marker">1</div>
                                <div className="step-visual right">
                                    <div className="step-card">
                                        <div className="step-card-header">
                                            <Calendar size={18} />
                                            <span>Calendario Fiscal 2025</span>
                                        </div>
                                        <div className="step-card-content">
                                            <p>Próximo hito: Modelo 303</p>
                                            <p style={{ color: 'var(--color-accent-primary)', marginTop: '0.5rem' }}>
                                                ⏰ Faltan 5 días
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="timeline-step">
                                <div className="step-visual left">
                                    <div className="step-card">
                                        <div className="step-card-header">
                                            <BellRing size={18} />
                                            <span>Avisos Automáticos</span>
                                        </div>
                                        <div className="step-card-content">
                                            <span className="tag"><Smartphone size={12} /> WhatsApp</span>
                                            <span className="tag"><Mail size={12} /> Email</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="step-marker">2</div>
                                <div className="step-content right">
                                    <h4>2. Radyx avisa a tus clientes</h4>
                                    <p>Recordatorios automáticos, amables y profesionales en tu nombre.</p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="timeline-step">
                                <div className="step-content left">
                                    <h4>3. Enlace de acceso seguro</h4>
                                    <p>El cliente recibe un link único. Sin contraseñas, sin fricción.</p>
                                </div>
                                <div className="step-marker">3</div>
                                <div className="step-visual right">
                                    <div className="step-card" style={{ background: 'rgba(34, 197, 94, 0.1)', borderColor: 'rgba(34, 197, 94, 0.2)' }}>
                                        <div style={{ fontSize: '0.875rem', color: '#22c55e', marginBottom: '0.5rem' }}>WhatsApp</div>
                                        <p style={{ fontSize: '0.875rem' }}>
                                            Hola Juan! 👋 Sube tus facturas aquí:
                                        </p>
                                        <p style={{ color: 'var(--color-accent-primary)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                                            getradyx.com/upload/xKy9s
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Step 4 */}
                            <div className="timeline-step">
                                <div className="step-visual left">
                                    <div className="step-card" style={{ textAlign: 'center' }}>
                                        <Upload size={32} style={{ color: 'var(--color-accent-primary)', marginBottom: '0.75rem' }} />
                                        <p style={{ fontWeight: 500 }}>Recepción de Archivos</p>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                                            PDF, JPG, PNG...
                                        </p>
                                    </div>
                                </div>
                                <div className="step-marker">4</div>
                                <div className="step-content right">
                                    <h4>4. Recepción centralizada</h4>
                                    <p>Todos los documentos llegan a un punto único, desde cualquier canal.</p>
                                </div>
                            </div>

                            {/* Step 5 */}
                            <div className="timeline-step">
                                <div className="step-content left">
                                    <h4>5. IA procesa automáticamente</h4>
                                    <p>Lee, valida y renombra el documento según tu patrón favorito.</p>
                                </div>
                                <div className="step-marker">5</div>
                                <div className="step-visual right">
                                    <div className="step-card">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
                                            <span style={{ textDecoration: 'line-through', color: 'var(--color-text-muted)' }}>
                                                IMG_20240315.jpg
                                            </span>
                                            <ArrowRight size={16} style={{ color: 'var(--color-accent-primary)' }} />
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--color-accent-secondary)' }}>
                                                <FileCheck size={16} />
                                                2024-03-15_Factura.pdf
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 6 */}
                            <div className="timeline-step">
                                <div className="step-visual left">
                                    <div className="step-card" style={{ background: 'rgba(0, 212, 255, 0.1)', borderColor: 'rgba(0, 212, 255, 0.2)' }}>
                                        <div className="step-card-header" style={{ borderColor: 'rgba(0, 212, 255, 0.2)' }}>
                                            <UserCheck size={18} />
                                            <span>Tu Validación</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
                                            <span style={{ color: 'var(--color-text-muted)' }}>Total</span>
                                            <span style={{ fontWeight: 500 }}>€1,250.00</span>
                                        </div>
                                        <button style={{
                                            width: '100%',
                                            padding: '0.5rem',
                                            background: 'var(--color-accent-gradient)',
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: 'var(--color-bg-primary)',
                                            fontWeight: 600,
                                            cursor: 'pointer'
                                        }}>
                                            ✓ Aprobar
                                        </button>
                                    </div>
                                </div>
                                <div className="step-marker">6</div>
                                <div className="step-content right">
                                    <h4>6. Tú tienes la última palabra</h4>
                                    <p>Revisa los datos extraídos, corrige si es necesario y aprueba.</p>
                                </div>
                            </div>

                            {/* Step 7 */}
                            <div className="timeline-step">
                                <div className="step-content left">
                                    <h4>7. Sincronización final</h4>
                                    <p>El documento se archiva y exporta listo para tu software contable.</p>
                                </div>
                                <div className="step-marker">7</div>
                                <div className="step-visual right">
                                    <div className="step-card">
                                        <div className="step-card-header">
                                            <HardDrive size={18} />
                                            <span>Tu Nube</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-accent-secondary)' }}>
                                            <FileCheck size={16} />
                                            2024-03-15_Factura.pdf
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FEATURES + ROI SECTION */}
                <section id="beneficios" className="features-section">
                    <div className="container">
                        <div className="section-header">
                            <h2>Recupera las <span className="gradient-text">30 horas al mes</span> que pierdes</h2>
                            <p>Automatiza la gestión documental y céntrate en asesorar.</p>
                        </div>

                        <div className="features-grid">
                            <div className="feature-card">
                                <div className="feature-icon">
                                    <BellRing size={28} />
                                </div>
                                <h3>Seguimiento Automático</h3>
                                <p>Recordatorios inteligentes por WhatsApp y Email hasta recibir los documentos.</p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon">
                                    <BrainCircuit size={28} />
                                </div>
                                <h3>Organización IA</h3>
                                <p>Renombrado y clasificación automática. Adiós a "IMG_2093.jpg".</p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon">
                                    <Zap size={28} />
                                </div>
                                <h3>Cero Fricción</h3>
                                <p>Sin contraseñas para tus clientes. Subida directa y segura con magic links.</p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon">
                                    <Shield size={28} />
                                </div>
                                <h3>Control Total</h3>
                                <p>Tú apruebas cada documento. La IA sugiere, tú decides.</p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon">
                                    <HardDrive size={28} />
                                </div>
                                <h3>Tu Infraestructura</h3>
                                <p>Se integra con tu servidor actual. Sin migrar datos ni cambiar de software.</p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon">
                                    <Calendar size={28} />
                                </div>
                                <h3>Calendario Fiscal</h3>
                                <p>Fechas clave configuradas. Nunca más llegarás tarde a un cierre.</p>
                            </div>
                        </div>

                        {/* ROI Calculator */}
                        <div className="roi-container">
                            <div className="roi-content">
                                <h2>¿Cuánto te cuesta perseguir facturas?</h2>
                                <p>
                                    Calcula el tiempo y dinero que podrías recuperar con Radyx.
                                    Muchos gestores no se dan cuenta de cuánto les cuesta este proceso manual.
                                </p>

                                <ul className="roi-benefits">
                                    <li>
                                        <div className="icon-box">
                                            <Clock size={20} />
                                        </div>
                                        <div>
                                            <h4>Tiempo = Dinero</h4>
                                            <p>Cada minuto que pasas reclamando facturas es un minuto que no estás asesorando o captando clientes.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon-box">
                                            <Zap size={20} />
                                        </div>
                                        <div>
                                            <h4>ROI desde el primer día</h4>
                                            <p>La mayoría de nuestros usuarios recuperan la inversión en la primera semana de uso.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="calculator-card">
                                <div className="calc-header">
                                    <h3>Calculadora de Ahorro</h3>
                                    <p>Mueve los controles y descubre tu ahorro real.</p>
                                </div>

                                <div className="calc-input">
                                    <label>
                                        Facturas al mes
                                        <span>{invoices}</span>
                                    </label>
                                    <input
                                        type="range"
                                        className="range-slider"
                                        min="10"
                                        max="500"
                                        step="10"
                                        value={invoices}
                                        onChange={(e) => setInvoices(Number(e.target.value))}
                                        style={{
                                            background: `linear-gradient(to right, #10b981 0%, #10b981 ${((invoices - 10) / (500 - 10)) * 100}%, #f1f5f9 ${((invoices - 10) / (500 - 10)) * 100}%, #f1f5f9 100%)`
                                        }}
                                    />
                                </div>

                                <div className="calc-input">
                                    <label>
                                        Minutos por factura
                                        <span>{timePerInvoice} min</span>
                                    </label>
                                    <input
                                        type="range"
                                        className="range-slider"
                                        min="1"
                                        max="15"
                                        step="1"
                                        value={timePerInvoice}
                                        onChange={(e) => setTimePerInvoice(Number(e.target.value))}
                                        style={{
                                            background: `linear-gradient(to right, #10b981 0%, #10b981 ${((timePerInvoice - 1) / (15 - 1)) * 100}%, #f1f5f9 ${((timePerInvoice - 1) / (15 - 1)) * 100}%, #f1f5f9 100%)`
                                        }}
                                    />
                                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
                                        Reclamar, descargar, renombrar, archivar...
                                    </p>
                                </div>

                                <div className="calc-divider"></div>

                                <div className="calc-results">
                                    <div className="result-box">
                                        <p className="label">Tiempo Ahorrado</p>
                                        <p>
                                            <span className="value">{savedHours}</span>
                                            <span className="unit"> h/mes</span>
                                        </p>
                                    </div>
                                    <div className="result-box highlight">
                                        <p className="label">Dinero Ahorrado</p>
                                        <p>
                                            <span className="value">{savedMoney}</span>
                                            <span className="unit"> €/mes</span>
                                        </p>
                                    </div>
                                </div>

                                <p className="calc-note">*Estimado a 20€/hora de coste operativo.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* DEMO SECTION */}
                <section id="demo" className="demo-section">
                    <div className="container">
                        <div className="section-header">
                            <div className="badge"><BrainCircuit size={14} /> Pruébalo Ahora</div>
                            <h2>Demo de <span className="gradient-text">Reconocimiento IA</span></h2>
                            <p>Sube una imagen de factura y observa cómo Radyx extrae los datos automáticamente.</p>
                        </div>
                        <InvoiceDemo />
                    </div>
                </section>

                {/* SECURITY SECTION */}
                <section id="seguridad" className="security-section">
                    <div className="container">
                        <div className="section-header">
                            <div className="badge"><Lock size={14} /> Seguridad</div>
                            <h2>Tus datos, <span className="gradient-text">protegidos</span></h2>
                            <p>La seguridad de la información de tus clientes es nuestra prioridad absoluta.</p>
                        </div>

                        <div className="security-grid">
                            <div className="security-card security-card-main">
                                <div className="security-icon-large">
                                    <ShieldCheck size={48} />
                                </div>
                                <h3>Encriptación de Extremo a Extremo</h3>
                                <p>
                                    Todos los documentos están encriptados con AES-256, el mismo estándar
                                    que usan los bancos. Nadie puede acceder a tu información, ni siquiera nosotros.
                                </p>
                                <div className="security-badges">
                                    <span className="security-badge">AES-256</span>
                                    <span className="security-badge">TLS 1.3</span>
                                    <span className="security-badge">HTTPS</span>
                                </div>
                            </div>

                            <div className="security-card">
                                <div className="security-icon">
                                    <Server size={28} />
                                </div>
                                <h4>Servidores en la UE</h4>
                                <p>Toda la información se almacena en servidores ubicados en la Unión Europea, cumpliendo con la normativa RGPD.</p>
                            </div>

                            <div className="security-card">
                                <div className="security-icon">
                                    <Eye size={28} />
                                </div>
                                <h4>Auditoría Completa</h4>
                                <p>Registro de todas las acciones realizadas. Sabrás quién accedió a qué documento y cuándo.</p>
                            </div>

                            <div className="security-card">
                                <div className="security-icon">
                                    <Database size={28} />
                                </div>
                                <h4>Backups Automáticos</h4>
                                <p>Copias de seguridad diarias encriptadas. Tus datos nunca se pierden, pase lo que pase.</p>
                            </div>
                        </div>

                        <div className="security-compliance">
                            <p><Lock size={16} /> Cumplimos con <strong>RGPD</strong>, <strong>LOPD</strong> y estándares <strong>ISO 27001</strong></p>
                        </div>
                    </div>
                </section>
                <section id="contacto" className="cta-section">
                    <div className="cta-bg"></div>
                    <div className="container">
                        <div className="cta-container">
                            <div className="badge">Plazas Limitadas</div>
                            <h2>Deja de perder horas reclamando documentos. Reserva tu plaza en la beta.</h2>
                            <p>
                                Únete a los primeros gestores que están transformando su forma de trabajar.
                            </p>

                            <form className="cta-form" onSubmit={(e) => {
                                e.preventDefault()
                                if (ctaEmail && privacyAccepted) {
                                    setSignupEmail(ctaEmail)
                                    setIsSignupModalOpen(true)
                                }
                            }}>
                                <div className="cta-form-left">
                                    <input
                                        type="email"
                                        placeholder="Tu email profesional"
                                        value={ctaEmail}
                                        onChange={(e) => setCtaEmail(e.target.value)}
                                        required
                                    />
                                    <div className="privacy-checkbox">
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={privacyAccepted}
                                                onChange={(e) => setPrivacyAccepted(e.target.checked)}
                                            />
                                            <span>He leído y acepto la <button type="button" className="privacy-link" onClick={() => setIsLegalModalOpen(true)}>Política de Privacidad</button></span>
                                        </label>
                                    </div>
                                </div>
                                <div className="cta-form-right">
                                    <button type="submit" className="btn btn-primary btn-lg" disabled={!privacyAccepted}>
                                        Solicitar Acceso
                                    </button>
                                </div>
                            </form>

                            <p className="cta-note">Sin compromiso. Date de baja cuando quieras.</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* FOOTER */}
            <footer className="footer">
                <div className="container footer-inner">
                    <div className="footer-logo">rady<span>x</span></div>

                    <div className="footer-links">
                        <button onClick={() => setIsLegalModalOpen(true)} className="footer-link-btn">Privacidad</button>
                    </div>

                    <p className="footer-copy">© 2025 Radyx. Todos los derechos reservados.</p>
                </div>
            </footer>

            <LegalModal
                isOpen={isLegalModalOpen}
                onClose={() => setIsLegalModalOpen(false)}
            />

            <SignupModal
                isOpen={isSignupModalOpen}
                onClose={() => {
                    setIsSignupModalOpen(false)
                    setSignupEmail('')
                    setCtaEmail('')
                    setPrivacyAccepted(false)
                }}
                initialEmail={signupEmail}
                onOpenLegal={() => setIsLegalModalOpen(true)}
            />
        </div>
    )
}

export default App
