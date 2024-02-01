import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: 'search-box.component.html',
})
export class SearchBoxComponent {
  constructor(public gifsService: GifsService) {}

  @ViewChild('searchInput')
  public searchInput!: ElementRef<HTMLInputElement>;

  searchTag(): void {
    const newTag = this.searchInput.nativeElement.value;

    this.gifsService.searchTag(newTag);

    this.searchInput.nativeElement.value = ''
  }
}
