import {Component, Input, OnInit} from '@angular/core';
import {SellerCardComponent} from '../seller-card/seller-card.component';
import {Seller} from '../../shared/models/seller.entity';
import {Data} from '../../shared/data/data';
import {recentData} from '../../../../recent.data';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
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
  pagedSellers: Seller[] = [];
  locationFilter: boolean = false;
  searchFilter: boolean = false;
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) {}

  ngOnInit() {
    this.isLoading = true;
    (this.dataService.getData() as Observable<{ data: Seller[] }>).subscribe(res => {
      this.recentData = res.data;
      this.originalData = [...this.recentData, ...Data];

      this.route.queryParams.subscribe(params => {
        const location = (params['location'] || '').toLowerCase();
        const query = (params['q'] || '').trim().toLowerCase();
        const pageParam = parseInt(params['page'], 10);
        const pageFromUrl = !isNaN(pageParam) && pageParam > 0 ? pageParam : 1;

        this.locationFilter = location && location !== locations[0].toLowerCase();
        this.searchFilter = query.length > 0;

        const filteredByLocation = this.originalData.filter(val =>
          !this.locationFilter || (val.location || '').toLowerCase().includes(location)
        );

        let matchedSellers: Seller[] = [];

        if (!this.searchFilter) {
          matchedSellers = filteredByLocation;
        } else {
          const fuse = new Fuse(filteredByLocation, {
            keys: ['title', 'company_name', 'categories', 'description'],
            threshold: 0.2,
            ignoreLocation: true
          });

          const queryWords = query.split(/\s+/);

          matchedSellers = filteredByLocation.filter(item =>
            queryWords.every((word: string) =>
              fuse.search(word).some(result => result.item === item)
            )
          );
        }

        this.sellers = matchedSellers;
        this.totalPages = Math.max(1, Math.ceil(this.sellers.length / this.pageSize));
        this.currentPage = Math.min(pageFromUrl, this.totalPages);
        this.updatePagedSellers();
        this.isLoading = false;
      });
    });
  }

  updatePagedSellers(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedSellers = this.sellers.slice(start, end);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.router.navigate([], {
        queryParams: { page },
        queryParamsHandling: 'merge'
      });
    }
  }

  get visiblePages(): (number | -1)[] {
    const pages: (number | -1)[] = [];
    if (this.totalPages <= 5) {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (this.currentPage > 3) {
      pages.push(-1);
    }

    const start = Math.max(2, this.currentPage);
    const end = Math.min(this.totalPages - 1, this.currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < this.totalPages - 1) {
      pages.push(-1);
    }

    pages.push(this.totalPages);

    return pages;
  }
}
