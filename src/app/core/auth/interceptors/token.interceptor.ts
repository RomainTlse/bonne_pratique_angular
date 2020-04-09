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
