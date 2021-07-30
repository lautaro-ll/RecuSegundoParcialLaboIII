class Main implements EventListenerObject{

    public localStorage: Storage;
    public listaVehiculos: Array<Vehiculo>;
    public utils: Utils;

    constructor(){
        this.localStorage = window.localStorage;
        this.listaVehiculos = new Array<Vehiculo>();
        this.utils = new Utils();
    }

    //MANEJADOR DE LOS EVENTOS
    public handleEvent(event:Event){
        event.preventDefault();

        let node: Element = <Element>event.target;

        switch(node.id){
          case "btnAlta":
            this.displayForm(true);
            break;
          case "btnCerrar":
            this.displayForm(false);
            break;
          case "btnCerrar2":
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
          case "chbId":
            this.AgregarATabla(this.listaVehiculos);
            break;
          case "chbMarca":
            this.AgregarATabla(this.listaVehiculos);
            break;
          case "chbModelo":
            this.AgregarATabla(this.listaVehiculos);
            break;
          case "chbPrecio":
            this.AgregarATabla(this.listaVehiculos);
            break;
          default:
            break;
        }  
    }
    
    public PushearVehiculo(id:number) {
      var marca = (<HTMLInputElement>document.getElementById("marcaVehiculo")).value;
      var modelo = (<HTMLInputElement>document.getElementById("modeloVehiculo")).value;
      var precio = (<HTMLInputElement>document.getElementById("precioVehiculo")).value;
      var tipoVehiculo = (<HTMLInputElement>document.getElementById("tipoDeVehiculo")).value;
      var tipoCamioneta = (<HTMLInputElement>document.getElementById("tipoCamioneta")).value;
      var cantPuertas = (<HTMLInputElement>document.getElementById("cantidadPuertas")).value;

      if (tipoVehiculo === "Auto") {
          let auto: Auto = new Auto(id, marca, modelo, parseInt(precio), parseInt(cantPuertas));
          this.listaVehiculos.push(auto);
      } 
      else if (tipoVehiculo === "Camioneta") {
          if (tipoCamioneta == "4X4") {
              var camioneta: Camioneta = new Camioneta(id, marca, modelo, parseInt(precio), true);
              this.listaVehiculos.push(camioneta);
          }
          else {
              var camioneta: Camioneta = new Camioneta(id, marca, modelo, parseInt(precio), false);
              this.listaVehiculos.push(camioneta);
          }
      }
    }
   
    public AgregarVehiculo() {
      let id = 1; 
      if(this.listaVehiculos.length != 0)
      {
          let vehiculos = this.listaVehiculos;
          id = vehiculos.reduce(function (last, i){
              if(i.id >= last) {
                  return i.id + 1;
              }
              return last;
          }, 0);

          if(id == 0){
              id + 1;
          }
      }
      this.PushearVehiculo(id);
      this.AgregarATabla(this.listaVehiculos);
      this.displayForm(false);
  }
  
  public EliminarUnVehiculo(id:number) {
    this.listaVehiculos.splice(id , 1);
    this.AgregarATabla(this.listaVehiculos);
  }
  public AgregarATabla(listaVehiculos: Array<Vehiculo>) :void {

    var marca: string = '';
    var modelo: string = '';
    var precio: any;
    var id: any;
    var caracteristica: any;
    var tipoVehiculo: string = '';

    var tbody: HTMLTableElement = <HTMLTableElement>this.utils.$("tbody");
    var trheader: HTMLTableElement = <HTMLTableElement>this.utils.$("trhead");
    let chbId = <HTMLInputElement>this.utils.$("chbId");
    let chbMarca = <HTMLInputElement>this.utils.$("chbMarca");
    let chbModelo = <HTMLInputElement>this.utils.$("chbModelo");
    let chbPrecio = <HTMLInputElement>this.utils.$("chbPrecio");

    while (trheader.lastChild) {
      trheader.removeChild(trheader.lastChild);
    }
    while (tbody.lastChild) {
      tbody.removeChild(tbody.lastChild);
    }

    if(chbId.checked) {
      let th1: HTMLTableDataCellElement = document.createElement("th");
      th1.innerText = "Id";
      trheader.appendChild(th1);
    }
    if(chbMarca.checked) {
      let th2: HTMLTableDataCellElement = document.createElement("th");
      th2.innerText = "Marca";
      trheader.appendChild(th2);
    }
    if(chbModelo.checked) {
      let th3: HTMLTableDataCellElement = document.createElement("th");
      th3.innerText = "Modelo";
      trheader.appendChild(th3);
    }
    if(chbPrecio.checked) {
      let th4: HTMLTableDataCellElement = document.createElement("th");
      th4.innerText = "Precio";
      trheader.appendChild(th4);
    }

    let th5: HTMLTableDataCellElement = document.createElement("th");
    th5.innerText = "Vehiculo";
    trheader.appendChild(th5);

    let th6: HTMLTableDataCellElement = document.createElement("th");
    th6.innerText = "Caracteristica";
    trheader.appendChild(th6);

    let th7: HTMLTableDataCellElement = document.createElement("th");
    th7.innerText = "Accion";
    trheader.appendChild(th7);

    for (let vehiculo of listaVehiculos) {

      id = vehiculo.id;
      marca = vehiculo.marca;
      modelo = vehiculo.modelo;
      precio = vehiculo.precio;

      if (vehiculo instanceof Auto) {
          tipoVehiculo = "Auto";
          caracteristica = vehiculo.cantidadPuertas + " puertas";

      }else if (vehiculo instanceof Camioneta) {
          tipoVehiculo = "Camioneta";
          if (!vehiculo.cuatroXcuatro) {
            caracteristica = "No es un 4x4";
          }else {
            caracteristica = "Es 4x4";
          }
      }

      let btnEliminar = document.createElement('input');
      btnEliminar.type = 'button';
      btnEliminar.className = 'btnEliminar';
      btnEliminar.value = "Eliminar";            
      btnEliminar.onclick = () =>{
        this.EliminarUnVehiculo(listaVehiculos.indexOf(vehiculo))
      };

      let tr: HTMLTableRowElement = document.createElement("tr");

      if(chbId.checked) {

        let td1: HTMLTableDataCellElement = document.createElement("td");
        let tnId = document.createTextNode(id);
        td1.appendChild(tnId);
        tr.appendChild(td1);
      }
      if(chbMarca.checked) {

        let td2: HTMLTableDataCellElement = document.createElement("td");
        let tnMarca = document.createTextNode(marca);
        td2.appendChild(tnMarca);
        tr.appendChild(td2);        
      }
      if(chbModelo.checked) {

        let td3: HTMLTableDataCellElement = document.createElement("td");
        let tnModelo = document.createTextNode(modelo);
        td3.appendChild(tnModelo);
        tr.appendChild(td3);
      }
      if(chbPrecio.checked) {

        let td4: HTMLTableDataCellElement = document.createElement("td");
        let tnPrecio = document.createTextNode(precio);
        td4.appendChild(tnPrecio);
        tr.appendChild(td4);
      }

      let td5: HTMLTableDataCellElement = document.createElement("td");
      let tnTipo = document.createTextNode(tipoVehiculo);
      td5.appendChild(tnTipo);
      tr.appendChild(td5);

      let td6: HTMLTableDataCellElement = document.createElement("td");
      let tnCaracteristica = document.createTextNode(caracteristica);
      td6.appendChild(tnCaracteristica);
      tr.appendChild(td6);

      let td7: HTMLTableDataCellElement = document.createElement("td");
      td7.appendChild(btnEliminar);
      tr.appendChild(td7);

      tbody.appendChild(tr);      
    }
  }

  public displayForm(display:boolean) :void {
      if(display){
        (<HTMLInputElement>this.utils.$("formContainer")).hidden = false;
        this.HabilitarOpcionesPorTipo();
      }else{
        (<HTMLInputElement>this.utils.$("formContainer")).hidden = true;
      }
  }

  public HabilitarOpcionesPorTipo() :void {
    let tipo: string = (<HTMLInputElement>this.utils.$("tipoDeVehiculo")).value;
    if (tipo == "Auto") {
      (<HTMLInputElement>this.utils.$("esAuto")).hidden = false;
      (<HTMLInputElement>this.utils.$("esCamioneta")).hidden = true;
    }else {
      (<HTMLInputElement>this.utils.$("esCamioneta")).hidden = false;
      (<HTMLInputElement>this.utils.$("esAuto")).hidden = true;
    }
  }

  public FiltrarPorTipo() :void {
    let tipo = (<HTMLInputElement>this.utils.$("aplicaFiltro")).value;

    if (tipo == 'Auto') {
        let listaFiltrada = this.listaVehiculos.filter(vehiculo => vehiculo instanceof Auto);
        this.AgregarATabla(listaFiltrada);
    } else if (tipo == 'Camioneta') {   
        var listaFiltrada = this.listaVehiculos.filter(vehiculo => vehiculo instanceof Camioneta);
        this.AgregarATabla(listaFiltrada);
    } else {
      var listaFiltrada = this.listaVehiculos;
      this.AgregarATabla(listaFiltrada);
    }
  }

  public CalcularPromedio() :void {
    let arrayPrecios = new Array();
    let inputPromedio = <HTMLInputElement>this.utils.$("promedio");

    for (let vehiculo of this.listaVehiculos){
        arrayPrecios.push(vehiculo.precio);
    }

    if(arrayPrecios.length !== 0){
      let array = arrayPrecios,
      average = array.reduce(function (sum, value) {
          return sum + value;
      }, 0) / array.length;
      inputPromedio.value = average.toString();

    } else{
      let average = 0;
      inputPromedio.value = average.toString();
    }
    
  }

}

