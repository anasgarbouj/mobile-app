import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent {

  @Input() placeholder: string = "Recherche";
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  searchTerm: string = ""

  onSearch() {
    this.search.emit(this.searchTerm);
  }

}
