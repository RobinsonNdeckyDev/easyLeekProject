import { Component } from '@angular/core';
import { GestionPlatService } from 'src/app/Services/gestion-plat.service';
import { PlatService } from 'src/app/Services/menu.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css'],
})
export class MenusComponent {
  titre: string = "";
  selectedMenu: any = {};
  menus: any[] = [];
  newmenu: string = '';
  editingMenu: any = {};
  editedTitre: string = '';
  plats:any[] = [];
  menu_id: string="";
  dtOptions: DataTables.Settings = {};


constructor(private menusservice: PlatService ,  private platservice: GestionPlatService) {}

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
    this.getMenu(); 
    this.fetchPlats();
    this.loadPlats(this.menu_id)
  }
  fetchPlats() {
    // console.log()
    this.menusservice.getRestaurantList().subscribe(
      (response: any) => {
        // console.log("Liste des plats :", response);
        this.plats = response; 
      },
    );
  }

  
  // menu 
  deletemenu(menuId: string) {
    Swal.fire({
      title: 'Confirmation',
      text: 'Êtes-vous sûr de vouloir supprimer ce menu ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.menusservice.deleteMenu(menuId).subscribe(() => {
          this.getMenu();
          Swal.fire('Menu supprimé!', 'Le menu a été supprimé avec succès.', 'success');
        });
      }
    });
  }
  
  addmenu() {
    if (!this.newmenu || this.newmenu.trim() === '' || this.newmenu.trim().length < 5) {
      Swal.fire('Erreur!', 'Le champ du nouveau menu doit contenir au moins 5 caractères.', 'error');
      return;
    }
    // console.log("Ajout de catégorie en cours...", this.newmenu);
    this.menusservice.addMenu(this.newmenu).subscribe((response) => {
      console.log(response)
      // console.log("Réponse de l'API :", response);
      this.getMenu();
      this.newmenu = ''; 
      document.getElementById("close-modal")?.click();
      
      Swal.fire('Menu ajouter!', 'Le menu a été ajouter avec succès.', 'success');
    });
  }
  

  editmenu(menuId: string, newTitre: string) {
    if (!newTitre || newTitre.trim() === '' || newTitre.trim().length < 5) {
      Swal.fire('Erreur!', 'Le champ du titre du menu doit contenir au moins 5 caractères.', 'error');
      return;
    }
    this.menusservice.editMenu(menuId, newTitre).subscribe(() => {
      this.getMenu();
      Swal.fire('Menu modifié!', 'Le menu a été modifié avec succès.', 'success');
    });
  }

  editmenuModal(menuId: string, menuTitre: string) {
    this.editingMenu.id = menuId;
    this.editedTitre = menuTitre;
  }

  getMenu() {
    this.menusservice.getMenus().subscribe((response :any) => {
      console.log("voir listedfghjk", response)
      this.menus = response.plats;
    });
  }
  detail(menuId: any) {
    this.menusservice.getMenuDetails(menuId).subscribe(
      (response :any) => {
        // console.log("je suis reponse",response)
        this.selectedMenu = response;

      },
      (error) => {
        console.error('Erreur lors de la récupération des détails du menu', error);
        // Handle error as needed
      }
    );
  }

  loadPlats(menu_id:string) {
    this.platservice.getPlatsForMenu(menu_id).subscribe(
      (plats: any) => {
        console.log('Plats récupérés avec succès!gyugygvydfhsd', this.plats);
        this.plats = plats;
      },
    );
  }
}
