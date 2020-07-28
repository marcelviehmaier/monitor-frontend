import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import DateTimeFormat = Intl.DateTimeFormat;

export interface PeriodicElement {
  transportationType: string;
  transportationNumber: string;
  time: string;
  actualTime: string;
  destination: string;
}

var ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['transportationType', 'transportationNumber', 'time', 'destination'];
  dataSource = ELEMENT_DATA;
  dateTime: Date = new Date();

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loadConnections();
    const autoSaveInterval: number = setInterval(() => {
      this.dateTime = new Date();
      this.loadConnections();
    }, 10000);
  }

  loadConnections(): void {
    this.http.get<PeriodicElement[]>('http://localhost:5001/departures/PforzheimWildpark').subscribe(res => {
      ELEMENT_DATA = res;
      this.dataSource = ELEMENT_DATA;
      console.log('Updated connections');
    });
  }

}
