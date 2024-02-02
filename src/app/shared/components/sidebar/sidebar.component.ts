import { Component, Inject } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private gifsService: GifsService) {}

  get sidebarService(): GifsService {
    return this.gifsService
  }

  searchHistory(tag: string): void {
    console.log('CLICK');

    this.gifsService.searchTag(tag)
  }


}
