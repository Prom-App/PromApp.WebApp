// Aquí vamos a exportar nuestro TableColumns para poder usarlo desde mi componente compartido
export interface TableColumns<T> {
  // Entonces voy a configurar varias propiedades para poder hacerlo de manera dinámica
  // Creamos esta propiedad |||| para mostrar mis resultados en la tabla
  label: string;
  //Otra propiedad que voy a crear es|||| Para poder asignar algunos estilos para mis columnas
  cssLabel: string[];
  // ||||Para poder llamar o asignar mi propiedad que me responde mi Api
  property: keyof T | string;
  // ||||Para poder darle algunos estilos a mis propiedades
  cssProperty: string[];
  // ||||Para poder llamar a una segunda propiedad en una misma columna (opcional)
  subProperty?: keyof T | string;
  // ||||Para poder darle algunos estilos a mi segunda propiedad
  cssSubProperty?: string[];
  //   Para poder saber que tipos de propiedades quiero mostrar ya sea un formato texto, fecha, fecha y hora, icono, badge, button y etc. (Podemos seleccionar varios tipos de formato) entonces voy a declarar una propiedad||
  type:
    | "text"
    | "textUppercase"
    | "currency"
    | "image"
    | "quantity"
    | "quantityPurchase"
    | "quantitySale"
    | "unitPurchasePrice"
    | "unitSalePrice"
    | "totalAmount"
    | "date"
    | "datetime"
    | "time"
    | "icon"
    | "button"
    | "badge"
    | "number";
  // Para indicar si una propiedad pueda ser visible o no en mi tabla (esto nos puede servir para hacer alguna lógica interna de una propiedad sin necesidad de mostrarla en mi tabla)||||
  visible: boolean;
  //|||| Para aplicar si es sorteable o no la columna
  sort: boolean;
  //|||| Para aplicar algunos estilos a la columna sorteable
  sortProperty?: string;
  // Para poder realizar o indicar una acción sobre un icono o botón de nuestra tabla voy a declarar una propiedad llamada ||||
  action?: string;
  // Voy a declarar una propiedad que la voy a llamar sticky|||| Esto me va a indicar un tipo de estilo para las tablas de angular Material que hace que sean fijas las cabeceras
  sticky: boolean;
  // Para poder asignar un tooltip informativo esto es sobre all para los iconos||||
  tooltip?: string;
  // Para poder indicar si esta columna se podrá descargar o no en el reporte de Excel||||
  download?: boolean;
  // Para indicar que propiedad de respuesta de mi API pueda ser descargada (esto es para nuestro reporte en excel que luego veremos)||||
  property_download?: string;
}

// Voy a aprovechar aquí para exportar una interfaz que nos va a servir para el footer de la tabla
export interface TableFooter<T> {
  // ||||Propiedad para el nombre que quiero mostrar en el footer de mi tabla
  label: string;
  // Para poder llamar a mi propiedad que quiero mostrar en el footer de mi tabla voy a poner un atributo llamado property|||
  property: keyof T | string;
  // Para poder asignar un tooltip informativo||||
  tooltip: string;
}
