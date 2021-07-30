class Utils {
  
    public table:HTMLElement;
    constructor(){
      this.table = this.$("table");
    }
    
    $(element:string) : HTMLElement{
      return <HTMLElement> document.getElementById(element);
    }

}