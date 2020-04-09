import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl'],
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
