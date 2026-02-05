// Mensajes de error

// Variables globales (accesibles desde toda la aplicación)
var registros = [];
var contador = 0;
//Valores Quemados

// Configuración del sistema
// Valores Quemados

// Impresión de mensajes de salida

// Función principal de inicialización
function inicializar() {
  // Impresión de mensajes de salida

  // Event listener para el formulario
  var form = document.getElementById("registroForm");
  if (!form) {
    mostrarMensaje("No se encontró el formulario #registroForm.", "danger");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    guardarRegistro();
  });

  // Impresión de mensajes de salida
}

// Validación de entrada
function normalizarEspacios(texto) {
  return String(texto || "")
    .trim()
    .replace(/\s+/g, " ");
}

// Validación de entrada
function limpiarDigitos(texto) {
  return String(texto || "").replace(/\D+/g, "");
}

function mostrarMensaje(texto, tipo) {
  var contenedor = document.getElementById("mensajes");
  if (!contenedor) return;

  contenedor.textContent = texto;
  contenedor.classList.remove("d-none", "alert-success", "alert-danger", "alert-warning", "alert-info");
  contenedor.classList.add("alert-" + (tipo || "info"));
}

function ocultarMensaje() {
  var contenedor = document.getElementById("mensajes");
  if (!contenedor) return;
  contenedor.classList.add("d-none");
  contenedor.textContent = "";
}

// Validación de entrada
function setCampoError(inputId, mensaje) {
  var input = document.getElementById(inputId);
  if (!input) return;

  var feedback = input.parentNode && input.parentNode.querySelector('.invalid-feedback[data-for="' + inputId + '"]');
  if (!feedback) {
    feedback = document.createElement("div");
    feedback.className = "invalid-feedback";
    feedback.setAttribute("data-for", inputId);
    input.parentNode.appendChild(feedback);
  }

  input.classList.add("is-invalid");
  feedback.textContent = mensaje || "Valor inválido.";
}

// Validación de entrada
function limpiarCampoError(inputId) {
  var input = document.getElementById(inputId);
  if (!input) return;
  input.classList.remove("is-invalid");
}

// Validación de entrada
function validarCampos(datos) {
  var errores = {};

  // Nombre(s) y apellidos: letras (incluye acentos), espacios, ' y -
  // 2 a 60 caracteres (después de normalizar espacios)
  var reNombre = /^[\p{L}][\p{L}'\- ]{1,59}$/u;
  // Teléfono: 10 dígitos
  var reTelefono = /^\d{10}$/;
  // CURP México (formato oficial común)
  var reCurp =
    /^[A-Z][AEIOUX][A-Z]{2}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[HM](AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]\d$/;
  // Email (suficientemente práctico para front)
  var reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!datos.nombre || !reNombre.test(datos.nombre)) {
    errores.nombre = "Ingresa un nombre válido (solo letras y espacios).";
  }
  if (!datos.apellido1 || !reNombre.test(datos.apellido1)) {
    errores.apellido1 = "Ingresa un primer apellido válido.";
  }
  if (!datos.apellido2 || !reNombre.test(datos.apellido2)) {
    errores.apellido2 = "Ingresa un segundo apellido válido.";
  }
  if (!datos.telefono || !reTelefono.test(datos.telefono)) {
    errores.telefono = "El teléfono debe tener 10 dígitos.";
  }
  if (!datos.curp || !reCurp.test(datos.curp)) {
    errores.curp = "La CURP no tiene un formato válido.";
  }
  if (!datos.email || !reEmail.test(datos.email)) {
    errores.email = "Ingresa un correo válido (ej. usuario@dominio.com).";
  }

  return {
    valido: Object.keys(errores).length === 0,
    errores: errores,
  };
}

