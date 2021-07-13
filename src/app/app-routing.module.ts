import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'cart', component: CartComponent },
  { path: 'receipt', component: ReceiptComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'login', component: LoginComponent },
  { path: 'store', component: StoreComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'allstores', component: AllstoresComponent },
  { path: 'chooseupdate', component: ChooseupdateprofileComponent },
  { path: 'updatename', component: UpdatenameComponent },
  { path: 'updateaddress', component: UpdateaddressComponent },
  { path: 'updatecontact', component: UpdatecontactComponent },
  { path: 'updatepassword', component: UpdatepasswordComponent },
  { path: 'fullorderinfo', component: FullorderinfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
