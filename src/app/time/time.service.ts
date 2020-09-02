import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }

  getTimeDifferenceInMinutes(date, actualDate, ELEMENT_DATA) {
    let time;
    if (actualDate === '') {
      time = date;
    } else {
      time = actualDate;
    }
    const systemDateTime = new Date();
    const d = new Date();
    d.setHours(Number(time.split(':')[0]));
    d.setMinutes(Number(time.split(':')[1]));
    const diff = Math.abs((systemDateTime.getTime() - d.getTime()));
    ELEMENT_DATA[0].actualTime = 'in ' + Math.round(diff / 60000) + ' min';
    ELEMENT_DATA[0].time = 'in ' + Math.round(diff / 60000) + ' min';
    return ELEMENT_DATA;
  }
}
