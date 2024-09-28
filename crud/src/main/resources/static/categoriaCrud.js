import { limpiarContenedor } from "./script.js";

const formAgregarCategorias = () => {
    return /* html */ `
        <form class="form-categoria">
            <h1>Agregar categorias</h1>
            <div class="preguntas-container">
                <div class="divpre">
                    <label for="desc" class="form-label">Descripción de la categoría</label>
                    <input type="text" class="form-control" name="desc" id="desc">
                </div>
                <div class="divpre">
                    <label for="estado" class="form-label">Estado de la categoría</label>
                    <input type="text" class="form-control" name="estado" id="estado">
                </div>
            </div>
            <button class="btn primary botonGuardarConfirm">Enviar</button>
        </form>
    `;
}

const formEliminarCategoria = () => {
    return /* html */ `
        <form class="form-eliminar-categoria">
            <h1>Eliminar categorias</h1>
            <div class="divpre">
                <label for="formid" class="form-label">ID de la categoría a eliminar</label>
                <input type="text" class="form-control" name="formid" id="formid">
            </div>
            <button class="btn primary botondel">Eliminar</button>
        </form>
    `;
}

const categoriasPorPagina = 5; 
let paginaActual = 1;

const renderizarTablaConPaginacion = (categorias, pagina) => {
    const cuerpoCategorias = document.querySelector(".tbody-categorias");
    cuerpoCategorias.innerHTML = ''; 

    const inicio = (pagina - 1) * categoriasPorPagina;
    const fin = inicio + categoriasPorPagina;
    const categoriasPaginadas = categorias.slice(inicio, fin);

    categoriasPaginadas.forEach(categoria => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${categoria.id}</td>
            <td>${categoria.nombre}</td>
            <td>${categoria.estado}</td>
        `;
        cuerpoCategorias.appendChild(fila);
    });

    document.querySelector('.info-pagina').textContent = `Página ${pagina} de ${Math.ceil(categorias.length / categoriasPorPagina)}`;
};

const configurarBotonesPaginacion = (categorias) => {
    const botonAnterior = document.querySelector(".pagina-anterior");
    const botonSiguiente = document.querySelector(".pagina-siguiente");

    const actualizarEstadoBotones = () => {
        botonAnterior.disabled = paginaActual === 1;
        botonSiguiente.disabled = paginaActual >= Math.ceil(categorias.length / categoriasPorPagina);
    };

    actualizarEstadoBotones();

    botonAnterior.addEventListener("click", () => {
        if (paginaActual > 1) {
            paginaActual--;
            renderizarTablaConPaginacion(categorias, paginaActual);
            actualizarEstadoBotones();
        }
    });

    botonSiguiente.addEventListener("click", () => {
        if (paginaActual < Math.ceil(categorias.length / categoriasPorPagina)) {
            paginaActual++;
            renderizarTablaConPaginacion(categorias, paginaActual);
            actualizarEstadoBotones();
        }
    });
};

const formListarCategorias = () => {
    return /* html */ `
        <div class="listar-">
            <h2>Lista de Categorías</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody class="tbody-categorias"></tbody>
            </table>
            <div class="paginacion">
                <button class="pagina-anterior primary btn">Anterior</button>
                <span class="info-pagina"></span>
                <button class="pagina-siguiente primary btn">Siguiente</button>
            </div>
        </div>
    `;
}


const formActualizarCategoria = () => {
    return /* html */ `
        <form class="form-actualizar-categoria">
            <h1>Actualizar categorias</h1>
            <div class="preguntas-container">
                    <div class="divpre">
                        <label for="formid" class="form-label">ID de la categoría a actualizar</label>
                        <input type="text" class="form-control" name="formid" id="formid" required>
                    </div>
                    <div class="divpre">
                        <label for="desc" class="form-label">Nueva descripción de la categoría</label>
                        <input type="text" class="form-control" name="desc" id="desc" required>
                    </div>
                    <div class="divpre">
                        <label for="estadof" class="form-label">Nuevo estado de la categoría</label>
                        <input type="text" class="form-control" name="estadof" id="estadof" required>
                    </div>
                    
            </div>
            <button class="btn primary botonActualizarConfirm">Actualizar</button>
        </form>
    `;
};



export const agregarEventos = (contendorPrincipal) => {
    const botonAgregar = document.querySelector(".agregar");
    const botonEliminar = document.querySelector(".eliminar");
    const botonListar = document.querySelector(".listar");
    const botonActualizar = document.querySelector(".actualizar");
    const botonListarId = document.querySelector(".listarid");

    
    botonAgregar.addEventListener("click", () => {
        limpiarContenedor();
        contendorPrincipal.insertAdjacentHTML("beforeend", formAgregarCategorias());
        
        const botonconfirGuardar = document.querySelector(".botonGuardarConfirm");
        const form = document.querySelector(".form-categoria");

        botonconfirGuardar.addEventListener("click", async (e) => {
            e.preventDefault();

            const formulario = new FormData(form);
            const nuevaCategoria = {
                nombre: formulario.get("desc"),
                estado: formulario.get("estado")
            };

            try {
                const response = await fetch("http://localhost:8080/api/categoria", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(nuevaCategoria) 
                });

                if (response.ok) {
                    console.log('Categoría agregada exitosamente');
                    form.reset();
                }
                 else {
                    console.error('Error en añadir categoria:', await response.text());
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });



    botonEliminar.addEventListener("click", () => {
        limpiarContenedor();
        contendorPrincipal.insertAdjacentHTML("beforeend", formEliminarCategoria());

        const botonEliminarConfirm = document.querySelector(".botondel");
        const formEliminar = document.querySelector(".form-eliminar-categoria");

        botonEliminarConfirm.addEventListener("click", async (e) => {
            e.preventDefault();

            const idCategoria = document.querySelector("#formid").value;

            try {
                const response = await fetch(`http://localhost:8080/api/categoria/${idCategoria}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    console.log('Categoría eliminada exitosamente');
                    formEliminar.reset(); 
                } else {
                    console.error('Error al eliminar categoría:', await response.text());
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });


    botonListar.addEventListener("click", async () => {
        limpiarContenedor();
        contendorPrincipal.insertAdjacentHTML("beforeend", formListarCategorias());

        try {
            const response = await fetch("http://localhost:8080/api/categoria", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const categorias = await response.json();
                renderizarTablaConPaginacion(categorias, paginaActual);
                configurarBotonesPaginacion(categorias);
            } else {
                console.error('Error al listar categorías:', await response.text());
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    botonActualizar.addEventListener("click", () => {
        limpiarContenedor();
        contendorPrincipal.insertAdjacentHTML("beforeend", formActualizarCategoria());

        const botonActualizarConfirm = document.querySelector(".botonActualizarConfirm");
        const formActualizar = document.querySelector(".form-actualizar-categoria");

        botonActualizarConfirm.addEventListener("click", async (e) => {
            e.preventDefault();
            const formulario = new FormData(formActualizar);
            const idCategoria = formulario.get("formid");
            const categoriaActualizada = {
                nombre: formulario.get("desc"),
                estado: formulario.get("estadof")
            };

            try {
                const response = await fetch(`http://localhost:8080/api/categoria/${idCategoria}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(categoriaActualizada)
                });

                if (response.ok) {
                    console.log('Categoría actualizada exitosamente');
                    formActualizar.reset(); 
                } else {
                    console.error('Error al actualizar categoría:', await response.text());
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });


    
};

