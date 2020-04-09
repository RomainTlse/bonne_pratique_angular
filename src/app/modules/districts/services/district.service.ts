import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {District} from '../interfaces/district';
import {environment} from '../../../../environments/environment'

// API_URL
const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  /**
   * @constructor
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) { }

  /**
   * @name getAllDistricts
   * @description Retourne tous les départements
   * @return {Observable<Array<District>>} Liste de tous les départements
   */
  public getAllDistricts(): Observable<Array<District>>{
    return this._httpClient.get<Array<District>>(API_URL + '/districts');
  }

  /**
   * @name getDistrictById
   * @description Retourne le département correspondant à l'id passé en paramètre
   * @param {number} districtId - Id du département à retourner
   * @return {Observable<District>} - Département correspondant à l'id
   */
  public getDistrictById(districtId: number): Observable<District> {
    return this._httpClient.get<District>(API_URL + '/districts/' + districtId);
  }

  /**
   * @name createDistrict
   * @description Création d'un nouveau département
   * @param {District} district - Nouveau département à créer
   * @return {District} Département créé
   */
  public createDistrict(district: District): Observable<District> {
    return this._httpClient.post<District>(API_URL + '/districts', district);
  }

  /**
   * @name updateDistrict
   * @description Mise à jour compléte d'un département
   * @param {District} district - Département à modifier
   * @return {Observable<District>} Département mis à jour
   */
  public updateDistrict(district: District): Observable<District> {
    return this._httpClient.put<District>(API_URL + '/districts/' + district.id, district);
  }

  /**
   * @name patchDistrict
   * @description Mise à jour partielle d'un département
   * @param {District} district - Département à modifier
   * @return {Observable<District>} Département mis à jour
   */
  public patchDistrict(district: District): Observable<District> {
    return this._httpClient.patch<District>(API_URL + '/districts/' + district.id, district);
  }

  /**
   * @name deleteDistrictById
   * @description Suppression du département correspondant à @param districtId
   * @param {number} districtId - Id du département à supprimer
   * @return {Observable<null>}
   */
  public deleteDistrictById(districtId: number): Observable<null> {
    return this._httpClient.delete<null>(API_URL + '/districts/' + districtId)
  }
}
