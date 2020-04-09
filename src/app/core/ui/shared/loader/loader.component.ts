import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {LoaderService} from '../../services/loader.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.styl']
})
export class LoaderComponent implements OnInit {

  @Input() message: string;
  @Input() displayStart: boolean;

  showLoader: boolean;
  loaderSubscription: Observable<boolean>;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.displayStart ? this.showLoader = this.displayStart : this.showLoader = false;
    this.loaderSubscription = this.loaderService.getShowLoader$();
    this.loaderSubscription.subscribe(
      (value) => {
        this.showLoader = value;
      });
  }
}
