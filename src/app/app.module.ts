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
    UpdatepasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
