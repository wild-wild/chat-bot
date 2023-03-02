const { createBot, createProvider, createFlow, addKeyword, toSerialize, addAnswer } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal') //portal web para escanear el qr
const BaileysProvider = require('@bot-whatsapp/provider/baileys')//proveedor de whatsapp
const MockAdapter = require('@bot-whatsapp/database/mock') //base de datos
const { mediaMessageSHA256B64 } = require('@adiwajshing/baileys')
/***************************************************************************/
//RESPUESTAS A PREGUNTAS FRECUENTES Y TRAMITES
/***************************************************************************/
const flowFAQ1 = addKeyword('1')
.addAnswer([
    'En el Siguiente link Acceda con su número de registro universitario y como contraseña su número de Cédula de Identidad.',
    'https://perfil.uagrm.edu.bo/',
])
const flowFAQ2 = addKeyword('2')
.addAnswer([
    'Use del método de recuperación de contraseña por correo electrónico, opción habilitada en el ingreso al perfil.',
])
const flowFAQ3 = addKeyword('3')
.addAnswer([
    'Contacte con el encargado del CPD FACULTATIVO de la facultad a la que pertenece la carrera que cursa y solicite el registro de su correo electrónico.',
    'Los estudiantes de la Unidad a Distancia en CPD de la facultad de Humanidades.',
])
const flowFAQ4 = addKeyword('4')
.addAnswer([
    'Contacte con el encargado del CPD FACULTATIVO de la facultad a la que pertenece la carrera que cursa y solicite la actualización de su correo electrónico.',
    'Los estudiantes de la Unidad a Distancia en CPD de la facultad de Humanidades.',
])
const flowFAQ5 = addKeyword('5')
.addAnswer([
    'Las entidades autorizadas son: ',
])
const flowFAQ6 = addKeyword('6')
.addAnswer([
    'Tiene que dirigirse al CPD FACULTATIVO de la facultad a la que pertenece.',
    'Los estudiantes de la Unidad a Distancia en CPD de la facultad de Humanidades.',
])
const flowFAQ7 = addKeyword('7')
.addAnswer([
    'Revise si está Bloqueado por algún concepto, para ello debe autentificarse haciendo clic en Login, luego seleccione la Carrera y entre a la opción Otros Servicios/Bloqueos. Para hacer el desbloqueo siga las instrucciones para cada caso.',
])
const flowFAQ8 = addKeyword('8')
.addAnswer([
    'En Secretaria del Departamento de Admisiones y Registros presentar los siguientes documentos:\n',
    '1-Fotocopia de Certificado de Nacimiento',
    '2-Fotocopia de Carnet de Identidad (sin legalizar)',
    '3-Fotocopia del Título de Bachiller',
    '4-Formulario de corrección de Nombre debidamente llenado (Adquirir en cualquier fotocopiadora en inmediaciones del Campus Universitario)\n',
    '_Nota: En casos de cambio, aumento o retiro de nombre o apellido adjunte fotocopia de la sentencia judicial dictada por el Juez ordenando proceder cambio nombre._',
])
//respuesta a Contactar con una persona
const flowContacto = addKeyword(['Contactar con una persona 🙍‍♂️','Chatear con una persona 🙍‍♂️']).addAnswer([
    'Enseguida le atenderá un *Administrador* de la *Unidad a Distancia de la Facultad de Humanidades.*',
],
    {
        delay: 3000,
    })
    .addAnswer(
        'Por favor indíquemos ¿En que podemos ayudarte?',
        {
            delay: 3000,
        }
    )

// VOLVER
const flowVolver = addKeyword(['↩ volver al menu principal','0'])
    .addAnswer('*Hola*,🤖 soy el Asistente Virtual de la *Unidad a Distancia de la Facultad de Humanidades*, tengo varias opciones para ayudarte',
    )
    .addAnswer('La modalidad a *Distancia* consiste en un *Sistema Híbrido*, es decir, rige su avance por tutorías presenciales y virtuales programadas en días domingo.',
        'Si un estudiante está ubicado en otro departamento y no puede asistir a las tutorías presencial, debe presentar una constancia de residencia para acceder a las opciones virtuales. Esto significa que el estudiante puede continuar su educación virtual y recibir la misma calidad de educación que los estudiantes que asisten a las tutorías presenciales.',
        {
            delay: 3000,
        })
    .addAnswer('_Elige una de las siguientes opciones: 👇_',
        {
            buttons: [
                { "body": "Carreras ofertas", },
                { "body": "Nuestra ubicación 📍" },
                { "body": "Preguntas frecuentes FAQ" },
            ],
            delay: 1000,
        },
    )
    .addAnswer('_Cualquier duda que tengas, Presiona👇_',
        {
            buttons: [
                { "body": "Contactar con una persona 🙍‍♂️" },
            ],
            delay: 1000,
        })


