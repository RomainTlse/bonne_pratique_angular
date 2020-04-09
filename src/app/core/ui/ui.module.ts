import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './shared/message/message.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { MenuComponent } from './shared/menu/menu.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    MessageComponent,
    LoaderComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [
    MessageComponent,
    LoaderComponent,
    MenuComponent,
  ]
})
export class UiModule { }
