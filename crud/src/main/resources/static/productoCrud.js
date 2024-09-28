import { limpiarContenedor } from "./script.js";

const productosPorPagina = 5;
let paginaActual = 1;

const renderizarPaginacion = (productos, pagina) => {
    const cuerpoProducto = document.querySelector(".tbody-producto");
    cuerpoProducto.innerHTML = "";

    const inicio = (pagina - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosPaginados = productos.slice(inicio, fin);

    productosPaginados.forEach(producto => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.codigo_barras}</td>
            <td>${producto.precio_venta}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.estado}</td>
            <td>${producto.categoria.id}</td>
        `;
        cuerpoProducto.appendChild(fila);
    });

    document.querySelector('.info-pagina').textContent = `Página ${pagina} de ${Math.ceil(productos.length / productosPorPagina)}`;
}

const configurarBotonesPaginacion = (productos) => {
    const botonAnterior = document.querySelector(".pagina-anterior");
    const botonSiguiente = document.querySelector(".pagina-siguiente");

    const actualizarEstadoBotones = () => {
        botonAnterior.disabled = paginaActual === 1;
        botonSiguiente.disabled = paginaActual >= Math.ceil(productos.length / productosPorPagina);
    }

    actualizarEstadoBotones();

    botonAnterior.addEventListener("click", () => {
        if (paginaActual > 1) {
            paginaActual--;
            renderizarPaginacion(productos, paginaActual);
            actualizarEstadoBotones();
        }
    });

    botonSiguiente.addEventListener("click", () => {
        if (paginaActual < Math.ceil(productos.length / productosPorPagina)) {
            paginaActual++;
            renderizarPaginacion(productos, paginaActual);
            actualizarEstadoBotones();
        }
    });
}

const formListarProductos = () => {
    return /* html */ `
        <div class="listar-">
            <h2>Lista de Productos</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Código de Barras</th>
                        <th>Precio de Venta</th>
                        <th>Cantidad</th>
                        <th>Estado</th>
                        <th>Categoría</th>
                    </tr>
                </thead>
                <tbody class="tbody-producto"></tbody>
            </table>
            <div class="paginacion">
                <button class="pagina-anterior primary btn">Anterior</button>
                <span class="info-pagina"></span>
                <button class="pagina-siguiente primary btn">Siguiente</button>
            </div>
        </div>
    `;
}

const formAgregarProducto = () => {
    return /* html */ `
        <form class="form-Producto">
            <h1>Agregar Producto</h1>
            <div class="preguntas-container">
                <div class="divpre">
                    <label for="nombre" class="form-label">Nombre</label>
                    <input type="text" class="form-control" name="nombre" id="nombre" required>
                </div>
                <div class="divpre">
                    <label for="codigo_barras" class="form-label">Código de Barras</label>
                    <input type="text" class="form-control" name="codigo_barras" id="codigo_barras" required>
                </div>
                <div class="divpre">
                    <label for="precio_venta" class="form-label">Precio de Venta</label>
                    <input type="number" class="form-control" name="precio_venta" id="precio_venta" required>
                </div>
                <div class="divpre">
                    <label for="cantidad" class="form-label">Cantidad</label>
                    <input type="number" class="form-control" name="cantidad" id="cantidad" required>
                </div>
                <div class="divpre">
                    <label for="estado" class="form-label">Estado</label>
                    <input type="text" class="form-control" name="estado" id="estado" required>
                </div>
                <div class="divpre">
                    <label for="categoria_id" class="form-label">ID de la Categoría</label>
                    <input type="text" class="form-control" name="categoria_id" id="categoria_id" required>
                </div>
            </div>
            <button class="btn primary botonGuardarConfirm">Enviar</button>
        </form>
    `;
}

const formEliminarProducto = () => {
    return /* html */ `
        <form class="form-eliminar-Producto">
            <h1>Eliminar Producto</h1>
            <div class="divpre">
                <label for="formid" class="form-label">ID del producto a eliminar</label>
                <input type="text" class="form-control" name="formid" id="formid" required>
            </div>
            <button class="btn primary botondel">Eliminar</button>
        </form>
    `;
}

const formActualizarProducto = () => {
    return /* html */ `
        <form class="form-actualizar-producto">
            <h1>Actualizar Producto</h1>
            <div class="preguntas-container">
                <div class="divpre">
                    <label for="idf" class="form-label">ID del producto</label>
                    <input type="text" class="form-control" name="idf" id="idf" required>
                </div>
                <div class="divpre">
                    <label for="nombref" class="form-label">Nuevo Nombre</label>
                    <input type="text" class="form-control" name="nombref" id="nombre">
                </div>
                <div class="divpre">
                    <label for="codigo_barrasf" class="form-label">Nuevo Código de Barras</label>
                    <input type="text" class="form-control" name="codigo_barrasf" id="codigo_barrasf">
                </div>
                <div class="divpre">
                    <label for="precio_ventaf" class="form-label">Nuevo Precio de Venta</label>
                    <input type="number" class="form-control" name="precio_ventaf" id="precio_ventaf">
                </div>
                <div class="divpre">
                    <label for="cantidadf" class="form-label">Nueva Cantidad</label>
                    <input type="number" class="form-control" name="cantidadf" id="cantidad"f>
                </div>
                <div class="divpre">
                    <label for="estadof" class="form-label">Nuevo Estado</label>
                    <input type="text" class="form-control" name="estadof" id="estadof">
                </div>
                <div class="divpre">
                    <label for="categoria_idf" class="form-label">Nuevo ID de la Categoría</label>
                    <input type="number" class="form-control" name="categoria_idf" id="categoria_id">
                </div>
            </div>
            <button class="btn primary botonActualizarConfirm">Actualizar</button>
        </form>
    `;
}

export const crudProductos = (contendorPrincipal) => {
    const botonAgregar = document.querySelector(".agregar");
    const botonEliminar = document.querySelector(".eliminar");
    const botonListar = document.querySelector(".listar");
    const botonActualizar = document.querySelector(".actualizar");

    botonListar.addEventListener("click", async () => {
        limpiarContenedor();
        contendorPrincipal.insertAdjacentHTML("beforeend", formListarProductos());

        const response = await fetch("http://localhost:8080/api/producto");
        const productos = await response.json();

        renderizarPaginacion(productos, paginaActual);
        configurarBotonesPaginacion(productos);
    });

    botonAgregar.addEventListener("click", () => {
        limpiarContenedor();
        contendorPrincipal.insertAdjacentHTML("beforeend", formAgregarProducto());
        const form = document.querySelector(".form-Producto");

        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const formulario = new FormData(form);
            const nuevoProducto = {
                nombre: formulario.get("nombre"),
                codigo_barras: formulario.get("codigo_barras"),
                precio_venta: parseFloat(formulario.get("precio_venta")),
                cantidad: parseInt(formulario.get("cantidad")),
                estado: formulario.get("estado"),
                categoria: { id: formulario.get("categoria_id") }
            };

            try {
                const response = await fetch("http://localhost:8080/api/producto", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(nuevoProducto)
                });

                if (response.ok) {
                    console.log('Producto agregado exitosamente');
                    form.reset();
                } else {
                    console.error('Error al agregar producto:', await response.text());
                }
            } catch (error) {
                console.error('Error de red:', error);
            }
        });
    });

    botonEliminar.addEventListener("click", () => {
        limpiarContenedor();
        contendorPrincipal.insertAdjacentHTML("beforeend", formEliminarProducto());
        const form = document.querySelector(".form-eliminar-Producto");

        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const idEliminar = document.getElementById("formid").value;

            try {
                const response = await fetch(`http://localhost:8080/api/producto/${idEliminar}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    console.log('Producto eliminado exitosamente');
                    form.reset();
                } else {
                    console.error('Error al eliminar producto:', await response.text());
                }
            } catch (error) {
                console.error('Error de red:', error);
            }
        });
    });



    botonActualizar.addEventListener("click", (e) => {
        limpiarContenedor();
        contendorPrincipal.insertAdjacentHTML("beforeend", formActualizarProducto());
        const formActualizar = document.querySelector(".form-actualizar-producto");
        const botonConfirmarAct = document.querySelector(".botonActualizarConfirm");

        botonConfirmarAct.addEventListener("click", async (e) => {
            e.preventDefault();
            const formulario = new FormData(formActualizar);
            const idProducto = formulario.get("idf");
            const productoActualizado = {};

            if (formulario.get("idf")) productoActualizado.id = formulario.get("idf");
            if (formulario.get("nombref")) productoActualizado.nombre = formulario.get("nombref");
            if (formulario.get("codigo_barrasf")) productoActualizado.codigo_barras = formulario.get("codigo_barrasf");
            if (formulario.get("precio_ventaf")) productoActualizado.precio_venta = formulario.get("precio_ventaf");
            if (formulario.get("cantidadf")) productoActualizado.cantidad = formulario.get("cantidadf");
            if (formulario.get("estadof")) productoActualizado.estado = formulario.get("estadof");
            if (formulario.get("categoria_idf")) productoActualizado.categoria = { id: formulario.get("categoria_idf") };
            console.log("Datos a enviar:", JSON.stringify(productoActualizado));
            try {
                const response = await fetch(`http://localhost:8080/api/producto/${idProducto}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(productoActualizado)
                });

                if (response.ok) {
                    console.log('Producto actualizado exitosamente');
                    formActualizar.reset();
                } else {
                    console.error('Error al actualizar producto:', await response.text());
                }
            } catch (error) {
                console.error('Error de red:', error);
            }
        });
    });
}
