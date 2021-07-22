import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { CartComponent } from './cart/cart.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { OrdersComponent } from './orders/orders.component';
import { LoginComponent } from './login/login.component';
import { StoreComponent } from './store/store.component';
import { ProfileComponent } from './profile/profile.component';
import { AllstoresComponent } from './allstores/allstores.component';
import { ChooseupdateprofileComponent } from './chooseupdateprofile/chooseupdateprofile.component';
import { UpdatenameComponent } from './updatename/updatename.component';
import { UpdateaddressComponent } from './updateaddress/updateaddress.component';
import { UpdatecontactComponent } from './updatecontact/updatecontact.component';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import { FullorderinfoComponent } from './fullorderinfo/fullorderinfo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { FullproductinfoComponent } from './fullproductinfo/fullproductinfo.component';
import { OtpComponent } from './register/otp/otp.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoryComponent,
    CartComponent,
    ReceiptComponent,
    OrdersComponent,
    LoginComponent,
    StoreComponent,
    ProfileComponent,
    AllstoresComponent,
    ChooseupdateprofileComponent,
    UpdatenameComponent,
    UpdateaddressComponent,
    UpdatecontactComponent,
    UpdatepasswordComponent,
    FullorderinfoComponent,
    RegisterComponent,
    FullproductinfoComponent,
    OtpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule
  ],
  providers: [
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
