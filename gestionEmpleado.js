window.onload = () => {
    getEmployees();
};

// --- Clase empleado ---
class Empleado {
    constructor(id, nombre, apellido, nempleado, puestotr, departamento) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.nempleado = nempleado;
        this.puestotr = puestotr;
        this.departamento = departamento;
    }
}

// Variables globales
var empleados = [];
var listaActiva = [];



// --- Obtener datos ---
function getEmployees() {
    var request = new XMLHttpRequest();

    request.onload = () => {
        const data = JSON.parse(request.response);
        data.forEach((empleadoData) => {
            const empleado = new Empleado(
                empleadoData.id,
                empleadoData.nombre,
                empleadoData.apellido,
                empleadoData.nempleado,
                empleadoData.puestotr,
                empleadoData.departamento
            );
            empleados.push(empleado);
        });
        console.log("empleados", empleados);
    };

    request.open(
        "GET",
        "http://dwtest-02.norwayeast.cloudapp.azure.com/mydata/empleadosda2.json"
    );
    request.setRequestHeader("accept", "text/json");

    request.send();
}



// --- Gestion empleados ---

// Crear empleado
function crearEmpleado() {
    // --- Transformar vista ---
    document.getElementById("tablaEmpleados").innerHTML = "";
    document.getElementById("opcion").innerHTML = "Crear empleado";
    document.getElementById("id").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("nempleado").value = "";
    document.getElementById("puestotr").value = "";
    document.getElementById("departamento").value = "";

    let boton1 = document.getElementById("boton1");
    boton1.value = "Crear";
    boton1.onclick = () => { crearEmpleadoBBDD(); };

    let boton2 = document.getElementById("boton2");
    boton2.value = "Cancelar";
    boton2.onclick = () => { cargarTodos(); };

    let msg = document.getElementById("msg");
    msg.style.display = "block";
    let msg0 = document.createElement("p");
    msg0.innerHTML = "Notas:";
    msg.appendChild(msg0);
    let msg1 = document.createElement("p");
    msg1.innerHTML = "El id se genera automaticamente, si desea asignar uno, rellene el campo id";
    msg.appendChild(msg1);

}

function crearEmpleadoBBDD() {
    // ---- Crear empleado en base de datos ----
    let id = parseInt(document.getElementById("id").value);

    // Limpiar errores
    let msg = document.getElementById("msg");
    let errors = msg.getElementsByClassName("error");
    for (let i = 0; i < errors.length; i++) {
        errors[i].remove();
    }

    if (id == "" || isNaN(id)) {
        id = empleados.length + 1;
    }

    // Check if id is not repeated

    if (empleados.find((emp) => emp.id === id) !== undefined) {
        let msg = document.getElementById("msg");
        let msgError = document.createElement("p");
        msgError.innerHTML = "El empleado con el ID: " + id + " ya existe";
        msgError.className = "error";
        msg.appendChild(msgError);
        return;
    }


    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let nempleado = document.getElementById("nempleado").value;
    let puestotr = document.getElementById("puestotr").value;
    let departamento = document.getElementById("departamento").value;

    // Check no esta vacio
    if (nombre == "" || apellido == "" || nempleado == "" || puestotr == "" || departamento == "") {
        let msg = document.getElementById("msg");
        let msgError = document.createElement("p");
        msgError.innerHTML = "No puede haber campos vacios";
        msgError.className = "error";
        msg.appendChild(msgError);
        return;
    }

    let empleado = new Empleado(id, nombre, apellido, nempleado, puestotr, departamento);

    empleados.push(empleado);

    alert("Empleado [" + nombre + "] creado correctamente");

    cargarTodos();
}


// Eliminar empleado
function eliminarEmpleado() {
    let id = document.getElementById("id").value;

    let index = empleados.findIndex((emp) => emp.id == id);

    if (index != -1) {
        empleados.splice(index, 1);
    }

    alert("Empleado eliminado correctamente");

    cargarTodos();
}


// Modificar empleado
function modificarEmpleado() {
    let id = document.getElementById("id").value;
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let nempleado = document.getElementById("nempleado").value;
    let puestotr = document.getElementById("puestotr").value;
    let departamento = document.getElementById("departamento").value;

    let index = empleados.findIndex((emp) => emp.id == id);

    if (index != -1) {
        empleados[index].nombre = nombre;
        empleados[index].apellido = apellido;
        empleados[index].nempleado = nempleado;
        empleados[index].puestotr = puestotr;
        empleados[index].departamento = departamento;
    }

    alert("Empleado modificado correctamente");

    cargarTodos();
}

