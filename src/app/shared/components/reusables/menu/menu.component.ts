import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MenuItems } from "@shared/models/menu-items.interface";
import { IconModule } from "@visurel/iconify-angular";

@Component({
  selector: "app-menu",
  standalone: true,
  // Vamos a empezar importando los módulos necesarios para trabajar con nuestro componente menú|||
  imports: [CommonModule, MatMenuModule, IconModule, MatButtonModule],
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  
  // Declaramos el decorador input para recibir desde el componente padre el valor actual del estado a filtrar|||
  @Input() currentMenu: number;
  // Vamos a declarar también otro decorador para poder pasarle la configuración del menú||| Esto lo haremos a través de una interfaz llamada|||
  @Input() items: MenuItems[];
  // Ahora vamos a declarar otro decorador para indicarle si deseo mostrar un botón o no en el menú|||
  @Input() buttonShow = false;
  // Luego vamos a agregar un decorador más de tipo Input también para poder asignarle un label a ese botón|||
  @Input() buttonLabel = "Button";
  // Agregaremos también un decorador Output para poder emitir desde este componente el metodo de Filtrar por estado en nuestro componenten padre|||
  @Output() filterChange = new EventEmitter<unknown>();
  // Y finalmente un decorador OutPut||| para emitir una acción adicional como por ejemplo abrir un MatDialog|||
  @Output() buttonClick? = new EventEmitter<unknown>();
  // Aqui vamos a seleccionar nuestra configuración del Menú por defecto|||
  activeItem: MenuItems["id"] = "all";

  ngOnInit(): void {
    // Aquí voy a ejecutar un método llamado|||
    // donde recibirá el valor actual seleccionado||| -> Ir al método setCurrentFilter()
    this.setCurrentFilter(this.currentMenu);
  }

  setCurrentFilter(itemNumber: number) {
    let currentItem = this.items.find((item) => item.searchValue == itemNumber);
    this.activeItem = currentItem.id;
    // Aqui le estoy diciendo que de los items configurados que le voy a enviar desde el componente padre, quiero obtener el id que en este caso puede ser all - Activo - Inactivo y le voy a setear el id a la variable que tendrá como el item Activo a seleccionar.
  }

  // Aqui voy a crear un método para que me ayude a emitir un evento hacia el componente padre, éste método nos ayudará a poder filtrar según el item del menú que esté seleccionando
  setFilter(item: MenuItems) {
    this.activeItem = item.id;
    return this.filterChange.emit(item.searchValue);
  }

  // También vamos a crear un método para obtener el item activo seleccionado y aplicarle algunos estilos css para sombrearlo
  isActive(item: MenuItems["id"]) {
    return this.activeItem === item;
  }

  // Aquí agregamos el método para emitir el evento para la acción que hará el button en sí|||
  emitClick() {
    if (this.buttonShow) {
      return this.buttonClick.emit();
    }
  }
}
