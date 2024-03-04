import { Component } from '@angular/core';
import { AjoutRestaurateurService } from 'src/app/Services/ajout-restaurateur.service';
import { CategorieService } from 'src/app/Services/categorie.service';
import { ClientService } from 'src/app/Services/client/client.service';

@Component({
  selector: 'app-accueil-admin',
  templateUrl: './accueil-admin.component.html',
  styleUrls: ['./accueil-admin.component.css']
})
export class AccueilAdminComponent {


  dtOptions: DataTables.Settings = {};
  messages:any []=[];
  nombreClient: any = "";
  nombreResto: any = "";
  nombreCategorie: any = "";
  clients :any []=[];
  restaurants :any []=[];
  categories :any []=[];

constructor( private messageService :ClientService ,private categorieService :CategorieService,private clientService : ClientService   , private restoService: AjoutRestaurateurService ,){}


ngOnInit(): void {
  this.getAdminData();
}

getAdminData(): void {
  this.clientService.getListeClients().subscribe((clients: any) => {
    console.log("clients ", clients);
    this.clients = clients.data;
    this.updateCountsAndChart();
  });

  this.restoService.getListeRestaurateurs().subscribe((restaurants: any) => {
    console.log("resto", restaurants);
    this.restaurants = restaurants.data;
    this.updateCountsAndChart();
  });

  this.categorieService.getAllCategories().subscribe((categories: any) => {
    console.log("categorie", categories);
    this.categories = categories.data;
    this.updateCountsAndChart();
  });

  this.messageService.messageRecus().subscribe((messages: any) => {
    console.log("messages",messages.menu);
    this.messages = messages?.menu || [];
    // Additional logic based on 'messages' if needed
    this.updateCountsAndChart();

  });

  // Additional logic specific to 'messages' if needed

  // Example updating chart data
  this.createChart();
}

private updateCountsAndChart(): void {
  // Example updating nombreClient, nombreResto, and nombreCategorie
  this.nombreClient = this.clients.length; // Assuming you have a property 'clients'
  this.nombreResto = this.restaurants.length; // Assuming you have a property 'restaurants'
  this.nombreCategorie = this.categories.length; // Assuming you have a property 'categories'

  // Example updating chart data
  this.createChart();
}


createChart(): void {
  // ... (your existing chart creation logic)
}
}

