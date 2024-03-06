import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponse, AuthService } from 'src/app/Services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
})
export class ConnexionComponent {
  email: string = '';
  phone!: any ;

  username: string = '';
  password: string = '';
  adresse: string = "";
  registerPassword: string = '';
  registerEmail: string = '';
  isSignIn: boolean = true;
  showEmailError: boolean = false;
  emailErrorMessage: string = '';
  showPasswordError: boolean = false;
  passwordErrorMessage: string = '';

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) { }

  ngOnInit() {}

// Messages de validation
validationMessages: { [key: string]: string } = {};

// Déclaration des propriétés touched
emailTouched: boolean = false;
passwordTouched: boolean = false;

// Déclaration des propriétés Empty
emailEmpty: boolean = false;
passwordEmpty: boolean = false;

// Déclaration des propriétés touched
usernameTouched: boolean = false;
telephoneTouched: boolean = false;
confirmationTouched: boolean = false;
adresseTouched: boolean = false;
photoTouched: boolean = false;
descriptionTouched: boolean = false;

// Déclaration des propriétés Empty
usernameEmpty: boolean = false;
telephoneEmpty: boolean = false;
confirmationEmpty: boolean = false;
adresseEmpty: boolean = false;
photoEmpty: boolean = false;
descriptionEmpty: boolean = false;


// emailregex pattern
emailPattern =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
// regex password
passwordRegex: RegExp = /^[A-Za-z0-9._%+-]{8,}$/;

  // regex adresse
  adresseRegex: RegExp = /^[a-zA-Z\s]{4,}$/;

  // Telephone regex
  telephoneRegex: RegExp =/^(70|75|76|77|78)[0-9]{7}$/;


  // Regex username et username
  regexPattern = /^[a-zA-Z]{3}$/;

 // Validation username
 validateusername(): boolean {
  this.usernameTouched = true;
  if (!this.username) {
    this.validationMessages['username'] = 'Le username est requis';
    return false;
  } else if (!this.regexPattern.test(this.username)) {
    this.validationMessages['username'] =
      'Pas de chiffres et de caractéres pour le username';
    this.usernameEmpty = false;
    return false;
  } else if (this.username.length < 4) {
    this.validationMessages['username'] = 'Le username est trop court';
    return false;
  } else {
    this.validationMessages['username'] = '';
    return true;
  }
}

// Validation email
validateEmail(): boolean {
  if (!this.email) {
    this.validationMessages['email'] = "L'email est requis";
    this.emailEmpty = true; // Mettre à jour emailEmpty si le champ est vide
    return false;
  } else if (!this.emailPattern.test(this.email)) {
    this.validationMessages['email'] = 'Email invalide';
    this.emailEmpty = false; // Mettre à jour emailEmpty si le champ n'est pas vide
    return false;
  } else {
    this.validationMessages['email'] = '';
    this.emailEmpty = false; // Mettre à jour emailEmpty si le champ n'est pas vide
    return true;
  }
}
validateEmailInsc(): boolean {
  if (!this.registerEmail) {
    this.validationMessages['email'] = "L'email est requis";
    this.emailEmpty = true; // Mettre à jour emailEmpty si le champ est vide
    return false;
  } else if (!this.emailPattern.test(this.registerEmail)) {
    this.validationMessages['email'] = 'Email invalide';
    this.emailEmpty = false; // Mettre à jour emailEmpty si le champ n'est pas vide
    return false;
  } else {
    this.validationMessages['email'] = '';
    this.emailEmpty = false; // Mettre à jour emailEmpty si le champ n'est pas vide
    return true;
  }
}


// Méthode de validation pour le téléphone
validateTelephone() {
  if (!this.phone) {
    this.validationMessages['telephone'] = 'Le téléphone est requis';
    this.telephoneEmpty = true;
    return false;
  } else if (!this.telephoneRegex.test(this.phone)) {
    this.validationMessages['telephone'] =
      'Pas de caractères et dois contenir exactement 9 chiffres';
    this.telephoneEmpty = false;
    return false;
  } else {
    this.validationMessages['telephone'] = '';
    this.telephoneEmpty = false;
    return true;
  }
}

