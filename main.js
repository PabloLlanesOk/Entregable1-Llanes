// Array de especificaciones técnicas (objetos)
const carSpecs = [
  { categoria: "Motor", valor: "1.4 Tipo 4 cilindros" },
  { categoria: "Potencia", valor: "58 HP" },
  { categoria: "Transmisión", valor: "Manual 5 velocidades" },
  { categoria: "Año", valor: "1995" },
  { categoria: "Color", valor: "Beige" },
  { categoria: "Kilometraje", valor: "ya perdí la cuenta" },
];

// Array de modificaciones realizadas
const modifications = [
  { descripcion: "Cambio de junta de tapa", fecha: "14-10-2024" },
  { descripcion: "Instalacion de alarma electrica", fecha: "05-09-2025" },
  { descripcion: "Mantenimiento de carburador", fecha: "20-09-2025" },
];

// ===== FUNCIONES CONSTRUCTORAS =====

// Función constructora para el auto
function Auto(marca, modelo, año, color) {
  this.marca = marca;
  this.modelo = modelo;
  this.año = año;
  this.color = color;
  this.encendido = false;
  this.luces = false;
  this.kilometraje = 185000;
  // SISTEMA DE AUDIOS
  const sonidoEncendido = new Audio(
    "/audio/FIAT 147 Y SUS PROBLEMAS..._[cut_1sec].mp3"
  );
  sonidoEncendido.preload = "auto";
  function reproducirSonidoEncendido() {
    sonidoEncendido.currenTime = 0;
    sonidoEncendido.play().catch((error) => {
      console.log("Error reproduciendo sonido:", error);
    });
  }
  //Ruta de Imagenes
  const ImagenApagado = './photos/Enano.png'
  const ImagenLucesEncendidas = './photos/Lueces on.png'
  // Métodos del auto
  this.encender = function () {
    this.encendido = !this.encendido;
    if (this.encendido) {
      reproducirSonidoEncendido();
    }

    return this.encendido ? "Auto encendido" : "Auto apagado";
  };

  this.toggleLuces = function () {
    this.luces = !this.luces;
    this.actualizarImagen();
  };
  this.actualizarImagen = function(){
    const carPhoto = document.getElementById('car-photo');
    if (carPhoto){
      carPhoto.src = this.luces ? ImagenLucesEncendidas : ImagenApagado
    }
  }

  this.tocarBocina = function () {
    return "¡Beep beep!";
  };

  this.agregarKilometros = function (km) {
    this.kilometraje += km;
    return this.kilometraje;
  };
}

// Crear instancia del auto
const miFiat = new Auto("Fiat", "147 Vivace", 1985, "Blanco");

// ===== ALMACENAMIENTO =====

// Array para mantenimiento (se carga desde localStorage o se inicializa)
let maintenanceTasks = JSON.parse(
  localStorage.getItem("fiat147Maintenance")
) || [
  { tarea: "Cambio de aceite", completada: false },
  { tarea: "Rotación de neumáticos", completada: true },
  { tarea: "Alineación y balanceo", completada: false },
];

// Función para guardar en localStorage
function guardarMantenimiento() {
  localStorage.setItem("fiat147Maintenance", JSON.stringify(maintenanceTasks));
}

// ===== FUNCIONES DE ORDEN SUPERIOR =====

// Función para filtrar tareas completadas
const tareasCompletadas = maintenanceTasks.filter((tarea) => tarea.completada);

// Función para mapear las especificaciones a HTML
const specsToHTML = carSpecs
  .map(
    (spec) =>
      `<div class="stat-item"><strong>${spec.categoria}:</strong> ${spec.valor}</div>`
  )
  .join("");

// ===== DOM Y EVENTOS =====

// Cargar especificaciones en el DOM
document.getElementById("specs-list").innerHTML = specsToHTML;

// Cargar modificaciones en el DOM
const modsHTML = modifications
  .map(
    (mod) =>
      `<div class="stat-item"><strong>${mod.fecha}:</strong> ${mod.descripcion}</div>`
  )
  .join("");
document.getElementById("mods-list").innerHTML = modsHTML;

// Cargar tareas de mantenimiento en el DOM
function cargarMantenimiento() {
  const maintenanceHTML = maintenanceTasks
    .map(
      (tarea, index) =>
        `<div class="maintenance-item ${tarea.completada ? "completed" : ""}">
                    <span>${tarea.tarea}</span>
                    <button onclick="toggleMantenimiento(${index})">
                        ${tarea.completada ? "Desmarcar" : "Completar"}
                    </button>
                </div>`
    )
    .join("");
  document.getElementById("maintenance-items").innerHTML = maintenanceHTML;

  document.getElementById("stats-display").innerHTML = `
                <div class="stat-item"><strong>Tareas completadas:</strong> ${stats.completadas}</div>
                <div class="stat-item"><strong>Tareas pendientes:</strong> ${stats.pendientes}</div>
                <div class="stat-item"><strong>Total de tareas:</strong> ${maintenanceTasks.length}</div>
            `;
}

// Función para alternar estado de mantenimiento
window.toggleMantenimiento = function (index) {
  maintenanceTasks[index].completada = !maintenanceTasks[index].completada;
  guardarMantenimiento();
  cargarMantenimiento();
};

// ===== EVENTOS =====
// Evento para encender/apagar el auto
document.getElementById("btn-start").addEventListener("click", function () {
  const estado = miFiat.encender();
  document.getElementById("car-status").textContent = `Estado: ${estado}`;
  this.textContent = miFiat.encendido ? "Apagar Auto" : "Encender Auto";
  this.style.background = miFiat.encendido ? "#cc0000" : "#0033a0";
});

// Evento para las luces
document.getElementById("btn-lights").addEventListener("click", function () {
  if (!miFiat.encendido) {
    alert("Primero debe encender el auto");
    return;
  }
  const estadoLuces = miFiat.toggleLuces();
});

// Evento para la bocina
document.getElementById("btn-horn").addEventListener("click", function () {
  if (!miFiat.encendido) {
    alert("Primero debe encender el auto");
    return;
  }
  alert(miFiat.tocarBocina());
});

// Evento para agregar nueva tarea de mantenimiento
document
  .getElementById("btn-add-maintenance")
  .addEventListener("click", function () {
    const nuevaTarea = document.getElementById("new-maintenance").value.trim();
    if (nuevaTarea) {
      maintenanceTasks.push({ tarea: nuevaTarea, completada: false });
      guardarMantenimiento();
      cargarMantenimiento();
      document.getElementById("new-maintenance").value = "";
    }
  });

// Permitir agregar con Enter
document
  .getElementById("new-maintenance")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      document.getElementById("btn-add-maintenance").click();
    }
  });

// ===== INICIALIZACIÓN =====
cargarMantenimiento();
