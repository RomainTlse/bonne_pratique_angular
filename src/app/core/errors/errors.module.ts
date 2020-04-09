import {ErrorHandler, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundModule } from './pages/not-found/not-found.module';
import {ErrorsHandlerService} from './services/errors-handler.service';
import {HttpErrorsHandlerInterceptor} from './interceptors/http-errors-handler.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NotFoundModule,
  ],
  providers: [
    {provide: ErrorHandler, useClass: ErrorsHandlerService},
    {provide: HTTP_INTERCEPTORS,useClass: HttpErrorsHandlerInterceptor,multi: true},
  ],
})
export class ErrorsModule { }
