import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { EventInterface } from '../interface/event-interface';
import { Payload } from '../interface/payload';
import { NONE_TYPE } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }


  getEvents(): Observable<Payload[]>
  {
    let date = moment().format("YYYY-MM-DD HH:mm:ss").toString();
    let datepart1 = date.substring(0,11);
    let datepart2 = date.substring(11);
    var datepart3 = +datepart2.substring(6);
    // console.log(datepart3)
    datepart3 = datepart3 -1;
    // console.log(datepart3)
    let datepart2_final = datepart2.substring(0,6) + datepart3.toString();
    // console.log(datepart2_final)

    let url = ("http://localhost:8082/battle/" + datepart1 + "%20" + datepart2_final).toString();
    // let url = ("http://localhost:8081/battle/2022-05-04 22:31:50.755202").toString();
    // return this.http.get<EventInterface[]>(url)
    console.log((url))
    let jObject = this.http.get<any>(url);
    
    jObject.subscribe( load => console.log(load))
    return this.http.get<Payload[]>(url);
  }

  
}
function maptoPayload(arg0: any): void {
  throw new Error('Function not implemented.');
}

