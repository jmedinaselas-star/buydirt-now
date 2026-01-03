import { X } from 'lucide-react'

// eslint-disable-next-line no-unused-vars
export default function LegalModal({ isOpen, onClose, initialSection = 'privacy' }) {
    if (!isOpen) return null

    return (
        <div className="legal-modal-overlay" onClick={onClose}>
            <div className="legal-modal-content" onClick={e => e.stopPropagation()}>
                <button className="legal-modal-close" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="legal-text-container">
                    <h1>Textos Legales y Privacidad</h1>

                    <section className="legal-section">
                        <h2>1. DATOS DEL RESPONSABLE</h2>
                        <p><strong>Responsable del Tratamiento:</strong></p>
                        <ul>
                            <li><strong>Nombre/Razón Social:</strong> Jose Miguel Medina Selas</li>
                            <li><strong>NIF:</strong> 02310928A</li>
                            <li><strong>Dirección:</strong> Calle de Don Álvaro de Bazán, 3</li>
                            <li><strong>Email de contacto:</strong> info@getradyx.com</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>2. POLÍTICA DE PRIVACIDAD (Ejercicio de Derechos)</h2>
                        <h3>Tus Derechos de Protección de Datos</h3>
                        <p>Como usuario, tienes derecho a ejercer las siguientes acciones sobre tus datos personales de forma gratuita:</p>
                        <ul>
                            <li><strong>Derecho de Acceso:</strong> Puedes solicitarnos copia de los datos personales que tratamos sobre ti, junto con la finalidad, destinatarios y plazos de conservación.</li>
                            <li><strong>Derecho de Rectificación:</strong> Tienes derecho a que modifiquemos aquellos datos tuyos que sean inexactos o estén incompletos.</li>
                            <li><strong>Derecho de Supresión:</strong> Puedes solicitar que eliminemos tus datos cuando no sean necesarios para los fines recogidos, retires tu consentimiento o el tratamiento sea ilícito, siempre que no exista una obligación legal de conservarlos.</li>
                            <li><strong>Derecho de Oposición:</strong> Puedes oponerte al tratamiento de tus datos. Dejaremos de tratarlos salvo que existan motivos legítimos imperiosos o para la defensa ante reclamaciones.</li>
                            <li><strong>Derecho de Portabilidad:</strong> Si el tratamiento se basa en el consentimiento o contrato y es automatizado, puedes pedir recibir tus datos en un formato estructurado y de lectura mecánica, o que los transmitamos directamente a otro responsable.</li>
                            <li><strong>Derecho de Limitación:</strong> Puedes solicitar que suspendamos el tratamiento de tus datos mientras verificamos su exactitud o si prefieres que los conservemos en lugar de suprimirlos en determinados casos.</li>
                        </ul>

                        <h3>¿Cómo ejercer estos derechos?</h3>
                        <p>Puedes enviarnos una solicitud a <a href="mailto:info@getradyx.com">info@getradyx.com</a> identificándote debidamente. Responderemos a tu solicitud en el plazo máximo de un mes.</p>
                        <p>Si consideras que no hemos atendido tus derechos adecuadamente, tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos.</p>
                    </section>

                    <section className="legal-section">
                        <h2>3. POLÍTICA DE VIDEOVIGILANCIA</h2>
                        <p><strong>Información sobre el tratamiento de imágenes con fines de seguridad</strong></p>
                        <ul>
                            <li><strong>Finalidad:</strong> Garantizar la seguridad de las personas, bienes e instalaciones.</li>
                            <li><strong>Base Jurídica:</strong> Interés público / Interés legítimo del responsable.</li>
                            <li><strong>Destinatarios:</strong> Las imágenes no se cederán a terceros, salvo a las Fuerzas y Cuerpos de Seguridad del Estado en caso de requerimiento legal o comisión de delito.</li>
                            <li><strong>Plazo de Conservación:</strong> Las imágenes se conservarán durante un plazo máximo de 1 mes desde su captación, salvo que deban conservarse para acreditar la comisión de actos que atenten contra la integridad de personas, bienes o instalaciones.</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>4. MEDIDAS DE SEGURIDAD</h2>
                        <p>En Radyx nos tomamos muy en serio la seguridad de tus datos. Aplicamos medidas técnicas y organizativas rigurosas, incluyendo:</p>
                        <ul>
                            <li>Deber de confidencialidad y secreto de todo nuestro personal.</li>
                            <li>Sistemas de identificación y autenticación seguros (contraseñas robustas).</li>
                            <li>Copias de seguridad periódicas para evitar la pérdida de información.</li>
                            <li>Sistemas de protección contra malware y cortafuegos actualizados.</li>
                            <li>Cifrado de datos cuando es necesario para garantizar su confidencialidad.</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>5. POLÍTICA DE COOKIES</h2>
                        <p><strong>Última actualización: Diciembre 2025</strong></p>

                        <h3>1. ¿Qué son las cookies?</h3>
                        <p>Una cookie es un pequeño archivo de texto que se almacena en tu navegador cuando visitas casi cualquier página web. Su utilidad es que la web sea capaz de recordar tu visita cuando vuelvas a navegar por esa página. Las cookies suelen almacenar información de carácter técnico, preferencias personales, personalización de contenidos, estadísticas de uso, enlaces a redes sociales, acceso a cuentas de usuario, etc.</p>

                        <h3>2. Tipos de cookies utilizadas en esta web</h3>
                        <p>Siguiendo las directrices de la Agencia Española de Protección de Datos procedemos a detallar el uso de cookies que hace esta web:</p>
                        <ul>
                            <li><strong>Cookies técnicas (Necesarias):</strong> Son aquellas imprescindibles para el funcionamiento básico de la web, como gestionar la sesión del usuario, el registro o el proceso de carga de imágenes. Sin estas, la web no funcionaría correctamente.</li>
                            <li><strong>Cookies de análisis (Opcionales):</strong> Son aquellas que, tratadas por nosotros o por terceros (como Google Analytics), nos permiten cuantificar el número de usuarios y así realizar la medición y análisis estadístico de la utilización que hacen los usuarios del servicio ofertado. Para ello se analiza tu navegación en nuestra página web con el fin de mejorar la oferta de productos o servicios que te ofrecemos.</li>
                        </ul>

                        <h3>3. Consentimiento</h3>
                        <p>Al entrar en este sitio web por primera vez, verás un banner informándote del uso de cookies. Tienes la opción de aceptar todas las cookies o rechazarlas (salvo las técnicas, que son necesarias).</p>

                        <h3>4. Desactivación o eliminación de cookies</h3>
                        <p>En cualquier momento podrás ejercer tu derecho de desactivación o eliminación de cookies de este sitio web. Estas acciones se realizan de forma diferente en función del navegador que estés usando:</p>
                        <ul>
                            <li><a href="https://support.google.com/chrome/answer/95647?hl=es" target="_blank" rel="noopener noreferrer">Instrucciones para Chrome</a></li>
                            <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer">Instrucciones para Firefox</a></li>
                            <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Instrucciones para Safari</a></li>
                            <li><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Instrucciones para Edge</a></li>
                        </ul>

                        <h3>5. Responsable</h3>
                        <p>El responsable del tratamiento de los datos obtenidos por las cookies es Jose Miguel Medina Selas (Radyx). Puedes contactarnos en <a href="mailto:info@getradyx.com">info@getradyx.com</a>.</p>
                    </section>
                </div>
            </div>
        </div>
    )
}
