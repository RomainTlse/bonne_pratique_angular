# Présentation du tutoriel

Le but de ce tutoriel est de développer une application Angular single page, organisé en module et utilisant Material
 
# Mise en place de l'environnement 

Le tutoriel suivant est basé sur :

 - nodejs v13.11.0 (https://nodejs.org/fr/)
 - npm 6.14.3 
 - yarn 1.22.4 (https://yarnpkg.com/)
 
 ## Installation de l'environnement

 ### Angular
 
 #### installation d'Angular
 Commençons par installer angular CLI, qui vous permettra de créer la nouvelle application, les components, les services, etc. etc...
 
```
yarn global add @angular/cli
```

Pour ce tutoriel, j'ai fait le choix d'utiliser yarn comme package manager 
```
ng config -g cli.packageManager yarn
```

Création de l'application
```
ng new bonne-pratique-web --routing --strict --style=styl
``` 

L'option _--routing_ permet de génèrer un module de routage pour le projet initial.

L'option _--routing_ créé un espace de travail avec des options de compilateur TypeScript plus strictes.

L'option _--style=styl_  définit stylus comme préprocesseur à utiliser pour les fichiers de style.


Lorsque l'installation est terminée, vous pouvez lancer le projet :

```
ng serve -o
``` 

#### installation d'Angular material

```
ng add @angular/material
```

### Json-server

Pour ce tutoriel vous aurez besoin de simuler des appels à une API REST. Pour celà, vous allez utiliser json-server.

Dans un nouveau terminal :

```
yarn global add json-server
```

À la racine de votre projet il vous faut créer un fichier db.json :

``` json
{
     "cities": [],
     "districts":[],
     "countries":[]
 }
```

Lorsque l'installation est terminée, vous pouvez lancer le serveur :

```
json-server --watch db.json
```

Pour accèder aux différentes pages, vous aurez les URLs suivantes : 

```
http://localhost:3000/cities
```

```
http://localhost:3000/districts
```

```
http://localhost:3000/countries
```

# Objectif à atteindre 

Voici là structure initiale  du projet, après le ng new:

```
.
├── angular.json
├── browserslist
├── db.json
├── e2e
│   ├── protractor.conf.js
│   ├── src
│   │   ├── app.e2e-spec.ts
│   │   └── app.po.ts
│   └── tsconfig.json
├── karma.conf.js
├── node_modules
│   ├── ...
│   └── ...
├── package.json
├── README.md
├── src
│   ├── app
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   ├── app.component.styl
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── app-routing.module.ts
│   ├── assets
│   ├── environments
│   │   ├── environment.prod.ts
│   │   └── environment.ts
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   ├── polyfills.ts
│   ├── styles.styl
│   └── test.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.spec.json
├── tslint.json
└── yarn.lock
```


L'objectif de ce tutoriel est d'arrivé à la structure suivante :

```
.
├── angular.json
├── browserslist
├── db.json
├── e2e
│   ├── protractor.conf.js
│   ├── src
│   │   ├── app.e2e-spec.ts
│   │   └── app.po.ts
│   └── tsconfig.json
├── karma.conf.js
├── node_modules
│   ├── ...
│   └── ...
├── package.json
├── README.md
├── src
│   ├── app
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   ├── app.component.styl
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── app-routing.module.ts
│   │   ├── core
│   │   │   └── auth
│   │   └── modules
│   │       └── countries
│   ├── assets
│   ├── environments
│   │   ├── environment.prod.ts
│   │   └── environment.ts
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   ├── polyfills.ts
│   ├── styles.styl
│   ├── test.ts
│   └── variables.styl
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.spec.json
├── tslint.json
└── yarn.lock
```

# initialisation du projet

Pour commencer, vous allez créer dans `src/app` les répertoires core et modules.

```
cd src/app

mkdir core modules
```

Pour gérer les variables stylus, vous allez créer un fichier `variables.styl` dans `src`

```
cd ..

nano variables.styl
```

Pour ce projet, voici les couleurs utilisées :

```
// couleur principale
$backgroundAnthracite = #303030;
$colorText = #BDBDBD;
$raspberry = #C72C48;

// couleur secondaire
$backgroundSecondary = #3D3D3D;
$green = #7BC736;
$blue = #0F7A5F;
```

et mettre à jour le fichier `angular.json`

```json
{
  "projects": {
    "bonne-pratique-web": {
      "architect": {
        "build": {
          "options": {
//options à rajouter 
            "stylePreprocessorOptions": {
              "includePaths": [
                "src/"
              ]
            }
          }
        }
      }
    }
  }
}
```

`stylePreprocessorOptions` permet de définir la baseUrl pour notre fichier de variables, ce qui permettra de n'avoir à rajouter que l'import suivant dans les fichiers `.styl` où il y aura besoin des variables :

```css
@import 'variables';
```

Vous allez, enfin, mettre à jour le fichier `sytles.styl`

```css
/* You can add global styles to this file, and also import other style files */

body
  margin: 0
  font-family: Roboto, "Helvetica Neue", sans-serif

html, body
  height: 100%
*
  box-sizing: border-box
```


# `core` 

le module core sera le coeur de notre application. Il sera commun à tous les modules.
Nous y retrouverons la page d'authentification, la page d'erreur (page not found) et les IHM communes à tous les modules, tel que le loader, les messages ou les menus.

## module `Auth`

Le module `Auth` aura pour objectif le traitement de l'authentification et les services liés.

```
auth
├── auth.module.ts
├── guards
│   ├── auth.guard.spec.ts
│   └── auth.guard.ts
├── interceptors
│   ├── auth-backend.interceptor.spec.ts
│   ├── auth-backend.interceptor.ts
│   ├── token.interceptor.spec.ts
│   └── token.interceptor.ts
├── interfaces
│   └── user.ts
├── pages
│   └── login
│       ├── login.component.html
│       ├── login.component.spec.ts
│       ├── login.component.styl
│       ├── login.component.ts
│       ├── login.module.ts
│       └── login-routing.module.ts
└── services
    ├── auth.service.spec.ts
    └── auth.service.ts
```

### le module `auth.module.ts`

commencez par créer le module `auth` dans le core avec Angular CLI

```
ng g m core/auth --module=app
```
`ng g m core/auth` permet de créer le module `auth` dans le répertoire `core`

le fichier `auth.module.ts` créé, sera le suivant : 

```
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }

```
`--module=app` permet de mettre à jour le module `app` avec ce nouveau module.

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './core/auth/auth.module'; /* <-- ligne ajoutée*/ 

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule /* <-- ligne ajoutée*/
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### les pages
#### page `login`

Ce component sera structuré de la manière suivante
```
    └── login
        ├── login.component.html
        ├── login.component.spec.ts
        ├── login.component.styl
        ├── login.component.ts
        ├── login.module.ts
        └── login-routing.module.ts

```

##### création du module et module de routage `login`
```
ng g m core/auth/pages/login --routing --module=core/auth
```

`ng g m core/auth/pages/login` permet de créer le module `login.module.ts` dans le répertoire `src/app/core/auth/pages/login`

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
```

`--routing` permet de créer le module de routage `login-routing.module.ts` dans le répertoire `src/app/core/auth/pages/login`

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }

```

`--module=core/auth` permet de mettre à jour le module auth.module :

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './pages/login/login.module'; /* <-- ligne ajoutée*/



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginModule /* <-- ligne ajoutée*/
  ]
})
export class AuthModule { }

