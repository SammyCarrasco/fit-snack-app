// Catálogo de productos Fit Snack (Precios en Lempiras)
const productosFitSnack = [
  {
    id: 1,
    nombre: "Hummus Clásico con Bastones de Zanahoria",
    categoria: "Dips y Untables",
    precio: 70,
    precioAnterior: 85,
    enOferta: true,
    vidaUtil: "3-5 días refrigerado",
    descripcion: "Dip cremoso de garbanzo con tahini artesanal, limón y bastones frescos de zanahoria.",
    imagen: "img/hummus.jpg",
    emoji: "🥕"
  },
  {
    id: 2,
    nombre: "Bolitas Energéticas de Cacao y Avena",
    categoria: "Bocaditos Fit",
    precio: 50,
    precioAnterior: null,
    enOferta: false,
    vidaUtil: "21 días",
    descripcion: "Trufas energéticas crudas con avena integral, cacao nibs, chía y miel pura.",
    imagen: "img/bolitas.jpg",
    emoji: "🍫"
  },
  {
    id: 3,
    nombre: "Chips Horneadas de Camote",
    categoria: "Chips y Deshidratados",
    precio: 38,
    precioAnterior: 50,
    enOferta: true,
    vidaUtil: "45 días",
    descripcion: "Finas láminas de camote hondureño horneadas con un toque de sal marina.",
    imagen: "img/camote.jpg",
    emoji: "🍠"
  },
  {
    id: 4,
    nombre: "Granola Artesanal Miel y Almendras",
    categoria: "Granolas y Cereales",
    precio: 99,
    precioAnterior: 120,
    enOferta: true,
    vidaUtil: "30 días",
    descripcion: "Hojuelas de avena tostadas con almendras fileteadas, semillas de calabaza y miel.",
    imagen: "img/granola.jpg",
    emoji: "🥣"
  },
  {
    id: 5,
    nombre: "Yogur Griego Natural con Frutos Rojos",
    categoria: "Lácteos Naturales",
    precio: 75,
    precioAnterior: null,
    enOferta: false,
    vidaUtil: "7 días refrigerado",
    descripcion: "Yogur griego alto en proteína sin azúcar refinada con compota natural de fresas y moras.",
    imagen: "img/yogur.jpg",
    emoji: "🍓"
  },
  {
    id: 6,
    nombre: "Mix de Frutos Secos y Semillas",
    categoria: "Bocaditos Fit",
    precio: 65,
    precioAnterior: 80,
    enOferta: true,
    vidaUtil: "60 días",
    descripcion: "Mezcla balanceada de marañón hondureño, almendras, nueces y arándanos deshidratados.",
    imagen: "img/mix-frutos.jpg",
    emoji: "🥜"
  },
  {
    id: 7,
    nombre: "Chips de Plátano Verde al Horno",
    categoria: "Chips y Deshidratados",
    precio: 35,
    precioAnterior: null,
    enOferta: false,
    vidaUtil: "45 días",
    descripcion: "Tostones crujientes de plátano verde sin fritura, ideales para acompañar con dips.",
    imagen: "img/platano.jpg",
    emoji: "🍌"
  },
  {
    id: 8,
    nombre: "Guacamole Fresco con Totopos Horneados",
    categoria: "Dips y Untables",
    precio: 85,
    precioAnterior: 95,
    enOferta: true,
    vidaUtil: "2 días refrigerado",
    descripcion: "Aguacate Hass machacado al momento con pico de gallo y totopos de maíz horneados.",
    imagen: "img/guacamole.jpg",
    emoji: "🥑"
  },
  {
    id: 9,
    nombre: "Barras de Avena y Mantequilla de Maní",
    categoria: "Granolas y Cereales",
    precio: 45,
    precioAnterior: null,
    enOferta: false,
    vidaUtil: "25 días",
    descripcion: "Barra energética horneada con maní 100% natural, avena y chispas de chocolate oscuro.",
    imagen: "img/barra-mani.jpg",
    emoji: "🌾"
  },
  {
    id: 10,
    nombre: "Pudín de Chía con Mango Tropical",
    categoria: "Lácteos Naturales",
    precio: 68,
    precioAnterior: null,
    enOferta: false,
    vidaUtil: "4 días refrigerado",
    descripcion: "Semillas de chía hidratadas en leche de coco con puré de mango maduro de temporada.",
    imagen: "img/chia-mango.jpg",
    emoji: "🥭"
  }
];

