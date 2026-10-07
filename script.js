"use strict";

document.addEventListener("DOMContentLoaded", function () {

```
=========================================
   MENÚ HAMBURGUESA
========================================= 

const menuToggle = document.getElementById("menu-toggle");
const navbarMenu = document.getElementById("navbar-menu");

function cerrarMenu() {

    if (!menuToggle || !navbarMenu) {
        return;
    }

    navbarMenu.classList.remove("active");
    menuToggle.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
}


function abrirOCerrarMenu() {

    if (!menuToggle || !navbarMenu) {
        return;
    }

    const abierto = !navbarMenu.classList.contains("active");

    navbarMenu.classList.toggle("active", abierto);
    menuToggle.classList.toggle("active", abierto);

    menuToggle.setAttribute(
        "aria-expanded",
        String(abierto)
    );

    menuToggle.setAttribute(
        "aria-label",
        abierto ? "Cerrar menú" : "Abrir menú"
    );
}


if (menuToggle && navbarMenu) {

    menuToggle.addEventListener(
        "click",
        abrirOCerrarMenu
    );

    /* Cerrar al pulsar un enlace */

    const enlacesMenu =
        navbarMenu.querySelectorAll("a");

    enlacesMenu.forEach(function (enlace) {

        enlace.addEventListener(
            "click",
            cerrarMenu
        );

    });


    /* Cerrar al pulsar fuera del menú */

    document.addEventListener(
        "click",
        function (evento) {

            const clicDentroDelMenu =
                navbarMenu.contains(evento.target);

            const clicEnBoton =
                menuToggle.contains(evento.target);

            if (
                !clicDentroDelMenu &&
                !clicEnBoton &&
                navbarMenu.classList.contains("active")
            ) {
                cerrarMenu();
            }

        }
    );


    /* Cerrar con Escape */

    document.addEventListener(
        "keydown",
        function (evento) {

            if (
                evento.key === "Escape" &&
                navbarMenu.classList.contains("active")
            ) {
                cerrarMenu();
                menuToggle.focus();
            }

        }
    );


    /* Cerrar si cambiamos a escritorio */

    window.addEventListener(
        "resize",
        function () {

            if (window.innerWidth > 992) {
                cerrarMenu();
            }

        }
    );

}


/* =========================================
   BOTÓN VOLVER ARRIBA
========================================= */

const backToTop =
    document.getElementById("back-to-top");


function actualizarBotonArriba() {

    if (!backToTop) {
        return;
    }

    if (window.scrollY > 400) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }
}


if (backToTop) {

    backToTop.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

    window.addEventListener(
        "scroll",
        actualizarBotonArriba,
        { passive: true }
    );

    actualizarBotonArriba();
}


/* =========================================
   AÑO AUTOMÁTICO DEL FOOTER
========================================= */

const currentYear =
    document.getElementById("current-year");

if (currentYear) {
    currentYear.textContent =
        new Date().getFullYear();
}
```

});
