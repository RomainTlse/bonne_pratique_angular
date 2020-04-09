import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryRoutingModule } from './country-routing.module';
import { CountryComponent } from './country.component';
import { CountryEditComponent } from '../../components/country-edit/country-edit.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryDeleteComponent } from '../../components/country-delete/country-delete.component';
import { CountryContentDirective } from '../../directives/country-content.directive';
import {ReactiveFormsModule} from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {MatStepperModule} from '@angular/material/stepper';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {DistrictListComponent} from '../../../districts/components/district/district-list/district-list.component';
import {DistrictEditComponent} from '../../../districts/components/district/district-edit/district-edit.component';
import {DistrictDeleteComponent} from '../../../districts/components/district/district-delete/district-delete.component';
import {CityListComponent} from '../../../districts/components/city/city-list/city-list.component';
import {CityEditComponent} from '../../../districts/components/city/city-edit/city-edit.component';
import {CityDeleteComponent} from '../../../districts/components/city/city-delete/city-delete.component';


@NgModule({
  declarations: [
    CountryComponent,
    CountryEditComponent,
    CountryListComponent,
    CountryDeleteComponent,
    CountryContentDirective],
  imports: [
    CommonModule,
    CountryRoutingModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    CdkStepperModule,
    MatStepperModule,
    MatAutocompleteModule,
    FontAwesomeModule,
  ],
  entryComponents: [
    CountryEditComponent,
    CountryListComponent,
    CountryDeleteComponent,
  ],
})
export class CountryModule { }