// Combos disponibles
const combosFitSnack = [
  {
    id: 101,
    nombre: "Combo Oficina Fit (5 Días)",
    categoria: "Combo Semanal",
    precio: 290,
    precioAnterior: 340,
    vidaUtil: "Consumo semanal",
    descripcion: "Incluye 2 Chips de Camote, 1 Mix de Frutos Secos, 1 Bolitas Energéticas y 1 Hummus Clásico.",
    imagen: "img/combo-oficina.jpg",
    emoji: "💼"
  },
  {
    id: 102,
    nombre: "Combo Dips & Crunch",
    categoria: "Para Compartir",
    precio: 145,
    precioAnterior: 170,
    vidaUtil: "3 días refrigerado",
    descripcion: "1 Hummus Clásico + 1 Guacamole Fresco + 2 bolsas de Chips de Plátano Verde al Horno.",
    imagen: "img/combo-dips.jpg",
    emoji: "🥗"
  },
  {
    id: 103,
    nombre: "Combo Desayuno Saludable",
    categoria: "Mañanas Fit",
    precio: 160,
    precioAnterior: 185,
    vidaUtil: "7 días refrigerado",
    descripcion: "1 Granola Artesanal de Miel + 1 Yogur Griego con Frutos Rojos + 1 Pudín de Chía.",
    imagen: "img/combo-desayuno.jpg",
    emoji: "☀️"
  }
];

// Estado global almacenado en localStorage
let carrito = JSON.parse(localStorage.getItem("fitsnack_carrito")) || [];
let pedidosHistorial = JSON.parse(localStorage.getItem("fitsnack_pedidos")) || [
  {
    id: "PED-104",
    cliente: "Rodrigo Mendoza",
    telefono: "9812-4410",
    detalle: "Granola Artesanal Miel y Almendras × 1",
    total: 99,
    pago: "Contra entrega",
    estado: "Pendiente",
    fecha: "Hoy"
  },
  {
    id: "PED-103",
    cliente: "Andrea Zelaya",
    telefono: "3345-8821",
    detalle: "Yogur Griego Natural × 1",
    total: 75,
    pago: "Contra entrega",
    estado: "Pendiente",
    fecha: "Hoy"
  },
  {
    id: "PED-102",
    cliente: "Carlos Rivera",
    telefono: "8890-1234",
    detalle: "Mix de Frutos Secos × 2",
    total: 130,
    pago: "Transferencia bancaria",
    estado: "Entregado",
    fecha: "Ayer"
  }
];

// Inicialización al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  renderizarOfertas();
  renderizarTienda(productosFitSnack);
  renderizarCombos();
  actualizarVistaCarrito();
  renderizarHistorialPedidos();
});

