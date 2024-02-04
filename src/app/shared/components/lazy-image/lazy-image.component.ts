import { Component, Input, OnInit } from '@angular/core';
import { timeout } from 'rxjs';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
})
export class LazyImageComponent implements OnInit{
  @Input()
  public url!: string

  @Input()
  public title!: string

  public hasLoaded!: boolean

  ngOnInit(): void {
    if(!this.url) throw new Error('Method not implemented.')
    this.hasLoaded = false
  }

  imgLoaded(){
      this.hasLoaded = true
  }



}
