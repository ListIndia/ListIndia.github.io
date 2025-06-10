import {Component, OnInit} from '@angular/core';
import {Data} from '../../shared/data/data';
import {recentData} from '../../../../recent.data';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Seller} from '../../shared/models/seller.entity';
import {environment} from '../../shared/environment';

@Component({
  selector: 'app-seller-info',
  imports: [CommonModule],
  templateUrl: './seller-info.component.html',
  styleUrl: './seller-info.component.css'
})
export class SellerInfoComponent implements OnInit {
  key = environment.secretKey;
  constructor(private route: ActivatedRoute) {}
  seller?: Seller;

  ngOnInit() {
    const sellerId: string = this.route.snapshot.params['sellerId'];
    this.seller = recentData.filter(item => item.id == sellerId)[0];
    if(!this.seller) {
      this.seller = Data.filter(item => item.id == sellerId)[0];
    }
  }
  protected readonly Object = Object;
  protected readonly Array = Array;

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  callSeller(event: Event) {
    event.preventDefault();
    const number = this.seller?.contact_number;
    window.location.href = 'tel:' + this.xorDecode(number || '');
  }

  xorDecode(encoded: string): string {
    const str = atob(encoded);
    return [...str].map((c, i) =>
      String.fromCharCode(c.charCodeAt(0) ^ this.key.charCodeAt(i % this.key.length))
    ).join('');
  }
}