// Navegación entre pantallas
function cambiarVista(nombreVista) {
  document.querySelectorAll(".vista").forEach(sec => sec.classList.remove("activa"));
  const destino = document.getElementById(`vista-${nombreVista}`);
  if (destino) {
    destino.classList.add("activa");
  }

  // Marcar botón activo en barra inferior
  const vistasExtra = ["ingredientes", "esencia", "suscripciones", "faq", "contacto"];
  const tabActiva = vistasExtra.includes(nombreVista) ? "mas" : nombreVista;

  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.classList.toggle("activo", btn.dataset.vista === tabActiva);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Helper para mostrar imagen o emoji de respaldo si la foto aún no existe
function crearHtmlImagen(item) {
  return `
    <img src="${item.imagen}" alt="${item.nombre}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
    <span style="display:none; font-size:2.2rem; align-items:center; justify-content:center; width:100%; height:100%;">${item.emoji}</span>
  `;
}

// Renderizar ofertas en Inicio
function renderizarOfertas() {
  const ofertas = productosFitSnack.filter(p => p.enOferta);
  document.getElementById("total-productos-inicio").textContent = productosFitSnack.length;
  document.getElementById("total-ofertas-inicio").textContent = ofertas.length;

  const contenedor = document.getElementById("lista-ofertas");
  contenedor.innerHTML = ofertas.map(prod => `
    <article class="card-producto-grid">
      <div class="img-producto-box" onclick="verDetalleItem(${prod.id}, 'producto')">
        <span class="badge-oferta">Oferta</span>
        ${crearHtmlImagen(prod)}
      </div>
      <div class="info-producto-grid">
        <h4 onclick="verDetalleItem(${prod.id}, 'producto')">${prod.nombre}</h4>
        <div class="precio-linea">
          L ${prod.precio.toFixed(2)}
          ${prod.precioAnterior ? `<span class="precio-anterior">L ${prod.precioAnterior}</span>` : ""}
        </div>
        <button class="btn-primario" onclick="agregarAlCarrito(${prod.id}, 'producto')">+ Agregar</button>
      </div>
    </article>
  `).join("");
}

// Renderizar catálogo de Tienda
function renderizarTienda(lista) {
  const contenedor = document.getElementById("lista-tienda");
  if (lista.length === 0) {
    contenedor.innerHTML = `<p class="card-blanca">No se encontraron snacks con ese filtro.</p>`;
    return;
  }

  contenedor.innerHTML = lista.map(prod => `
    <article class="card-horizontal">
      <div class="card-horizontal-img" onclick="verDetalleItem(${prod.id}, 'producto')">
        ${crearHtmlImagen(prod)}
      </div>
      <div class="card-horizontal-info">
        <small>${prod.categoria}</small>
        <h4 onclick="verDetalleItem(${prod.id}, 'producto')">${prod.nombre}</h4>
        <p>Vida útil: ${prod.vidaUtil}</p>
        <div class="acciones-card-fila">
          <strong style="color: var(--verde-principal);">L ${prod.precio.toFixed(2)}</strong>
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
  const texto = document.getElementById("buscador-productos").value.toLowerCase();
  const categoria = document.getElementById("filtro-categoria").value;

  const filtrados = productosFitSnack.filter(p => {
    const coincideTexto = p.nombre.toLowerCase().includes(texto) || p.descripcion.toLowerCase().includes(texto);
    const coincideCat = categoria === "Todas" || p.categoria === categoria;
    return coincideTexto && coincideCat;
  });

  renderizarTienda(filtrados);
}

// Renderizar Combos
function renderizarCombos() {
  const contenedor = document.getElementById("lista-combos");
  contenedor.innerHTML = combosFitSnack.map(combo => `
    <article class="card-horizontal">
      <div class="card-horizontal-img" onclick="verDetalleItem(${combo.id}, 'combo')">
        ${crearHtmlImagen(combo)}
      </div>
      <div class="card-horizontal-info">
        <small>${combo.categoria}</small>
        <h4>${combo.nombre}</h4>
        <p>${combo.descripcion}</p>
        <div class="acciones-card-fila">
          <div>
            <strong style="color: var(--verde-principal);">L ${combo.precio.toFixed(2)}</strong>
            <span class="precio-anterior">L ${combo.precioAnterior}</span>
          </div>
          <button class="btn-primario" onclick="agregarAlCarrito(${combo.id}, 'combo')">Agregar combo</button>
        </div>
      </div>
    </article>
  `).join("");
}

// Modal de detalle al tocar producto o combo
function verDetalleItem(id, tipo) {
  const fuente = tipo === "combo" ? combosFitSnack : productosFitSnack;
  const item = fuente.find(x => x.id === id);
  if (!item) return;

  const contenido = document.getElementById("contenido-modal-detalle");
  contenido.innerHTML = `
    <div style="height:170px; background:var(--verde-suave); border-radius:14px; overflow:hidden; margin-bottom:14px; display:flex; align-items:center; justify-content:center;">
      ${crearHtmlImagen(item)}
    </div>
    <span class="badge-verde">${item.categoria}</span>
    <h3 style="margin-bottom:6px;">${item.nombre}</h3>
    <p style="font-size:0.9rem; color:var(--texto-gris); margin-bottom:10px;">${item.descripcion}</p>
    <p style="font-size:0.85rem; margin-bottom:14px;"><strong>Conservación / Vida útil:</strong> ${item.vidaUtil}</p>
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <strong style="font-size:1.2rem; color:var(--verde-principal);">L ${item.precio.toFixed(2)}</strong>
      <button class="btn-primario" onclick="agregarAlCarrito(${item.id}, '${tipo}'); cerrarModal('modal-detalle');">
        Agregar al carrito
      </button>
    </div>
  `;
  document.getElementById("modal-detalle").classList.remove("oculto");
}

// Lógica del Carrito
function agregarAlCarrito(id, tipo) {
  const fuente = tipo === "combo" ? combosFitSnack : productosFitSnack;
  const item = fuente.find(x => x.id === id);
  if (!item) return;

  const existente = carrito.find(c => c.id === id);
  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({
      id: item.id,
      nombre: item.nombre,
      precio: item.precio,
      cantidad: 1
    });
  }

  guardarCarrito();
  mostrarToast(`Agregado: ${item.nombre}`);
}

function cambiarCantidadCarrito(id, delta) {
  const index = carrito.findIndex(c => c.id === id);
  if (index === -1) return;

  carrito[index].cantidad += delta;
  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1);
  }
  guardarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
  mostrarToast("Carrito vaciado");
}

function guardarCarrito() {
  localStorage.setItem("fitsnack_carrito", JSON.stringify(carrito));
  actualizarVistaCarrito();
}

function actualizarVistaCarrito() {
  const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  document.getElementById("contador-carrito").textContent = totalUnidades;

  const contenedor = document.getElementById("contenedor-items-carrito");
  const btnCheckout = document.getElementById("btn-abrir-checkout");

  if (carrito.length === 0) {
    contenedor.innerHTML = `<p style="font-size:0.86rem; color:var(--texto-gris); padding:10px 0;">Tu carrito está vacío. Agrega snacks desde Tienda o Combos.</p>`;
    document.getElementById("total-carrito-monto").textContent = "L 0.00";
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
          <strong style="font-size:0.88rem; display:block;">${item.nombre}</strong>
          <small style="color:var(--texto-gris);">L ${item.precio.toFixed(2)} c/u</small>
        </div>
        <div class="controles-cantidad">
          <button class="btn-cant" onclick="cambiarCantidadCarrito(${item.id}, -1)">-</button>
          <span>${item.cantidad}</span>
          <button class="btn-cant" onclick="cambiarCantidadCarrito(${item.id}, 1)">+</button>
        </div>
        <strong style="min-width:65px; text-align:right;">L ${subtotal.toFixed(2)}</strong>
      </div>
    `;
  }).join("");

  document.getElementById("total-carrito-monto").textContent = `L ${totalMonto.toFixed(2)}`;
  btnCheckout.disabled = false;
}

