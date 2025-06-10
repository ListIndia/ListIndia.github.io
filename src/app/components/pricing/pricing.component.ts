import { Component } from '@angular/core';

@Component({
  selector: 'app-pricing',
  imports: [],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css'
})
export class PricingComponent {
  showContactSupport() {
    alert('Please contact support to activate this plan. Thank you!');
  }
}
