import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {SellerCardComponent} from '../seller-card/seller-card.component';
import {Seller} from '../../shared/models/seller.entity';
import {recentData} from '../../../../recent.data';
import {DataService} from '../../data.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    NgForOf,
    NgIf,
    SellerCardComponent
  ],
  providers: [DataService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  sellers: Seller[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    (this.dataService.getData() as Observable<{data: Seller[]}>).subscribe(res => {
      this.sellers = res.data;
    });
  }
}
