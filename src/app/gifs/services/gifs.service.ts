import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GifsService {

  private _tagHistory: string[] =[]

  constructor() { }

  get tagHistory(){
    return [...this._tagHistory]
  }

  orderHistory( tag: string ){
    tag = tag.toLowerCase()

    if(this._tagHistory.includes( tag )){
      this._tagHistory = this._tagHistory.filter(oldTag => oldTag !== tag)
    }

    this._tagHistory.unshift(tag)

    this._tagHistory = this._tagHistory.splice(0,10)
  }

  searchTag( tag: string ):void {
    if(tag=='') return
    this.orderHistory(tag)

  }

}
