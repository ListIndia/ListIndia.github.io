import {Component, Input, OnInit} from '@angular/core';
import {SellerCardComponent} from '../seller-card/seller-card.component';
import {Seller} from '../../shared/models/seller.entity';
import {Data} from '../../shared/data/data';
import {recentData} from '../../../../recent.data';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {locations} from '../../shared/data/locations';

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
  originalData: Seller[] = [...recentData, ...Data];
  recentData: Seller[] = recentData;
  sellers: Seller[] = [];
  locationFilter: boolean = false;
  searchFilter: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const location = params['location'].toLowerCase();
      const query = params['q'].trim().toLowerCase();
      console.log('Location:', location, 'Search term:', query);
      this.locationFilter = location != locations[0].toLowerCase();
      this.searchFilter = query.length != 0;
      this.sellers = this.originalData.filter(val =>
        (this.locationFilter ? val.location?.toLowerCase().includes(location) : true)
      && (this.searchFilter ? val.title?.toLowerCase().includes(query) || val.company_name?.includes(query) || val.categories?.includes(query) || val.description?.includes(query): true));
      // Fetch results based on these values
    });
}
}
