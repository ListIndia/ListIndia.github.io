import {Component, OnInit} from '@angular/core';
import {Data} from '../../shared/data/data';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Seller} from '../../shared/models/seller.entity';
import {environment} from '../../shared/environment';
import {QRCodeComponent} from 'angularx-qrcode';
import {DataService} from '../../data.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-seller-info',
  imports: [CommonModule, QRCodeComponent],
  templateUrl: './seller-info.component.html',
  styleUrl: './seller-info.component.css'
})
export class SellerInfoComponent implements OnInit {
  currentUrl: string = '';
  recentData: Seller[] = [];
  key = environment.secretKey;
  constructor(private route: ActivatedRoute, private dataService: DataService) {}
  seller?: Seller;

  ngOnInit() {
    const sellerId: string = this.route.snapshot.params['sellerId'];
    (this.dataService.getData() as Observable<{data: Seller[]}>).subscribe(res => {
      this.recentData = res.data;
      this.seller = this.recentData.filter(item => item.id == sellerId)[0];
      if(!this.seller) {
        this.seller = Data.filter(item => item.id == sellerId)[0];
      }
    });

    this.currentUrl = window.location.href;
  }
  protected readonly Object = Object;

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