```

1ère étapes, définir la route de la page de login dans `login-routing.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }

```

2ème étape, nous allons mettre à jour `login.module.ts` avec 

1. les modules à importer.

Pour ce component nous aurons besoin de :
- angular material,
    + MatInput (pour le design des champs input du formulaire)
    + MatButton et MatButtonToggle (pour le design des boutons du formulaires)
- reactive forms

2. les providers 

`login.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {ReactiveFormsModule} from '@angular/forms';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material/core';
import {fakeBackendProvider} from '../../interceptors/auth-backend.interceptor';
import {TokenInterceptor} from '../../interceptors/token.interceptor';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    LoginRoutingModule,
  ],
  declarations: [
    LoginComponent,
  ],
  entryComponents: [
    LoginComponent,
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: '' } },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    fakeBackendProvider
  ],
})
export class LoginModule { }


```

##### création du component `login`

```
ng g c core/auth/pages/login --module=core/auth/pages/login
```

`ng g c core/auth/pages/login` permet de créer le component login. les fichiers suivants seront créés :

`src/app/core/auth/pages/login/login.component.styl`
`src/app/core/auth/pages/login/login.component.html`
`src/app/core/auth/pages/login/login.component.spec.ts`
`src/app/core/auth/pages/login/login.component.ts`
 
 `login.component.html`
 
 Cette page contient un imput pour le _username_, un input pour le _password_ et un bouton _submit_
 le username et le password sont obligatoires.
 
 ```html
