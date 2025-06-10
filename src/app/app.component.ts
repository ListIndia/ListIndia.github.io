import { Component } from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {Data} from './shared/data/data';
import {Seller} from './shared/models/seller.entity';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    RouterOutlet,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ListIndia';
  data: Seller[] = Data;
}
