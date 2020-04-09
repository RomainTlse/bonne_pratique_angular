import {Component, Input, OnInit} from '@angular/core';
import {Country} from '../../interfaces/country';
import {CountryService} from '../../services/country.service';
import {CityService} from '../../../districts/services/city.service';
import {MessageService, Type} from '../../../../core/ui/services/message.service';
import {LoadDynamicComponentService} from '../../../../core/utils/services/load-dynamic-component.service';
import {Message} from '../../../../core/ui/interfaces/message';

@Component({
  selector: 'app-country-delete',
  templateUrl: './country-delete.component.html',
  styleUrls: ['./country-delete.component.styl']
})
export class CountryDeleteComponent implements OnInit {

  @Input() IdComponentData: number | null; // Data issues du component parant dans le chargement dynamique

  country: Country;

  /**
   * @constructor
   * @param {CountryService} _countryService
   * @param {MessageService} _messageService
   * @param {LoadDynamicComponentService} _loadDynamicComponentService
   */
  constructor(private _countryService: CountryService,
              private _messageService: MessageService,
              private _loadDynamicComponentService: LoadDynamicComponentService) { }

  /**
   * @name ngOnInit
   * @description Initialisation du component avec l'objet country correspondant à l'id
   */
  ngOnInit(): void {
    this._countryService.getCountryById(this.IdComponentData).subscribe(
      (dataCountry) => {
        this.country = dataCountry;
      }
    )
  }

  /**
   * @name previous
   * @description permet de revenir sur la page city-list au click sur le bouton 'non'
   */
  previous(): void{
    this._loadDynamicComponentService.setComponentToLoad('country-list');
  }

  /**
   * @name delete
   * @description permet de supprimer la ville correspondant à l'id passer en paramètre
   * @param {number} idCity
   */
  delete(idCity: number): void{
    this._countryService.deleteCountryById(idCity).subscribe(
      () => {
        const messageFull: Message = {
          type: Type.Success,
          title: 'Suppression du Pays',
          message: `La suppression du pays a correctement été effectué`
        };

        this._messageService.add(messageFull);
      }
    );

    this._loadDynamicComponentService.setComponentToLoad('country-list');
  }
}
