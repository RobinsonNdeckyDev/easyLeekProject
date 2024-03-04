import { Component } from '@angular/core';
import { CommandeService } from 'src/app/Services/commande.service';
import { GestionPlatService } from 'src/app/Services/gestion-plat.service';
import { PlatService } from 'src/app/Services/menu.service';

@Component({
  selector: 'app-accueil-restaurant',
  templateUrl: './accueil-restaurant.component.html',
  styleUrls: ['./accueil-restaurant.component.css']
})
export class AccueilRestaurantComponent {

  menus:any[]=[];
  plats:any[]=[];
  commandes:any[]=[];


  dtOptions: DataTables.Settings = {};
  nombrePlats: any = "";
  nombreMenu: any = "";
  nombreCommande: any = "";
  chart: any;

  constructor(private commandeService: CommandeService, private menusService: PlatService , private platsService: GestionPlatService, ) {}


  ngOnInit(): void {
    this.getRestaurantData();
  }
  getRestaurantData(): void {
    this.menusService.getMenus().subscribe((menus: any) => {
      // Assuming 'plats' is a property inside the 'menus' object
      this.menus = menus?.plats || [];
      console.log("menus", menus);
  
      this.updateCountsAndChart();
    });
  
    this.platsService.getPlatsForTotal().subscribe((plats :any) => {
      this.plats = plats?.plats || [];
      console.log("plats", this.plats);
  
      // Now, inside this block, you can perform actions that depend on 'this.plats'
      // ...
  
      this.updateCountsAndChart();
    });
  
    this.commandeService.getRestoCommandes().subscribe((commandes :any) => {
      this.commandes = commandes?.commandes || [];
      console.log("commandes", this.commandes);
  
      // Now, inside this block, you can perform actions that depend on 'this.commandes'
      // ...
  
      this.updateCountsAndChart();
    });
  }
  
  private updateCountsAndChart(): void {
    // Example updating nombrePlats, nombreMenu, and nombreCommande
    this.nombrePlats = this.plats.length;
    this.nombreMenu = this.menus.length;
    this.nombreCommande = this.commandes.length;
  
    // Example updating chart data
    this.createChart();
  }
  

  // Example chart creation method
  createChart(): void {
    // ... (your existing chart creation logic)
  }
}

