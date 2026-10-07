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

/* Cerrar el menú al pulsar un enlace */

document.querySelectorAll(".navbar-menu > a").forEach(function (enlace) {
    enlace.addEventListener("click", cerrarMenu);
});
