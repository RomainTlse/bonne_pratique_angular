import {Component, Input, OnInit} from '@angular/core';
import {City} from '../../../interfaces/city';
import {CityService} from '../../../services/city.service';
import {MessageService, Type} from '../../../../../core/ui/services/message.service';
import {LoadDynamicComponentService} from '../../../../../core/utils/services/load-dynamic-component.service';
import {Message} from '../../../../../core/ui/interfaces/message';

@Component({
  selector: 'app-city-delete',
  templateUrl: './city-delete.component.html',
  styleUrls: ['./city-delete.component.styl']
})
export class CityDeleteComponent implements OnInit {

  @Input() IdComponentData: number | null; // Data issues du component parant dans le chargement dynamique

  city: City;

  /**
   * @constructor
   * @param {CityService} _cityService
   * @param {MessageService} _messageService
   * @param {LoadDynamicComponentService} _loadDynamicComponentService
   */
  constructor(private _cityService: CityService,
              private _messageService: MessageService,
              private _loadDynamicComponentService: LoadDynamicComponentService) { }

  /**
   * @name ngOnInit
   * @description Initialisation du component avec l'objet city correspondant à l'id
   */
  ngOnInit(): void {
    this._cityService.getCityById(this.IdComponentData).subscribe(
      (dataCity) => {
        this.city = dataCity;
      }
    )
  }

  /**
   * @name previous
   * @description permet de revenir sur la page city-list au click sur le bouton 'non'
   */
  previous(): void{
    this._loadDynamicComponentService.setComponentToLoad('city-list');
  }

  /**
   * @name delete
   * @description permet de supprimer la ville correspondant à l'id passer en paramètre
   * @param {number} idCity
   */
  delete(idCity: number): void{
    this._cityService.deleteCityById(idCity).subscribe(
      () => {
        const messageFull: Message = {
          type: Type.Success,
          title: 'Suppression de la ville',
          message: `La suppression de la ville a correctement été effectué`
        };

        this._messageService.add(messageFull);
      }
    );

    this._loadDynamicComponentService.setComponentToLoad('city-list');
  }
}
