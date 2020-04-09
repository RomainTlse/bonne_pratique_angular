import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './core/auth/auth.module';
import { ErrorsModule } from './core/errors/errors.module';
import { UiModule } from './core/ui/ui.module';
import { DistrictsModule } from './modules/districts/districts.module';
import { UtilsModule } from './core/utils/utils.module';
import { CountriesModule } from './modules/countries/countries.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    ErrorsModule,
    UiModule,
    DistrictsModule,
    UtilsModule,
    CountriesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
