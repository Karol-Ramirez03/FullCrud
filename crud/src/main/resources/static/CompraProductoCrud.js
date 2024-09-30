import { limpiarContenedor } from "./script.js";

const CompraproductosPorPagina = 5;
let paginaActual = 1;

const renderizarPaginacionProductos = (productos, pagina) => {
    const cuerpoProducto = document.querySelector(".tbody-producto");
    cuerpoProducto.innerHTML = "";

    const inicio = (pagina - 1) * CompraproductosPorPagina;
    const fin = inicio + CompraproductosPorPagina;
    const productosPaginados = productos.slice(inicio, fin);

    productosPaginados.forEach(producto => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${producto.compra.id}</td>
            <td>${producto.producto.id}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.total}</td>
            <td>${producto.estado}</td>
        `;
        cuerpoProducto.appendChild(fila);
    });

    document.querySelector('.info-pagina-producto').textContent = `Página ${pagina} de ${Math.ceil(productos.length / CompraproductosPorPagina)}`;
}

const configurarBotonesPaginacionProductos = (productos) => {
    const botonAnterior = document.querySelector(".pagina-anterior-producto");
    const botonSiguiente = document.querySelector(".pagina-siguiente-producto");

    const actualizarEstadoBotones = () => {
        botonAnterior.disabled = paginaActual === 1;
        botonSiguiente.disabled = paginaActual >= Math.ceil(productos.length / CompraproductosPorPagina);
    }

    actualizarEstadoBotones();

    botonAnterior.addEventListener("click", () => {
        if (paginaActual > 1) {
            paginaActual--;
            renderizarPaginacionProductos(productos, paginaActual);
            actualizarEstadoBotones();
        }
    });

    botonSiguiente.addEventListener("click", () => {
        if (paginaActual < Math.ceil(productos.length / CompraproductosPorPagina)) {
            paginaActual++;
            renderizarPaginacionProductos(productos, paginaActual);
            actualizarEstadoBotones();
        }
    });
}

const formAgregarCompraProducto = () => {
    return /* html */ `
        <form class="form-CompraProducto">
            <h1>Agregar Compra Producto</h1>
            <div class="preguntas-container">
                <div class="divpre">
                    <label for="cantidad" class="form-label">cantidad</label>
                    <input type="number" class="form-control" name="cantidad" id="cantidad" required>
                </div>
                <div class="divpre">
                    <label for="total" class="form-label">Total</label>
                    <input type="number" class="form-control" name="total" id="total" required>
                </div>
                <div class="divpre">
                    <label for="estado" class="form-label">estado</label>
                    <input type="text" class="form-control" name="estado" id="estado" required>
                </div>
                <div class="divpre">
                    <label for="idcompra" class="form-label">id compra</label>
                    <input type="number" class="form-control" name="idcompra" id="idcompra" required>
                </div>
                <div class="divpre">
                    <label for="idproducto" class="form-label">id producto</label>
                    <input type="number" class="form-control" name="idproducto" id="idproducto" required>
                </div>
            </div>
            <button class="btn primary botonGuardarConfirm">Enviar</button>
        </form>
    `;
}
const formListarProductos = () => {
    return /* html */ `
        <div class="listar-">
            <h2>Lista de Productos</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>id compra</th>
                        <th>Id producto</th>
                        <th>cantidad</th>
                        <th>total</th>
                        <th>estado</th>
                    </tr>
                </thead>
                <tbody class="tbody-producto"></tbody>
            </table>
            <div class="paginacion-producto">
                <button class="pagina-anterior-producto primary btn">Anterior</button>
                <span class="info-pagina-producto"></span>
                <button class="pagina-siguiente-producto primary btn">Siguiente</button>
            </div>
        </div>
    `;
}

const formEliminarCompraProducto = () => {
    return /* html */ `
        <form class="form-CompraProducto">
            <h1>Eliminar Compra Producto</h1>
            <div class="preguntas-container">
                <div class="divpre">
                    <label for="idcompra" class="form-label">id compra</label>
                    <input type="number" class="form-control" name="idcompra" id="idcompra" required>
                </div>
                <div class="divpre">
                    <label for="idproducto" class="form-label">id producto</label>
                    <input type="number" class="form-control" name="idproducto" id="idproducto" required>
                </div>
            </div>
            <button class="btn primary botondel">Enviar</button>
        </form>
    `;
}
const formActualizarCompraProducto = () => {
    return /* html */ `
        <form class="form-ActualizarCompraProducto">
            <h1>Actualizar Compra Producto</h1>
            <div class="preguntas-container">
                <div class="divpre">
                    <label for="idcompra" class="form-label">ID Compra</label>
                    <input type="number" class="form-control" name="idcompra" id="idcompra" required>
                </div>
                <div class="divpre">
                    <label for="idproducto" class="form-label">ID Producto</label>
                    <input type="number" class="form-control" name="idproducto" id="idproducto" required>
                </div>
                <div class="divpre">
                    <label for="cantidadf" class="form-label">Cantidad</label>
                    <input type="number" class="form-control" name="cantidadf" id="cantidadf" required>
                </div>
                <div class="divpre">
                    <label for="totalf" class="form-label">Total</label>
                    <input type="number" class="form-control" name="totalf" id="totalf" required>
                </div>
                <div class="divpre">
                    <label for="estadof" class="form-label">Estado</label>
                    <input type="text" class="form-control" name="estadof" id="estadof" required>
                </div>
            </div>
            <button class="btn primary botonActualizarConfirm">Actualizar</button>
        </form>
    `;
};

export const crudCompraProducto = (contendorPrincipal) => {

    const botonAgregar = document.querySelector(".agregar");
    const botonEliminar = document.querySelector(".eliminar");
    const botonListar = document.querySelector(".listar");
    const botonActualizar = document.querySelector(".actualizar");

    
    botonAgregar.addEventListener("click", (e) => {
        e.preventDefault()
        limpiarContenedor()
        contendorPrincipal.insertAdjacentHTML("beforeend", formAgregarCompraProducto())
        const form = document.querySelector(".form-CompraProducto");
        const botonGuardar = document.querySelector(".botonGuardarConfirm");

        botonGuardar.addEventListener("click", async (e) => {
            e.preventDefault();
            const formulario = new FormData(form);

            const nuevoProductoCompra = {
                id: {
                    idProducto: formulario.get("idproducto"),
                    idCompra: formulario.get("idcompra"),
		        },
                cantidad: formulario.get("cantidad"),
                total: formulario.get("total"),
                estado: formulario.get("estado")
            };
            
            console.log("Datos a enviar:", nuevoProductoCompra);

            try {
                const response = await fetch("http://localhost:8080/api/compraproducto", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(nuevoProductoCompra)
                });

                if (response.ok) {
                    console.log("Producto Compra agregado exitosamente");
                    form.reset();
                } else {
                    console.error("Error en agregar la data", await response.text());
                }
            } catch (error) {
                console.error('Error de red:', error);
            }
        });
    });


    botonListar.addEventListener("click", async () => {
        limpiarContenedor();
        contendorPrincipal.insertAdjacentHTML("beforeend", formListarProductos());

        try {
            const response = await fetch("http://localhost:8080/api/compraproducto", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const productos = await response.json();
                renderizarPaginacionProductos(productos, paginaActual);
                configurarBotonesPaginacionProductos(productos);
            } else {
                console.error('Error al listar productos:', await response.text());
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    botonEliminar.addEventListener("click", (e) => {
        limpiarContenedor();
        contendorPrincipal.insertAdjacentHTML("beforeend", formEliminarCompraProducto());
        
        const botonEliminarConfirm = document.querySelector(".botondel");
        const formEliminar = document.querySelector(".form-CompraProducto");
        
        botonEliminarConfirm.addEventListener("click", async (e) => {
            e.preventDefault()
            const idcompra = document.querySelector("#idcompra").value;
            const idproducto = document.querySelector("#idproducto").value;
    
            try {
                const response = await fetch(`http://localhost:8080/api/compraproducto/${idcompra}/${idproducto}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
    
                if (response.ok) {
                    console.log('compraproducto eliminada exitosamente');
                    formEliminar.reset(); 
                } else {
                    console.error('Error al eliminar compraproducto:', await response.text());
                }
            } catch (error) {
                console.error('Error:', error);
            }
    
    
        })


    })

    botonActualizar.addEventListener("click", (e) => {
        limpiarContenedor();
        contendorPrincipal.insertAdjacentHTML("beforeend", formActualizarCompraProducto());
        
        const formActualizar = document.querySelector(".form-ActualizarCompraProducto");
        const botonActualizarConfirm = document.querySelector(".botonActualizarConfirm");

        botonActualizarConfirm.addEventListener("click", async (e) => {
            e.preventDefault();
            const formulario = new FormData(formActualizar);
            
            const compraActualizada = {};
            const idCompra = formulario.get("idcompra");
            const idProducto = formulario.get("idproducto");    

            if (formulario.get("idcompra")) compraActualizada.idCompra = formulario.get("idcompra");
            if (formulario.get("idproducto")) compraActualizada.idCompra = formulario.get("idproducto");
            if (formulario.get("cantidadf")) compraActualizada.cantidad = formulario.get("cantidadf");
            if (formulario.get("totalf")) compraActualizada.total = formulario.get("totalf");
            if (formulario.get("estadof")) compraActualizada.estado = formulario.get("estadof");
          
            try {
                const response = await fetch(`http://localhost:8080/api/compraproducto/${idCompra}/${idProducto}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(compraActualizada)
                });

                if (response.ok) {
                    console.log('Compra actualizada exitosamente');
                    formActualizar.reset(); 
                } else {
                    console.error('Error al actualizar compra:', await response.text());
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });


}