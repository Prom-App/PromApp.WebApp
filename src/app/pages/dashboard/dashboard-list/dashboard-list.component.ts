import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IconService } from "@shared/services/icon.service";

const DATA_BAR_CHART_VERTICAL: BarChartVertical[] = [
  {
    name: "Germany",
    value: 40632,
    extra: {
      code: "de",
    },
  },
  {
    name: "United States",
    value: 50000,
    extra: {
      code: "us",
    },
  },
  {
    name: "France",
    value: 36745,
    extra: {
      code: "fr",
    },
  },
  {
    name: "United Kingdom",
    value: 36240,
    extra: {
      code: "uk",
    },
  },
  {
    name: "Spain",
    value: 33000,
    extra: {
      code: "es",
    },
  },
  {
    name: "Italy",
    value: 35800,
    extra: {
      code: "it",
    },
  },
];

const DATA_PIE_CHART: PieChart[] = [
  {
    name: "Germany",
    value: 40632,
    extra: {
      code: "de",
    },
  },
  {
    name: "United States",
    value: 50000,
    extra: {
      code: "us",
    },
  },
  {
    name: "France",
    value: 36745,
    extra: {
      code: "fr",
    },
  },
  {
    name: "United Kingdom",
    value: 36240,
    extra: {
      code: "uk",
    },
  },
  {
    name: "Spain",
    value: 33000,
    extra: {
      code: "es",
    },
  },
  {
    name: "Italy",
    value: 35800,
    extra: {
      code: "it",
    },
  },
];

interface BarChartVertical {
  name: string;
  value: number;
  extra: BarChartExtra;
}

interface BarChartExtra {
  code: string;
}

interface PieChart {
  name: string;
  value: number;
  extra: PieChartExtra;
}

interface PieChartExtra {
  code: string;
}

@Component({
  selector: "vex-dashboard-list",
  templateUrl: "./dashboard-list.component.html",
  styleUrls: ["./dashboard-list.component.scss"],
})
export class DashboardListComponent implements OnInit {
  icUsers = IconService.prototype.getIcon("icUser");
  icProviders = IconService.prototype.getIcon("icProvider");
  icCategories = IconService.prototype.getIcon("icCategory");
  icProducts = IconService.prototype.getIcon("icProduct");
  icWarehouse = IconService.prototype.getIcon("icWarehouse");

  constructor(private _router: Router) {}

  ngOnInit(): void {
    this.data = DATA_BAR_CHART_VERTICAL;
    this.dataPie = DATA_PIE_CHART;
  }

  routeCategories() {
    this._router.navigate(["/categorias"]);
  }

  routeProducts() {
    this._router.navigate(["/productos"]);
  }

  routeWarehouses() {
    this._router.navigate(["/almacenes"]);
  }

  routeProviders() {
    this._router.navigate(["/proveedores"]);
  }

  routeUsers() {
    this._router.navigate(["/usuarios"]);
  }

  data: BarChartVertical[];

  view: [number, number] = [550, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = "Country";
  showYAxisLabel = true;
  yAxisLabel = "Population";

  colorScheme = {
    domain: ["#b3f0ed", "#ffeb99", "#baacff", "#f6c7b8", "#baeed0", "#f1e1d8"],
  };

  dataPie: PieChart[];

  viewPie: [number, number] = [550, 400];
  // options
  gradientPie: boolean = true;
  showLegendPie: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = "right";

  colorSchemePie = {
    domain: ["#b3f0ed", "#ffeb99", "#baacff", "#f6c7b8", "#baeed0", "#f1e1d8"],
  };
}