<section class="section--login">
  <div class="container--login">
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <mat-form-field class="form-field-full-width">
        <mat-label>Username</mat-label>
        <input matInput required formControlName="username">
        <mat-error *ngIf="username.errors.required && username.invalid && (username.dirty || username.touched)">
            Name is required.
        </mat-error>
      </mat-form-field>
      <mat-form-field class="form-field-full-width">
        <mat-label>Password</mat-label>
        <input matInput required formControlName="password">
        <mat-error *ngIf="password.errors.required && password.invalid && (password.dirty || password.touched)">
          Name is required.
        </mat-error>
      </mat-form-field>
      <button mat-button type="submit" [disabled]="!loginForm.valid">Connexion</button>
    </form>
  </div>
</section>

```
 
`login.component.styl`

```
@import 'variables';

.section--login
  width: 100%
  height: 100vh
  background-color: $backgroundAnthracite
  display: flex
  -webkit-box-align: center

  .container--login
    margin: auto
    width: 500px
    height: 220px
    padding: 15px
    background-color: $backgroundSecondary
    -webkit-box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.9)
    -moz-box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.9)
    box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.9)
    color: $colorText

    .form-field-full-width
      width: 100%
      margin: 10px
``` 
 
 `login.component.ts`
 
 ```typescript
import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;

  /**
   * @constructor
   * @param formBuilder
   * @param route
   * @param router
   * @param authService
   */
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { }

  /**
   * @name ngOnInit
   * @description Déconnexion de l'utilisateur (supprime le token dans le localstorage),
   * @description Récupération l'url demandé si il y a eu redirection
   */
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.authService.logout();
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  /**
   * @name onSubmit
   * @description submission du formulaire
   */
  onSubmit() {
    const { value, valid } = this.loginForm;

    if (valid) {
      this.authService.login(value.username, value.password).pipe(first())
        .subscribe(data => {
          this.router.navigate(['']);
        }, error => {
          console.log(error);
        });
    }
  }

  /**
   * @name get username()
   * @description permet de ne retourner que la partie username du formulaire
   * @return {AbstractControl} username
   */
  get username(): AbstractControl {
      return this.loginForm.get('username');
  }

  /**
   * @name get password()
   * @description permet de ne retourner que la partie password du formulaire
   * @return {AbstractControl} password
   */
  get password(): AbstractControl {
      return this.loginForm.get('password');
  }
}

```
 
 ### les services
 
 #### le service `auth`
 
 Pour créer ce service, lancez la commande suivante :
 
 ```
ng g s core/auth/services/auth
```
 
 Ce service propose toutes les fonctions liées à l'authentification :
 - login
 - logout
 - etc...
 
 ```typescript
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../interfaces/user';
import {map} from 'rxjs/operators';

@Injectable()

export class AuthService {

  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  private api = `http://localhost:8000`; // TODO à déplacer dans les fichier d'environement

  /**
   * @constructor
   * @param {HttpClient} http : service http
   */
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * @name get currentUserValue()
   * @description retourne l'utilisateur courant
   * @return User utilisateur courant
   */
  get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   * @name login
   * @description connexion à l'application
   * @param {string} username
   * @param {string} password
   * @return Observable<User>
   */
  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.api}/auth`, { username, password })
      .pipe(
        map(user => {
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return user;
        })
      );
  }

  /**
   * @name logout
   * @description Déconnexion de l'application
   */
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}

```

### les interfaces 
#### interface `user.interface`

Pour la créer :

```
ng g i core/auth/interfaces/User
```
Elle permet de définir le model `user`

```typescript
export interface User {
  id?: number;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  token?: string;
  role?: string;
}
```

### les guards
#### gard `auth.guard`

```
ng g g core/auth/guards/auth
```

Ce guard est créer pour permettre d'accèder à un end point seulement si on est connecté en admin

```typescript
import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   * @constructor
   * @param router
   * @param authService
   */
  constructor(private router: Router,
              private authService: AuthService) { }

  /**
   * @name canActivate
   * @description accède à la route seulement si on est connecté en admin
   * @param next
   * @param state
   */
  canActivate( next: ActivatedRouteSnapshot,
               state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Récupération de l'utilisateur
    const currentUser = this.authService.currentUserValue;
    // Si l'utilisateur est connecté et qu'il est administrateur
    if (currentUser && currentUser.role === 'admin') {
      return true;
    }
    this.router.navigate(['/authentication']);
    return false;
  }
}
```

