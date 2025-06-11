import { Routes } from '@angular/router';
import {SearchPageComponent} from './components/search-page/search-page.component';
import {SellerInfoComponent} from './components/seller-info/seller-info.component';
import {HomeComponent} from './components/home/home.component';
import {PricingComponent} from './components/pricing/pricing.component';
import {SellerFormComponent} from './components/seller-form/seller-form.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'search',
    component: SearchPageComponent,
  },
  {
    path: 'sellerform27756',
    component: SellerFormComponent,
  },
  {
    path: 'pricing',
    component: PricingComponent,
  },
  {
    path: 'seller/:sellerId',
    component: SellerInfoComponent
  },
  {
    path: '**',
    redirectTo: '',
  },
];
