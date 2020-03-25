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


l'objectif de ce tutoriel est d'arrivé à la structure suivante :

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
│   │       ├── departements
│   │       ├── pays
│   │       └── villes
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