//ADM si o no 
const flowSiAdm = addKeyword(['si', 'Si', 'SI'])
    .addAnswer('Muy bien, Estas son las *Asignaturas* que se imparten actualmente en la carrera de Administración Educativa',
        {
            media: 'https://i.ibb.co/zJjpqGH/adm-pensul.jpg',
        },
        {
            delay: 3000,
        }
    )
    .addAnswer('👇',
        {
            buttons: [
                { 'body': "Chatear con una persona 🙍‍♂️" },
                { body: '↩ volver al menu principal' }],
        },
    )
//COM si o no 
const flowSiEdu = addKeyword(['si', 'Si', 'SI'])
    .addAnswer('Muy bien, Estas son las *Asignaturas* que se imparten actualmente en la carrera de Ciencias de la Educación',
        {
            media: 'https://i.ibb.co/grY3jdP/EDU-PENSUL.jpg',
        },
        {
            delay: 3000,
        })
        .addAnswer('👇',
        {
            buttons: [
                { 'body': "Chatear con una persona 🙍‍♂️" },
                { body: '↩ volver al menu principal' }],
        },
    )
//COM si o no 
const flowSiCom = addKeyword(['si', 'Si', 'SI'])
    .addAnswer('Muy bien, Estas son las *Asignaturas* que se imparten actualmente en la carrera de Ciencias de la Comunicación',
        {
            media: 'https://i.ibb.co/7ttGJGV/COM-PENSUL.jpg',
        },
        {
            delay: 3000,
        })
        .addAnswer('👇',
        {
            buttons: [
                { 'body': "Chatear con una persona 🙍‍♂️" },
                { body: '↩ volver al menu principal' }],
        },
    )


//SI ESCOGE CIENCIAS DE LA EDUCACIÓN
const flowUdu = addKeyword(['1', 'edu'])
    .addAnswer([
        '✅ La Licenciatura en Ciencias de la Educación es una carrera universitaria que se enfoca en la formación de profesionales capacitados para analizar, planificar, desarrollar y evaluar proyectos educativos en diferentes niveles y modalidades del sistema educativo.\n',


        '✅ _La carrera busca formar profesionales con una visión crítica y reflexiva de la educación, capaces de diseñar planes y programas de estudio y aplicar estrategias de enseñanza y aprendizaje efectivas. También se enfoca en el análisis de las políticas educativas y la evaluación de los resultados de los proyectos educativos._\n',
        '✅ Los graduados de la Licenciatura en Ciencias de la Educación pueden desempeñarse en diferentes ámbitos, como la docencia, la gestión y planificación de políticas educativas, la investigación educativa y la formación de docentes. Además, pueden especializarse en áreas específicas de la educación, como la educación especial, la educación superior o la educación para adultos.',

    ],
        {
            media: 'https://i.ibb.co/YXqncWj/PERFIL-EDU.png',
        }
    )
    .addAnswer('✅ La duración de la *Carrera a nivel Licenciatura* es de 9 Semestres', {
        delay: 3000,
    })
    .addAnswer(
        [
            '✅ *Modalidades de Admisión mediante Evaluación Previa:*\n',
            "🔹 *La Prueba de Suficiencia Académica (PSA)*, es la modalidad de ingreso planificada con la oferta de plazas distribuidas para carreras impartidas en la U.A.G.R.M., que consiste la evaluación, equivalente al 100% de la nota final.\n",
            "🔹 *Curso Pre-universitario (CUP)*, es la modalidad que consiste en un curso mínimo de 192 horas, presencial o virtual, de preparación de bachilleres para el ingreso a la carrera respectiva, constituida por aplicación de hasta dos pruebas parciales y culminará con una evaluación final.",
        ],
        {
            delay: 3000,
        }
    )
    .addAnswer(
        '_*¿* Quieres conocer información sobre las *asignaturas* que se imparten actualmente en la carrera de Ciencias de la Educación *?*_',
        {
            buttons: [
                { 'body': "Si" },
                { 'body': "↩ volver al menu principal" }
            ],
        },
        null,
        [flowSiEdu,flowVolver],
    )




