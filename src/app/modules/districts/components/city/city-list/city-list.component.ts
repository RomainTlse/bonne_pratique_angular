import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {City} from '../../../interfaces/city';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons';
import {CityService} from '../../../services/city.service';
import {LoadDynamicComponentService} from '../../../../../core/utils/services/load-dynamic-component.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.styl']
})
export class CityListComponent implements OnInit {
// colonnes de la grille
  displayedColumns: string[] = ['id', 'ville_nom', 'ville_code_postal', 'ville_population_2010', 'action'];
  dataSource: MatTableDataSource<City>; // data de la grille

  faEdit = faEdit; // icone d'édition
  faTrashAlt = faTrashAlt; // icone de suppression
  faPlusSquare = faPlusSquare; // icone pour l'ajout

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator; // pagination pour la grille
  @ViewChild(MatSort, {static: true}) sort: MatSort; // trie pour la grille

  /**
   * @constructor
   * @param {CityService} _cityService
   * @param {LoadDynamicComponentService} _loadDynamicComponentService
   */
  constructor(private _cityService: CityService,
              private _loadDynamicComponentService: LoadDynamicComponentService) { }

  /**
   * @name ngOnInit
   * @description initialisation du component avec les infos nécessaires pour la grille
   */
  ngOnInit(): void {
    this._cityService.getAllCities().subscribe(
      (data: Array<City>)=>{
        this.dataSource = new MatTableDataSource<City>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  /**
   * @name applyFilter
   * @description fonction utiliser par la grille pour filtrer les valeurs
   * @param {Event} event
   */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
