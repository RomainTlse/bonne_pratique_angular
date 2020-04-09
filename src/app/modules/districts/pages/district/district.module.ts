import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistrictRoutingModule } from './district-routing.module';
import { DistrictComponent } from './district.component';
import {DistrictListComponent} from '../../components/district/district-list/district-list.component';
import {DistrictEditComponent} from '../../components/district/district-edit/district-edit.component';
import {DistrictDeleteComponent} from '../../components/district/district-delete/district-delete.component';
import {CityListComponent} from '../../components/city/city-list/city-list.component';
import {CityEditComponent} from '../../components/city/city-edit/city-edit.component';
import {CityDeleteComponent} from '../../components/city/city-delete/city-delete.component';
import {DistrictContentDirective} from '../../directives/district-content.directive';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {ReactiveFormsModule} from '@angular/forms';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {MatStepperModule} from '@angular/material/stepper';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {DistrictMenuComponent} from '../../shared/district-menu/district-menu.component';


@NgModule({
  declarations: [
    DistrictComponent,
    DistrictContentDirective,
    DistrictListComponent,
    DistrictEditComponent,
    DistrictDeleteComponent,
    CityListComponent,
    CityEditComponent,
    CityDeleteComponent,
    DistrictMenuComponent
  ],
  imports: [
    CommonModule,
    DistrictRoutingModule,
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
    DistrictListComponent,
    DistrictEditComponent,
    DistrictDeleteComponent,
    CityListComponent,
    CityEditComponent,
    CityDeleteComponent,
  ],
})
export class DistrictModule { }
