import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {suggestions} from '../../../shared/data/suggestions';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {locations} from '../../../shared/data/locations';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-box',
  imports: [CommonModule, FormsModule],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {
  locations: string[] = locations;
  searchTerm = '';
  selectedLocation = locations[0];
  suggestions = suggestions;

  filteredSuggestions: string[] = suggestions;
  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(private router: Router) {}

  onSearchInput(): void {
    if (this.searchTerm.length >= 3) {
      const term = this.searchTerm.toLowerCase();
      this.filteredSuggestions = this.suggestions.filter(s =>
        s.toLowerCase().includes(term)
      );
    } else {
      this.filteredSuggestions = [];
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/search'], {
      queryParams: {
        location: this.selectedLocation,
        q: this.searchTerm,
      },
    });
    if(this.searchInput) {
      this.searchInput.nativeElement.blur();
    }

  }
}
