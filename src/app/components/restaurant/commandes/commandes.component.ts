import { Component } from '@angular/core';
import { CommandeService } from 'src/app/Services/commande.service';

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

  annulerCommande(commadeId : any){
    this.commandeService.annuleruneCommandeservice(commadeId).subscribe(
      (responses:any)=>{
        console.log("c'est la reponse du reponse", responses);
      }
    )
  }
  termine(commandeId :any){
    this.commandeService.accepterCommandeservice(commandeId).subscribe(
      (responses:any)=>{
        console.log("c'est la reponse du reponse", responses);
      }
    )
  }
  detailCommande(commadeId : any){
    this.commandeService.detailsRestoCommandeservice(commadeId).subscribe(
      (responses:any)=>{
        console.log("c'est la reponse du reponse", responses.data.commande);
      }
    )

  }
  };
