// ==========================================================
// Fit Snack - app.js (versión mejorada)
// Mantiene los mismos nombres de funciones que usa index.html
// ==========================================================

// ---------- CONFIGURACIÓN (edita aquí) ----------
// Número de WhatsApp del negocio con código de país, sin + ni guiones. Ej: "50498765432"
// Si lo dejas vacío, los pedidos solo se guardan en la app.
const NUMERO_WHATSAPP = "";
// Códigos promocionales: código → porcentaje de descuento
const CODIGOS_PROMO = { FIT10: 0.10 };

// ---------- Utilidades ----------
const esc = (t) => String(t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const lempiras = (n) => `L ${Number(n).toFixed(2)}`;

function leerStorage(clave, defecto) {
  try {
    const valor = JSON.parse(localStorage.getItem(clave));
    return valor ?? defecto;
  } catch (e) {
    return defecto;
  }
}

function guardarStorage(clave, valor) {
  try { localStorage.setItem(clave, JSON.stringify(valor)); } catch (e) { /* almacenamiento lleno o bloqueado */ }
}

// ---------- Catálogo (Precios en Lempiras) ----------
// [id, nombre, categoría, precio, precio anterior, vida útil, descripción, imagen, emoji]
const productosFitSnack = [
  [1, "Hummus Clásico con Bastones de Zanahoria", "Dips y Untables", 70, 85, "3-5 días refrigerado", "Dip cremoso de garbanzo con tahini artesanal, limón y bastones frescos de zanahoria.", "img/hummus.jpg", "🥕"],
  [2, "Bolitas Energéticas de Cacao y Avena", "Bocaditos Fit", 50, null, "21 días", "Trufas energéticas crudas con avena integral, cacao nibs, chía y miel pura.", "img/bolitas.jpg", "🍫"],
  [3, "Chips Horneadas de Camote", "Chips y Deshidratados", 38, 50, "45 días", "Finas láminas de camote hondureño horneadas con un toque de sal marina.", "img/camote.jpg", "🍠"],
  [4, "Granola Artesanal Miel y Almendras", "Granolas y Cereales", 99, 120, "30 días", "Hojuelas de avena tostadas con almendras fileteadas, semillas de calabaza y miel.", "img/granola.jpg", "🥣"],
  [5, "Yogur Griego Natural con Frutos Rojos", "Lácteos Naturales", 75, null, "7 días refrigerado", "Yogur griego alto en proteína sin azúcar refinada con compota natural de fresas y moras.", "img/yogur.jpg", "🍓"],
  [6, "Mix de Frutos Secos y Semillas", "Bocaditos Fit", 65, 80, "60 días", "Mezcla balanceada de marañón hondureño, almendras, nueces y arándanos deshidratados.", "img/mix-frutos.jpg", "🥜"],
  [7, "Chips de Plátano Verde al Horno", "Chips y Deshidratados", 35, null, "45 días", "Tostones crujientes de plátano verde sin fritura, ideales para acompañar con dips.", "img/platano.jpg", "🍌"],
  [8, "Guacamole Fresco con Totopos Horneados", "Dips y Untables", 85, 95, "2 días refrigerado", "Aguacate Hass machacado al momento con pico de gallo y totopos de maíz horneados.", "img/guacamole.jpg", "🥑"],
  [9, "Barras de Avena y Mantequilla de Maní", "Granolas y Cereales", 45, null, "25 días", "Barra energética horneada con maní 100% natural, avena y chispas de chocolate oscuro.", "img/barra-mani.jpg", "🌾"],
  [10, "Pudín de Chía con Mango Tropical", "Lácteos Naturales", 68, null, "4 días refrigerado", "Semillas de chía hidratadas en leche de coco con puré de mango maduro de temporada.", "img/chia-mango.jpg", "🥭"]
].map(([id, nombre, categoria, precio, precioAnterior, vidaUtil, descripcion, imagen, emoji]) =>
  ({ id, nombre, categoria, precio, precioAnterior, enOferta: precioAnterior !== null, vidaUtil, descripcion, imagen, emoji }));

const combosFitSnack = [
  [101, "Combo Oficina Fit (5 Días)", "Combo Semanal", 290, 340, "Consumo semanal", "Incluye 2 Chips de Camote, 1 Mix de Frutos Secos, 1 Bolitas Energéticas y 1 Hummus Clásico.", "img/combo-oficina.jpg", "💼"],
  [102, "Combo Dips & Crunch", "Para Compartir", 145, 170, "3 días refrigerado", "1 Hummus Clásico + 1 Guacamole Fresco + 2 bolsas de Chips de Plátano Verde al Horno.", "img/combo-dips.jpg", "🥗"],
  [103, "Combo Desayuno Saludable", "Mañanas Fit", 160, 185, "7 días refrigerado", "1 Granola Artesanal de Miel + 1 Yogur Griego con Frutos Rojos + 1 Pudín de Chía.", "img/combo-desayuno.jpg", "☀️"]
].map(([id, nombre, categoria, precio, precioAnterior, vidaUtil, descripcion, imagen, emoji]) =>
  ({ id, nombre, categoria, precio, precioAnterior, vidaUtil, descripcion, imagen, emoji }));

// ---------- Estado (guardado en localStorage) ----------
let carrito = leerStorage("fitsnack_carrito", []);
let pedidosHistorial = leerStorage("fitsnack_pedidos", [
  { id: "PED-104", cliente: "Rodrigo Mendoza", telefono: "9812-4410", detalle: "Granola Artesanal Miel y Almendras × 1", total: 99, pago: "Contra entrega", estado: "Pendiente", fecha: "Hoy" },
  { id: "PED-103", cliente: "Andrea Zelaya", telefono: "3345-8821", detalle: "Yogur Griego Natural × 1", total: 75, pago: "Contra entrega", estado: "Pendiente", fecha: "Hoy" },
  { id: "PED-102", cliente: "Carlos Rivera", telefono: "8890-1234", detalle: "Mix de Frutos Secos × 2", total: 130, pago: "Transferencia bancaria", estado: "Entregado", fecha: "Ayer" }
]);

// ---------- Inicialización ----------
document.addEventListener("DOMContentLoaded", () => {
  renderizarOfertas();
  renderizarTienda(productosFitSnack);
  renderizarCombos();
  actualizarVistaCarrito();
  renderizarHistorialPedidos();

  // El resumen del checkout se actualiza mientras se escribe el código promo
  document.getElementById("pedido-promo").addEventListener("input", renderizarResumenCheckout);

  // Cerrar ventanas con la tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      cerrarModal("modal-detalle");
      cerrarModal("modal-checkout");
    }
  });
});

