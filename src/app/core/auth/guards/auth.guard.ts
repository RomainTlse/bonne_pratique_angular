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
