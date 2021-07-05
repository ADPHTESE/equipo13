import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { HomeRoutingModule } from '@app/home/home-routing.module';
//import { HomeComponent } from '@app/home/home.component';
import {HomeRoutingModule} from "./home-routing.module";
import {HomeComponent} from "./home.component";
import {PieComponent} from "../componetsGlobals/pie/pie.component";



@NgModule({
  declarations: [HomeComponent,PieComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {

}
