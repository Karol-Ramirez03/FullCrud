import { crudClientes } from "./clienteCrud.js";
import { agregarEventos } from "./categoriaCrud.js";
import { crudCompras } from "./CompraCrud.js";
import { crudProductos } from "./productoCrud.js";
import { crudCompraProducto } from "./CompraProductoCrud.js";

const contendorPrincipal = document.querySelector(".container");
const botonCategorias = document.querySelector(".categoria");
const botonClientes = document.querySelector(".cliente");
const botonCompra = document.querySelector(".compra");
const botonProducto = document.querySelector(".producto");
const botonCompraProducto = document.querySelector(".compra-producto");

const opciones = () => {
    return /* html */ `
        <div class="container-component">
            <h1>GESTION COMPRAS</h1>
            <div class="container-buttons">
                <button class="btn primary agregar">Agregar</button>
                <button class="btn primary eliminar">Eliminar</button>
                <button class="btn primary actualizar">Actualizar</button>
                <button class="btn primary listar">Listar</button>
                <button class="btn primary volver">Volver</button>
            </div>
        </div>
    `;
}

export const limpiarContenedor = () => {
    contendorPrincipal.innerHTML = "";
};

const agregarEventosVolver = () => {
    const botonVolver = document.querySelector(".volver");  
    botonVolver.addEventListener("click", (e) => {
        location.reload(true);
    });

};

botonCategorias.addEventListener("click", () => {
    limpiarContenedor();
    contendorPrincipal.insertAdjacentHTML("beforeend", opciones());
    agregarEventos(contendorPrincipal);
    agregarEventosVolver();
});

botonClientes.addEventListener("click", () => {
    limpiarContenedor();
    contendorPrincipal.insertAdjacentHTML("beforeend", opciones());
    crudClientes(contendorPrincipal);
    agregarEventosVolver();
});

botonCompra.addEventListener("click", () => {
    limpiarContenedor();
    contendorPrincipal.insertAdjacentHTML("beforeend", opciones());
    crudCompras(contendorPrincipal);
    agregarEventosVolver();
});

botonProducto.addEventListener("click", () => {
    limpiarContenedor();
    contendorPrincipal.insertAdjacentHTML("beforeend", opciones())
    crudProductos(contendorPrincipal)
    agregarEventosVolver();
})

botonCompraProducto.addEventListener("click", () => {
    limpiarContenedor();
    contendorPrincipal.insertAdjacentHTML("beforeend", opciones())  
    crudCompraProducto(contendorPrincipal)
    agregarEventosVolver();
})
