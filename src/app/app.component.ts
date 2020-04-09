import {Component, OnInit} from '@angular/core';
import {LoaderService} from './core/ui/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {
  title: string;
  message: string;

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.title = 'bonne-pratique-web';
    this.message = '...Chargement de l\'application...';
  }

  loaderGo(){
    this.loaderService.startLoading();
  }
}
