import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {City} from '../interfaces/city';
import {environment} from '../../../../environments/environment';

// API_URL
const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CityService {

  /**
   * @constructor
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) { }

  /**
   * @name getAllCities
   * @description Retourne toutes les villes
   * @return {Observable<Array<City>>} Liste de toutes les villes
   */
  public getAllCities(): Observable<Array<City>>{
    return this._httpClient.get<Array<City>>(API_URL + '/cities');
  }

  /**
   * @name getCityById
   * @description Retourne la ville correspondant à l'id passé en paramètre
   * @param {number} cityId - Id de la ville à retourner
   * @return {Observable<City>} - Ville correspondant à l'id
   */
  public getCityById(cityId: number): Observable<City> {
    return this._httpClient.get<City>(API_URL + '/cities/' + cityId);
  }

  /**
   * @name createCity
   * @description Création d'une nouvelle ville
   * @param {City} city - Nouvelle ville à créer
   * @return {City} Ville créée
   */
  public createCity(city: City): Observable<City> {
    return this._httpClient.post<City>(API_URL + '/cities', city);
  }

  /**
   * @name updateCity
   * @description Mise à jour compléte d'une ville
   * @param {City} city - Ville à modifier
   * @return {Observable<City>} Ville mis à jour
   */
  public updateCity(city: City): Observable<City> {
    return this._httpClient.put<City>(API_URL + '/cities/' + city.id, city);
  }

  /**
   * @name patchCity
   * @description Mise à jour partielle d'une ville
   * @param {City} city - Ville à modifier
   * @return {Observable<City>} Ville mis à jour
   */
  public patchCity(city: City): Observable<City> {
    return this._httpClient.patch<City>(API_URL + '/cities/' + city.id, city);
  }

  /**
   * @name deleteCityById
   * @description Suppression de la ville correspondant à @param cityId
   * @param {number} cityId - Id de la ville à supprimer
   * @return {Observable<null>}
   */
  public deleteCityById(cityId: number): Observable<null> {
    return this._httpClient.delete<null>(API_URL + '/cities/' + cityId)
  }
}
