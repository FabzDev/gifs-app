import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

const GIFS_API_KEY = 'ybboGP7QGwVdJvwi4E1x2Yc22tVgYqhS';
const gifsUrlService = 'https://api.giphy.com/v1/gifs';

@Injectable({ providedIn: 'root' })
export class GifsService {
  private _tagHistory: string[] = [];
  public gifList: Gif[] = [];

  constructor(private http: HttpClient) {
    this.getTagHistory()

  }

  get tagHistory() {
    return [...this._tagHistory];
  }

  orderHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagHistory.includes(tag)) {
      this._tagHistory = this._tagHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagHistory.unshift(tag);

    this._tagHistory = this._tagHistory.splice(0, 10);
    this.saveTagHistory();
  }

  saveTagHistory(): void {
    localStorage.setItem('history', JSON.stringify(this._tagHistory));
  }

  getTagHistory(): void {
    if (!localStorage.getItem('history')) return;
    this._tagHistory = JSON.parse(localStorage.getItem('history')!);

    if(this._tagHistory.length === 0) return
    this.searchTag(this._tagHistory[0])

  }

  searchTag(tag: string): void {
    if (tag == '') return;
    this.orderHistory(tag);

    const httpParams = new HttpParams()
      .set('api_key', GIFS_API_KEY)
      .set('limit', '10')
      .set('q', tag);

    this.http
      .get<SearchResponse>(`${gifsUrlService}/search`, { params: httpParams })
      .subscribe((resp) => {
        this.gifList = resp.data;
      });
  }
}