// Registro del service worker (permite instalar la app y usarla sin conexión)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

// ---------- Navegación ----------
function cambiarVista(nombreVista) {
  document.querySelectorAll(".vista").forEach(sec => sec.classList.remove("activa"));
  const destino = document.getElementById(`vista-${nombreVista}`);
  if (destino) destino.classList.add("activa");

  const vistasExtra = ["ingredientes", "esencia", "suscripciones", "faq", "contacto"];
  const tabActiva = vistasExtra.includes(nombreVista) ? "mas" : nombreVista;
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.classList.toggle("activo", btn.dataset.vista === tabActiva);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Imagen del producto, con emoji de respaldo si la foto no carga
function crearHtmlImagen(item) {
  return `
    <img src="${esc(item.imagen)}" alt="${esc(item.nombre)}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
    <span style="display:none; font-size:2.2rem; align-items:center; justify-content:center; width:100%; height:100%;">${item.emoji}</span>
  `;
}

// ---------- Inicio ----------
function renderizarOfertas() {
  const ofertas = productosFitSnack.filter(p => p.enOferta);
  document.getElementById("total-productos-inicio").textContent = productosFitSnack.length;
  document.getElementById("total-ofertas-inicio").textContent = ofertas.length;

  document.getElementById("lista-ofertas").innerHTML = ofertas.map(prod => `
    <article class="card-producto-grid">
      <div class="img-producto-box" onclick="verDetalleItem(${prod.id}, 'producto')">
        <span class="badge-oferta">-${Math.round((1 - prod.precio / prod.precioAnterior) * 100)}%</span>
        ${crearHtmlImagen(prod)}
      </div>
      <div class="info-producto-grid">
        <h4 onclick="verDetalleItem(${prod.id}, 'producto')">${esc(prod.nombre)}</h4>
        <div class="precio-linea">
          ${lempiras(prod.precio)}
          <span class="precio-anterior">L ${prod.precioAnterior}</span>
        </div>
        <button class="btn-primario" onclick="agregarAlCarrito(${prod.id}, 'producto')">+ Agregar</button>
      </div>
    </article>
  `).join("");
}

// ---------- Tienda ----------
function renderizarTienda(lista) {
  const contenedor = document.getElementById("lista-tienda");
  if (lista.length === 0) {
    contenedor.innerHTML = `<p class="card-blanca">No encontramos snacks con ese filtro. Prueba con otra palabra o categoría.</p>`;
    return;
  }

  contenedor.innerHTML = lista.map(prod => `
    <article class="card-horizontal">
      <div class="card-horizontal-img" onclick="verDetalleItem(${prod.id}, 'producto')">
        ${crearHtmlImagen(prod)}
      </div>
      <div class="card-horizontal-info">
        <small>${esc(prod.categoria)}</small>
        <h4 onclick="verDetalleItem(${prod.id}, 'producto')">${esc(prod.nombre)}</h4>
        <p>Vida útil: ${esc(prod.vidaUtil)}</p>
        <div class="acciones-card-fila">
          <strong style="color: var(--verde-principal);">${lempiras(prod.precio)}</strong>
          <div>
            <button class="btn-secundario" onclick="verDetalleItem(${prod.id}, 'producto')">Detalle</button>
            <button class="btn-primario" onclick="agregarAlCarrito(${prod.id}, 'producto')">Agregar</button>
          </div>
        </div>
      </div>
    </article>
  `).join("");
}

function filtrarTienda() {
  const texto = document.getElementById("buscador-productos").value.trim().toLowerCase();
  const categoria = document.getElementById("filtro-categoria").value;

  renderizarTienda(productosFitSnack.filter(p => {
    const coincideTexto = p.nombre.toLowerCase().includes(texto) || p.descripcion.toLowerCase().includes(texto);
    const coincideCat = categoria === "Todas" || p.categoria === categoria;
    return coincideTexto && coincideCat;
  }));
}

// ---------- Combos ----------
function renderizarCombos() {
  document.getElementById("lista-combos").innerHTML = combosFitSnack.map(combo => `
    <article class="card-horizontal">
      <div class="card-horizontal-img" onclick="verDetalleItem(${combo.id}, 'combo')">
        ${crearHtmlImagen(combo)}
      </div>
      <div class="card-horizontal-info">
        <small>${esc(combo.categoria)}</small>
        <h4>${esc(combo.nombre)}</h4>
        <p>${esc(combo.descripcion)}</p>
        <div class="acciones-card-fila">
          <div>
            <strong style="color: var(--verde-principal);">${lempiras(combo.precio)}</strong>
            <span class="precio-anterior">L ${combo.precioAnterior}</span>
          </div>
          <button class="btn-primario" onclick="agregarAlCarrito(${combo.id}, 'combo')">Agregar combo</button>
        </div>
      </div>
    </article>
  `).join("");
}

// ---------- Detalle ----------
function verDetalleItem(id, tipo) {
  const fuente = tipo === "combo" ? combosFitSnack : productosFitSnack;
  const item = fuente.find(x => x.id === id);
  if (!item) return;

  document.getElementById("contenido-modal-detalle").innerHTML = `
    <div style="height:170px; background:var(--verde-suave); border-radius:14px; overflow:hidden; margin-bottom:14px; display:flex; align-items:center; justify-content:center;">
      ${crearHtmlImagen(item)}
    </div>
    <span class="badge-verde">${esc(item.categoria)}</span>
    <h3 style="margin-bottom:6px;">${esc(item.nombre)}</h3>
    <p style="font-size:0.9rem; color:var(--texto-gris); margin-bottom:10px;">${esc(item.descripcion)}</p>
    <p style="font-size:0.85rem; margin-bottom:14px;"><strong>Conservación / Vida útil:</strong> ${esc(item.vidaUtil)}</p>
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <strong style="font-size:1.2rem; color:var(--verde-principal);">${lempiras(item.precio)}</strong>
      <button class="btn-primario" onclick="agregarAlCarrito(${item.id}, '${tipo}'); cerrarModal('modal-detalle');">
        Agregar al carrito
      </button>
    </div>
  `;
  document.getElementById("modal-detalle").classList.remove("oculto");
}

// ---------- Carrito ----------
function agregarAlCarrito(id, tipo) {
  const fuente = tipo === "combo" ? combosFitSnack : productosFitSnack;
  const item = fuente.find(x => x.id === id);
  if (!item) return;

  const existente = carrito.find(c => c.id === id);
  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ id: item.id, nombre: item.nombre, precio: item.precio, cantidad: 1 });
  }

  guardarCarrito();
  mostrarToast(`Agregado: ${item.nombre}`);
}