window.addEventListener("load", (event) => {
    event.preventDefault();

    let handler = new Main();
    let btnAlta = <HTMLElement>handler.utils.$("btnAlta");
    let btnCerrar = <HTMLElement>handler.utils.$("btnCerrar");
    let btnCerrar2 = <HTMLElement>handler.utils.$("btnCerrar2");
    let btnAgregar = <HTMLElement>handler.utils.$("btnAgregar");
    let tipoVeh = <HTMLElement>handler.utils.$("tipoDeVehiculo");
    let aplicaFiltro = <HTMLElement>handler.utils.$("aplicaFiltro");
    let btnPromedio = <HTMLElement>handler.utils.$("btnPromedio");
    let chbId = <HTMLElement>handler.utils.$("chbId");
    let chbMarca = <HTMLElement>handler.utils.$("chbMarca");
    let chbModelo = <HTMLElement>handler.utils.$("chbModelo");
    let chbPrecio = <HTMLElement>handler.utils.$("chbPrecio");


    btnPromedio.addEventListener("click", (event) => handler.handleEvent(event));
    aplicaFiltro.addEventListener("change", (event) => handler.handleEvent(event));
    tipoVeh.addEventListener("change", (event) => handler.handleEvent(event));
    btnAlta.addEventListener("click", (event) => handler.handleEvent(event));
    btnCerrar.addEventListener("click", (event) => handler.handleEvent(event));
    btnCerrar2.addEventListener("click", (event) => handler.handleEvent(event));
    btnAgregar.addEventListener("click", (event) => handler.handleEvent(event));
    chbId.addEventListener("change", (event) => handler.handleEvent(event));
    chbMarca.addEventListener("change", (event) => handler.handleEvent(event));
    chbModelo.addEventListener("change", (event) => handler.handleEvent(event));
    chbPrecio.addEventListener("change", (event) => handler.handleEvent(event));

  });
  