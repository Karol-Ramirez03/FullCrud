import { crudClientes } from "./clienteCrud.js";
import { agregarEventos } from "./categoriaCrud.js";
import { crudCompras } from "./CompraCrud.js";
import { crudProductos } from "./productoCrud.js";

const contendorPrincipal = document.querySelector(".container");
const botonCategorias = document.querySelector(".categoria");
const botonClientes = document.querySelector(".cliente");
const botonCompra = document.querySelector(".compra");
const botonProducto = document.querySelector(".producto")

const opciones = () => {
    return /* html */ `
        <div class="container-component">
            <h1>GESTION COMPRAS</h1>
            <div class="container-buttons">
                <button class="btn primary agregar">Agregar</button>
                <button class="btn primary eliminar">Eliminar</button>
                <button class="btn primary actualizar">Actualizar</button>
                <button class="btn primary listar">Listar</button>
                <button class="btn primary listarid">Listar Por Id</button>
                <button class="btn primary volver">Volver</button>
            </div>
        </div>
    `;
}

export const limpiarContenedor = () => {
    contendorPrincipal.innerHTML = "";
};

botonCategorias.addEventListener("click", () => {
    limpiarContenedor();
    contendorPrincipal.insertAdjacentHTML("beforeend", opciones());
    agregarEventos(contendorPrincipal);
});

botonClientes.addEventListener("click", () => {
    limpiarContenedor();
    contendorPrincipal.insertAdjacentHTML("beforeend", opciones());
    crudClientes(contendorPrincipal);
});

botonCompra.addEventListener("click", () => {
    limpiarContenedor();
    contendorPrincipal.insertAdjacentHTML("beforeend", opciones());
    crudCompras(contendorPrincipal);
});

botonProducto.addEventListener("click", () => {
    limpiarContenedor();
    contendorPrincipal.insertAdjacentHTML("beforeend", opciones())
    crudProductos(contendorPrincipal)
})