function modificar(id) {
    // obtener empleado
    let empleado = empleados.find((emp) => emp.id == id);
    // eliminar tabla
    let tabla = document.getElementById("tablaEmpleados");
    tabla.innerHTML = "";

    let opcion = document.getElementById("opcion");
    opcion.innerHTML = "Modificar empleado";

    // rellenar datos

    let idInput = document.getElementById("id");
    idInput.value = empleado.id;
    let nombreInput = document.getElementById("nombre");
    nombreInput.value = empleado.nombre;
    let apellidoInput = document.getElementById("apellido");
    apellidoInput.value = empleado.apellido;
    let nempleadoInput = document.getElementById("nempleado");
    nempleadoInput.value = empleado.nempleado;
    let puestotrInput = document.getElementById("puestotr");
    puestotrInput.value = empleado.puestotr;
    let departamentoInput = document.getElementById("departamento");
    departamentoInput.value = empleado.departamento;

    // cambiar boton
    let boton = document.getElementById("boton1");
    boton.value = "Modificar";
    boton.onclick = () => { modificarEmpleado(); };

    let boton2 = document.getElementById("boton2");
    boton2.value = "Eliminar";
    boton2.onclick = () => { eliminarEmpleado(); };


}



// --- Tabla empleados ---

// Restablecer campos de la vista
function limpiarCamposBusqueda() {
    let id = document.getElementById("id");
    id.value = "";
    let nombre = document.getElementById("nombre");
    nombre.value = "";
    let apellido = document.getElementById("apellido");
    apellido.value = "";
    let nempleado = document.getElementById("nempleado");
    nempleado.value = "";
    let puestotr = document.getElementById("puestotr");
    puestotr.value = "";
    let departamento = document.getElementById("departamento");
    departamento.value = "";
    let boton1 = document.getElementById("boton1");
    boton1.value = "Buscar";
    boton1.onclick = () => { buscarEmpleado(); };
    let boton2 = document.getElementById("boton2");
    boton2.value = "Crear";
    boton2.onclick = () => { crearEmpleado(); };
    let opcion = document.getElementById("opcion");
    opcion.innerHTML = "Buscar empleado";
    let msg = document.getElementById("msg");
    msg.innerHTML = "";
    msg.style.display = "none";
}

// Crear tabla con todos los empleados
function cargarTodos() {
    crearTabla(empleados);
}

// Crear tabla con los empleados de la lista pasada por parametro
function crearTabla(lista) {
    limpiarCamposBusqueda();

    let tabla = document.getElementById("tablaEmpleados");

    listaActiva = lista;

    tabla.innerHTML = "";

    let thead = document.createElement("thead");
    let tr = document.createElement("tr");

    let thId = document.createElement("th");
    thId.onclick = () => { ordenarPorId(); };
    thId.innerHTML = "ID";

    let thNombre = document.createElement("th");
    thNombre.onclick = () => { ordenarPorNombre(); };
    thNombre.innerHTML = "Nombre";

    let thApellido = document.createElement("th");
    thApellido.onclick = () => { ordenarPorApellido(); };
    thApellido.innerHTML = "Apellido";

    let thNempleado = document.createElement("th");
    thNempleado.onclick = () => { ordenarPorNempleado(); };
    thNempleado.innerHTML = "Nº Empleado";

    let thPuestotr = document.createElement("th");
    thPuestotr.onclick = () => { ordenarPorPuestotr(); };
    thPuestotr.innerHTML = "Puesto";

    let thDepartamento = document.createElement("th");
    thDepartamento.onclick = () => { ordenarPorDepartamento(); };
    thDepartamento.innerHTML = "Departamento";

    let thModificar = document.createElement("th");
    thModificar.innerHTML = "";

    tr.appendChild(thId);
    tr.appendChild(thNombre);
    tr.appendChild(thApellido);
    tr.appendChild(thNempleado);
    tr.appendChild(thPuestotr);
    tr.appendChild(thDepartamento);
    tr.appendChild(thModificar);

    thead.appendChild(tr);

    tabla.appendChild(thead);

    let tbody = document.createElement("tbody");

    lista.forEach((data) => {
        let tr = document.createElement("tr");

        let tdId = document.createElement("td");
        tdId.innerHTML = data.id;

        let tdNombre = document.createElement("td");
        tdNombre.innerHTML = data.nombre;

        let tdApellido = document.createElement("td");
        tdApellido.innerHTML = data.apellido;

        let tdNempleado = document.createElement("td");
        tdNempleado.innerHTML = data.nempleado;

        let tdPuestotr = document.createElement("td");
        tdPuestotr.innerHTML = data.puestotr;

        let tdDepartamento = document.createElement("td");
        tdDepartamento.innerHTML = data.departamento;

        let tdModificar = document.createElement("td");
        tdModificar.innerHTML = `<button onclick="modificar(${data.id})">✏️</button>`;


        tr.appendChild(tdId);
        tr.appendChild(tdNombre);
        tr.appendChild(tdApellido);
        tr.appendChild(tdNempleado);
        tr.appendChild(tdPuestotr);
        tr.appendChild(tdDepartamento);
        tr.appendChild(tdModificar);

        tbody.appendChild(tr);
    });

    tabla.appendChild(tbody);



}



