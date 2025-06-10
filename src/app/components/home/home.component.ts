import { Component } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {SellerCardComponent} from '../seller-card/seller-card.component';
import {Seller} from '../../shared/models/seller.entity';
import {recentData} from '../../../../recent.data';

@Component({
  selector: 'app-home',
  imports: [
    NgForOf,
    NgIf,
    SellerCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  sellers: Seller[] = recentData;
}
