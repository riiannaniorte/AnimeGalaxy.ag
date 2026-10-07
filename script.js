"use strict";

/* =========================================
   ELEMENTOS
========================================= */

const menu = document.getElementById("navbar-menu");
const menuToggle = document.querySelector(".menu-toggle");

const perfilContainer = document.getElementById(
    "perfil-dropdown-container"
);

const perfilToggle = document.getElementById("perfil-toggle");
const perfilDropdown = document.getElementById("perfil-dropdown");

/* =========================================
   MENÚ HAMBURGUESA
========================================= */

function cerrarMenu() {
    if (!menu || !menuToggle) {
        return;
    }

    menu.classList.remove("active");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
}

function toggleMenu() {
    if (!menu || !menuToggle) {
        return;
    }

    const abierto = menu.classList.toggle("active");

    menuToggle.classList.toggle("active", abierto);
    menuToggle.setAttribute("aria-expanded", String(abierto));

    if (!abierto) {
        cerrarPerfil();
    }
}

if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
}

/* =========================================
   PERFIL
========================================= */

function abrirPerfil() {
    if (!perfilContainer || !perfilToggle) {
        return;
    }

    perfilContainer.classList.add("open");
    perfilToggle.setAttribute("aria-expanded", "true");
}

function cerrarPerfil() {
    if (!perfilContainer || !perfilToggle) {
        return;
    }

    perfilContainer.classList.remove("open");
    perfilToggle.setAttribute("aria-expanded", "false");
}

if (perfilToggle) {
    perfilToggle.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        const abierto = perfilContainer.classList.contains("open");

        if (abierto) {
            cerrarPerfil();
        } else {
            abrirPerfil();
        }
    });
}

/* Cerrar al hacer clic fuera */
document.addEventListener("click", function (event) {
    if (
        perfilContainer &&
        !perfilContainer.contains(event.target)
    ) {
        cerrarPerfil();
    }
});

/* Evitar que un clic dentro cierre el perfil */
if (perfilDropdown) {
    perfilDropdown.addEventListener("click", function (event) {
        event.stopPropagation();
    });
}

/* Cerrar con Escape */
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        cerrarPerfil();
        cerrarMenu();
    }
});

/* =========================================
   CERRAR MENÚ AL USAR ENLACES
========================================= */

document.querySelectorAll(".navbar-menu > a").forEach(function (link) {
    link.addEventListener("click", function () {
        cerrarMenu();
        cerrarPerfil();
    });
});

document.querySelectorAll(".perfil-opciones a").forEach(function (link) {
    link.addEventListener("click", function () {
        cerrarMenu();
        cerrarPerfil();
    });
});

/* =========================================
   DATOS DEL USUARIO
========================================= */

const perfilNombre = document.getElementById("perfil-nombre");
const perfilFoto = document.getElementById("perfil-foto");

try {
    const datos = localStorage.getItem("usuario");

    if (datos) {
        const usuario = JSON.parse(datos);

        if (usuario && usuario.username && perfilNombre) {
            perfilNombre.textContent = usuario.username;
        }

        if (usuario && usuario.foto && perfilFoto) {
            perfilFoto.src = usuario.foto;
        }
    }
} catch (error) {
    console.error(
        "Error al cargar los datos del usuario:",
        error
    );
}

/* =========================================
   CERRAR SESIÓN
========================================= */

const btnCerrarSesion = document.getElementById("cerrar-sesion");

if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", function (event) {
        event.preventDefault();

        localStorage.removeItem("usuario");
        window.location.href = "iniciar_sesion.html";
    });
}