//SI ESCOGE CIENCIAS DE LA COMUNICACIÓN
const flowCom = addKeyword(["2", "com"])
    .addAnswer(
        [
            "✅ La carrera de *Ciencias de la Comunicación* es una disciplina que estudia la comunicación en sus diversas formas y aplicaciones, desde el punto de vista teórico y práctico. Esta carrera se enfoca en la producción, difusión y recepción de mensajes y en cómo éstos influyen en las relaciones sociales, políticas y culturales.\n",
            "✅ _Al graduarse 👨‍🎓 de la carrera de Ciencias de la Comunicación, los estudiantes pueden trabajar en diferentes ámbitos, como el periodismo, la publicidad, las relaciones públicas, la producción audiovisual, la investigación de mercado y la comunicación institucional, entre otros._",
        ],

        {
            media: "https://i.ibb.co/BZnb4fM/PERFIL-COM.png",
        }
    )
    .addAnswer(
        "✅ La duración de la *Carrera a nivel Licenciatura* es de 9 Semestres",
        {
            delay: 3000,
        }
    )
    .addAnswer(
        [
            '✅ *Modalidades de Admisión mediante Evaluación Previa:*\n',
            "🔹 *La Prueba de Suficiencia Académica (PSA)*, es la modalidad de ingreso planificada con la oferta de plazas distribuidas para carreras impartidas en la U.A.G.R.M., que consiste la evaluación, equivalente al 100% de la nota final.\n",
            "🔹 *Curso Pre-universitario (CUP)*, es la modalidad que consiste en un curso mínimo de 192 horas, presencial o virtual, de preparación de bachilleres para el ingreso a la carrera respectiva, constituida por aplicación de hasta dos pruebas parciales y culminará con una evaluación final.",
        ],
        {
            delay: 3000,
        }
    )
    .addAnswer(
        '_*¿* Quieres conocer información sobre las *asignaturas* que se imparten actualmente en la carrera de Ciencias de la Educación *?*_',
        {
            buttons: [
                { 'body': "Si" },
                { 'body': "↩ volver al menu principal" }
                    ],
        },
        null,
        [flowSiCom,flowVolver],
    )
    
//SI ESCOGE ADMINISTRACIÓN EDUCATIVA
const flowAdmin = addKeyword(['3', 'admin'])
    .addAnswer([
        '✅ Licenciatura en *Administración Educativa* es un programa ofertado únicamente a profesores normalistas titulados, con duración de 4 semestres. La modalidad de ingreso es *directo*, a la presentación de documentos *(no requiere examen de ingreso PSA ni CUP)*',
    ],
        {
            media: 'https://i.ibb.co/x1nWGsV/PERFIL-ADMIN-EDU.png',
        }
    )
    .addAnswer([
        '✅ Puede presentar su postulación enviando su carpeta a la dirección que indica el afiche. Sin embargo, para la asignación de registro universitario deberá presentarse de forma presencial en la fecha que se le indicará.',
        '*UNA VEZ ASIGNADO EL NÚMERO DE REGISTRO* deberá realizar los siguientes pagos: ',
        '🔹 *8°* Análisis clínicos obtenidos de la U.A.G.R.M. Los análisis son los siguientes: V.S.G. Grupo sanguíneo V.D.R.L., Baciloscopia – Chagas (pagar Bs 120 en caja Facultad Cs . de la salud Humana - Módulos Universitarios)',
        '🔹 *9°* Fotocopia de revisión médica. (pagar Bs. 80 en caja Facultad Cs . de la salud Humana - Módulos Universitarios)',
        '🔹 *10°* Aporte al Club Universidad (pagar Bs. 20 en entidades financieras autorizadas)',
        '🔹 *11°* Recibo de pago por fotografía 3x4 fondo celeste (pagar Bs 12 en entidades financieras autorizadas) ',
        '🔹 *12°* Ficha de actualización de datos personales (Bs 75 pago en entidades financieras autorizadas)',
        '🔹 *13°* Pago de ficha de actualización de datos personales (Caja campus Bs 75), adjuntar boleta original',
        '🔹 *14°* Habilitar el servicio desde su perfil de estudiante, la opción pago de matrícula',
        '🔹 *15°* Cancelar 320 bs. (matrícula semestral a profesionales) en las entidades financieras autorizadas',
    ],
        {
            media: 'https://i.ibb.co/pxYj72f/145-B.jpg',
        }
    )
    .addAnswer(
        '_*¿* Quieres conocer información sobre las *asignaturas* que se imparten actualmente en la carrera de Ciencias de la Educación *?*_',
        {
            buttons: [
                { 'body': "Si" },
                { 'body': "↩ volver al menu principal" }
        ],
        },
        null,
        [flowSiAdm,flowVolver]
    );




//respuesta a carreras FLOW carreras oferta
const flowCarreras = addKeyword(['aferta', 'afertas', 'carrera', 'Carreras'])
    .addAnswer([
        '_Unidad a Distancia de la Facultad de Humanidades, Universidad Autónoma Gabriel René Moreno, ofrece los siguientes programas:_',
        '\n*1- Licenciatura en Ciencias de la Educación* (9 semestres).',
        '*2- Licenciatura en Ciencias de la Comunicación* (9 semestres).',
        '*3- Licenciatura en Administración Educativa* (4 semestres)',
        'es un programa ofertado únicamente a *Profesores normalistas titulados.*\n',
        '_¿Cuál de nuestros programas de licenciatura es de su interés?_',
        '\n_Por favor *Escribe* el_ *Número* _de la opción que deseas consultar_',
        '*Escribe* el numero *0* para volver al Menú principal',
    ],
        null,
        null,
        [flowUdu, flowCom, flowAdmin,flowVolver])
        
    

