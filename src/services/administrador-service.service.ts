import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AdministradorServiceService {

  private endpoint = "https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinners.json";

  constructor(private httpClient: HttpClient) { }

  getAtletas() {
    return this.httpClient.get(this.endpoint);
  }
}
