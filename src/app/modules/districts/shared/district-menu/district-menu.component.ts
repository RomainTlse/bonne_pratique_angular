import { Component, OnInit } from '@angular/core';
import {LoadDynamicComponentService} from '../../../../core/utils/services/load-dynamic-component.service';

@Component({
  selector: 'app-district-menu',
  templateUrl: './district-menu.component.html',
  styleUrls: ['./district-menu.component.styl']
})
export class DistrictMenuComponent implements OnInit {

  constructor(private _loadDynamicComponentService: LoadDynamicComponentService) { }

  ngOnInit(): void {
  }

  /**
   * @name loadComponent
   * @description cette fonction va setter la composant à charger dans le composent district ainsi que l'id, di besoin (Edit et delete)
   * @param {string} componentNameToLoad
   * @param {number} idToLoad
   */
  loadComponent(componentNameToLoad: string, idToLoad?: number): void {
    this._loadDynamicComponentService.setComponentToLoad(componentNameToLoad, idToLoad);
  }
}
