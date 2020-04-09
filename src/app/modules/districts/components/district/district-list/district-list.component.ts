import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {District} from '../../../interfaces/district';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons';
import {DistrictService} from '../../../services/district.service';
import {LoadDynamicComponentService} from '../../../../../core/utils/services/load-dynamic-component.service';

@Component({
  selector: 'app-district-list',
  templateUrl: './district-list.component.html',
  styleUrls: ['./district-list.component.styl']
})
export class DistrictListComponent implements OnInit {
  // colonnes de la grille
  displayedColumns: string[] = ['id', 'departement_code', 'departement_nom', 'departement_nom_uppercase', 'action'];
  dataSource: MatTableDataSource<District>; // data de la grille

  faEdit = faEdit; // icone d'édition
  faTrashAlt = faTrashAlt; // icone de suppression
  faPlusSquare = faPlusSquare; // icone pour l'ajout

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator; // pagination pour la grille
  @ViewChild(MatSort, {static: true}) sort: MatSort; // trie pour la grille

  /**
   * @constructor
   * @param {DistrictService} _districtService
   * @param {LoadDynamicComponentService} _loadDynamicComponentService
   */
  constructor(private _districtService: DistrictService,
              private _loadDynamicComponentService: LoadDynamicComponentService) { }

  /**
   * @name ngOnInit
   * @description initialisation du component avec les infos nécessaires pour la grille
   */
  ngOnInit(): void {
    this._districtService.getAllDistricts().subscribe(
      (data: Array<District>)=>{
        this.dataSource = new MatTableDataSource<District>(data);
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
