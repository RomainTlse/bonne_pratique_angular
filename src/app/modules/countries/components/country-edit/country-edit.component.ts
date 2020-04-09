import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Country} from '../../interfaces/country';
import {CountryService} from '../../services/country.service';
import {MessageService, Type} from '../../../../core/ui/services/message.service';
import {City} from '../../../districts/interfaces/city';
import {Message} from '../../../../core/ui/interfaces/message';

@Component({
  selector: 'app-country-edit',
  templateUrl: './country-edit.component.html',
  styleUrls: ['./country-edit.component.styl']
})
export class CountryEditComponent implements OnInit {

  countryFormGroup: FormGroup; // groupement de formulaire

  @Input() IdComponentData: number | null; // Data issues du component parant dans le chargement dynamique

  dataBeforeUpdate: Country; // Sauvegarde du département à sauvegarder

  private _nbrCountries;

  constructor(private _formBuilder: FormBuilder,
              private _countryService: CountryService,
              private _messageService: MessageService) { }

  ngOnInit(): void {
    // groupe de formulaire
    this.countryFormGroup = this._formBuilder.group({
      code: ['', Validators.required],
      alpha2: ['', Validators.required],
      alpha3: ['', Validators.required],
      nom_en_gb: ['', Validators.required],
      nom_fr_fr: ['', Validators.required]
    });

    // set des values dans le cas de l'edition
    if(this.IdComponentData){
      this._countryService.getCountryById(this.IdComponentData).subscribe(
        (dataCountry) => {
          this.dataBeforeUpdate = dataCountry;
          this.countryFormGroup.controls.code.setValue(dataCountry.code);
          this.countryFormGroup.controls.alpha2.setValue(dataCountry.alpha2);
          this.countryFormGroup.controls.alpha3.setValue(dataCountry.alpha3);
          this.countryFormGroup.controls.nom_en_gb.setValue(dataCountry.nom_en_gb);
          this.countryFormGroup.controls.nom_fr_fr.setValue(dataCountry.nom_fr_fr);

        }
      );
    }

    // count des villes
    this._countryService.getAllCountries().subscribe(
      (data) => {
        this._nbrCountries = data.length;
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
      const dataToSave: Country = {
        id: this.dataBeforeUpdate.id,
        code: this.countryFormGroup.value.code,
        alpha2: this.countryFormGroup.value.alpha2,
        alpha3: this.countryFormGroup.value.alpha3,
        nom_en_gb: this.countryFormGroup.value.nom_en_gb,
        nom_fr_fr: this.countryFormGroup.value.code,
      };

      if (this.dataBeforeUpdate !== dataToSave){ // on vérifie si il y a eu des modification sur ce département
        // mise à jour du département
        this._countryService.updateCountry(dataToSave).subscribe(
          (updateCountry) => {
            // affichage du message
            const messageFull: Message = {
              type: Type.Success,
              title: 'Modification de la ville',
              message: `La modification de la ville <i>${updateCountry.nom_fr_fr}</i> a correctement été effectué`
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
      const dataToSave: Country = {
        id: this._nbrCountries + 2,
        code: this.countryFormGroup.value.code,
        alpha2: this.countryFormGroup.value.alpha2,
        alpha3: this.countryFormGroup.value.alpha3,
        nom_en_gb: this.countryFormGroup.value.nom_en_gb,
        nom_fr_fr: this.countryFormGroup.value.code,
      };

      // enregistrement du département
      this._countryService.createCountry(dataToSave).subscribe(
        (newCountry) => {
          // incrémentation du nombre de département
          this._nbrCountries++;

          // envoie du message
          const messageFull: Message = {
            type: Type.Success,
            title: 'Enregistrement de la ville',
            message: `L'enregistrement de la ville <i>${newCountry.nom_fr_fr}</i> a correctement été effectué`
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
