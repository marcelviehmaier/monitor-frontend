import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PeriodicElement} from '../table/table.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  loadPublicConnections(departurePlace: String): Observable<PeriodicElement[]>{
    return this.http.get<PeriodicElement[]>('http://localhost:5001/departures/' + departurePlace);
  }
}
