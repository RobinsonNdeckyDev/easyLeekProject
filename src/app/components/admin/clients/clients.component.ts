import { Component } from '@angular/core';
import { error } from 'jquery';
import { ClientService } from 'src/app/Services/client/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent {
  dtOptions: DataTables.Settings = {};
  clients :any []=[];
  client : any[]=[] ;
  name:string="";
  email :string="";
  phone :any ="";
  adresse :string="";
  updated_at :string="";

constructor( private clientService : ClientService){}

  ngOnInit(): void {
    this.dtOptions = {
      searching: true,
      lengthChange: false,
      paging: true,
      pageLength: 5,
      pagingType: 'simple_numbers',
      info: false,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json',

        paginate: {
          first: '<<', // Personnalise le texte de la flèche pour la première page
          previous: '<', // Personnalise le texte de la flèche pour la page précédente
          next: '>', // Personnalise le texte de la flèche pour la page suivante
          last: '>>', // Personnalise le texte de la flèche pour la dernière page
        },
      },
    };
  this.getAllclient();
  }

  getAllclient() {
    this.clientService.getListeClients().subscribe((response: any) => {
      // console.log("Regarder", response)
      this.clients = response.data;
    },
    (error) => {
      // console.log(error);
    }
    );
}
// getDetailsRestaurant(restaurateur: any): void {
//   // console.log('Restaurateur:', restaurateur);
//   this.ajoutRestaurateurService.getRestaurantDetails(restaurateur.id).subscribe(
//      (details) => {
//       // console.log("la reponse du detail",details)
//         this.name = details.data.name;
//         this.adresse = details.data.adresse;
//         this.phone = details.data.phone;
//      },
//      (error) => {
//         console.error('Erreur lors de la récupération des détails du restaurant', error);
//      }
//   );
// }
openAcheteurDetails(client:number) :void{
  this.clientService.detailclient(client).subscribe((response:any)=>{
    // console.log("Regarder", response)
  this.name= response.data.name;
  this.email = response.data.email;
  this.phone = response.data.phone;
  this.adresse = response.data.adresse;
  this.updated_at = response.data.updated_at;
  });

}
bloquer(client:number) :void{
this.clientService.blocked(client).subscribe((response :any)=>{
  // console.log("c'est la reponse du back ", response);
});
}

debloquer(client:number):void{
  this.clientService.disblocked(client).subscribe((response :any)=>{
    // console.log("c'est la reponse du back ", response);
  });
}
}
