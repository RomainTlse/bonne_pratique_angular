import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../../../../core/ui/interfaces/message';
import {MessageService, Type} from '../../../../../core/ui/services/message.service';
import {DistrictService} from '../../../services/district.service';
import {LoadDynamicComponentService} from '../../../../../core/utils/services/load-dynamic-component.service';
import {District} from '../../../interfaces/district';

@Component({
  selector: 'app-district-delete',
  templateUrl: './district-delete.component.html',
  styleUrls: ['./district-delete.component.styl']
})
export class DistrictDeleteComponent implements OnInit {

  @Input() IdComponentData: number | null; // Data issues du component parant dans le chargement dynamique

  district: District;

  /**
   * @constructor
   * @param {DistrictService} _districtService
   * @param {MessageService} _messageService
   * @param {LoadDynamicComponentService} _loadDynamicComponentService
   */
  constructor(private _districtService: DistrictService,
              private _messageService: MessageService,
              private _loadDynamicComponentService: LoadDynamicComponentService) {
  }

  /**
   * @description initialise la page avec les formualaires et les données issus de la liste
   */
  ngOnInit(): void {
    this._districtService.getDistrictById(this.IdComponentData).subscribe(
      (dataDistrict) => {
        this.district = dataDistrict;
      }
    )
  }

  /**
   * @name previous
   * @description permet de revenir sur la page district-list au click sur le bouton 'non'
   */
  previous(): void{
    this._loadDynamicComponentService.setComponentToLoad('district-list');
  }

  /**
   * @name delete
   * @description permet de supprimer le departement correspondant à l'id passer en paramètre
   * @param {number} idDistrict
   */
  delete(idDistrict: number): void{
    this._districtService.deleteDistrictById(idDistrict).subscribe(
      () => {
        const messageFull: Message = {
          type: Type.Success,
          title: 'Suppression du département',
          message: `La suppression du département a correctement été effectué`
        };

        this._messageService.add(messageFull);
      }
    );

    this._loadDynamicComponentService.setComponentToLoad('district-list');
  }
}
