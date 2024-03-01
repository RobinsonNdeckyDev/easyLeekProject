import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { PanierService } from 'src/app/Services/panier.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  currentTemplate = 'template1';
  etatSelectionne: string = 'acceptee';
  dtOptions: DataTables.Settings = {};


  constructor(private authService: AuthService
    , private userService: UserService, private panierService: PanierService) { }

  logout(): void {
    this.authService.logout();
  }

  voirDetails(commandId :string){}
  showTemplate1() {
    this.currentTemplate = 'template1';
  }

  showTemplate2() {
    this.currentTemplate = 'template2';
  }
  showTemplate3() {
    this.currentTemplate = 'template3';

  }
  
  name: string = '';
  phone: string = '';
  Commandes: any[] = [];
  adresse: string="";
  email: string="";

  ngOnInit() {
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
    this.getAllUser();
    this.getAllCommande();
  }

  getAllUser() {
    this.userService.getUserProfile().subscribe(
      (userData) => {
        console.log('cest la reponse du utilisateur', userData)
        this.name = userData.name;
        this.phone = userData.phone;
        this.adresse=userData.adresse;
        this.email=userData.email;
      },
      (error) => {
        console.error('Erreur lors de la récupération des informations utilisateur:', error);
      }
    );
  }
  getAllCommande() {
    this.panierService.getUserCommandes().subscribe(
      (commandes: any) => {
        console.log('cest la reponse du utilisateur commande du commande ', commandes)
        this.Commandes = commandes.data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des commandes utilisateur:', error);
      }
    );
  }

  filterCommandesByEtat(etat: string): any[] {
    return this.Commandes.filter((commande) => commande.etatCommande === etat);
  }
}


