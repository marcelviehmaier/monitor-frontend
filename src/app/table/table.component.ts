import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../connections/api.service';
import {TimeService} from '../time/time.service';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  transportationType: string;
  transportationNumber: string;
  time: string;
  actualTime: string;
  destination: string;
  departure: string;
}


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = ['transportationType', 'transportationNumber', 'time', 'departure', 'destination'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  systemDateTime: Date = new Date();
  departurePlace = 'Pforzheim Wildpark';
  public platform: any;
  public service: any;
  private token: string;


  constructor(private http: HttpClient, private api: ApiService, private timeService: TimeService) {
    const interval: number = setInterval(() => {
      this.systemDateTime = new Date();

      // Render private connections from mobility4people app
      this.api.getAccessToken().subscribe(res => {
        this.token = res['access_token'];
        this.ELEMENT_DATA = [];
        this.renderPrivateRides();
      });
    }, 10000);
  }

  renderPublicConnections(): void {
    this.api.loadPublicConnections(this.departurePlace).subscribe(res => {
      res.forEach(r => this.ELEMENT_DATA.push(r));
      this.ELEMENT_DATA.forEach(data => data.departure = this.departurePlace);
      this.ELEMENT_DATA.sort(function(a, b) {
        return a.time.localeCompare(b.time);
      });
      try {
        this.ELEMENT_DATA =
          this.timeService.getTimeDifferenceInMinutes(this.ELEMENT_DATA[0].time, this.ELEMENT_DATA[0].actualTime, this.ELEMENT_DATA);
      } catch (e) {
        console.error(e);
      }
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    });
  }

  renderPrivateRides(): void {
    this.api.loadPrivateRides(this.token).subscribe(res => {
      res['result'].rides.forEach(async ride => {
        const date = new Date(ride.departureTimestamp);
        if (date.toDateString() == this.systemDateTime.toDateString() && this.systemDateTime < date) {
          this.ELEMENT_DATA.push({
            transportationType: 'Car',
            transportationNumber: ride.userId.firstName + ' ' + ride.userId.lastName,
            time: ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2),
            actualTime: '',
            destination: ride.placeArrival.formattedAddress,
            departure: ride.placeDeparture.formattedAddress
          });
        }
      });
      this.renderPublicConnections();
    });
  }
}
