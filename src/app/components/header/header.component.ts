import {Component} from '@angular/core';
import {SearchBoxComponent} from './search-box/search-box.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    SearchBoxComponent,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true,
})
export class HeaderComponent {
  closeOffcanvas(offcanvas: HTMLElement) {
    const event = new Event('click');
    const closeBtn = offcanvas.querySelector('.btn-close');
    if (closeBtn) {
      closeBtn.dispatchEvent(event);
    }
  }
}
