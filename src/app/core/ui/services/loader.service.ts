import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  _showLoader$: Observable<boolean>;
  private _loadingStatus: Subject<boolean>;

  constructor() {
    this._loadingStatus = new Subject<boolean>();
    this._showLoader$ = this._loadingStatus.asObservable();
  }

  getShowLoader$(): Observable<boolean> {
    return this._showLoader$;
  }

  startLoading() {
    this._loadingStatus.next(true);
  }

  stopLoading() {
    this._loadingStatus.next(false);
  }
}

// https://nezhar.com/blog/create-a-loading-screen-for-angular-apps/
