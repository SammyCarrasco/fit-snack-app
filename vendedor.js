// ==========================================================
// Fit Snack - vendedor.js
// Proceso de ventas colaborativo: el cliente hace el pedido y el
// vendedor lo gestiona (Pendiente → Confirmado → Entregado) y le
// avisa por WhatsApp. Se carga DESPUÉS de app.js.
// ==========================================================

// PIN de acceso al panel (cámbialo). Es una protección básica de demostración.
const PIN_VENDEDOR = "1234";
let vendedorActivo = false;

document.addEventListener("DOMContentLoaded", () => {
  // Crea la pantalla del panel
  const seccion = document.createElement("section");
  seccion.id = "vista-vendedor";
  seccion.className = "vista";
  seccion.innerHTML = `
    <button class="btn-volver" onclick="cambiarVista('mas')">← Volver a Más</button>
    <h2>Panel del vendedor</h2>
    <p class="subtitulo-vista">Gestiona los pedidos y avisa a tus clientes.</p>
    <div id="contenido-vendedor"></div>`;
  document.querySelector(".app-contenido").appendChild(seccion);

  // Agrega el acceso en el menú "Más"
  const boton = document.createElement("button");
  boton.className = "item-menu-extra";
  boton.onclick = abrirPanelVendedor;
  boton.innerHTML = `
    <span class="icono-extra">📊</span>
    <div><strong>Panel del vendedor</strong><small>Pedidos, estados y ventas</small></div>
    <span>›</span>`;
  document.querySelector(".menu-extra-lista").appendChild(boton);
});

// Mantiene resaltada la pestaña "Más" y refresca el panel al entrar
const cambiarVistaOriginal = cambiarVista;
cambiarVista = function (nombre) {
  cambiarVistaOriginal(nombre);
  if (nombre === "vendedor") {
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.toggle("activo", b.dataset.vista === "mas"));
    renderizarPanelVendedor();
  }
};

function abrirPanelVendedor() {
  if (!vendedorActivo) {
    const pin = prompt("PIN del vendedor:");
    if (pin === null) return;
    if (pin !== PIN_VENDEDOR) {
      mostrarToast("PIN incorrecto");
      return;
    }
    vendedorActivo = true;
  }
  cambiarVista("vendedor");
}

function renderizarPanelVendedor() {
  const estados = ["Pendiente", "Confirmado", "Entregado"];
  const conteo = estados.map(e => pedidosHistorial.filter(p => p.estado === e).length);
  const maximo = Math.max(1, ...conteo);
  const ventas = pedidosHistorial.reduce((acc, p) => acc + p.total, 0);

  const grafico = estados.map((e, i) => `
    <div class="barra-fila">
      <span>${e}</span>
      <div class="barra-pista"><div class="barra-relleno barra-${e.toLowerCase()}" style="width:${(conteo[i] / maximo) * 100}%"></div></div>
      <strong>${conteo[i]}</strong>
    </div>`).join("");

  const pedidos = pedidosHistorial.length === 0
    ? `<p class="card-blanca">Todavía no hay pedidos.</p>`
    : pedidosHistorial.map(p => {
        const siguiente = p.estado === "Pendiente" ? "Confirmado" : (p.estado === "Confirmado" ? "Entregado" : "");
        const claseEstado = p.estado === "Entregado" ? "estado-entregado" : (p.estado === "Confirmado" ? "estado-confirmado" : "estado-pendiente");
        return `
          <div class="card-blanca">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
              <strong>${esc(p.cliente)} <small style="color:var(--texto-gris);">(${esc(p.id)})</small></strong>
              <span class="estado-pedido ${claseEstado}">${esc(p.estado)}</span>
            </div>
            <p style="font-size:0.84rem; margin-bottom:4px;">${esc(p.detalle)}</p>
            <small style="color:var(--texto-gris);">${esc(p.fecha)} • ${esc(p.pago)} • <strong>${lempiras(p.total)}</strong> • Tel. ${esc(p.telefono)}</small>
            <div class="acciones-vendedor">
              ${siguiente ? `<button class="btn-primario" onclick="cambiarEstadoPedido('${esc(p.id)}', '${siguiente}')">Marcar ${siguiente.toLowerCase()}</button>` : ""}
              <button class="btn-secundario" onclick="avisarCliente('${esc(p.id)}')">Avisar por WhatsApp</button>
            </div>
          </div>`;
      }).join("");

  document.getElementById("contenido-vendedor").innerHTML = `
    <div class="resumen-metricas">
      <div class="metrica-card"><strong>${pedidosHistorial.length}</strong><span>Pedidos</span></div>
      <div class="metrica-card"><strong>${lempiras(ventas)}</strong><span>Ventas totales</span></div>
    </div>
    <div class="card-blanca">
      <h4>Pedidos por estado</h4>
      ${grafico}
    </div>
    <div class="titulo-bloque"><h3>Gestión de pedidos</h3></div>
    ${pedidos}`;
}

function cambiarEstadoPedido(id, estado) {
  const pedido = pedidosHistorial.find(p => p.id === id);
  if (!pedido) return;
  pedido.estado = estado;
  guardarStorage("fitsnack_pedidos", pedidosHistorial);
  renderizarPanelVendedor();
  renderizarHistorialPedidos();
  mostrarToast(`${id}: ${estado}`);
}

function avisarCliente(id) {
  const pedido = pedidosHistorial.find(p => p.id === id);
  if (!pedido) return;
  let telefono = pedido.telefono.replace(/\D/g, "");
  if (telefono.length === 8) telefono = "504" + telefono; // código de Honduras
  const mensaje = `Hola ${pedido.cliente}, tu pedido ${pedido.id} de Fit Snack está: ${pedido.estado}. Total: ${lempiras(pedido.total)}. ¡Gracias por tu compra!`;
  window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`, "_blank");
}
