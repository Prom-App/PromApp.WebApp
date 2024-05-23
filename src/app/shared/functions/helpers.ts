import { formatDate } from "@angular/common";
import { IconService } from "@shared/services/icon.service";
import { COLORS_BADGE } from "./global-variables";

export function convertDateToRequest(
  date,
  format: "date" | "datetime" | "periodo"
) {
  switch (format) {
    case "date":
      return date == null
        ? null
        : formatDate(new Date(date), "yyyy-MM-dd", "en-ES");
    case "periodo":
      return date == null
        ? null
        : formatDate(new Date(date), "yyyy-MM", "en-US");
    case "datetime":
      return date == null
        ? null
        : formatDate(new Date(date), "yyyy-MM-dd hh:mm:ss", "en-US");
  }
}

// Función que convierte un archivo a su representación en formato base64
export function toBase64(file: File) {
  // Retorna una nueva Promise que manejará la operación asíncrona de lectura del archivo
  return new Promise((resolve, reject) => {
    // Crea una instancia de FileReader, que permite leer archivos de manera asíncrona
    const reader = new FileReader();

    // Lee el contenido del archivo como una URL de datos (data URL)
    reader.readAsDataURL(file);

    // Se configuran los manejadores de eventos para el éxito (onload) y el error (onerror) de la operación
    reader.onload = () => {
      // Resuelve la Promise con el resultado de la operación (la URL de datos en formato base64)
      resolve(reader.result);
    };

    reader.onerror = (error) => {
      // Rechaza la Promise si hay un error durante la lectura del archivo
      reject(error);
    };
  });
}

export function getIcon(
  iconName: string,
  tooltip: string,
  permission: boolean
) {
  let generalCss = "flex justify-center items-center p-1.5 w-fit rounded-full ";

  let iconObj = {
    tooltip: null,
    icon: null,
    css: null,
  };

  if (permission) {
    iconObj = {
      tooltip,
      icon: IconService.prototype.getIcon(iconName),
      css: generalCss + COLORS_BADGE.main,
    };

    if (["icEdit"].includes(iconName)) {
      iconObj.css = generalCss + COLORS_BADGE.main;
    }

    if (["icDelete"].includes(iconName)) {
      iconObj.css = generalCss + COLORS_BADGE.red;
    }

    if (["icVisibility"].includes(iconName)) {
      iconObj.css = generalCss + COLORS_BADGE.teal;
    }

    if (["icAdd"].includes(iconName)) {
      iconObj.css = generalCss + COLORS_BADGE.green;
    }

    if (["icCancel"].includes(iconName)) {
      iconObj.css = generalCss + COLORS_BADGE.coral;
    }

    if (["icInvoice"].includes(iconName)) {
      iconObj.css = generalCss + COLORS_BADGE.green;
    }

    if (["icTicket"].includes(iconName)) {
      iconObj.css = generalCss + COLORS_BADGE.main;
    }
  }

  return iconObj;
}