function cambiarCantidadCarrito(id, delta) {
  const index = carrito.findIndex(c => c.id === id);
  if (index === -1) return;

  carrito[index].cantidad += delta;
  if (carrito[index].cantidad <= 0) carrito.splice(index, 1);
  guardarCarrito();
}

function vaciarCarrito() {
  if (carrito.length === 0) return;
  if (!confirm("¿Vaciar todo el carrito?")) return;
  carrito = [];
  guardarCarrito();
  mostrarToast("Carrito vaciado");
}

function guardarCarrito() {
  guardarStorage("fitsnack_carrito", carrito);
  actualizarVistaCarrito();
}

function actualizarVistaCarrito() {
  document.getElementById("contador-carrito").textContent = carrito.reduce((acc, i) => acc + i.cantidad, 0);

  const contenedor = document.getElementById("contenedor-items-carrito");
  const btnCheckout = document.getElementById("btn-abrir-checkout");

  if (carrito.length === 0) {
    contenedor.innerHTML = `<p style="font-size:0.86rem; color:var(--texto-gris); padding:10px 0;">Tu carrito está vacío. Agrega snacks desde Tienda o Combos.</p>`;
    document.getElementById("total-carrito-monto").textContent = lempiras(0);
    btnCheckout.disabled = true;
    return;
  }

  let totalMonto = 0;
  contenedor.innerHTML = carrito.map(item => {
    const subtotal = item.precio * item.cantidad;
    totalMonto += subtotal;
    return `
      <div class="item-carrito-fila">
        <div style="flex:1;">
          <strong style="font-size:0.88rem; display:block;">${esc(item.nombre)}</strong>
          <small style="color:var(--texto-gris);">${lempiras(item.precio)} c/u</small>
        </div>
        <div class="controles-cantidad">
          <button class="btn-cant" aria-label="Quitar uno" onclick="cambiarCantidadCarrito(${item.id}, -1)">−</button>
          <span>${item.cantidad}</span>
          <button class="btn-cant" aria-label="Agregar uno" onclick="cambiarCantidadCarrito(${item.id}, 1)">+</button>
        </div>
        <strong style="min-width:70px; text-align:right;">${lempiras(subtotal)}</strong>
      </div>
    `;
  }).join("");

  document.getElementById("total-carrito-monto").textContent = lempiras(totalMonto);
  btnCheckout.disabled = false;
}

