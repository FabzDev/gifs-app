import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

const GIFS_API_KEY = 'ybboGP7QGwVdJvwi4E1x2Yc22tVgYqhS'
const gifsUrlService = 'https://api.giphy.com/v1/gifs'

@Injectable({providedIn: 'root'})
export class GifsService {
  private _tagHistory: string[] =[]
  public gifList: Gif[] = []

  constructor(private http: HttpClient) { }

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

  searchTag( tag: string ): void {
    if(tag=='') return
    this.orderHistory(tag)

    const httpParams = new HttpParams()
      .set('api_key', GIFS_API_KEY)
      .set('limit', '10')
      .set('q', tag)

    this.http.get<SearchResponse>( `${gifsUrlService}/search`, { params: httpParams } )
    .subscribe( resp => {
      this.gifList = resp.data

      console.log(this.gifList);
    }) // { params: httpParams } podria ser solo { params } si httpParams se llamara params

    // fetch('https://api.giphy.com/v1/gifs/search?api_key=ybboGP7QGwVdJvwi4E1x2Yc22tVgYqhS&q=palestine&limit=10')
    // .then(resp => resp.json())
    // .then(data => console.log(data)
    // )
  }

}
