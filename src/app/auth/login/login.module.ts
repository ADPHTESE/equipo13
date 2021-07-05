import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { LoginRoutingModule } from '@auth/login/login-routing.module';

//import { LoginComponent } from '@auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {LoginRoutingModule} from "./login-routing.module";
import {LoginComponent} from "./login.component";

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, LoginRoutingModule, ReactiveFormsModule],
})
export class LoginModule {}
