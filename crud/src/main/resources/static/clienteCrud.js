import { limpiarContenedor } from "./script.js";

const clientePorPagina = 5;
let paginaActual = 1;
const renderizarPaginacion  = (clientes, pagina) => {
    const cuerpoCliente = document.querySelector(".tbody-cliente")
    cuerpoCliente.innerHTML = "";

    const inicio = (pagina - 1) * clientePorPagina;
    const fin = inicio + clientePorPagina;
    const clientePaginada =clientes.slice(inicio,fin)

    clientePaginada.forEach(cliente => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${cliente.id}</td>
            <td>${cliente.nombre}</td>
            <td>${cliente.apellidos}</td>
            <td>${cliente.celular}</td>
            <td>${cliente.direccion}</td>
            <td>${cliente.correo}</td>
        `;
        cuerpoCliente.appendChild(fila);
        
    });
    document.querySelector('.info-pagina').textContent = `Página ${pagina} de ${Math.ceil(clientes.length / clientePorPagina)}`;
}


const configurarBotonesPaginacion = (clientes) => {
    const botonAnterior = document.querySelector(".pagina-anterior");
    const botonSiguiente = document.querySelector(".pagina-siguiente");

    const actualizarEstadoBotones = () => {
        botonAnterior.disabled = paginaActual === 1;
        botonSiguiente.disabled = paginaActual >= Math.ceil(clientes.length / clientePorPagina);
    }

    actualizarEstadoBotones()

    botonAnterior.addEventListener("click", () => {
        if (paginaActual > 1) {
            paginaActual--;
            renderizarPaginacion(clientes, paginaActual);
            actualizarEstadoBotones();
        }
    });

    botonSiguiente.addEventListener("click", () => {
        if (paginaActual < Math.ceil(clientes.length / clientePorPagina)) {
            paginaActual++;
            renderizarPaginacion(clientes, paginaActual);
            actualizarEstadoBotones();
        }
    });

}


const formListarclientes = () => {
    return /* html */ `
        <div class="listar-">
            <h2>Lista de Clientes</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Celular</th>
                        <th>Dirección</th>
                        <th>Correo</th>
                    </tr>
                </thead>
                <tbody class="tbody-cliente"></tbody>
            </table>
            <div class="paginacion">
                <button class="pagina-anterior primary btn">Anterior</button>
                <span class="info-pagina"></span>
                <button class="pagina-siguiente primary btn">Siguiente</button>
            </div>
        </div>
        <button class="volver primary btn">Volver al inicio</button>
    `;
}









const formAgregarCliente = () =>{
    return /* html */`
        <form class="form-Cliente">
            <h1>Agregar Clientes</h1>
            <div class="preguntas-container">
                <div class="divpre">
                    <label for="idf" class="form-label">id del cliente</label>
                    <input type="text" class="form-control" name="idf" id="idf">
                </div>
                <div class="divpre">
                    <label for="nombref" class="form-label">nombre del cliente</label>
                    <input type="text" class="form-control" name="nombref" id="nombref">
                </div>
                <div class="divpre">
                    <label for="apellidosf" class="form-label">apellidos del cliente</label>
                    <input type="text" class="form-control" name="apellidosf" id="apellidosf">
                </div>
                <div class="divpre">
                    <label for="celularf" class="form-label">celular del cliente</label>
                    <input type="text" class="form-control" name="celularf" id="celularf">
                </div>
                <div class="divpre">
                    <label for="direccionf" class="form-label">direccion del cliente</label>
                    <input type="text" class="form-control" name="direccionf" id="direccionf">
                </div>
                <div class="divpre">
                    <label for="correof" class="form-label">correo del cliente</label>
                    <input type="text" class="form-control" name="correof" id="correof">
                </div>
            </div>
            <div class="container-button">
                <button class="btn primary botonGuardarConfirm">Enviar</button>
                <button class="volver primary btn">Volver al inicio</button>
            </div>
        </form>
    
    `
}

const formEliminarCliente = () => {
    return /* html */ `
        <form class="form-eliminar-Cliente">
            <h1>Eliminar cliente</h1>
            <div class="divpre">
                <label for="formid" class="form-label">ID del cliente a eliminar</label>
                <input type="text" class="form-control" name="formid" id="formid">
            </div>
            <div class="container-button">
                <button class="btn primary botondel">Eliminar</button>
                <button class="volver primary btn">Volver al inicio</button>
            </div>
        </form>
    `;
}

const formActualizarCliente = () => {
    return /* html */`
        <form class="form-actualizar-cliente">
            <h1>Actualizar Clientes</h1>
            <div class="preguntas-container">
                <div class="divpre">
                    <label for="idf" class="form-label">id del cliente</label>
                    <input type="text" class="form-control" name="idf" id="idf">
                </div>
                <div class="divpre">
                    <label for="nombref" class="form-label">nombre del cliente</label>
                    <input type="text" class="form-control" name="nombref" id="nombref">
                </div>
                <div class="divpre">
                    <label for="apellidosf" class="form-label">apellidos del cliente</label>
                    <input type="text" class="form-control" name="apellidosf" id="apellidosf">
                </div>
                <div class="divpre">
                    <label for="celularf" class="form-label">celular del cliente</label>
                    <input type="text" class="form-control" name="celularf" id="celularf">
                </div>
                <div class="divpre">
                    <label for="direccionf" class="form-label">direccion del cliente</label>
                    <input type="text" class="form-control" name="direccionf" id="direccionf">
                </div>
                <div class="divpre">
                    <label for="correof" class="form-label">correo del cliente</label>
                    <input type="text" class="form-control" name="correof" id="correof">
                </div>
            </div>
            <div class="container-button">
                <button class="btn primary botonActualizarConfirm">Actualizar</button>
                <button class="volver primary btn">Volver al inicio</button>
            </div>
        </form>

    `

}

export const crudClientes = (contendorPrincipal) => {
    const botonAgregar = document.querySelector(".agregar");
    const botonEliminar = document.querySelector(".eliminar");
    const botonListar = document.querySelector(".listar");
    const botonActualizar = document.querySelector(".actualizar");
    const botonListarId = document.querySelector(".listarid");

    botonAgregar.addEventListener("click", (e)  => {
        limpiarContenedor();
        contendorPrincipal.insertAdjacentHTML("beforeend", formAgregarCliente())
        const form = document.querySelector(".form-Cliente");
        const botonconfirGuardar = document.querySelector(".botonGuardarConfirm");

        botonconfirGuardar.addEventListener("click", async (e) => {
            e.preventDefault()
            const formulario = new FormData(form);
            const nuevoCliente = {
                id: formulario.get("idf"),
                nombre: formulario.get("nombref"),      
                apellidos: formulario.get("apellidosf"), 
                celular: formulario.get("celularf"),     
                direccion: formulario.get("direccionf"), 
                correo: formulario.get("correof")        
            };
            try {
                const response = await fetch("http://localhost:8080/api/cliente",{
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(nuevoCliente)
                });
                if (response.ok) {
                    console.log('cliente agregada exitosamente');
                    form.reset();
                }
                 else {
                    console.error('Error cliente:', await response.text());
                }
                
            } catch (error) {
                console.error('Error:', error);
            }
        })

    })

    botonEliminar.addEventListener("click", (e) => {
        limpiarContenedor();
        contendorPrincipal.insertAdjacentHTML("beforeend", formEliminarCliente());

        const botonEliminarConfirm = document.querySelector(".botondel");
        const formEliminar = document.querySelector(".form-eliminar-Cliente");

        botonEliminarConfirm.addEventListener("click", async (e) => {
            e.preventDefault();

            const idcliente = document.querySelector("#formid").value;

            try {
                const response = await fetch(`http://localhost:8080/api/cliente/${idcliente}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    console.log('Cliente eliminada exitosamente');
                    formEliminar.reset(); 
                } else {
                    console.error('Error al eliminar Cliente:', await response.text());
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });

    botonActualizar.addEventListener("click", () => {
        limpiarContenedor();
        contendorPrincipal.insertAdjacentHTML("beforeend", formActualizarCliente());
        const formActualizar = document.querySelector(".form-actualizar-cliente");
        const botonActualizarConfirm = document.querySelector(".botonActualizarConfirm");
        botonActualizarConfirm.addEventListener("click", async (e) => {
            e.preventDefault()
            const formulario = new FormData(formActualizar);
            const idCliente = formulario.get("idf");
            const clienteActualizado = {};

            if (formulario.get("idf")) clienteActualizado.id = formulario.get("idf")
            if (formulario.get("nombref")) clienteActualizado.nombre = formulario.get("nombref");
            if (formulario.get("apellidosf")) clienteActualizado.apellidos = formulario.get("apellidosf");
            if (formulario.get("celularf")) clienteActualizado.celular = formulario.get("celularf");
            if (formulario.get("direccionf")) clienteActualizado.direccion = formulario.get("direccionf");
            if (formulario.get("correof")) clienteActualizado.correo = formulario.get("correof");
            try {
                
                const response = await fetch(`http://localhost:8080/api/cliente/${idCliente}`,{
                    method: "PUT",
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(clienteActualizado)
                })
                if (response.ok) {
                    console.log('cliente actualizada exitosamente');
                    formActualizar.reset(); 
                    
                }else {
                    console.error('Error al actualizar Cliente:', await response.text());
                }
            } catch (error) {
                console.error('Error:', error);
            }


        })

    });

    botonListar.addEventListener("click", async () => {
        limpiarContenedor();
        contendorPrincipal.insertAdjacentHTML("beforeend", formListarclientes());

        try {
            const response = await fetch("http://localhost:8080/api/cliente", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const clientes = await response.json();
                renderizarPaginacion(clientes, paginaActual);
                configurarBotonesPaginacion(clientes);
            } else {
                console.error('Error al listar Clientes:', await response.text());
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });




}