// ---------- Checkout ----------
function calcularTotales() {
  const subtotal = carrito.reduce((acc, c) => acc + c.precio * c.cantidad, 0);
  const codigo = document.getElementById("pedido-promo").value.trim().toUpperCase();
  const porcentaje = CODIGOS_PROMO[codigo] || 0;
  const descuento = subtotal * porcentaje;
  return { subtotal, codigo, porcentaje, descuento, total: subtotal - descuento };
}

function renderizarResumenCheckout() {
  const { subtotal, codigo, porcentaje, descuento, total } = calcularTotales();
  const lineas = carrito.map(c => `${esc(c.nombre)} × ${c.cantidad} (${lempiras(c.precio * c.cantidad)})`).join("<br>");

  let promoHtml = "";
  if (porcentaje > 0) {
    promoHtml = `<br>Descuento ${esc(codigo)} (${Math.round(porcentaje * 100)}%): −${lempiras(descuento)}`;
  } else if (codigo) {
    promoHtml = `<br><span style="color:var(--peligro);">Ese código no es válido.</span>`;
  }

  document.getElementById("resumen-checkout-items").innerHTML =
    `${lineas}<hr style="margin:6px 0; border:none; border-top:1px solid #ddd;">Subtotal: ${lempiras(subtotal)}${promoHtml}<br><strong>Total: ${lempiras(total)}</strong>`;
}

function abrirModalPedido() {
  if (carrito.length === 0) return;
  renderizarResumenCheckout();
  document.getElementById("modal-checkout").classList.remove("oculto");
}

function generarIdPedido() {
  const numeros = pedidosHistorial.map(p => parseInt(String(p.id).replace(/\D/g, ""), 10) || 0);
  return `PED-${Math.max(100, ...numeros) + 1}`;
}

