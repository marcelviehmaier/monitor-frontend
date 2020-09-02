import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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

  loadPrivateRides(token){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token});
    return this.http.get('https://mobility-dev.hs-pforzheim.de/api/rides/getall', {headers: headers});
  }

  getAccessToken(){
    let body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('client_id', 'myReact');
    body.set('username', 'viehmaie');
    body.set('password', '4550334');

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.http.post('https://mobility-dev.hs-pforzheim.de:8443/auth/realms/LDAP/protocol/openid-connect/token', body.toString(), options);
  }
}
