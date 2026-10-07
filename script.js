"use strict";

/* MENÚ HAMBURGUESA */

const menuToggle = document.getElementById("menu-toggle");
const navbarMenu = document.getElementById("navbar-menu");

function cerrarMenu() {
    if (!navbarMenu || !menuToggle) {
        return;
    }

    navbarMenu.classList.remove("active");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
}

function abrirOCerrarMenu() {
    if (!navbarMenu || !menuToggle) {
        return;
    }

    const abierto = navbarMenu.classList.toggle("active");

    menuToggle.classList.toggle("active", abierto);
    menuToggle.setAttribute("aria-expanded", String(abierto));
}

if (menuToggle) {
    menuToggle.addEventListener("click", abrirOCerrarMenu);
}

/* PERFIL */

const perfilContainer = document.getElementById(
    "perfil-dropdown-container"
);

const perfilToggle = document.getElementById("perfil-toggle");
const perfilDropdown = document.getElementById("perfil-dropdown");

function cerrarPerfil() {
    if (!perfilContainer || !perfilToggle) {
        return;
    }

    perfilContainer.classList.remove("open");
    perfilToggle.setAttribute("aria-expanded", "false");
}

function abrirOCerrarPerfil() {
    if (!perfilContainer || !perfilToggle) {
        return;
    }

    const abierto = perfilContainer.classList.toggle("open");

    perfilToggle.setAttribute(
        "aria-expanded",
        String(abierto)
    );
}

if (perfilToggle) {
    perfilToggle.addEventListener(
        "click",
        function (event) {
            event.preventDefault();
            event.stopPropagation();

            abrirOCerrarPerfil();
        }
    );
}

if (perfilDropdown) {
    perfilDropdown.addEventListener(
        "click",
        function (event) {
            event.stopPropagation();
        }
    );
}

document.addEventListener(
    "click",
    function (event) {
        if (
            perfilContainer &&
            !perfilContainer.contains(event.target)
        ) {
            cerrarPerfil();
        }
    }
);

document.addEventListener(
    "keydown",
    function (event) {
        if (event.key === "Escape") {
            cerrarPerfil();
            cerrarMenu();
        }
    }
);

/* CERRAR MENÚ AL PULSAR UN ENLACE */

document.querySelectorAll(
    ".navbar-menu > a"
).forEach(function (enlace) {
    enlace.addEventListener(
        "click",
        function () {
            cerrarMenu();
            cerrarPerfil();
        }
    );
});

document.querySelectorAll(
    ".perfil-opciones a"
).forEach(function (enlace) {
    enlace.addEventListener(
        "click",
        function () {
            cerrarMenu();
            cerrarPerfil();
        }
    );
});

/* CARGAR DATOS DEL USUARIO */

const perfilNombre = document.getElementById(
    "perfil-nombre"
);

const perfilFoto = document.getElementById(
    "perfil-foto"
);

try {
    const datos = localStorage.getItem("usuario");

    if (datos) {
        const usuario = JSON.parse(datos);

        if (
            usuario &&
            usuario.username &&
            perfilNombre
        ) {
            perfilNombre.textContent = usuario.username;
        }

        if (
            usuario &&
            usuario.foto &&
            perfilFoto
        ) {
            perfilFoto.src = usuario.foto;
        }
    }
} catch (error) {
    console.error(
        "No se pudieron cargar los datos del usuario:",
        error
    );
}

/* CERRAR SESIÓN */

const cerrarSesion = document.getElementById(
    "cerrar-sesion"
);

if (cerrarSesion) {
    cerrarSesion.addEventListener(
        "click",
        function (event) {
            event.preventDefault();

            localStorage.removeItem("usuario");

            window.location.href =
                "iniciar_sesion.html";
        }
    );
}
