import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Country} from '../interfaces/country';

// API_URL
const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class CountryService {

  /**
   * @constructor
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) { }

  /**
   * @name getAllCountries
   * @description Retourne tous les pays
   * @return {Observable<Array<Country>>} Liste de tous les pays
   */
  public getAllCountries(): Observable<Array<Country>>{
    return this._httpClient.get<Array<Country>>(API_URL + '/countries');
  }

  /**
   * @name getCountryById
   * @description Retourne le pays correspondant à l'id passé en paramètre
   * @param {number} countryId - Id du pays à retourner
   * @return {Observable<Country>} - Pays correspondant à l'id
   */
  public getCountryById(countryId: number): Observable<Country> {
    return this._httpClient.get<Country>(API_URL + '/countries/' + countryId);
  }

  /**
   * @name createCountry
   * @description Création d'un nouveau pays
   * @param {Country} country - Nouveau pays à créer
   * @return {Country} Pays créé
   */
  public createCountry(country: Country): Observable<Country> {
    return this._httpClient.post<Country>(API_URL + '/countries', country);
  }

  /**
   * @name updateCountry
   * @description Mise à jour compléte d'un pays
   * @param {Country} country - Pays à modifier
   * @return {Observable<Country>} Pays mis à jour
   */
  public updateCountry(country: Country): Observable<Country> {
    return this._httpClient.put<Country>(API_URL + '/countries/' + country.id, country);
  }

  /**
   * @name patchCountry
   * @description Mise à jour partielle d'un pays
   * @param {Country} country - pays à modifier
   * @return {Observable<Country>} Pays mis à jour
   */
  public patchCountry(country: Country): Observable<Country> {
    return this._httpClient.patch<Country>(API_URL + '/countries/' + country.id, country);
  }

  /**
   * @name deleteCountryById
   * @description Suppression du pays correspondant à @param countryId
   * @param {number} countryId - Id du pays à supprimer
   * @return {Observable<null>}
   */
  public deleteCountryById(countryId: number): Observable<null> {
    return this._httpClient.delete<null>(API_URL + '/countries/' + countryId)
  }
}
