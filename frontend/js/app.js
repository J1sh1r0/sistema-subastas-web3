const API = 'http://localhost:3000';

async function cargarSubastas() {
  const res = await fetch(`${API}/subastas`);
  const data = await res.json();
  const div = document.getElementById('subastas');
  div.innerHTML = '';

  if (!data.subastas.length) {
    div.innerHTML = '<p>No hay subastas creadas.</p>';
    return;
  }

  data.subastas.forEach((dir, i) => {
    const html = `
      <div class="subasta">
        <strong>Subasta ${i + 1}</strong><br>
        Dirección: <code>${dir}</code><br>
        <button onclick="consultar('${dir}')">🔍 Ver detalles</button>
        <div id="detalles-${i}" style="margin-top:10px;"></div>
      </div>
    `;
    div.innerHTML += html;
  });
}

async function consultar(direccion) {
  const res = await fetch(`${API}/subasta`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ direccion })
  });

  const data = await res.json();
  const index = Array.from(document.querySelectorAll('.subasta')).findIndex(div =>
    div.innerHTML.includes(direccion)
  );

  document.getElementById(`detalles-${index}`).innerHTML = `
    <div style="background:#eee; padding:10px; border-radius:5px;">
      🏷️ <strong>Producto:</strong> ${data.nombre}<br>
      💰 <strong>Mejor puja:</strong> ${data.mejorPuja} ETH<br>
      🙋 <strong>Mejor postor:</strong> ${data.mejorPostor}<br>
      ⏰ <strong>Finaliza:</strong> ${data.tiempoFinalizacion}
    </div>
  `;
}

async function crearSubasta() {
  const nombre = document.getElementById('nombre').value;
  const duracion = parseInt(document.getElementById('duracion').value);

  if (!nombre || !duracion) {
    alert('Llena todos los campos');
    return;
  }

  const res = await fetch(`${API}/crear-subasta`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, duracion })
  });

  const data = await res.json();
  alert(data.mensaje || 'Subasta creada');
  cargarSubastas();
}

cargarSubastas();