### les interceptors 
#### interceptor `auth-backend.interceptor` 
 
 ```
ng g interceptor core/auth/interceptors/authBackend
```
 Ce interceptor permet de gérer l'authentification sans avoir de sever lancé.
 Ainsi, lorsque la requête d'authentification est lancé par le client, elle est intercepté par cet interceptor qui va simuler l'authentification.
 
 ```typescript
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HTTP_INTERCEPTORS
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {User} from '../interfaces/user';
import {delay, dematerialize, materialize, mergeMap} from 'rxjs/operators';

@Injectable()
export class AuthBackendInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Création de 2 utilisateurs, avec un rôle différent
    const users: User[] = [
      { id: 1, username: 'admin', password: 'pwdadmin', firstName: 'admin', lastName: 'admin', email: 'admin@exemple.com', role: 'admin' },
      { id: 2, username: 'user', password: 'pwduser', firstName: 'User', lastName: 'User', email: 'user@exemple.com', role: 'user' }
    ];

    // Ajout un delai pour simuler l'API
    return of(null).pipe(mergeMap(() => {

      /**
       * Si la requête pointe sur le end point "/auth" et qu'il s'agit d'un POST
       * On récupére les identifiants dans la requête pour les comparer avec notre tableau ci dessus
       */
      if (request.url.endsWith('/auth') && request.method === 'POST') {
        const user = users.find(x => x.username === request.body.username && x.password === request.body.password);
        if (!user) {
          return error('Le username ou le password est incorect ');
        }
        // Map les informations de l'utilisateur pour les retourner
        return ok({
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          token: `fake-jwt-token`,
          role: user.role
        });
      }
    return next.handle(request);

    }))
      // appelle materialize et dematerialize pour s'assurer d'ajouter un delai même si un erreur est levée
      // (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function ok(body) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message) {
      return throwError({ status: 400, error: { message } });
    }
  }
}

export let AuthBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: AuthBackendInterceptor,
  multi: true
};
```
 
#### interceptor `token.interceptor`

 ```
ng g interceptor core/auth/interceptors/token
```

Cet interceptor permet, une fois que l'utilisateur est connecté, de renseigner le token pour toutes nouvelles requêtes.

```typescript
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /**
     * définition du heaser pour un retour de la requête au format json
     * et initialisation de l'autorisation du header
     */
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: ''
    };

    // mise à jour de token d'authentification avec le token du client
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.token) {
      headers.Authorization = `Bearer ${currentUser.token}`;
    }
    const req = request.clone({ setHeaders: headers });
    return next.handle(req);
  }
}
```

## le module `errors`

le module `errors` aura pour objectif la gestion des erreurs et leur affichage.

Voici les différents cas d'errueur :

- route non trouvée (erreur 404)
- erreur serveur lors d'une requête (erreur 5XX et 4XX autre que 404)
- erreur produite par le code lui-même

Dans le cas d'une erreur 404, l'utilisateur sera redirigé vers une page spécifique.
dans le cas d'erreur serveur ou client, un message d'erreur s'affichera.

le module errors sera structuré de la manière suivante :

```
errors
├── errors.module.ts
├── interceptors
│   ├── http-errors-handler.interceptor.spec.ts
│   └── http-errors-handler.interceptor.ts
├── pages
│   └── not-found
│       ├── not-found.component.html
│       ├── not-found.component.spec.ts
│       ├── not-found.component.styl
│       ├── not-found.component.ts
│       ├── not-found.module.ts
│       └── not-found-routing.module.ts
└── services
    ├── errors-handler.service.spec.ts
    └── errors-handler.service.ts
```

### `errors.module.ts`

Création du module :

```
ng g m core/errors --module=app
```

TODO
```typescript

```

### les pages
#### page `not-found`

```
pages
└── not-found
    ├── not-found.component.html
    ├── not-found.component.spec.ts
    ├── not-found.component.styl
    ├── not-found.component.ts
    ├── not-found.module.ts
    └── not-found-routing.module.ts

```

##### création du module et module de routage `not-found`
```
ng g m core/errors/pages/not-found --routing --module=core/errors
```

