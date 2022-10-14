import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PicoPreviewComponent } from './components/pico-preview/pico-preview.component';
import { ProductsComponent } from './components/products/products.component';
import {PeopleComponent} from "./components/people/people.component";
import {OthersComponent} from "./components/others/others.component";

const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'pico-preview',
    component: PicoPreviewComponent
  },
  {
    path: 'person',
    component: PeopleComponent
  },
  {
    path: 'other',
    component: OthersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting { }
