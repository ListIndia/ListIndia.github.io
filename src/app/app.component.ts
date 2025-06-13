import { Component } from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {Data} from './shared/data/data';
import {Seller} from './shared/models/seller.entity';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {FooterComponent} from './components/footer/footer.component';
import {filter} from 'rxjs';

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
  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo({ top: 0 });
      });
  }
}
