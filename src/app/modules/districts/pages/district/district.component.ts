import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {DistrictContentDirective} from '../../directives/district-content.directive';
import {DistrictService} from '../../services/district.service';
import {DistrictListComponent} from '../../components/district/district-list/district-list.component';
import {DistrictEditComponent} from '../../components/district/district-edit/district-edit.component';
import {DistrictDeleteComponent} from '../../components/district/district-delete/district-delete.component';
import {CityListComponent} from '../../components/city/city-list/city-list.component';
import {CityEditComponent} from '../../components/city/city-edit/city-edit.component';
import {CityDeleteComponent} from '../../components/city/city-delete/city-delete.component';
import {Observable} from 'rxjs';
import {LoadDynamicComponentService} from '../../../../core/utils/services/load-dynamic-component.service';
import {CityService} from '../../services/city.service';
import {ComponentToLoad, IdComponentData} from '../../../../core/utils/interfaces/component-to-load';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.styl']
})
export class DistrictComponent implements OnInit {

  // directive utilisée pour l'affichage dynamique des départements
  @ViewChild(DistrictContentDirective, {static: true}) appDistrictContent: DistrictContentDirective;

  /**
   * @constructor
   * @param {ComponentFactoryResolver} _componentFactoryResolver
   * @param {DistrictService} _districtService
   * @param {CityService} _cityService
   * @param {LoadDynamicComponentService} _loadDynamicComponentService
   */
  constructor(private _componentFactoryResolver: ComponentFactoryResolver,
              private _districtService: DistrictService,
              private _cityService: CityService,
              private _loadDynamicComponentService: LoadDynamicComponentService) {}

  /**
   * @description initialisation des départements
   */
  ngOnInit(): void {
    this.loadComponent('district-list');
  }

  /**
   * @name loadComponent
   * @description chargement dynamique du component à afficher
   * @param {string} componentNameToLoad - Nom du composant à charger
   * @param {number} idToLoad - Data à transmettre au composant chargé
   */
  loadComponent(componentNameToLoad: string, idToLoad?: number): void{
    let componentFactory;

    // définition du composant à charger en fonction du nom du composant passé en paramètre
    switch (componentNameToLoad) {
      default:
      case 'district-list':
        componentFactory = this._componentFactoryResolver.resolveComponentFactory(DistrictListComponent);
        break;

      case 'district-edit':
        componentFactory = this._componentFactoryResolver.resolveComponentFactory(DistrictEditComponent);
        break;

      case 'district-delete':
        componentFactory = this._componentFactoryResolver.resolveComponentFactory(DistrictDeleteComponent);
        break;

        case 'city-list':
        componentFactory = this._componentFactoryResolver.resolveComponentFactory(CityListComponent);
        break;

      case 'city-edit':
        componentFactory = this._componentFactoryResolver.resolveComponentFactory(CityEditComponent);
        break;

      case 'city-delete':
        componentFactory = this._componentFactoryResolver.resolveComponentFactory(CityDeleteComponent);
        break;
    }

    // on charge le component dans la directive
    const viewContainerRef = this.appDistrictContent.viewContainerRef; // TODO rajouter le type
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory); // TODO rajouter le type
    (componentRef.instance as IdComponentData).IdComponentData = idToLoad;
    /**
     * Ecoute de l'observable pour pouvoir changer le component à afficher
     * Ex. Bouton ajouter un nouveau département dans le component district-list
     * au click sur ce bouton on a un setComponentToLoad qui est réalisé
     */
    const componentToload: Observable<ComponentToLoad> = this._loadDynamicComponentService.getComponentToLoad();
    if (componentToload) {
      componentToload.subscribe(
        (value) => {
          /**
           * si un id est définit,
           * on doit envoyer le département lié à cet id, au component qui sera chargé
           */
          value.idToLoad !== undefined
            ? this.loadComponent(value.componentNameToLoad, value.idToLoad)
            : this.loadComponent(value.componentNameToLoad);
        });
    }
  }
}