// Méthode de validation pour le mot de passe
validatePassword() {
  if (!this.password) {
    this.validationMessages['password'] = 'Le mot de passe est requis';
    this.passwordEmpty = true;
    return false;
  } else if (!this.passwordRegex.test(this.password)) {
    this.validationMessages['password'] =
      'Le mot de passe doit contenir au moins 8 chiffres';
    this.passwordEmpty = false;
    return false;
  } else {
    this.validationMessages['password'] = '';
    this.passwordEmpty = false;
    return true;
  }
}
validatePasswordInc()
{
  if (!this.registerPassword) {
    this.validationMessages['password'] = 'Le mot de passe est requis';
    this.passwordEmpty = true;
    return false;
  } else if (!this.passwordRegex.test(this.registerPassword)) {
    this.validationMessages['password'] =
      'Le mot de passe doit contenir au moins 8 chiffres';
    this.passwordEmpty = false;
    return false;
  } else {
    this.validationMessages['password'] = '';
    this.passwordEmpty = false;
    return true;
  }
}
// Méthode de validation pour le champ "adresse"
validateAdresse() {
  if (!this.adresse) {
    this.validationMessages['adresse'] = "L'adresse est requise";
    this.adresseEmpty = true;
    return false;
  } else if (!this.adresseRegex.test(this.adresse)) {
    this.validationMessages['adresse'] =
      "L'adresse doit contenir au moins 4 caractères et ne peut contenir que des lettres";
    this.adresseEmpty = false;
    return false;
  } else {
    this.validationMessages['adresse'] = '';
    this.adresseEmpty = false;
    return true;
  }
}
  onRegister() {

    if (!this.username || !this.registerEmail || !this.adresse || !this.phone || !this.registerPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur!',
        text: 'Veuillez remplir tous les champs.',
      });
      return;
    }
  
    // Validate name length
    if (this.username.length < 3) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur!',
        text: 'Le username doit contenir au moins 3 caractères.',
      });
      return;
    }
  
    // Validate email format
    if (!this.validateEmail()) {
      // this.registerEmail
      Swal.fire({
        icon: 'error',
        title: 'Erreur!',
        text: 'Veuillez saisir une adresse e-mail valide.',
      });
      return;
    }

    // Validate phone number format
    if (!this.validateTelephone()) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur!',
        text: 'Veuillez saisir un numéro de téléphone valide (format : 70xxxxxxx, 75xxxxxxx, 76xxxxxxx, 77xxxxxxx, 78xxxxxxx).',
      });
      return;
    }
  
    // Validate password length
    if (this.registerPassword.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur!',
        text: 'Le mot de passe doit contenir au moins 8 caractères.',
      });
      return;
    }
  const data = {
    name: this.username,
    email: this.registerEmail,
    adresse: this.adresse,
    phone: this.phone,
    password: this.registerPassword,
  };

  this.authService.register(data.name, data.email, data.adresse , data.phone, data.password).subscribe(
    (response) => {
      console.log('Réponse d\'inscription:', response);
      this.setIsSignIn(true);
    },
  );
  }
  setIsSignIn(value: boolean): void {
    this.isSignIn = value;
  }

  login() {
    if (!this.email || !this.password) {

      Swal.fire({
        icon: 'error',
        title: 'Erreur!',
        text: 'Veuillez remplir de bonne donnee.',
      });
      return;
    }
  
    const data = {
      email: this.email,
      password: this.password,
    };
  
    this.authService.login(data.email, data.password).subscribe(
      (response: AuthResponse) => {
        console.log(response.user);
        console.log(response.token);
        localStorage.setItem('token', JSON.stringify(response.token).replace(/['"]+/g, ''));
  
        if (response.user.role_id === 1) {
          this.router.navigate(['/admin']);
        } else if (response.user.role_id === 2) {
          this.router.navigate(['/restaurant']);
        } else if (response.user.role_id === 3) {
          this.router.navigate(['/profil']);
        } else {
          console.error("Rôle non reconnu :", response.user.role_id);
        }
      },
      (error) => {
        console.error("voici l'erreur", error);
        this.handleError(error);
      }
    );
  }
   
  private handleError(error: any): void {
    Swal.fire({
      icon: 'error',
      title: 'Erreur!',
      text: "Veiller vous inscrire ce compte n'existe pas",
    });
    
  }
  logout(): void {
    this.authService.logout();
  }

  @ViewChild('container') container!: ElementRef;

  onSignUpClick() {
    this.container.nativeElement.classList.add('sign-up-mode');
  }

  onSignInClick() {
    this.container.nativeElement.classList.remove('sign-up-mode');
  }

  toggleForm() {
    this.isSignIn = !this.isSignIn;
  }
}