##### création du component `not-found`

```
ng g c core/errors/pages/not-found --module=core/errors/pages/not-found
``` 

`not-found.module.ts`

Dans le module vous aurez à rajouter les imports pour les modules de material pour les boutons et les incones 

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './not-found.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    NotFoundRoutingModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
  ]
})
export class NotFoundModule { }

```

`not-found-routing.module.ts`

Le routeur peut prendre une chaîne générique (**). 
Le routeur sélectionnera cette route si l'URL demandée ne correspond à aucun chemin pour les routes définies. 
la page `not-found` sera alors affichée

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotFoundComponent} from './not-found.component';


const routes: Routes = [
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotFoundRoutingModule { }

```

`not-found.component.html`

```html
<section class="section--notFound">
  <div class="container--notFound flex-container">
    <div class="flex-item oups--img">
      <img src="assets/images/oups.png">
    </div>
    <div class="flex-item notFound--img">
      <img src="assets/images/404.png">
      <p>Page Introuvable</p>
      <a routerLink="">
        <button mat-raised-button color="primary">
          Retour à l'accueil <mat-icon aria-hidden="false" aria-label="accueil">home</mat-icon>
        </button>
      </a>
    </div>
  </div>
</section>
```

`not-found.component.styl`

```
@import 'variables';
@import url('https//fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.section--notFound
  width 100%
  height 100vh
  background-color $backgroundAnthracite
  display flex
  -webkit-box-align center

  .container--notFound
    margin auto
    width 1200px
    height 500px
    padding 15px
    background-color $backgroundSecondary
    -webkit-box-shadow 0 0 8px 0 rgba(0,0,0,0.9)
    -moz-box-shadow 0 0 8px 0 rgba(0,0,0,0.9)
    box-shadow 0 0 8px 0 rgba(0,0,0,0.9)
    color $colorText

    .oups--img
      width 40%
      height 100%

      img
        max-width 100%
        max-height 100%

    .notFound--img
      width 60%
      height 100%
      text-align center

      img
        max-width 100%
        max-height 100%
        margin-bottom 25px

      p
        font-family 'Press Start 2P', cursive;
        font-size 24px
        margin-bottom 25px

```

`not-found.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.styl']
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
```

 ### les services
 
 #### le service `errors-handler`
 
 Pour créer ce service, lancez la commande suivante :
 
 ```
ng g s core/errors/services/errorsHandler
```

TODO

### les interceptors 
#### interceptor `http-errors-handler.interceptor` 
 
 ```
ng g interceptor core/errors/interceptors/httpErrorsHandler
```
 TODO


## le module `ui`

Ce module contient les composents graphiques commun à tous les modules, toutes les pages

 la structure de ce module sera la suivante :
 ```
TODO
```

Commencez par créer le module `ui.module`

```
ng g m core/ui --module=app
```

`ui.module.ts`

```typescript

TODO
```

### les composents `shared`

#### Composent `loader`

Ce composant affichera le loader

```
ng g c core/ui/shared/loader --module=core/ui
```

```
loader
├── loader.component.html
├── loader.component.spec.ts
├── loader.component.styl
└── loader.component.ts
```

`loader.component.html`

```html
TODO
```

`loader.component.styl`

```
TODO
```

`loader.component.ts`
```typescript
TODO
```

#### Composent `menu`

Ce composant affichera le menu global de l'application

```
ng g c core/ui/shared/menu --module=core/ui
```

```
menu
├── menu.component.html
├── menu.component.spec.ts
├── menu.component.styl
└── menu.component.ts
```

`loader.component.html`

```html
TODO
```

`loader.component.styl`

```
TODO
```

`loader.component.ts`
```typescript
TODO
```

#### Composent `message`

Ce composent sera utilisé pour affiché les messages. 4 types de format sont définis :
 
 - success
 - error
 - warning
 - info
 
```
ng g c core/ui/shared/message --module=core/ui
```

```
messages
├── message.component.html
├── message.component.spec.ts
├── message.component.styl
└── message.component.ts
```

`message.component.html`

```html
TODO
```

`message.component.styl`

```
TODO
```

`message.component.ts`
```typescript
TODO
```

### les services

#### `loader`

```
ng g s core/ui/services/loader
```

```typescript
TODO
```

#### `menu`

```
ng g s core/ui/services/menu
```

```typescript
TODO
```

#### `message`

