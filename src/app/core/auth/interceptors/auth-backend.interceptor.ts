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