function procesarPedido(event) {
  event.preventDefault();
  if (carrito.length === 0) return;

  const cliente = document.getElementById("pedido-cliente").value.trim();
  const telefono = document.getElementById("pedido-telefono").value.trim();
  const direccion = document.getElementById("pedido-direccion").value.trim();
  const pago = document.getElementById("pedido-pago").value;

  if (telefono.replace(/\D/g, "").length < 8) {
    mostrarToast("Escribe un teléfono de 8 dígitos");
    return;
  }

  const { codigo, porcentaje, total } = calcularTotales();
  if (codigo && porcentaje === 0) {
    mostrarToast("El código promocional no es válido");
    return;
  }

  const detalle = carrito.map(c => `${c.nombre} × ${c.cantidad}`).join(", ");
  const ahora = new Date();
  const nuevoPedido = {
    id: generarIdPedido(),
    cliente, telefono, direccion, detalle, total, pago,
    promo: porcentaje > 0 ? codigo : "",
    estado: "Pendiente",
    fecha: ahora.toLocaleDateString("es-HN", { day: "numeric", month: "short" }) + ", " +
           ahora.toLocaleTimeString("es-HN", { hour: "2-digit", minute: "2-digit" })
  };

  pedidosHistorial.unshift(nuevoPedido);
  guardarStorage("fitsnack_pedidos", pedidosHistorial);

  carrito = [];
  guardarCarrito();
  renderizarHistorialPedidos();

  document.getElementById("form-nuevo-pedido").reset();
  cerrarModal("modal-checkout");
  mostrarToast(`¡Pedido ${nuevoPedido.id} registrado!`);
  cambiarVista("pedido");

  // Envía el pedido por WhatsApp al negocio (solo si configuraste el número)
  if (NUMERO_WHATSAPP) {
    const mensaje = `Hola Fit Snack, quiero hacer este pedido (${nuevoPedido.id}):\n${detalle}\nTotal: ${lempiras(total)}\nPago: ${pago}\nNombre: ${cliente}\nTeléfono: ${telefono}\nDirección: ${direccion}`;
    window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`, "_blank");
  }
}

function renderizarHistorialPedidos() {
  const contenedor = document.getElementById("lista-pedidos-historial");
  if (pedidosHistorial.length === 0) {
    contenedor.innerHTML = `<p class="card-blanca">Aún no tienes pedidos. Cuando confirmes uno, aparecerá aquí.</p>`;
    return;
  }

  contenedor.innerHTML = pedidosHistorial.map(ped => {
    const claseEstado = ped.estado === "Entregado" ? "estado-entregado" : (ped.estado === "Confirmado" ? "estado-confirmado" : "estado-pendiente");
    return `
      <div class="card-blanca">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
          <strong>${esc(ped.cliente)} <small style="color:var(--texto-gris);">(${esc(ped.id)})</small></strong>
          <span class="estado-pedido ${claseEstado}">${esc(ped.estado)}</span>
        </div>
        <p style="font-size:0.84rem; color:var(--texto-gris); margin-bottom:4px;">${esc(ped.detalle)}</p>
        ${ped.direccion ? `<p style="font-size:0.8rem; margin-bottom:4px;">📍 ${esc(ped.direccion)}</p>` : ""}
        <small style="color:var(--texto-gris);">${esc(ped.fecha)} • ${esc(ped.pago)}${ped.promo ? ` • ${esc(ped.promo)}` : ""} • <strong>${lempiras(ped.total)}</strong></small>
      </div>
    `;
  }).join("");
}

// ---------- Contacto ----------
function enviarMensajeContacto(event) {
  event.preventDefault();
  const nombre = document.getElementById("contacto-nombre").value.trim();
  const consulta = document.getElementById("contacto-mensaje").value.trim();

  if (NUMERO_WHATSAPP) {
    const mensaje = `Hola Fit Snack, soy ${nombre}. ${consulta}`;
    window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`, "_blank");
  }
  event.target.reset();
  mostrarToast("Mensaje enviado al equipo de Fit Snack");
}

// ---------- Modales y avisos ----------
function cerrarModal(idModal) {
  document.getElementById(idModal).classList.add("oculto");
}

function cerrarModalSiFondo(event, idModal) {
  if (event.target.id === idModal) cerrarModal(idModal);
}

let temporizadorToast;
function mostrarToast(mensaje) {
  const toast = document.getElementById("toast-notificacion");
  toast.textContent = mensaje;
  toast.classList.remove("oculto");
  clearTimeout(temporizadorToast);
  temporizadorToast = setTimeout(() => toast.classList.add("oculto"), 2400);
}
