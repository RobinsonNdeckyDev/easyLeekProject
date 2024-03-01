import { Component } from '@angular/core';
import { ClientService } from 'src/app/Services/client/client.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  newMessage :[]=[];
name: string="";
email:string="";
message :string="";
constructor( private contactService:ClientService){}


addmessage() {
  const newMessage = {
    name: this.name,
    email: this.email,
    message: this.message
  };

  // Assuming this.contactService.envoyerMessageContact() returns an observable
  this.contactService.envoyerMessageContact(newMessage).subscribe((response) => {
    console.log("Réponse de l'API :", response);
    this.newMessage = response; 
    
    Swal.fire('Message envoyé!', 'Le message a été envoyé avec succès.', 'success');
  });
}

}
