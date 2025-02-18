import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Config {
  name: string;
  value: string;  
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly client = inject(HttpClient);

  public getConfig<Config>() {
    return this.client.get<Config>('/api/config');
  }
}
