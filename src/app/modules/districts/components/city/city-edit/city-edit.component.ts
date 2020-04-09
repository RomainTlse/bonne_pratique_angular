import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CityService} from '../../../services/city.service';
import {City} from '../../../interfaces/city';
import {Message} from '../../../../../core/ui/interfaces/message';
import {MessageService, Type} from '../../../../../core/ui/services/message.service';

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
  styleUrls: ['./city-edit.component.styl']
})
export class CityEditComponent implements OnInit {

  cityFormGroup: FormGroup; // groupement de formulaire

  @Input() IdComponentData: number | null; // Data issues du component parant dans le chargement dynamique

  dataBeforeUpdate: City; // Sauvegarde du département à sauvegarder

  private _nbrCities;

  constructor(private _formBuilder: FormBuilder,
              private _cityService: CityService,
              private _messageService: MessageService) { }

  ngOnInit(): void {
    // goupe pour le formulaire
    this.cityFormGroup = this._formBuilder.group({
      ville_departement: ['', Validators.required],
      ville_nom_reel: ['', Validators.required],
      ville_code_postal: ['', Validators.required],
      ville_population_2010: ['', Validators.required],
      ville_densite_2010: ['', Validators.required],
      ville_surface: ['', Validators.required],
    });

    // set des values dans le cas de l'edition
    if(this.IdComponentData){
      this._cityService.getCityById(this.IdComponentData).subscribe(
        (dataCity) => {
          this.dataBeforeUpdate = dataCity;
          this.cityFormGroup.controls.ville_departement.setValue(dataCity.ville_departement);
          this.cityFormGroup.controls.ville_nom_reel.setValue(dataCity.ville_nom_reel);
          this.cityFormGroup.controls.ville_code_postal.setValue(dataCity.ville_code_postal);
          this.cityFormGroup.controls.ville_population_2010.setValue(dataCity.ville_population_2010);
          this.cityFormGroup.controls.ville_densite_2010.setValue(dataCity.ville_densite_2010);
          this.cityFormGroup.controls.ville_surface.setValue(dataCity.ville_surface);
        }
      );
    }

    // count des villes
    this._cityService.getAllCities().subscribe(
      (data) => {
        this._nbrCities = data.length;
      }
    );
  }

  /**
   * @name save
   * @description sauvegarde un département
   */
  save(): void {
    if (this.dataBeforeUpdate){ // cas de la modification d'un département

      // création du département à modifier
      const dataToSave: City = {
        id: this.dataBeforeUpdate.id,
        ville_departement: this.cityFormGroup.value.ville_departement,
        ville_nom: this.cityFormGroup.value.ville_nom_reel,
        ville_nom_simple: this.cityFormGroup.value.ville_nom_reel,
        ville_nom_reel: this.cityFormGroup.value.ville_nom_reel,
        ville_code_postal: this.cityFormGroup.value.ville_code_postal,
        ville_population_2010: this.cityFormGroup.value.ville_population_2010,
        ville_densite_2010: this.cityFormGroup.value.ville_densite_2010,
        ville_surface: this.cityFormGroup.value.ville_surface,
      };

      if (this.dataBeforeUpdate !== dataToSave){ // on vérifie si il y a eu des modification sur ce département
        // mise à jour du département
        this._cityService.updateCity(dataToSave).subscribe(
          (updateCity) => {
            // affichage du message
            const messageFull: Message = {
              type: Type.Success,
              title: 'Modification de la ville',
              message: `La modification de la ville <i>${updateCity.ville_nom_reel}</i> a correctement été effectué`
            };

            this._messageService.add(messageFull);
          }
        );
      } else { // si il n'y a pas eu de modification, on prévient l'utilisateur
        const messageFull: Message = {
          type: Type.Warning,
          title: 'Modification de la ville',
          message: `Aucune modification n'a été apporté à cette ville`
        };

        this._messageService.add(messageFull);
      }
    } else { // cas d'un ajout de département

      // création de l'objet département
      const dataToSave: City = {
        id: this._nbrCities + 2,
        ville_departement: this.cityFormGroup.value.ville_departement,
        ville_nom: this.cityFormGroup.value.ville_nom_reel,
        ville_nom_simple: this.cityFormGroup.value.ville_nom_reel,
        ville_nom_reel: this.cityFormGroup.value.ville_nom_reel,
        ville_code_postal: this.cityFormGroup.value.ville_code_postal,
        ville_population_2010: this.cityFormGroup.value.ville_population_2010,
        ville_densite_2010: this.cityFormGroup.value.ville_densite_2010,
        ville_surface: this.cityFormGroup.value.ville_surface,
      };

      // enregistrement du département
      this._cityService.createCity(dataToSave).subscribe(
        (newCity) => {
          // incrémentation du nombre de département
          this._nbrCities++;

          // envoie du message
          const messageFull: Message = {
            type: Type.Success,
            title: 'Enregistrement de la ville',
            message: `L'enregistrement de la ville <i>${newCity.ville_nom_reel}</i> a correctement été effectué`
          };

          this._messageService.add(messageFull);
        }
      );
    }
  }

  /**
   * @name reset
   * @description réinitialise le formulaire
   */
  reset(): void {
    console.log('reset');
  }
}
