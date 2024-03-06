import { Component } from '@angular/core';
import { ClientService } from 'src/app/Services/client/client.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  dtOptions: DataTables.Settings = {};
  messages :any []=[];
  constructor( private messageService :ClientService){}

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
    this.getmessageuser()
  }

  getmessageuser() {
    this.messageService.messageRecus().subscribe((messages: any) => {
      console.log("La liste des categories", messages)
      this.messages = messages.menu;
    });
  }


}
  
