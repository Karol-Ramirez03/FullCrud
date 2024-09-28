import { limpiarContenedor } from "./script.js";


const compraPorPagina = 5;
let paginaActual = 1;

const renderizarPaginacion = (compras, pagina) => {
    const cuerpoCompra = document.querySelector(".tbody-compra");
    cuerpoCompra.innerHTML = "";

    const inicio = (pagina - 1) * compraPorPagina;
    const fin = inicio + compraPorPagina;
    const comprasPaginadas = compras.slice(inicio, fin);

    comprasPaginadas.forEach(compra => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${compra.id}</td>
            <td>${compra.fecha}</td>
            <td>${compra.medio_pago}</td>
            <td>${compra.comentario}</td>
            <td>${compra.estado}</td>
            <td>${compra.cliente.id}</td>
        `;
        cuerpoCompra.appendChild(fila);
    });

    document.querySelector('.info-pagina').textContent = `Página ${pagina} de ${Math.ceil(compras.length / compraPorPagina)}`;
}

const configurarBotonesPaginacion = (compras) => {
    const botonAnterior = document.querySelector(".pagina-anterior");
    const botonSiguiente = document.querySelector(".pagina-siguiente");

    const actualizarEstadoBotones = () => {
        botonAnterior.disabled = paginaActual === 1;
        botonSiguiente.disabled = paginaActual >= Math.ceil(compras.length / compraPorPagina);
    }

    actualizarEstadoBotones();

    botonAnterior.addEventListener("click", () => {
        if (paginaActual > 1) {
            paginaActual--;
            renderizarPaginacion(compras, paginaActual);
            actualizarEstadoBotones();
        }
    });

    botonSiguiente.addEventListener("click", () => {
        if (paginaActual < Math.ceil(compras.length / compraPorPagina)) {
            paginaActual++;
            renderizarPaginacion(compras, paginaActual);
            actualizarEstadoBotones();
        }
    });
}

const formListarCompras = () => {
    return /* html */ `
        <div class="listar-">
            <h2>Lista de Compras</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Medio de Pago</th>
                        <th>Comentario</th>
                        <th>Estado</th>
                        <th>Cliente</th>
                    </tr>
                </thead>
                <tbody class="tbody-compra"></tbody>
            </table>
            <div class="paginacion">
                <button class="pagina-anterior primary btn">Anterior</button>
                <span class="info-pagina"></span>
                <button class="pagina-siguiente primary btn">Siguiente</button>
            </div>
        </div>
    `;
}

const formAgregarCompra = () => {
    return /* html */`
        <form class="form-Compra">
            <h1>Agregar Compras</h1>
            <div class="preguntas-container">
                <div class="divpre">
                    <label for="fecha" class="form-label">Fecha</label>
                    <input type="datetime-local" class="form-control" name="fecha" id="fecha" required>
                </div>
                <div class="divpre">
                    <label for="medio_pago" class="form-label">Medio de Pago</label>
                    <input type="text" class="form-control" name="medio_pago" id="medio_pago" required>
                </div>
                <div class="divpre">
                    <label for="comentario" class="form-label">Comentario</label>
                    <input type="text" class="form-control" name="comentario" id="comentario">
                </div>
                <div class="divpre">
                    <label for="estado" class="form-label">Estado</label>
                    <input type="text" class="form-control" name="estado" id="estado" required>
                </div>
                <div class="divpre">
                    <label for="cliente_id" class="form-label">ID del Cliente</label>
                    <input type="text" class="form-control" name="cliente_id" id="cliente_id" required>
                </div>
            </div>
            <button class="btn primary botonGuardarConfirm">Enviar</button>
        </form>
    `;
}

const formEliminarCompra = () => {
    return /* html */ `
        <form class="form-eliminar-Compra">
            <h1>Eliminar Compra</h1>
            <div class="divpre">
                <label for="formid" class="form-label">ID de la compra a eliminar</label>
                <input type="text" class="form-control" name="formid" id="formid" required>
            </div>
            <button class="btn primary botondel">Eliminar</button>
        </form>
    `;
}

const formActualizarCompra = () => {
    return /* html */ `
        <form class="form-actualizar-compra">
            <h1>Actualizar Compras</h1>
            <div class="preguntas-container">
                <div class="divpre">
                    <label for="idf" class="form-label">ID de la compra</label>
                    <input type="text" class="form-control" name="idf" id="idf" required>
                </div>
                <div class="divpre">
                    <label for="fecha" class="form-label">Nueva Fecha</label>
                    <input type="datetime-local" class="form-control" name="fecha" id="fecha">
                </div>
                <div class="divpre">
                    <label for="medio_pago" class="form-label">Nuevo Medio de Pago</label>
                    <input type="text" class="form-control" name="medio_pago" id="medio_pago">
                </div>
                <div class="divpre">
                    <label for="comentario" class="form-label">Nuevo Comentario</label>
                    <input type="text" class="form-control" name="comentario" id="comentario">
                </div>
                <div class="divpre">
                    <label for="estado" class="form-label">Nuevo Estado</label>
                    <input type="text" class="form-control" name="estado" id="estado">
                </div>
                <div class="divpre">
                    <label for="cliente_id" class="form-label">Nuevo ID del Cliente</label>
                    <input type="text" class="form-control" name="cliente_id" id="cliente_id">
                </div>
            </div>
            <button class="btn primary botonActualizarConfirm">Actualizar</button>
        </form>
    `;
}

export const crudCompras = (contendorPrincipal) => {
    const botonAgregar = document.querySelector(".agregar");
    const botonEliminar = document.querySelector(".eliminar");
    const botonListar = document.querySelector(".listar");
    const botonActualizar = document.querySelector(".actualizar");

    botonListar.addEventListener("click", async () => {
        limpiarContenedor();
        contendorPrincipal.insertAdjacentHTML("beforeend", formListarCompras());

        const response = await fetch("http://localhost:8080/api/compra");
        const compras = await response.json();

        renderizarPaginacion(compras, paginaActual);
        configurarBotonesPaginacion(compras);
    });

    botonAgregar.addEventListener("click", () => {
        limpiarContenedor();
        contendorPrincipal.insertAdjacentHTML("beforeend", formAgregarCompra());
        const form = document.querySelector(".form-Compra");

        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const formulario = new FormData(form);
            const nuevaCompra = {
                fecha: formulario.get("fecha"),
                medio_pago: formulario.get("medio_pago"),
                comentario: formulario.get("comentario"),
                estado: formulario.get("estado"),
                cliente: { id: formulario.get("cliente_id") }
            };

            try {
                const response = await fetch("http://localhost:8080/api/compra", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(nuevaCompra)
                });

                if (response.ok) {
                    console.log('Compra agregada exitosamente');
                    form.reset();
                } else {
                    console.error('Error al agregar compra:', await response.text());
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });

    botonEliminar.addEventListener("click", () => {
        limpiarContenedor();
        contendorPrincipal.insertAdjacentHTML("beforeend", formEliminarCompra());
        const formEliminar = document.querySelector(".form-eliminar-Compra");

        formEliminar.addEventListener("submit", async (e) => {
            e.preventDefault();
            const idCompra = document.querySelector("#formid").value;

            try {
                const response = await fetch(`http://localhost:8080/api/compra/${idCompra}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    console.log('Compra eliminada exitosamente');
                    formEliminar.reset();
                } else {
                    console.error('Error al eliminar compra:', await response.text());
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });

    botonActualizar.addEventListener("click", () => {
        limpiarContenedor();
        contendorPrincipal.insertAdjacentHTML("beforeend", formActualizarCompra());
        const formActualizar = document.querySelector(".form-actualizar-compra");
        const botonActualizarConfirm = document.querySelector(".botonActualizarConfirm");
    
        botonActualizarConfirm.addEventListener("click", async (e) => {
            const formulario = new FormData(formActualizar);
            const idCompra = formulario.get("idf");
            const compraActualizada = {};
    
            if (formulario.get("idf")) compraActualizada.id = formulario.get("idf");
            if (formulario.get("fecha")) compraActualizada.fecha = formulario.get("fecha");
            if (formulario.get("medio_pago")) compraActualizada.medio_pago = formulario.get("medio_pago");
            if (formulario.get("comentario")) compraActualizada.comentario = formulario.get("comentario");
            if (formulario.get("estado")) compraActualizada.estado = formulario.get("estado");
            if (formulario.get("cliente_id")) compraActualizada.cliente = {id: formulario.get("cliente_id")};
          
    
            try {
                const response = await fetch(`http://localhost:8080/api/compra/${idCompra}`, {
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
