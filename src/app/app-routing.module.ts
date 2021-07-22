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
import { RegisterComponent } from './register/register.component';
import { FullproductinfoComponent } from './fullproductinfo/fullproductinfo.component';
import { AuthGuard } from './services/auth.guard';
import { OtpComponent } from './register/otp/otp.component'

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'receipt', component: ReceiptComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent },
  { path: 'store', component: StoreComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'allstores', component: AllstoresComponent },
  { path: 'chooseupdate', component: ChooseupdateprofileComponent, canActivate: [AuthGuard] },
  { path: 'updatename', component: UpdatenameComponent, canActivate: [AuthGuard] },
  { path: 'updateaddress', component: UpdateaddressComponent, canActivate: [AuthGuard] },
  { path: 'updatecontact', component: UpdatecontactComponent, canActivate: [AuthGuard] },
  { path: 'updatepassword', component: UpdatepasswordComponent, canActivate: [AuthGuard] },
  { path: 'fullorderinfo', component: FullorderinfoComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'fullproductinfo', component: FullproductinfoComponent },
  { path: 'otp', component: OtpComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
