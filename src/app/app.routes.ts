import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CategoryViewPageComponent } from './components/category-view-page/category-view-page.component';
import { ProductViewPageComponent } from './components/product-view-page/product-view-page.component';

export const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'category/:id', component: CategoryViewPageComponent },
  { path: 'product/:id', component: ProductViewPageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
