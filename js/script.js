let usuarios = [];
let votos = [0, 0, 0];
let candidatos = ["Candidato A", "Candidato B", "Candidato C"];
let usuarioActivo = null;

document.addEventListener("DOMContentLoaded", () => {
  mostrarFormularioRegistro();
  mostrarLogin();
  mostrarVotacion();
  mostrarEstadisticas();
});

// -------- REGISTRO --------
function mostrarFormularioRegistro() {
  const div = document.getElementById("crearCuenta");
  div.innerHTML = `
    <form id="registroForm">
      <input type="text" class="form-control" placeholder="CI" required>
      <input type="text" class="form-control" placeholder="Nombre" required>
      <input type="text" class="form-control" placeholder="Apellido" required>
      <input type="email" class="form-control" placeholder="Correo" required>
      <input type="text" class="form-control" placeholder="Teléfono" required>
      <select class="form-select" required>
        <option value="">Selecciona Departamento</option>
        <option>La Paz</option><option>Cochabamba</option><option>Santa Cruz</option>
        <option>Oruro</option><option>Potosí</option><option>Chuquisaca</option>
        <option>Tarija</option><option>Beni</option><option>Pando</option>
      </select>
      <input type="date" class="form-control" placeholder="Fecha de Nacimiento" required>
      <input type="date" class="form-control" placeholder="Fecha de Votación" required>
      <input type="password" class="form-control" placeholder="Contraseña" required>
      <button type="submit" class="btn btn-primary w-100">Registrar</button>
    </form>
  `;

  document.getElementById("registroForm").addEventListener("submit", e => {
    e.preventDefault();
    if (usuarios.length >= 10) {
      alert("Límite de 10 votantes alcanzado.");
      return;
    }

    const inputs = e.target.elements;
    const nuevoUsuario = {
      ci: inputs[0].value,
      nombre: inputs[1].value,
      apellido: inputs[2].value,
      correo: inputs[3].value,
      telefono: inputs[4].value,
      departamento: inputs[5].value,
      nacimiento: inputs[6].value,
      votacion: inputs[7].value,
      password: inputs[8].value,
      voto: null
    };

    usuarios.push(nuevoUsuario);
    alert("Usuario registrado correctamente.");
    e.target.reset();
  });
}

// -------- LOGIN --------
function mostrarLogin() {
  const div = document.getElementById("login");
  div.innerHTML = `
    <form id="loginForm">
      <input type="text" class="form-control" placeholder="CI" required>
      <input type="password" class="form-control" placeholder="Contraseña" required>
      <button class="btn btn-success w-100">Iniciar Sesión</button>
    </form>
    <p class="mt-3 text-center"><a href="#" onclick="olvidoContrasena()">¿Olvidaste tu contraseña?</a></p>
  `;

  document.getElementById("loginForm").addEventListener("submit", e => {
    e.preventDefault();
    const ci = e.target.elements[0].value;
    const pass = e.target.elements[1].value;
    const user = usuarios.find(u => u.ci === ci && u.password === pass);

    if (user) {
      usuarioActivo = user;
      alert("Bienvenido, " + user.nombre);
    } else {
      alert("Credenciales incorrectas");
    }
  });
}

// -------- OLVIDO CONTRASEÑA --------
function olvidoContrasena() {
  const ci = prompt("Ingresa tu CI para recuperar contraseña:");
  const user = usuarios.find(u => u.ci === ci);
  if (user) {
    alert("Tu contraseña es: " + user.password);
  } else {
    alert("CI no encontrado.");
  }
}

// -------- VOTAR --------
function mostrarVotacion() {
  const div = document.getElementById("votar");
  let html = `<form id="votoForm">`;

  candidatos.forEach((nombre, idx) => {
    html += `
      <div class="form-check">
        <input class="form-check-input" type="radio" name="candidato" id="c${idx}" value="${idx}" required>
        <label class="form-check-label" for="c${idx}">${nombre}</label>
      </div>`;
  });

  html += `<button class="btn btn-primary mt-3">Votar</button></form>`;
  div.innerHTML = html;

  document.getElementById("votoForm").addEventListener("submit", e => {
    e.preventDefault();
    if (!usuarioActivo) {
      alert("Debes iniciar sesión para votar.");
      return;
    }
    if (usuarioActivo.voto !== null) {
      alert("Ya has votado.");
      return;
    }

    const voto = parseInt(document.querySelector('input[name="candidato"]:checked').value);
    votos[voto]++;
    usuarioActivo.voto = voto;
    alert("Voto registrado para " + candidatos[voto]);
    mostrarEstadisticas();
  });
}

// -------- ESTADÍSTICAS --------
function mostrarEstadisticas() {
  const div = document.getElementById("estadisticas");
  let html = "<h4 class='mb-3'>Resultados:</h4><ul class='list-group'>";

  candidatos.forEach((nombre, i) => {
    html += `<li class="list-group-item d-flex justify-content-between align-items-center">
              ${nombre}
              <span class="badge bg-primary rounded-pill">${votos[i]}</span>
            </li>`;
  });

  html += "</ul>";
  div.innerHTML = html;
}
