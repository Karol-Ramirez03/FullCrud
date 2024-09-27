const contendorPrincipal = document.querySelector(".container");
const botonCategorias = document.querySelector(".categoria");
const botonClientes = document.querySelector(".cliente");

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

const formAgregarCategorias = () => {
    return /* html */ `
        <form class="form-categoria">
            <div class="nameform">
                <label for="desc" class="form-label">Descripción de la categoría</label>
                <input type="text" class="form-control" name="desc" id="desc">
            </div>
            <div class="estadoform">
                <label for="estado" class="form-label">Estado de la categoría</label>
                <input type="text" class="form-control" name="estado" id="estado">
            </div>
            <button class="btn primary botonGuardarConfirm">Enviar</button>
        </form>
    `;
}

const formEliminarCategoria = () => {
    return /* html */ `
        <form class="form-eliminar-categoria">
            <div class="idform">
                <label for="formid" class="form-label">ID de la categoría a eliminar</label>
                <input type="text" class="form-control" name="formid" id="formid">
            </div>
            <button class="btn primary botondel">Eliminar</button>
        </form>
    `;
}

const formListarCategorias = () => {
    return /* html */ `
        <div class="listar-categorias">
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
        </div>
    `;
}


const formActualizarCategoria = () => {
    return /* html */ `
        <form class="form-actualizar-categoria">
            <div class="idform">
                <label for="formid" class="form-label">ID de la categoría a actualizar</label>
                <input type="text" class="form-control" name="formid" id="formid" required>
            </div>
            <div class="nameform">
                <label for="desc" class="form-label">Nueva descripción de la categoría</label>
                <input type="text" class="form-control" name="desc" id="desc" required>
            </div>
            <div class="estadoform">
                <label for="estado" class="form-label">Nuevo estado de la categoría</label>
                <input type="text" class="form-control" name="estado" id="estado" required>
            </div>
            <button class="btn primary botonActualizarConfirm">Actualizar</button>
        </form>
    `;
};

const limpiarContenedor = () => {
    contendorPrincipal.innerHTML = "";
};

const agregarEventos = () => {
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
                    console.log('Category added successfully');
                    form.reset(); 
                } else {
                    console.error('Error adding category:', await response.text());
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

        const tbodyCategorias = document.querySelector(".tbody-categorias");

        try {
            const response = await fetch("http://localhost:8080/api/categoria", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const categorias = await response.json();
                categorias.forEach(categoria => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${categoria.id}</td>
                        <td>${categoria.nombre}</td>
                        <td>${categoria.estado}</td>
                    `;
                    tbodyCategorias.appendChild(row);
                });
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
                estado: formulario.get("estado")
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


botonCategorias.addEventListener("click", () => {
    limpiarContenedor();
    contendorPrincipal.insertAdjacentHTML("beforeend", opciones());
    agregarEventos();
});


botonClientes.addEventListener("click", () => {
    limpiarContenedor();
    contendorPrincipal.innerHTML = "<h1>Gestión de Clientes</h1>";
});
