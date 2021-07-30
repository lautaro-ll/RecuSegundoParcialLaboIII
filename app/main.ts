class Main implements EventListenerObject{

    public localStorage: Storage;
    public listaClientes: Array<Cliente>;
    public utils: Utils;

    constructor(){
        this.localStorage = window.localStorage;
        this.listaClientes = new Array<Cliente>();
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
    }
    
    public PushearUno(id:number) {
      var nombre = (<HTMLInputElement>document.getElementById("inputNombre")).value;
      var apellido = (<HTMLInputElement>document.getElementById("inputApellido")).value;
      var edad = (<HTMLInputElement>document.getElementById("inputEdad")).value;
      var sexo = (<HTMLInputElement>document.getElementById("selectSexo")).value;

      if(sexo == "Masculino") {
        let cliente: Cliente = new Cliente(id, nombre, apellido, parseInt(edad), Sexo.Masculino);
        this.listaClientes.push(cliente);
      }
      else {
        let cliente: Cliente = new Cliente(id, nombre, apellido, parseInt(edad), Sexo.Femenino);
        this.listaClientes.push(cliente);
      }
      
    }
   
    public AgregarUno() {
      let id = 1; 
      if(this.listaClientes.length != 0)
      {
          let cliente = this.listaClientes;
          id = cliente.reduce(function (last, i){
              if(i.id >= last) {
                  return i.id + 1;
              }
              return last;
          }, 0);

          if(id == 0){
              id + 1;
          }
      }
      this.PushearUno(id);
      this.AgregarATabla(this.listaClientes);
      this.displayForm(false);
  }
  
  public EliminarUno(id:number) {
    this.listaClientes.splice(id , 1);
    this.AgregarATabla(this.listaClientes);
  }
  
  public CargarForm(id:number) {
    this.listaClientes[id];
    (<HTMLInputElement>document.getElementById("inputNombre")).value = this.listaClientes[id].nombre;
    (<HTMLInputElement>document.getElementById("inputApellido")).value = this.listaClientes[id].apellido;
    (<HTMLInputElement>document.getElementById("inputEdad")).value = String(this.listaClientes[id].edad);
    if(this.listaClientes[id].sexo == Sexo.Masculino) {
      (<HTMLInputElement>document.getElementById("selectSexo")).value = "Masculino";
    }
    else {
      (<HTMLInputElement>document.getElementById("selectSexo")).value = "Femenino";
    }
    this.displayForm(true);
  }
  
  public LimpiarLocalStorage() {

    localStorage.clear();
  }

  public AgregarATabla(listaClientes: Array<Cliente>) :void {

    var nombre: string = '';
    var apellido: string = '';
    var edad: any;
    var id: any;
    var sexo: string = '';

    var tbody: HTMLTableElement = <HTMLTableElement>this.utils.$("tbody");
    var trheader: HTMLTableElement = <HTMLTableElement>this.utils.$("trhead");
    let chbId = <HTMLInputElement>this.utils.$("chbId");
    let chbNombre = <HTMLInputElement>this.utils.$("chbNombre");
    let chbApellido = <HTMLInputElement>this.utils.$("chbApellido");
    let chbEdad = <HTMLInputElement>this.utils.$("chbEdad");

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
    if(chbNombre.checked) {
      let th2: HTMLTableDataCellElement = document.createElement("th");
      th2.innerText = "Nombre";
      trheader.appendChild(th2);
    }
    if(chbApellido.checked) {
      let th3: HTMLTableDataCellElement = document.createElement("th");
      th3.innerText = "Apellido";
      trheader.appendChild(th3);
    }
    if(chbEdad.checked) {
      let th4: HTMLTableDataCellElement = document.createElement("th");
      th4.innerText = "Edad";
      trheader.appendChild(th4);
    }

    let th5: HTMLTableDataCellElement = document.createElement("th");
    th5.innerText = "Sexo";
    trheader.appendChild(th5);

    let th6: HTMLTableDataCellElement = document.createElement("th");
    th6.innerText = "Accion";
    trheader.appendChild(th6);

    for (let cliente of listaClientes) {

      id = cliente.id;
      nombre = cliente.nombre;
      apellido = cliente.apellido;
      edad = cliente.edad;

      if(cliente.sexo == Sexo.Masculino) {
        sexo = "Masculino";
      }
      else {
        sexo = "Femenino";
      }
      
      let btnEliminar = document.createElement('input');
      btnEliminar.type = 'button';
      btnEliminar.className = 'btnEliminar';
      btnEliminar.value = "Eliminar";            
      btnEliminar.onclick = () =>{
        this.EliminarUno(listaClientes.indexOf(cliente))
      };

      let tr: HTMLTableRowElement = document.createElement("tr");
      tr.onclick = () =>{
        this.CargarForm(listaClientes.indexOf(cliente))
      };

      if(chbId.checked) {

        let td1: HTMLTableDataCellElement = document.createElement("td");
        let tnId = document.createTextNode(id);
        td1.appendChild(tnId);
        tr.appendChild(td1);
      }
      if(chbNombre.checked) {

        let td2: HTMLTableDataCellElement = document.createElement("td");
        let tnNombre = document.createTextNode(nombre);
        td2.appendChild(tnNombre);
        tr.appendChild(td2);        
      }
      if(chbApellido.checked) {

        let td3: HTMLTableDataCellElement = document.createElement("td");
        let tnApellido = document.createTextNode(apellido);
        td3.appendChild(tnApellido);
        tr.appendChild(td3);
      }
      if(chbEdad.checked) {

        let td4: HTMLTableDataCellElement = document.createElement("td");
        let tnEdad = document.createTextNode(edad);
        td4.appendChild(tnEdad);
        tr.appendChild(td4);
      }

      let td5: HTMLTableDataCellElement = document.createElement("td");
      let tnSexo = document.createTextNode(sexo);
      td5.appendChild(tnSexo);
      tr.appendChild(td5);

      let td6: HTMLTableDataCellElement = document.createElement("td");
      td6.appendChild(btnEliminar);
      tr.appendChild(td6);

      tbody.appendChild(tr);      
    }
  }

  public displayForm(display:boolean) :void {
      if(display){
        (<HTMLInputElement>this.utils.$("formContainer")).hidden = false;
      }else{
        (<HTMLInputElement>this.utils.$("formContainer")).hidden = true;
      }
  }
/* Version sin promesa
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
  public FiltrarPorSexo() :void {
    let tipo = (<HTMLInputElement>this.utils.$("aplicaFiltro")).value;

    let promesa = new Promise((resolve:any, reject:any) => {
      if (tipo != 'Todos') {
        resolve() 
      } else {
        reject ()
      }}
      );
    
      promesa.then(() => {
        if (tipo == 'Masculino') {
          let listaFiltrada = this.listaClientes.filter(cliente => cliente.sexo == Sexo.Masculino);
          this.AgregarATabla(listaFiltrada);
        } else if (tipo == 'Femenino') {
          let listaFiltrada = this.listaClientes.filter(cliente => cliente.sexo == Sexo.Femenino);
          this.AgregarATabla(listaFiltrada);
          }
      }).catch(() => {
        var listaFiltrada = this.listaClientes;
        this.AgregarATabla(listaFiltrada);
      });
  }
/* version sin promesa
  public CalcularPromedio() :void {
    let arrayEdades = new Array();
    let inputPromedio = <HTMLInputElement>this.utils.$("promedio");

    for (let cliente of this.listaClientes){
      arrayEdades.push(cliente.edad);
    }

    if(arrayEdades.length !== 0){
      let array = arrayEdades,
      average = array.reduce(function (sum, value) {
          return sum + value;
      }, 0) / array.length;
      inputPromedio.value = average.toString();

    } else{
      let average = 0;
      inputPromedio.value = average.toString();
    }
  }
*/
public CalcularPromedio() :void {
  let arrayEdades = new Array();
  let inputPromedio = <HTMLInputElement>this.utils.$("promedio");

  for (let cliente of this.listaClientes){
    arrayEdades.push(cliente.edad);
  }

  if(arrayEdades.length !== 0){
    let array = arrayEdades,
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
    let btnLimpiar = <HTMLElement>handler.utils.$("btnLimpiar");
    let btnCerrar = <HTMLElement>handler.utils.$("btnCerrar");
    let btnCerrar2 = <HTMLElement>handler.utils.$("btnCerrar2");
    let btnAgregar = <HTMLElement>handler.utils.$("btnAgregar");
    let aplicaFiltro = <HTMLElement>handler.utils.$("aplicaFiltro");
    let btnPromedio = <HTMLElement>handler.utils.$("btnPromedio");
    let chbId = <HTMLElement>handler.utils.$("chbId");
    let chbNombre = <HTMLElement>handler.utils.$("chbNombre");
    let chbApellido = <HTMLElement>handler.utils.$("chbApellido");
    let chbEdad = <HTMLElement>handler.utils.$("chbEdad");

    btnAlta.addEventListener("click", (event) => handler.handleEvent(event));
    btnLimpiar.addEventListener("click", (event) => handler.handleEvent(event));
    btnCerrar.addEventListener("click", (event) => handler.handleEvent(event));
    btnCerrar2.addEventListener("click", (event) => handler.handleEvent(event));
    btnAgregar.addEventListener("click", (event) => handler.handleEvent(event));
    aplicaFiltro.addEventListener("change", (event) => handler.handleEvent(event));
    btnPromedio.addEventListener("click", (event) => handler.handleEvent(event));
    chbId.addEventListener("change", (event) => handler.handleEvent(event));
    chbNombre.addEventListener("change", (event) => handler.handleEvent(event));
    chbApellido.addEventListener("change", (event) => handler.handleEvent(event));
    chbEdad.addEventListener("change", (event) => handler.handleEvent(event));

  });
  