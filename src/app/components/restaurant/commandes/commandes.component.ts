import { Component } from '@angular/core';
import { CommandeService } from 'src/app/Services/commande.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css'],
})
export class CommandesComponent {
  dtOptions: DataTables.Settings = {};
  etatSelectionne: string = 'acceptee';
  Commandes :any[]=[] ;
  platId :string="";
nomPlat: any;
commande: any;
image :string="";
prix :any ="";
descriptif :string="";

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
    // this.loadCommande(); 
    this.getAllCommande();
  }

  constructor(private commandeService: CommandeService) {}

  filterCommandesByEtat(etat: string): any[] {
    return this.Commandes.filter((commande) => commande.etatCommande === etat);
  }
  getAllCommande(){
    this.commandeService.getRestoCommandes().subscribe(
      (commandes :any) => {
        console.log('JNDFGJNDGLDNGIKNGKNNGGBJLGDFNFGJNDKLDFKF?', commandes)
      this.Commandes = commandes.commandes;
      console.log('cest la reponse du utilisateur', this.Commandes)
  
    },
    (error) => {
      console.error('Erreur lors de la récupération des commandes utilisateur:', error);
    }
  );
  }

  annulerCommande(commadeId: any): void {
    // Afficher une boîte de dialogue de confirmation avant d'annuler la commande
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir annuler cette commande ?',
      text: 'Cette action est irréversible !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, annuler',
      cancelButtonText: 'Non, ne pas annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        // L'utilisateur a confirmé l'annulation, continuez avec la requête de service
        this.commandeService.annuleruneCommandeservice(commadeId).subscribe(
          (responses: any) => {
            console.log("C'est la réponse après l'annulation :", responses);
  
            // Afficher une boîte de dialogue de succès après l'annulation
            Swal.fire('Commande annulée !', 'La commande a été annulée avec succès.', 'success');
          },
          (error) => {
            console.error('Erreur lors de l\'annulation de la commande :', error);
  
            // Afficher une boîte de dialogue d'erreur en cas d'échec de l'annulation
            Swal.fire('Erreur', 'Une erreur est survenue lors de l\'annulation de la commande.', 'error');
          }
        );
      }
    });
  }
  
  termine(commandeId: any): void {
    // Afficher une boîte de dialogue de confirmation avant de terminer la commande
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir terminer cette commande ?',
      text: 'Le client a-t-il reçu la commande !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, il a recu',
      cancelButtonText: 'Non, pas encore',
    }).then((result) => {
      if (result.isConfirmed) {
        // L'utilisateur a confirmé la terminaison, continuez avec la requête de service
        this.commandeService.accepterCommandeservice(commandeId).subscribe(
          (responses: any) => {
            // console.log("C'est la réponse après la terminaison :", responses);
  
            // Afficher une boîte de dialogue de succès après la terminaison
            Swal.fire('Commande terminée !', 'Le client a reçu avec succès sa commande.', 'success');
          },
          (error) => {
            console.error('Erreur lors de la terminaison de la commande :', error);
  
            // Afficher une boîte de dialogue d'erreur en cas d'échec de la terminaison
            Swal.fire('Erreur', 'Une erreur est survenue lors de la terminaison de la commande.', 'error');
          }
        );
      }
    });
  }
  
  detailCommande(commadeId : any){
    this.commandeService.detailsRestoCommandeservice(commadeId).subscribe(
      (responses:any)=>{
        console.log("c'est la reponse du reponse", responses.data.commande);
      }
    )

  }
  };
