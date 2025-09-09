/* Mochila del jugador */
let mochila = [];

/* Inicio del Juego */

function iniciarCuento() {
  console.log("Estas caminando por un bosque en una noche de luna llena...");
  console.log(
    "Cuando de repente encuentras una casa antigua y algo tenebrosa."
  );

  let entrar = prompt("Quieres entrar a la casa? (si/no)");

  if (entrar.toLowerCase() === "si") {
    dentroDeLaCasa();
  } else {
    console.log("Decides seguir camincando y evitar la casa...");
    console.log("Fin de la historia, sos un miedoso/a");
  }
}

/* Lo que pasa dentro de la casa */

function dentroDeLaCasa() {
  console.log(
    "Entras a la casa y ves un living con un sillon lleno de polvo. Parece abandonada hace mucho tiempo."
  );
  console.log(
    "Sientes como una rara presencia en la habitacion, como si no estuvieras solo/a"
  );
  console.log("De repente, la puerta se cierra de un golpe atras de ti. ¡PUM!");

  let salir = prompt("Quieres intentar abrir la puerta para irte? (si/no)");

  if (salir.toLowerCase() === "si") {
    console.log(
      "Intentas abrirla... pero descubris que tiene 2 cerraduras. Necesitas dos llaves para abrirla."
    );
    console.log("tendras que explorar la casa en busca de ellas...");
    explorarCasa();
  } else {
    console.log("Deceides quedarte un rato mas en el living...");
    console.log(
      "Pero el aire se vuelve mas pesado y sientes una voz cansada y profunda que te avisa que no vas a salir nunca"
    );
  }
}

/*Explorando la casa */

function explorarCasa() {
  let jugando = true;

  while (jugando) {
    let decision = prompt(
      "¿Dónde quieres ir? (1 = Biblioteca, 2 = Cuarto, 3 = Revisar mochila)"
    );

    /* Usamos switch para decidir la acción */
    switch (decision) {
      case "1":
        biblioteca();
        break;
      case "2":
        cuarto();
        break;
      case "3":
        console.log(
          "Mochila: ",
          mochila.length > 0 ? mochila.join(", ") : "Vacía"
        );
        break;
      default:
        console.log("Esa opción no es válida, intenta de nuevo.");
    }

    /*Verificar si tenemos las dos llaves */
    if (mochila.includes("Llave 1") && mochila.includes("Llave 2")) {
      console.log("¡Tenes las dos llaves!");
      console.log(
        "Usas las llaves para abrir la puerta y escapar de la casa..."
      );
      console.log("Lograste salir con vida. ¡Fin de la aventura!");
      jugando = false;
    }
  }
}

/* En la Biblioteca */

function biblioteca() {
  console.log(
    "Entras a la biblioteca. Hay estantes llenos de libros y un pequeño cofre."
  );

  /* Solo agrega el papel si todavía no lo tenías */
  if (!mochila.includes("Papel con contraseña")) {
    console.log(
      "Encontras un papel arrugado en el suelo con una contraseña escrita."
    );
    mochila.push("Papel con contraseña");
    console.log("Has guardado el 'Papel con contraseña' en tu mochila.");
  }

  let usarPapel = prompt("¿Queres usar el papel para abrir el cofre? (si/no)");

  if (
    usarPapel.toLowerCase() === "si" &&
    mochila.includes("Papel con contraseña") &&
    !mochila.includes("Llave 1")
  ) {
    console.log("Usas la contraseña del papel y logras abrir el cofre.");
    console.log("Dentro encuentras la primera llave. 🔑");
    mochila.push("Llave 1");
  } else if (usarPapel.toLowerCase() === "si" && mochila.includes("Llave 1")) {
    console.log("Ya abriste este cofre antes, está vacío.");
  } else {
    console.log(
      "sientes una voz cansada y profunda que te avisa que no vas a salir nunca"
    );
  }
}

/* En el Cuarto */
function cuarto() {
  console.log(
    "Entras a un cuarto con una cama vieja y una mesa de luz con una lampara antigua y rota"
  );

  if (!mochila.includes("Llave 2")) {
    console.log("Abres el cajon de la mesa de luz y encuentras una llave.");
    mochila.push("Llave 2");
  } else {
    console.log("Ya revisaste la mesa de luz, no hay nada mas");
  }
}

iniciarCuento();
