"use strict";
var Main = /** @class */ (function () {
    function Main() {
        this.localStorage = window.localStorage;
        this.listaVehiculos = new Array();
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
            case "btnCerrar":
                this.displayForm(false);
                break;
            case "btnAgregar":
                this.AgregarVehiculo();
                break;
            case "tipoDeVehiculo":
                this.HabilitarOpcionesPorTipo();
                break;
            case "aplicaFiltro":
                this.FiltrarPorTipo();
                break;
            case "btnPromedio":
                this.CalcularPromedio();
                break;
            default:
                break;
        }
    };
    Main.prototype.PushearVehiculo = function (id) {
        var marca = document.getElementById("marcaVehiculo").value;
        var modelo = document.getElementById("modeloVehiculo").value;
        var precio = document.getElementById("precioVehiculo").value;
        var tipoVehiculo = document.getElementById("tipoDeVehiculo").value;
        var tipoCamioneta = document.getElementById("tipoCamioneta").value;
        var cantPuertas = document.getElementById("cantidadPuertas").value;
        if (tipoVehiculo === "Auto") {
            var auto = new Auto(id, marca, modelo, parseInt(precio), parseInt(cantPuertas));
            this.listaVehiculos.push(auto);
        }
        else if (tipoVehiculo === "Camioneta") {
            if (tipoCamioneta == "4X4") {
                var camioneta = new Camioneta(id, marca, modelo, parseInt(precio), true);
                this.listaVehiculos.push(camioneta);
            }
            else {
                var camioneta = new Camioneta(id, marca, modelo, parseInt(precio), false);
                this.listaVehiculos.push(camioneta);
            }
        }
    };
    Main.prototype.AgregarVehiculo = function () {
        var id = 1;
        if (this.listaVehiculos.length != 0) {
            var vehiculos = this.listaVehiculos;
            id = vehiculos.reduce(function (last, i) {
                if (i.id >= last) {
                    return i.id + 1;
                }
                return last;
            }, 0);
            if (id == 0) {
                id + 1;
            }
        }
        this.PushearVehiculo(id);
        this.AgregarATabla(this.listaVehiculos);
        this.displayForm(false);
    };
    Main.prototype.EliminarUnVehiculo = function (id) {
        this.listaVehiculos.splice(id, 1);
        this.AgregarATabla(this.listaVehiculos);
    };
    Main.prototype.AgregarATabla = function (listaVehiculos) {
        var _this = this;
        var marca = '';
        var modelo = '';
        var precio;
        var id;
        var caracteristica;
        var tipoVehiculo = '';
        var tbody = this.utils.$("tbody");
        while (tbody.rows.length > 0) {
            tbody.removeChild(tbody.childNodes[0]);
        }
        var _loop_1 = function (vehiculo) {
            id = vehiculo.id;
            marca = vehiculo.marca;
            modelo = vehiculo.modelo;
            precio = vehiculo.precio;
            if (vehiculo instanceof Auto) {
                tipoVehiculo = "Auto";
                caracteristica = vehiculo.cantidadPuertas;
            }
            else if (vehiculo instanceof Camioneta) {
                tipoVehiculo = "Camioneta";
                if (!vehiculo.cuatroXcuatro) {
                    caracteristica = "No es un 4x4";
                }
                else {
                    caracteristica = "Es 4x4";
                }
            }
            var btnEliminar = document.createElement('input');
            btnEliminar.type = 'button';
            btnEliminar.className = 'btnEliminar';
            btnEliminar.value = "Eliminar";
            btnEliminar.onclick = function () {
                _this.EliminarUnVehiculo(listaVehiculos.indexOf(vehiculo));
            };
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            var tnId = document.createTextNode(id);
            var td2 = document.createElement("td");
            var tnMarca = document.createTextNode(marca);
            var td3 = document.createElement("td");
            var tnModelo = document.createTextNode(modelo);
            var td4 = document.createElement("td");
            var tnPrecio = document.createTextNode(precio);
            var td5 = document.createElement("td");
            var tnTipo = document.createTextNode(tipoVehiculo);
            var td6 = document.createElement("td");
            var tnCaracteristica = document.createTextNode(caracteristica);
            var td7 = document.createElement("td");
            td1.appendChild(tnId);
            tr.appendChild(td1);
            td2.appendChild(tnMarca);
            tr.appendChild(td2);
            td3.appendChild(tnModelo);
            tr.appendChild(td3);
            td4.appendChild(tnPrecio);
            tr.appendChild(td4);
            td5.appendChild(tnTipo);
            tr.appendChild(td5);
            td6.appendChild(tnCaracteristica);
            tr.appendChild(td6);
            td7.appendChild(btnEliminar);
            tr.appendChild(td7);
            tbody.appendChild(tr);
        };
        for (var _i = 0, listaVehiculos_1 = listaVehiculos; _i < listaVehiculos_1.length; _i++) {
            var vehiculo = listaVehiculos_1[_i];
            _loop_1(vehiculo);
        }
    };
    Main.prototype.displayForm = function (display) {
        if (display) {
            this.utils.$("container").style.display = "block";
        }
        else {
            this.utils.$("container").style.display = "none";
        }
    };
    Main.prototype.HabilitarOpcionesPorTipo = function () {
        var tipo = this.utils.$("tipoDeVehiculo").value;
        if (tipo == "Auto") {
            this.utils.$("esAuto").hidden = false;
            this.utils.$("esCamioneta").hidden = true;
        }
        else {
            this.utils.$("esCamioneta").hidden = false;
            this.utils.$("esAuto").hidden = true;
        }
    };
    Main.prototype.FiltrarPorTipo = function () {
        var tipo = this.utils.$("aplicaFiltro").value;
        if (tipo == 'Auto') {
            var listaFiltrada_1 = this.listaVehiculos.filter(function (vehiculo) { return vehiculo instanceof Auto; });
            this.AgregarATabla(listaFiltrada_1);
        }
        else {
            var listaFiltrada = this.listaVehiculos.filter(function (vehiculo) { return vehiculo instanceof Camioneta; });
            this.AgregarATabla(listaFiltrada);
        }
    };
    Main.prototype.CalcularPromedio = function () {
        var arrayPrecios = new Array();
        var inputPromedio = this.utils.$("promedio");
        for (var _i = 0, _a = this.listaVehiculos; _i < _a.length; _i++) {
            var vehiculo = _a[_i];
            arrayPrecios.push(vehiculo.precio);
        }
        if (arrayPrecios.length !== 0) {
            var array = arrayPrecios, average = array.reduce(function (sum, value) {
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
    var btnCerrar = handler.utils.$("btnCerrar");
    var btnAgregar = handler.utils.$("btnAgregar");
    var tipoVeh = handler.utils.$("tipoDeVehiculo");
    var aplicaFiltro = handler.utils.$("aplicaFiltro");
    var btnPromedio = handler.utils.$("btnPromedio");
    btnPromedio.addEventListener("click", function (event) { return handler.handleEvent(event); });
    aplicaFiltro.addEventListener("change", function (event) { return handler.handleEvent(event); });
    tipoVeh.addEventListener("change", function (event) { return handler.handleEvent(event); });
    btnAlta.addEventListener("click", function (event) { return handler.handleEvent(event); });
    btnCerrar.addEventListener("click", function (event) { return handler.handleEvent(event); });
    btnAgregar.addEventListener("click", function (event) { return handler.handleEvent(event); });
});