```
ng g s core/ui/services/message
```

```typescript
TODO
```

Enfin, vous allez créer les interfaces

### les interfaces
#### interface `Message`

```
ng g i core/ui/interfaces/message
```

```
export interface Message {
  type: string;
  title: string;
  message: string;
}
```

La partie `core` est terminée. Vous allez maintenant passer à la création des différents modules.

# `modules`

le module `districts` et le module `countries` seront créer dans se tutoriel

Dans ces deux modules, vous retrouverez :
- `component` contenant les composants d'affichage
- `directives`  
- `interfaces` 
- `pages` contenant les composants de pages avec leur propore module et module de routage
- `pipes`
- `resolvers`
- `services`
- `shared` contenant les composants d'affichage partagé par toutes les pages

## module `districts`

ce module va gérer la liste des départements avec le nom de sa préfecture et de ses sous-préfectures

le module aura l'architecture suivante :

```
TODO
```

Création du module `districts`

```
ng g m modules/districts --module=app
```

`districts.module.ts`

```typescript
TODO
```

### les composentes `pages`

#### le composant `districts`

```
districts
├── districts.component.html
├── districts.component.spec.ts
├── districts.component.styl
├── districts.component.ts
├── districts.module.ts
└── districts-routing.module.ts
```

Pour commencer, vous allez créer la page `districts` avec son module et son module de routage

```
ng g m modules/districts/pages/districts --routing --module=modules/districts
```
```
ng g c modules/districts/pages/districts --module=modules/districts/pages/districts
```

`districts.module.ts`

```typescript
TODO
```

`districts-routing.module.ts`

```typescript
TODO
```

`districts.component.html`

```typescript
TODO
```

`districts.component.styl`

```typescript
TODO
```

`districts.component.ts`

```typescript
TODO
```


ng g m modules/districts --module=app
 ng g m modules/districts/pages/districts --routing --module=modules/districts
 ng g c modules/districts/pages/districts --routing --modules/districts/pages/districts
 ng g c modules/districts/pages/districts --module=modules/districts/pages/districts
 ng g m modules/districts/pages/districtsPage --routing --module=modules/districts
 ng g m modules/districts/pages/district --routing --module=modules/districts
 ng g c modules/districts/pages/district --module=modules/districts/pages/district
 ng add @fortawesome/fontawesome-svg-core
 ng add @fortawesome/angular-fontawesome
 ng g i core/ui/interfaces/message
 ng g c modules/disticts/components/district/districtList
 ng g c modules/districts/components/district/districtList --module=modules/districts
 ng g c modules/districts/components/district/districtEdit --module=modules/districts
 ng g c modules/districts/components/district/districtDelete --module=modules/districts
 ng g c modules/districts/components/city/cityList --module=modules/districts
 ng g c modules/districts/components/city/cityEdit --module=modules/districts
 ng g c modules/districts/components/city/cityDelete --module=modules/districts
 ng g c modules/districts/components/country/countryList --module=modules/districts
 ng g c modules/districts/components/country/countryEdit --module=modules/districts
 ng g c modules/districts/components/country/countryDelete --module=modules/districts
 ng g d modules/districts/directives/districtContent
 ng g s modules/districts/services/district
 ng g i modules/districts/interfaces/district
 ng g i modules/districts/interfaces/city
 ng g s modules/districts/services/city
 

 
 
 ng g m core/utils --module=app
 
 ng g s core/utils/services/loadDynamicComponent

 ng g i core/utils/interfaces/componentToLoad

 ng g m core/utils --module=app
 
 ng g s core/utils/services/loadDynamicComponent

 ng g i core/utils/interfaces/componentToLoad
 
 
 
 // modules countries
 
  ng g m modules/countries --module=app
  
// pages
  ng g m modules/countries/pages/country --routing --module=modules/countries

  ng g c modules/countries/pages/country --module=modules/countries/pages/country
// components
  
  ng g c modules/countries/components/countryEdit --module=modules/countries/pages/country
  ng g c modules/countries/components/countryList --module=modules/countries/pages/country
  ng g c modules/countries/components/countryDelete --module=modules/countries/pages/country
  
  // directives
  
  ng g d modules/countries/directives/countryContent --module=modules/countries/pages/country
  
  // interfaces
  
  ng g i modules/countries/interfaces/country
  
  //services
  ng g s modules/countries/services/country
  


# BonnePratiqueWeb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
