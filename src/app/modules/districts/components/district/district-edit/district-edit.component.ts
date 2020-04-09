import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {City} from '../../../interfaces/city';
import {Observable, of} from 'rxjs';
import {catchError, debounceTime, map, startWith, switchMap} from 'rxjs/operators';
import {District} from '../../../interfaces/district';
import {MatTableDataSource} from '@angular/material/table';
import {DistrictService} from '../../../services/district.service';
import {CityService} from '../../../services/city.service';
import {MessageService, Type} from '../../../../../core/ui/services/message.service';
import {Message} from '../../../../../core/ui/interfaces/message';

@Component({
  selector: 'app-district-edit',
  templateUrl: './district-edit.component.html',
  styleUrls: ['./district-edit.component.styl']
})
export class DistrictEditComponent implements OnInit {

  // variables pour le stepper
  isLinear = true;

  // groupement de formulaire
  districtFormGroup: FormGroup;
  prefectureFormGroup: FormGroup;

  // variables pour les autocompletes
  options: Array<City>;
  filteredOptionsPrefecture: Observable<Array<City>>;
  filteredOptionsSousPrefecture: Observable<Array<City>>;

  @Input() IdComponentData: number | null; // Data issues du component parant dans le chargement dynamique

  dataBeforeUpdate: District; // Sauvegarde du département à sauvegarder

  private _nbrDistricts; // nombre total de département

  /**
   * @constructor
   * @param {FormBuilder} _formBuilder
   * @param {CityService} _cityService
   * @param {DistrictService} _districtService
   * @param {MessageService} _messageService
   */
  constructor(private _formBuilder: FormBuilder,
              private _districtService: DistrictService,
              private _cityService: CityService,
              private _messageService: MessageService) {
  }

  /**
   * @description initialise la page avec les formualaires et les données issus de la liste
   */
  ngOnInit(): void {
    // premier groupe de formulaire
    this.districtFormGroup = this._formBuilder.group({
      departement_code: ['', Validators.required],
      departement_nom: ['', Validators.required],
    });

    // 2nd groupe de formulaire
    this.prefectureFormGroup = this._formBuilder.group({
      departement_prefecture: ['', Validators.required],
      departement_sous_prefecture: ['', Validators.required],
    });

    // set des values dans le cas de l'edition
    if(this.IdComponentData){
      this._districtService.getDistrictById(this.IdComponentData).subscribe(
        (dataDistrict) => {
          this.dataBeforeUpdate = dataDistrict;
          this.districtFormGroup.controls.departement_code.setValue(dataDistrict.departement_code);
          this.districtFormGroup.controls.departement_nom.setValue(dataDistrict.departement_nom);
          this._cityService.getCityById(dataDistrict.departement_prefecture).subscribe(
            (dataCity) => {
              this.prefectureFormGroup.controls.departement_prefecture.setValue( dataCity);
            });
          this._cityService.getCityById(dataDistrict.departement_sous_prefecture).subscribe(
            (dataCity) => {
              this.prefectureFormGroup.controls.departement_sous_prefecture.setValue( dataCity);
            });
        }
      );
    }

    // récipérations des villes pour les autocompletes
    this._cityService.getAllCities().subscribe(
      (data:Array<City>)=>{
        this.options = data;

        this.filteredOptionsPrefecture = this.prefectureFormGroup.controls.departement_prefecture.valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.ville_nom),
            map(name => name ? this._filter(name) : this.options.slice())
          );

        this.filteredOptionsSousPrefecture = this.prefectureFormGroup.controls.departement_sous_prefecture.valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.ville_nom),
            map(name => name ? this._filter(name) : this.options.slice())
          );
      }
    );

    // count des departements
    this._districtService.getAllDistricts().subscribe(
      (data) => {
        this._nbrDistricts = data.length;
      }
    );
  }

  /**
   * @name displayFn
   * @description permet d'afficher le nom de la ville dans le input de l'autocomplete
   * @param {City} city
   * @return {string} nom de la ville
   */
  displayFn(city: City): string {
    return city && city.ville_nom ? city.ville_nom : '';
  }

  /**
   * @name save
   * @description sauvegarde un département
   */
  save(): void {
    if (this.dataBeforeUpdate){ // cas de la modification d'un département

      // création du département à modifier
      const dataToSave: District = {
        id: this.dataBeforeUpdate.id,
        departement_code: this.districtFormGroup.value.departement_code,
        departement_nom: this.districtFormGroup.value.departement_nom,
        departement_nom_uppercase: this.districtFormGroup.value.departement_nom.toUpperCase(),
        departement_prefecture: this.prefectureFormGroup.value.departement_prefecture.id,
        departement_sous_prefecture: this.prefectureFormGroup.value.departement_sous_prefecture.id
      };

      if (this.dataBeforeUpdate !== dataToSave){ // on vérifie si il y a eu des modification sur ce département
        // mise à jour du département
        this._districtService.updateDistrict(dataToSave).subscribe(
          (updateDistrict) => {
            // affichage du message
            const messageFull: Message = {
              type: Type.Success,
              title: 'Modification du département',
              message: `La modification du département <i>${updateDistrict.departement_nom}</i> a correctement été effectué`
            };

            this._messageService.add(messageFull);
          }
        );
      } else { // si il n'y a pas eu de modification, on prévient l'utilisateur
        const messageFull: Message = {
          type: Type.Warning,
          title: 'Modification du département',
          message: `Aucune modification n'a été apporté à ce département`
        };

        this._messageService.add(messageFull);
      }
    } else { // cas d'un ajout de département

      // création de l'objet département
      const dataToSave: District = {
        id: this._nbrDistricts + 2,
        departement_code: this.districtFormGroup.value.departement_code,
        departement_nom: this.districtFormGroup.value.departement_nom,
        departement_nom_uppercase: this.districtFormGroup.value.departement_nom.toUpperCase(),
        departement_prefecture: this.prefectureFormGroup.value.departement_prefecture.id,
        departement_sous_prefecture: this.prefectureFormGroup.value.departement_sous_prefecture.id
      };

      // enregistrement du département
      this._districtService.createDistrict(dataToSave).subscribe(
        (newDistric) => {
          // incrémentation du nombre de département
          this._nbrDistricts++;

          // envoie du message
          const messageFull: Message = {
            type: Type.Success,
            title: 'Enregistrement du département',
            message: `L'enregistrement du département <i>${newDistric.departement_nom}</i> a correctement été effectué`
          };

          this._messageService.add(messageFull);
        }
      );
    }
  }

  /**
   * @name _filter
   * @description permet de filtrer les villes dans l'autocomplete
   * @param {string} name
   * @return {Array<City>} liste des villes correspondant au filtre
   * @private
   */
  private _filter(name: string): Array<City> {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.ville_nom.toLowerCase().indexOf(filterValue) === 0);
  }

}
