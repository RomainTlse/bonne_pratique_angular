import {District} from './district';

export interface City {
  id: number;
  ville_departement: string;
  ville_nom: string;
  ville_nom_simple: string;
  ville_nom_reel: string;
  ville_code_postal: number;
  ville_population_2010: number;
  ville_densite_2010: number;
  ville_surface: number;
}

export interface CityComponentData {
  dataDynamicComponent: City;
}



