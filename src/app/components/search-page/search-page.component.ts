import {Component, Input, OnInit} from '@angular/core';
import {SellerCardComponent} from '../seller-card/seller-card.component';
import {Seller} from '../../shared/models/seller.entity';
import {Data} from '../../shared/data/data';
import {recentData} from '../../../../recent.data';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {locations} from '../../shared/data/locations';
import Fuse from 'fuse.js';
import {Observable} from 'rxjs';
import {DataService} from '../../data.service';

@Component({
  selector: 'app-search-page',
  imports: [
    SellerCardComponent,
    CommonModule
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent implements OnInit {
  originalData: Seller[] = [];
  recentData: Seller[] = [];
  sellers: Seller[] = [];
  locationFilter: boolean = false;
  searchFilter: boolean = false;

  constructor(private route: ActivatedRoute, private dataService: DataService) {
  }

  ngOnInit() {
    (this.dataService.getData() as Observable<{ data: Seller[] }>).subscribe(res => {
      this.recentData = res.data;
      this.originalData = [...this.recentData, ...Data];
      this.route.queryParams.subscribe(params => {
        const location = (params['location'] || '').toLowerCase();
        const query = (params['q'] || '').trim().toLowerCase();

        this.locationFilter = location && location !== locations[0].toLowerCase();
        this.searchFilter = query.length > 0;

        const filteredByLocation = this.originalData.filter(val =>
          !this.locationFilter || (val.location || '').toLowerCase().includes(location)
        );

        if (!this.searchFilter) {
          this.sellers = filteredByLocation;
          return;
        }

        const fuse = new Fuse(filteredByLocation, {
          keys: ['title', 'company_name', 'categories', 'description'],
          threshold: 0.2, // allow spelling errors
          ignoreLocation: true
        });

        const queryWords = query.split(/\s+/);

        // ✅ Return items that match ALL words fuzzily
        this.sellers = filteredByLocation.filter(item =>
          queryWords.every((word: string) =>
            fuse.search(word).some(result => result.item === item)
          )
        );
      });
    });
  }
}
