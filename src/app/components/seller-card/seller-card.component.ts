import {Component, input, Input} from '@angular/core';
import {Seller} from '../../shared/models/seller.entity';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-seller-card',
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './seller-card.component.html',
  styleUrl: './seller-card.component.css'
})
export class SellerCardComponent {
  @Input({required: true}) seller!: Seller;
}