//respuesta a ubicación
const flowUbicacion = addKeyword(['Ubicacion', 'uvicacion', 'Ubicación', 'Uvicación']).addAnswer([
    '*Unidad a Distancia de la Facultad de Humanidades*',
    '*Atención de lunes a viernes*',
    'en Horarios de Oficina de:',
    '*8:00 a 12:00* y *15:00 a 18:30*',
    'Clic para ver la Ubicación 📍👇',
    'https://goo.gl/maps/9FNPtAhvWGdD1HSJ8',
],
    {
        media: 'https://i.ibb.co/0cxkx6w/Sin-t-tulo.png',
    })

// FAQ 
const flowFAQ = addKeyword(['FAQ', 'faq', 'preguntas', 'Preguntas']).addAnswer(
    [
        '*¡Hola!. Estoy aquí para ayudarte a responder algunas preguntas y tramites frecuentes de los estudiantes.*\n',
        '*1-* ¿Cómo ingreso al perfil de estudiante?',
        '*2-* Olvidé mi contraseña para acceder a mi perfil web ¿Qué debo hacer?',
        '*3-* Mi correo electrónico no está registrado ¿Cómo lo puedo registrar?',
        '*4-* Tengo registrado un correo electrónico que ya no utilizo ¿Cómo actualizo mi correo electrónico?',
        '*5-* Cuales son las entidades Entidades financieras autorizas?',
        '*6-* No me acuerdo mi numero de *Registro Universitario* (numero de registro)',
        '*7-* ¿Cómo puedo DESBLOQUEAR mi Registro?',
        '👉 *TRAMITES Y REGISTROS* 👈\n',
        '*8-* Corrección de nombre y/o C.I.',
        '*9-* ¿Cómo puedo realizar la READMISIÓN?',
        '*10-* Certificado de vencimiento de plan de estudios',
        '*11-* Cambio de carrera interfacultad',
        '*12-* Cambio de Carrera dentro de la misma facultad',
        '*13-* Carrera paralela',
        '*14-* Cambio de plan',
        '*15-* Inscripción de la Modalidad de Titulación (GRL)',
        '\n',
        'Por favor *Escribe* el *Número* de la opción que deseas consultar',
        '*Escribe* el numero *0* para volver al Menú principal',
        '*Estas Opciones aun no están disponibles*',
    ],
    null,
    null,
    [flowFAQ1, flowFAQ2, flowFAQ3,flowFAQ4, flowFAQ5, flowFAQ6, flowFAQ7,flowFAQ8,flowVolver]
)
//  flowFAQ9, flowFAQ10, flowFAQ11, flowFAQ12, flowFAQ13, flowFAQ14, flowFAQ15, flowFAQ16, flowFAQ17

//respuesta principal
const flowPrincipal = addKeyword(['buenas tardes', 'menu principal', 'buenos dias', 'hola', 'ole', 'alo', 'hola', 'ola', 'info', 'información', 'informacion', '↩ volver al menu principal',])
    .addAnswer('*Hola*,🤖 soy el Asistente Virtual de la *Unidad a Distancia de la Facultad de Humanidades*, tengo varias opciones para ayudarte',
    )
    .addAnswer('La modalidad a *Distancia* consiste en un *Sistema Híbrido*, es decir, rige su avance por tutorías presenciales y virtuales programadas en días domingo.',
        'Si un estudiante está ubicado en otro departamento y no puede asistir a las tutorías presencial, debe presentar una constancia de residencia para acceder a las opciones virtuales. Esto significa que el estudiante puede continuar su educación virtual y recibir la misma calidad de educación que los estudiantes que asisten a las tutorías presenciales.',
        {
            delay: 3000,
        })
    .addAnswer('_Elige una de las siguientes opciones: 👇_',
        {
            buttons: [
                { "body": "Carreras ofertas", },
                { "body": "Nuestra ubicación 📍" },
                { "body": "Preguntas frecuentes FAQ" },
            ],
            delay: 1000,
        },
    )
    .addAnswer('_Cualquier duda que tengas, Presiona👇_',
        {
            buttons: [
                { "body": "Contactar con una persona 🙍‍♂️" },
            ],
            delay: 1000,
        })

//respuesta a gracias
const flowGracias = addKeyword(['Gracias', 'grasias', 'grasia', 'Gracia', 'crasias']).addAnswer([
    'de Nada👍',
])

//crear bot con los adaptadores
const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowCarreras, flowUbicacion, flowGracias, flowFAQ, flowContacto])
    const adapterProvider = createProvider(BaileysProvider)
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
    QRPortalWeb()
}
main()