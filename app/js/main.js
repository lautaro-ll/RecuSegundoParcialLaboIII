var Main = /** @class */ (function () {
    function Main() {
        this.localStorage = window.localStorage;
        this.listaClientes = new Array();
        this.utils = new Utils();
    }
    //MANEJADOR DE LOS EVENTOS
    Main.prototype.handleEvent = function (event) {
        event.preventDefault();
        var node = event.target;
        switch (node.id) {
            case "btnAlta":
                this.displayForm(true);
                break;
            case "btnLimpiar":
                this.LimpiarLocalStorage();
                break;
            case "btnCerrar":
                this.displayForm(false);
                break;
            case "btnCerrar2":
                this.displayForm(false);
                break;
            case "btnAgregar":
                this.AgregarUno();
                break;
            case "aplicaFiltro":
                this.FiltrarPorSexo();
                break;
            case "btnPromedio":
                this.CalcularPromedio();
                break;
            case "chbId":
                this.AgregarATabla(this.listaClientes);
                break;
            case "chbNombre":
                this.AgregarATabla(this.listaClientes);
                break;
            case "chbApellido":
                this.AgregarATabla(this.listaClientes);
                break;
            case "chbEdad":
                this.AgregarATabla(this.listaClientes);
                break;
            default:
                break;
        }
    };
    Main.prototype.PushearUno = function (id) {
        var nombre = document.getElementById("inputNombre").value;
        var apellido = document.getElementById("inputApellido").value;
        var edad = document.getElementById("inputEdad").value;
        var sexo = document.getElementById("selectSexo").value;
        if (sexo == "Masculino") {
            var cliente = new Cliente(id, nombre, apellido, parseInt(edad), Sexo.Masculino);
            this.listaClientes.push(cliente);
        }
        else {
            var cliente = new Cliente(id, nombre, apellido, parseInt(edad), Sexo.Femenino);
            this.listaClientes.push(cliente);
        }
    };
    Main.prototype.AgregarUno = function () {
        var id = 1;
        if (this.listaClientes.length != 0) {
            var cliente = this.listaClientes;
            id = cliente.reduce(function (last, i) {
                if (i.id >= last) {
                    return i.id + 1;
                }
                return last;
            }, 0);
            if (id == 0) {
                id + 1;
            }
        }
        this.PushearUno(id);
        this.AgregarATabla(this.listaClientes);
        this.displayForm(false);
    };
    Main.prototype.EliminarUno = function (id) {
        this.listaClientes.splice(id, 1);
        this.AgregarATabla(this.listaClientes);
    };
    Main.prototype.CargarForm = function (id) {
        this.listaClientes[id];
        document.getElementById("inputNombre").value = this.listaClientes[id].nombre;
        document.getElementById("inputApellido").value = this.listaClientes[id].apellido;
        document.getElementById("inputEdad").value = String(this.listaClientes[id].edad);
        if (this.listaClientes[id].sexo == Sexo.Masculino) {
            document.getElementById("selectSexo").value = "Masculino";
        }
        else {
            document.getElementById("selectSexo").value = "Femenino";
        }
        this.displayForm(true);
    };
    Main.prototype.LimpiarLocalStorage = function () {
        localStorage.clear();
    };
    Main.prototype.AgregarATabla = function (listaClientes) {
        var _this = this;
        var nombre = '';
        var apellido = '';
        var edad;
        var id;
        var sexo = '';
        var tbody = this.utils.$("tbody");
        var trheader = this.utils.$("trhead");
        var chbId = this.utils.$("chbId");
        var chbNombre = this.utils.$("chbNombre");
        var chbApellido = this.utils.$("chbApellido");
        var chbEdad = this.utils.$("chbEdad");
        while (trheader.lastChild) {
            trheader.removeChild(trheader.lastChild);
        }
        while (tbody.lastChild) {
            tbody.removeChild(tbody.lastChild);
        }
        if (chbId.checked) {
            var th1 = document.createElement("th");
            th1.innerText = "Id";
            trheader.appendChild(th1);
        }
        if (chbNombre.checked) {
            var th2 = document.createElement("th");
            th2.innerText = "Nombre";
            trheader.appendChild(th2);
        }
        if (chbApellido.checked) {
            var th3 = document.createElement("th");
            th3.innerText = "Apellido";
            trheader.appendChild(th3);
        }
        if (chbEdad.checked) {
            var th4 = document.createElement("th");
            th4.innerText = "Edad";
            trheader.appendChild(th4);
        }
        var th5 = document.createElement("th");
        th5.innerText = "Sexo";
        trheader.appendChild(th5);
        var th6 = document.createElement("th");
        th6.innerText = "Accion";
        trheader.appendChild(th6);
        var _loop_1 = function (cliente) {
            id = cliente.id;
            nombre = cliente.nombre;
            apellido = cliente.apellido;
            edad = cliente.edad;
            if (cliente.sexo == Sexo.Masculino) {
                sexo = "Masculino";
            }
            else {
                sexo = "Femenino";
            }
            var btnEliminar = document.createElement('input');
            btnEliminar.type = 'button';
            btnEliminar.className = 'btnEliminar';
            btnEliminar.value = "Eliminar";
            btnEliminar.onclick = function () {
                _this.EliminarUno(listaClientes.indexOf(cliente));
            };
            var tr = document.createElement("tr");
            tr.onclick = function () {
                _this.CargarForm(listaClientes.indexOf(cliente));
            };
            if (chbId.checked) {
                var td1 = document.createElement("td");
                var tnId = document.createTextNode(id);
                td1.appendChild(tnId);
                tr.appendChild(td1);
            }
            if (chbNombre.checked) {
                var td2 = document.createElement("td");
                var tnNombre = document.createTextNode(nombre);
                td2.appendChild(tnNombre);
                tr.appendChild(td2);
            }
            if (chbApellido.checked) {
                var td3 = document.createElement("td");
                var tnApellido = document.createTextNode(apellido);
                td3.appendChild(tnApellido);
                tr.appendChild(td3);
            }
            if (chbEdad.checked) {
                var td4 = document.createElement("td");
                var tnEdad = document.createTextNode(edad);
                td4.appendChild(tnEdad);
                tr.appendChild(td4);
            }
            var td5 = document.createElement("td");
            var tnSexo = document.createTextNode(sexo);
            td5.appendChild(tnSexo);
            tr.appendChild(td5);
            var td6 = document.createElement("td");
            td6.appendChild(btnEliminar);
            tr.appendChild(td6);
            tbody.appendChild(tr);
        };
        for (var _i = 0, listaClientes_1 = listaClientes; _i < listaClientes_1.length; _i++) {
            var cliente = listaClientes_1[_i];
            _loop_1(cliente);
        }
    };
    Main.prototype.displayForm = function (display) {
        if (display) {
            this.utils.$("formContainer").hidden = false;
        }
        else {
            this.utils.$("formContainer").hidden = true;
        }
    };
    /*
      public FiltrarPorSexo() :void {
        let tipo = (<HTMLInputElement>this.utils.$("aplicaFiltro")).value;
    
        if (tipo == 'Masculino') {
            let listaFiltrada = this.listaClientes.filter(cliente => cliente.sexo == Sexo.Masculino);
            this.AgregarATabla(listaFiltrada);
        } else if (tipo == 'Femenino') {
            var listaFiltrada = this.listaClientes.filter(cliente => cliente.sexo == Sexo.Femenino);
            this.AgregarATabla(listaFiltrada);
        } else {
          var listaFiltrada = this.listaClientes;
          this.AgregarATabla(listaFiltrada);
        }
      }
    */
    Main.prototype.FiltrarPorSexo = function () {
        var _this = this;
        var tipo = this.utils.$("aplicaFiltro").value;
        var promesa = new Promise(function (resolve, reject) {
            if (tipo != 'Todos') {
                resolve();
            }
            else {
                reject();
            }
        });
        promesa.then(function () {
            if (tipo == 'Masculino') {
                var listaFiltrada = _this.listaClientes.filter(function (cliente) { return cliente.sexo == Sexo.Masculino; });
                _this.AgregarATabla(listaFiltrada);
            }
            else if (tipo == 'Femenino') {
                var listaFiltrada = _this.listaClientes.filter(function (cliente) { return cliente.sexo == Sexo.Femenino; });
                _this.AgregarATabla(listaFiltrada);
            }
        })["catch"](function () {
            var listaFiltrada = _this.listaClientes;
            _this.AgregarATabla(listaFiltrada);
        });
        /*
            if (tipo == 'Masculino') {
                let listaFiltrada = this.listaClientes.filter(cliente => cliente.sexo == Sexo.Masculino);
                this.AgregarATabla(listaFiltrada);
            } else if (tipo == 'Femenino') {
                var listaFiltrada = this.listaClientes.filter(cliente => cliente.sexo == Sexo.Femenino);
                this.AgregarATabla(listaFiltrada);
            } else {
              var listaFiltrada = this.listaClientes;
              this.AgregarATabla(listaFiltrada);
            }*/
    };
    Main.prototype.CalcularPromedio = function () {
        var arrayEdades = new Array();
        var inputPromedio = this.utils.$("promedio");
        for (var _i = 0, _a = this.listaClientes; _i < _a.length; _i++) {
            var persona = _a[_i];
            arrayEdades.push(persona.edad);
        }
        if (arrayEdades.length !== 0) {
            var array = arrayEdades, average = array.reduce(function (sum, value) {
                return sum + value;
            }, 0) / array.length;
            inputPromedio.value = average.toString();
        }
        else {
            var average = 0;
            inputPromedio.value = average.toString();
        }
    };
    return Main;
}());
window.addEventListener("load", function (event) {
    event.preventDefault();
    var handler = new Main();
    var btnAlta = handler.utils.$("btnAlta");
    var btnLimpiar = handler.utils.$("btnLimpiar");
    var btnCerrar = handler.utils.$("btnCerrar");
    var btnCerrar2 = handler.utils.$("btnCerrar2");
    var btnAgregar = handler.utils.$("btnAgregar");
    var aplicaFiltro = handler.utils.$("aplicaFiltro");
    var btnPromedio = handler.utils.$("btnPromedio");
    var chbId = handler.utils.$("chbId");
    var chbNombre = handler.utils.$("chbNombre");
    var chbApellido = handler.utils.$("chbApellido");
    var chbEdad = handler.utils.$("chbEdad");
    btnAlta.addEventListener("click", function (event) { return handler.handleEvent(event); });
    btnLimpiar.addEventListener("click", function (event) { return handler.handleEvent(event); });
    btnCerrar.addEventListener("click", function (event) { return handler.handleEvent(event); });
    btnCerrar2.addEventListener("click", function (event) { return handler.handleEvent(event); });
    btnAgregar.addEventListener("click", function (event) { return handler.handleEvent(event); });
    aplicaFiltro.addEventListener("change", function (event) { return handler.handleEvent(event); });
    btnPromedio.addEventListener("click", function (event) { return handler.handleEvent(event); });
    chbId.addEventListener("change", function (event) { return handler.handleEvent(event); });
    chbNombre.addEventListener("change", function (event) { return handler.handleEvent(event); });
    chbApellido.addEventListener("change", function (event) { return handler.handleEvent(event); });
    chbEdad.addEventListener("change", function (event) { return handler.handleEvent(event); });
});
