import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { ProductsComponent } from './components/products/products.component';
import { PicoPreviewComponent } from './components/pico-preview/pico-preview.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {TokenInterceptor} from "./interceptors/token.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    PicoPreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