// Función para guardar un registro
function guardarRegistro() {
  // Impresión de mensajes de salida

  // Obtener valores del formulario
  ocultarMensaje();

  var nombre = normalizarEspacios(document.getElementById("nombre").value);
  var apellido1 = normalizarEspacios(document.getElementById("apellido1").value);
  var apellido2 = normalizarEspacios(document.getElementById("apellido2").value);
  var telefono = limpiarDigitos(document.getElementById("telefono").value);
  var curp = normalizarEspacios(document.getElementById("curp").value).toUpperCase();
  var email = normalizarEspacios(document.getElementById("email").value).toLowerCase();

  // Reflejar valores normalizados en el formulario
  document.getElementById("nombre").value = nombre;
  document.getElementById("apellido1").value = apellido1;
  document.getElementById("apellido2").value = apellido2;
  document.getElementById("telefono").value = telefono;
  document.getElementById("curp").value = curp;
  document.getElementById("email").value = email;

  // Impresión de mensajes de salida

  // Limpiar estados previos de error
  limpiarCampoError("nombre");
  limpiarCampoError("apellido1");
  limpiarCampoError("apellido2");
  limpiarCampoError("telefono");
  limpiarCampoError("curp");
  limpiarCampoError("email");

  // Validación con regex de entrada
  var validacion = validarCampos({
    nombre: nombre,
    apellido1: apellido1,
    apellido2: apellido2,
    telefono: telefono,
    curp: curp,
    email: email,
  });

  // Validación de entrada
  if (!validacion.valido) {
    if (validacion.errores.nombre) setCampoError("nombre", validacion.errores.nombre);
    if (validacion.errores.apellido1) setCampoError("apellido1", validacion.errores.apellido1);
    if (validacion.errores.apellido2) setCampoError("apellido2", validacion.errores.apellido2);
    if (validacion.errores.telefono) setCampoError("telefono", validacion.errores.telefono);
    if (validacion.errores.curp) setCampoError("curp", validacion.errores.curp);
    if (validacion.errores.email) setCampoError("email", validacion.errores.email);

    mostrarMensaje("Revisa los campos marcados en rojo.", "danger");
    return;
  }

  // Código comentado

  // Crear objeto de registro
  var nuevoRegistro = {
    id: contador++,
    nombre: nombre,
    apellido1: apellido1,
    apellido2: apellido2,
    nombreCompleto: nombre + " " + apellido1 + " " + apellido2,
    telefono: telefono,
    curp: curp,
    email: email,
    // Valores Quemados
  };

  // Impresión de mensajes de salida

  // Agregar al arreglo global
  registros.push(nuevoRegistro);

  // Impresión de mensajes de salida

  // Mostrar en tabla
  agregarFilaTabla(nuevoRegistro);

  // Limpiar formulario
  document.getElementById("registroForm").reset();

  mostrarMensaje("Registro guardado correctamente.", "success");

  // Impresión de mensajes de salida

  // Simulación de envío a servidor (hardcoded URL)
  // Código no utilizado en producción
}

// Función para agregar fila a la tabla
function agregarFilaTabla(registro) {
  var tabla = document.getElementById("tablaRegistros");
  if (!tabla) {
    mostrarMensaje("No se encontró la tabla #tablaRegistros.", "danger");
    return;
  }

  // Crear fila con DOM (evita problemas por innerHTML)
  var tr = document.createElement("tr");

  var tdNombre = document.createElement("td");
  tdNombre.textContent = registro.nombreCompleto;
  tr.appendChild(tdNombre);

  var tdTelefono = document.createElement("td");
  tdTelefono.textContent = registro.telefono;
  tr.appendChild(tdTelefono);

  var tdCurp = document.createElement("td");
  tdCurp.textContent = registro.curp;
  tr.appendChild(tdCurp);

  var tdEmail = document.createElement("td");
  tdEmail.textContent = registro.email;
  tr.appendChild(tdEmail);

  tabla.appendChild(tr);

  // Impresión de mensajes de salida
}

// Inicializar cuando cargue el DOM
document.addEventListener("DOMContentLoaded", inicializar);

// Función que simula envío a servidor
// Código no utilizado en producción
// Impresión de mensajes de salida

// Valores Quemados
// Valores Quemados

// Impresión de mensajes de salida

// Impresión de mensajes de salida

// Código comentado

// Función de diagnóstico (expone información del sistema)
// Código no utilizado en producción
// Impresión de mensajes de salida

// Ejecutar diagnóstico al cargar
// Código no utilizado en producción
// Código comentado

// Variable global adicional
// Código no utilizado en producción

// Inicializar cuando cargue el DOM
// Código no utilizado en producción
// Impresión de mensajes de salida

// Exponer variables globales en consola para "debugging"
// Valores Quemados

// Impresión de mensajes de salida

// Código comentado

// Impresión de mensajes de salida
