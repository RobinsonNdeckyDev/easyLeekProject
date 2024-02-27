import { Component } from '@angular/core';
import { CommandeService } from 'src/app/Services/commande.service';
import { GestionPlatService } from 'src/app/Services/gestion-plat.service';
import { PlatService } from 'src/app/Services/menu.service';

import {
  AngularFireStorage,
  AngularFireStorageModule,
} from '@angular/fire/compat/storage';

@Component({
  selector: 'app-plats',
  templateUrl: './plats.component.html',
  styleUrls: ['./plats.component.css'],
})
export class PlatsComponent {
  menus: any[] = [];
  plats: any[] = [];
  selectedPlat: any = {};

  // ngmodel ajout plat
  descriptif: string = '';
  image: any = '';
  menuPlat!: number;
  prix!: number;
  libelle: string = '';
  menusTitre: string = '';

  menu_id: string = '';
  user_id: string = '';
  newPlat: string = '';
  editingPlat: any = {};
  editedPlatNom: string = '';

  updatedPlat: [] = [];
  // editedArticle: Article = { id: 0, titre: '', photo: '', description: '' };
  platId: string = '';
  details: any;
  Commandes: any[] = [];
  // ajoutArticle!: FormGroup;
  constructor(
    private platservice: GestionPlatService,
    private recupererMenu: PlatService,
    private commandeService: CommandeService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.loadPlats();
    this.getAllmenu();
    this.loadPlatsTotal();
  }

  test(id: number) {
    console.log(id);
  }

  // tous les plats
  getAllmenu() {
    this.recupererMenu.getMenus().subscribe(
      (menu: any) => {
        console.log('Liste des menus', menu);
        this.menus = menu.plats;
        console.log('Liste menus: ', this.menus);
        console.log('Id du menu 1: ', this.menus[0].id);
      },
      (error) => {
        console.error('Erreur lors de la récupération des menus :', error);
      }
    );
  }

  fichierAdd: any;

  upload(event: any) {
    this.fichierAdd = event.target.files[0];
    console.log(this.fichierAdd);
  }

  save() {
    if (this.fichierAdd) {
      const filePath = 'plat/' + this.fichierAdd.name;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.fichierAdd);

      task.snapshotChanges().subscribe((snapshot: any) => {
        if (snapshot.state === 'success') {
          fileRef.getDownloadURL().subscribe((downloadURL) => {
            this.image = downloadURL;
            this.addPlat();
          });
        }
      });
    }
  }

  addPlat() {
    let newPlat = {
      libelle: this.libelle,
      descriptif: this.descriptif,
      image: this.image,
      menu_id: this.menuPlat,
      prix: this.prix,
    };

    console.log('newPlat: ', newPlat);

    this.platservice.ajouterPlat(newPlat).subscribe(
      (response) => {
        console.log('response après ajout du plat: ', response);
        this.plats=response
        this.loadPlats()
        
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  onMenuChange() {
    this.loadPlatsForSelectedMenu();
  }

  loadPlats() {
    this.platservice.getPlatsForMenu('').subscribe((plats: any) => {
      this.plats = plats;
      console.log('Plats récupérés avec succès!', this.plats);
    });
  }

  loadPlatsForSelectedMenu() {
    if (this.menu_id) {
      this.platservice.getPlatsForMenu(this.menu_id).subscribe(
        (plats: any) => {
          this.plats = plats.data;
          console.log(
            'Plats récupérés avec succès pour le menu sélectionné!',
            this.plats
          );
        },
        (error) => {
          console.error(
            'Erreur lors de la récupération des plats pour le menu sélectionné:',
            error
          );
        }
      );
    }
  }
  supprimerPlat(platId: string): void {
    {
      this.platservice.deletePlat(platId).subscribe(
        (response) => {
          // console.log('Plat supprimé avec succès!', response);
          this.loadPlatsForSelectedMenu();
        },
        (error) => {
          console.error('Erreur lors de la suppression du plat :', error);
        }
      );
    }
  }
  detailsplat(platId: number): void {
    this.platservice.getSinglePlat(platId).subscribe(
      (platDetails) => {
        this.showDetailsModal(platDetails);
      },
      (error) => {
        console.error('Error fetching plat details', error);
      }
    );
  }

  showDetailsModal(platId: number): void {
    // console.log("ca",platId)
    this.platservice.getSinglePlat(platId).subscribe((response: any) => {
      // console.log("c'est la reponse du truc", response)
      this.details = response.data;
      this.libelle = this.details.libelle;
      this.prix = this.details.prix;
      this.descriptif = this.details.descriptif;
    });
  }

  editmenuModal(platId: number) {
    this.platservice.getSinglePlat(platId).subscribe((response: any) => {
      // console.log("c'est la reponse du truc", response)
      this.editingPlat = response.data;
      this.libelle = this.editingPlat.libelle;
      this.prix = this.editingPlat.prix;
      this.descriptif = this.editingPlat.descriptif;
      this.image = this.editingPlat.image;
    });
  }
  modifierPlat(platId: string) {
    this.platservice.updatePlat(platId).subscribe(() => {
      console.log('Plat mis à jour avec succès.', platId);
      this.loadPlats();
    });
  }

  loadPlatsTotal() {
    this.platservice.getPlatsForTotal().subscribe((platsTtal: any) => {
      console.log('Plats récupérés avec succès!', platsTtal);
      this.plats = platsTtal.plats;
    });
  }
}
