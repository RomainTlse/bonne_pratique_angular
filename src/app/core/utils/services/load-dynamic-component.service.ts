import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ComponentToLoad} from '../interfaces/component-to-load';

@Injectable({
  providedIn: 'root'
})
export class LoadDynamicComponentService {

  public data$: Observable<ComponentToLoad>;
  private componentToLoad: Subject<ComponentToLoad>;

  /**
   * @constructor
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {
    this.componentToLoad = new Subject<ComponentToLoad>();
    this.data$ = this.componentToLoad.asObservable();
  }

  /**
   * @name getComponentToLoad
   * @description get du component à afficher dans le component district
   * @return {Observable<ComponentToLoad>}
   */
  getComponentToLoad(): Observable<ComponentToLoad> {
    return this.data$;
  }

  /**
   * @name setComponentToLoad
   * @description on définit le nom du composant à charger ainsi que l'id du departement dans le cas de l'edition et la suppression
   * @param componentNameToLoad
   * @param id
   */
  setComponentToLoad(componentNameToLoad: string, idToLoad?: number): void {

    const dataNext = {
      componentNameToLoad,
      idToLoad
    };
    this.componentToLoad.next(dataNext);
  }
}