// Checkout y creación de Pedido
function abrirModalPedido() {
  if (carrito.length === 0) return;

  const resumenTexto = carrito.map(c => `${c.nombre} × ${c.cantidad} (L ${(c.precio * c.cantidad).toFixed(2)})`).join("<br>");
  const total = carrito.reduce((acc, c) => acc + (c.precio * c.cantidad), 0);

  document.getElementById("resumen-checkout-items").innerHTML = `${resumenTexto}<hr style="margin:6px 0; border:none; border-top:1px solid #ddd;"><strong>Total: L ${total.toFixed(2)}</strong>`;
  document.getElementById("modal-checkout").classList.remove("oculto");
}

function procesarPedido(event) {
  event.preventDefault();
  if (carrito.length === 0) return;

  const cliente = document.getElementById("pedido-cliente").value.trim();
  const telefono = document.getElementById("pedido-telefono").value.trim();
  const pago = document.getElementById("pedido-pago").value;
  const promo = document.getElementById("pedido-promo").value.trim().toUpperCase();

  let total = carrito.reduce((acc, c) => acc + (c.precio * c.cantidad), 0);
  if (promo === "FIT10") {
    total = total * 0.90;
  }

  const detalle = carrito.map(c => `${c.nombre} × ${c.cantidad}`).join(", ");
  const nuevoPedido = {
    id: `PED-${Math.floor(105 + Math.random() * 890)}`,
    cliente,
    telefono,
    detalle,
    total,
    pago,
    estado: "Pendiente",
    fecha: "Recién creado"
  };

  pedidosHistorial.unshift(nuevoPedido);
  localStorage.setItem("fitsnack_pedidos", JSON.stringify(pedidosHistorial));

  carrito = [];
  guardarCarrito();
  renderizarHistorialPedidos();

  document.getElementById("form-nuevo-pedido").reset();
  cerrarModal("modal-checkout");
  mostrarToast("¡Pedido registrado correctamente!");
}

function renderizarHistorialPedidos() {
  const contenedor = document.getElementById("lista-pedidos-historial");
  contenedor.innerHTML = pedidosHistorial.map(ped => {
    const claseEstado = ped.estado === "Entregado" ? "estado-entregado" : (ped.estado === "Confirmado" ? "estado-confirmado" : "estado-pendiente");
    return `
      <div class="card-blanca">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
          <strong>${ped.cliente} <small style="color:var(--texto-gris);">(${ped.id})</small></strong>
          <span class="estado-pedido ${claseEstado}">${ped.estado}</span>
        </div>
        <p style="font-size:0.84rem; color:var(--texto-gris); margin-bottom:4px;">${ped.detalle}</p>
        <small style="color:var(--texto-gris);">${ped.fecha} • ${ped.pago} • <strong>L ${ped.total.toFixed(2)}</strong></small>
      </div>
    `;
  }).join("");
}

function enviarMensajeContacto(event) {
  event.preventDefault();
  event.target.reset();
  mostrarToast("Mensaje enviado al equipo de Fit Snack");
}

function cerrarModal(idModal) {
  document.getElementById(idModal).classList.add("oculto");
}

function cerrarModalSiFondo(event, idModal) {
  if (event.target.id === idModal) {
    cerrarModal(idModal);
  }
}

function mostrarToast(mensaje) {
  const toast = document.getElementById("toast-notificacion");
  toast.textContent = mensaje;
  toast.classList.remove("oculto");
  setTimeout(() => {
    toast.classList.add("oculto");
  }, 2400);
}