// --- Ordenar tabla ---

var sortBool = true;

function ordenarPorId() {
    if (sortBool) {
        listaActiva.sort((a, b) => a.id - b.id);
        sortBool = false;
    } else {
        listaActiva.sort((a, b) => b.id - a.id);
        sortBool = true;
    }
    crearTabla(listaActiva);
}

function ordenarPorNombre() {
    if (sortBool) {
        listaActiva.sort((a, b) => a.nombre.localeCompare(b.nombre));
        sortBool = false;
    } else {
        listaActiva.sort((a, b) => b.nombre.localeCompare(a.nombre));
        sortBool = true;
    }
    crearTabla(listaActiva);
}

function ordenarPorApellido() {
    if (sortBool) {
        listaActiva.sort((a, b) => a.apellido.localeCompare(b.apellido));
        sortBool = false;
    } else {
        listaActiva.sort((a, b) => b.apellido.localeCompare(a.apellido));
        sortBool = true;
    }
    crearTabla(listaActiva);
}

function ordenarPorNempleado() {
    if (sortBool) {
        listaActiva.sort((a, b) => a.nempleado.localeCompare(b.nempleado));
        sortBool = false;
    } else {
        listaActiva.sort((a, b) => b.nempleado.localeCompare(a.nempleado));
        sortBool = true;
    }
    crearTabla(listaActiva);
}

function ordenarPorPuestotr() {
    if (sortBool) {
        listaActiva.sort((a, b) => a.puestotr.localeCompare(b.puestotr));
        sortBool = false;
    } else {
        listaActiva.sort((a, b) => b.puestotr.localeCompare(a.puestotr));
        sortBool = true;
    }
    crearTabla(listaActiva);
}

function ordenarPorDepartamento() {
    if (sortBool) {
        listaActiva.sort((a, b) => a.departamento.localeCompare(b.departamento));
        sortBool = false;
    } else {
        listaActiva.sort((a, b) => b.departamento.localeCompare(a.departamento));
        sortBool = true;
    }
    crearTabla(listaActiva);
}


// --- Buscar empleado ---

function buscarEmpleado() {
    let id = document.getElementById("id").value.toLowerCase();
    let nombre = document.getElementById("nombre").value.toLowerCase();
    let apellido = document.getElementById("apellido").value.toLowerCase();
    let nempleado = document.getElementById("nempleado").value.toLowerCase();
    let puestotr = document.getElementById("puestotr").value.toLowerCase();
    let departamento = document.getElementById("departamento").value.toLowerCase();

    let listaFiltrada = empleados.filter((emp) => {
        return (
            (emp.id.toString() === id || id === "") &&
            (emp.nombre.toLowerCase().includes(nombre) || nombre === "") &&
            (emp.apellido.toLowerCase().includes(apellido) || apellido === "") &&
            (emp.nempleado.toString().toLowerCase().includes(nempleado) || nempleado === "") &&
            (emp.puestotr.toLowerCase().includes(puestotr) || puestotr === "") &&
            (emp.departamento.toLowerCase().includes(departamento) || departamento === "")
        );
    });

    crearTabla(listaFiltrada);
}

function buscarEmpleadoExacto() {
    let id = document.getElementById("id").value.toLowerCase();
    let nombre = document.getElementById("nombre").value.toLowerCase();
    let apellido = document.getElementById("apellido").value.toLowerCase();
    let nempleado = document.getElementById("nempleado").value.toLowerCase();
    let puestotr = document.getElementById("puestotr").value.toLowerCase();
    let departamento = document.getElementById("departamento").value.toLowerCase();

    let listaFiltrada = empleados.filter((emp) => {
        return (
            (emp.id.toString().toLowerCase() === id || id === "") &&
            (emp.nombre.toLowerCase() === nombre || nombre === "") &&
            (emp.apellido.toLowerCase() === apellido || apellido === "") &&
            (emp.nempleado.toString().toLowerCase() === nempleado || nempleado === "") &&
            (emp.puestotr.toLowerCase() === puestotr || puestotr === "") &&
            (emp.departamento.toLowerCase() === departamento || departamento === "")
        );
    });

    crearTabla(listaFiltrada);
}
