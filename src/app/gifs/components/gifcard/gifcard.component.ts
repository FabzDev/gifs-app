import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './gifcard.component.html',
})
export class GifcardComponent {

  @Input()
  public gif!: Gif

 }
