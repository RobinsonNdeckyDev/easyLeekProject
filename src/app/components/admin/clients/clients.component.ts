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
      console.log("Regarder", response)
      this.clients = response.data;
    },
    (error) => {
      console.log(error);
    }
    );
}
}
