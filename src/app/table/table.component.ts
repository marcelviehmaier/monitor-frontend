import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiService} from '../connections/api.service';

export interface PeriodicElement {
  transportationType: string;
  transportationNumber: string;
  time: string;
  actualTime: string;
  destination: string;
  departure: string;
}

var ELEMENT_DATA: PeriodicElement[] = [];
declare var H: any;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['transportationType', 'transportationNumber', 'time', 'departure', 'destination'];
  dataSource = ELEMENT_DATA;
  systemDateTime: Date = new Date();
  departurePlace = 'Pforzheim Wildpark';
  public platform: any;
  public service: any;
  distance;

  constructor(private http: HttpClient, private api: ApiService) {
    this.platform = new H.service.Platform({
      'apikey': 'VR7zRra1LgRwFyk4Mk9-U1Xd3klyn6P4FAlOWvDGK4E'
    });
    this.service = this.platform.getSearchService();
  }

  async ngOnInit(): Promise<void> {
    this.loadPublicConnections();

    const interval: number = setInterval(() => {
      this.systemDateTime = new Date();
      this.loadPublicConnections();
    }, 10000);
  }

  loadPublicConnections(): void {
    this.api.loadPublicConnections(this.departurePlace).subscribe(res => {
      ELEMENT_DATA = res;
      ELEMENT_DATA.forEach(data => data.departure = this.departurePlace);
      this.loadPrivateRides();
    });
  }

  loadPrivateRides(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3ei1XVHgwMGZ4ZV9kY1BKUGNBSnQ4akx1LV9uVDFNTEVieElwTS1od3JRIn0.eyJqdGkiOiJhNzJkM2Q5YS1kM2ZiLTRkNWQtODQ4MC03ZGVhY2MyNmQxZGIiLCJleHAiOjE1OTczNjg5MjksIm5iZiI6MCwiaWF0IjoxNTk3MzMyOTc0LCJpc3MiOiJodHRwczovL21vYmlsaXR5LWRldi5ocy1wZm9yemhlaW0uZGU6ODQ0My9hdXRoL3JlYWxtcy9MREFQIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjhkNWZjY2M3LWQ2OWEtNGU4Yi04NWU1LWRjOGVhNzk5MTk1ZSIsInR5cCI6IkJlYXJlciIsImF6cCI6Im15UmVhY3QiLCJub25jZSI6IjNjNmI2NjE1LTg4M2YtNDAxOS04MjQ4LWE3ZDgwY2U2ZTg1MSIsImF1dGhfdGltZSI6MTU5NzMzMjkyOSwic2Vzc2lvbl9zdGF0ZSI6IjhjZDMwN2FhLWQ3MzYtNGYzZi1iM2RlLThjZTg2NzE2ZTQyZiIsImFjciI6IjAiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovLzE0MS40Ny4yLjM3OjMwMDAiLCJodHRwczovL21vYmlsaXR5LWRldi5ocy1wZm9yemhlaW0uZGUiLCJodHRwOi8vbG9jYWxob3N0OjMwMDAiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiTWFyY2VsIFZpZWhtYWllciIsInByZWZlcnJlZF91c2VybmFtZSI6InZpZWhtYWllIiwiZ2l2ZW5fbmFtZSI6Ik1hcmNlbCIsImZhbWlseV9uYW1lIjoiVmllaG1haWVyIiwiZW1haWwiOiJ2aWVobWFpZUBocy1wZm9yemhlaW0uZGUifQ.oFOq6ceRH1SUAWRH6DjyYre4mk4QQhlXvOjmxe_DR_v6IduTLOnGU2jrSVUBhYzoLBR4ztUsZxEcKxNnLAAH1_jQRbtgwUYohMjuOPaHTvd_MXWEDCvtcmQzu3fZo2h5amjjARG_6IT--id3Vqnhs0GkU-4z5fMjjyIs_BhjoIpGKgabScPe6jDM8BsURqI7o_bvnf9zI5lNDHgtnHuW0XuGsX4FrvuA6BIEcqz5NEP1aGJU4uG--3q6_9CmeKaVPuPcX_fix06hD1FhwcCHpyNfwkXQfuwwqzeb5QT-H2_QpL5cRFc1RzlDYWKOutiWznG_BA_Gc2q5AEcY6_XetA'
    });
    this.http.get('https://mobility-dev.hs-pforzheim.de/api/rides/getall', {headers: headers}).subscribe(res => {
      res['result'].rides.forEach(async ride => {
        const date = new Date(ride.departureTimestamp);
        if(date.toDateString() == this.systemDateTime.toDateString() && this.systemDateTime < date){
          ELEMENT_DATA.push({
            transportationType: 'Car',
            transportationNumber: ride.userId.firstName + ' ' + ride.userId.lastName,
            time: ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2),
            actualTime: '',
            destination: ride.placeArrival.formattedAddress,
            departure: ride.placeDeparture.formattedAddress
          });
        }
      });
      ELEMENT_DATA.sort(function (a, b) {
        return a.time.localeCompare(b.time);
      });
      this.getTimeDifferenceInMinutes(ELEMENT_DATA[0].time, ELEMENT_DATA[0].actualTime);
      this.dataSource = ELEMENT_DATA;
    });
  }

  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  getTimeDifferenceInMinutes(date, actualDate) {
    let time;
    if (actualDate === '') {
      time = date;
    } else {
      time = actualDate;
    }
    const d = new Date();
    d.setHours(Number(time.split(':')[0]));
    d.setMinutes(Number(time.split(':')[1]));
    const diff = Math.abs((this.systemDateTime.getTime() - d.getTime()));
    ELEMENT_DATA[0].actualTime = 'in ' + Math.round(diff / 60000) + ' min';
    ELEMENT_DATA[0].time = 'in ' + Math.round(diff / 60000) + ' min';
  }
}
