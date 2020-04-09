import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../interfaces/user';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

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
