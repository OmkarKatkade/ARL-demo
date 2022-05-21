import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { interval, Subscriber, Subscription, timer } from 'rxjs';
import { MarkerService } from '../marker.service';
import { EventService } from '../service/event.service';
import * as moment from 'moment';
import { EventInterface } from '../interface/event-interface';
import { ConstantPool, NONE_TYPE } from '@angular/compiler';
import { Payload } from '../interface/payload';
import { Object } from '../interface/object';
import { Obj } from '@popperjs/core';


const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize     : [25, 41],
  iconAnchor   : [12, 41],
  popupAnchor  : [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize   : [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;


@Component({
  selector: 'app-battlefield-events',
  templateUrl: './battlefield-events.component.html',
  styleUrls: ['./battlefield-events.component.css']
})

export class BattlefieldEventsComponent implements AfterViewInit {

  private map!: L.Map;
  imgsrc: string = '';
  list1: any[] = [];
  countx = 0;
  private firstObsSubs!: Subscription;

  private initMap(): void 
  {
    
    this.map = L.map('map', 
    {
      // center: [39.260914, -76.714778],
      center: [39.35065265202445, -76.34512189088021],
      zoom: 16
    });

    const tiles1 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 30, minZoom: 3,
                                                                                      attribution: 
                                                                                      '<b>By: CARDS </b>' +
                                                                                      '<br> <img src = "assets/Orange.png" style="width:10px;height:10px;"> <b> : Human</b><br>' +  
                                                                                      '<img src = "assets/Blue.png" style="width:10px;height:10px;"> <b> : Vehicle</b><br>' +
                                                                                      '<img src= "assets/icons8-autonomous-vehicles-90.png" style="width: 15px; height: 15px;"> <b> : BGV</b><br>'
                                                                                    }); 


    const tiles = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: 
                                                                                      '<b>By: CARDS </b>' +
                                                                                      '<br> <img src = "assets/Orange.png" style="width:10px;height:10px;"> <b> : Human</b><br>' +  
                                                                                      '<img src = "assets/Blue.png" style="width:10px;height:10px;"> <b> : Vehicle</b><br>' +
                                                                                      '<img src= "assets/icons8-autonomous-vehicles-90.png" style="width: 15px; height: 15px;"> <b> : BGV</b><br>'
                                                                                    
      

              });

    tiles.addTo(this.map);
    this.map.attributionControl.setPosition('topright');

  }

  
  
  constructor(private markerService: MarkerService,
              private eventS: EventService) { }


  ngAfterViewInit(): void 
  {
    this.initMap();
    //this.markerService.makeCapitalMarkers(this.map);
  }

  ngOnInit() 
  {

        this.plotLag();
        var count = 0;
        

        //interval returns an observable to which we subscribe.
        const obs$ = interval(1000);
        this.firstObsSubs = obs$.subscribe(
          (d) => {
            if(count<100)
            {
              this.onGetEvents();
              console.log(d);
            }
            count++;
          }
        )

          
  }
  

  

  ngOnDestroy()
  {
    this.firstObsSubs.unsubscribe();
  }



  // This method calls a method in EventService and makes the API call
  onGetEvents(): void 
  {

    this.eventS.getEvents().subscribe(
      (response) => this.mapEvents(response),
      // (response) => console.log(response),
      (error) => console.log("Error"),
      () => console.log("Done"),
    );

  }




  mapEvents(e1: any)
  {

        var e = e1 as Payload;
    
    
    if(!(typeof e === 'undefined'))
    {
      // Icon for a person
      var myIcon1 = L.icon({
        //iconUrl: 'assets/icons8-running-30.png',
        iconUrl:'assets/Green.png',
        iconSize: [20, 20],
      });

      // Icon for a vehicle
      var myIcon2 = L.icon({
        //iconUrl: 'assets/icons8-sedan-30.png',
        iconUrl: 'assets/Orange.png',
        iconSize: [20, 20],
      });

      


      // Coverting lat and long from string format to numbers
      // let lat = +e.objectLat;
      // let long = +e.objectLong;

      let object = e.objects[0] as Object

      let lat = object.location.lat
      let long = object.location.lon

      console.log(lat)
      console.log(long)



      // Checking Object Type and giving appropriate marker
      // if(e.objectType == 'Person')
      if(object.type == "Person")
      {
        // var marker = L.marker([lat,long], {icon: myIcon1}).addTo(this.map);
        //this.imgsrc = "assets/IMG_2881.PNG";
        
        
        //  if(e.motionType == 'Dynamic')
        if(object.id % 2 > 0)
         {
          var div_circle = L.divIcon({ className: "circleOrangeDynamic"});
          var markerx = L.marker( [lat,long], {icon: div_circle} ).addTo(this.map);
         }else
         {
          var div_circle = L.divIcon({ className: "circleOrange"});
          var markerx = L.marker( [lat,long], {icon: div_circle} ).addTo(this.map);
         }
      }else
      {
        // var marker = L.marker([lat,long], {icon: myIcon2}).addTo(this.map);
        //  this.imgsrc = "assets/IMG_2874.PNG";
        this.imgsrc = "assets/471.png";
         if(object.id % 2 > 0)
         {
          var div_circle = L.divIcon({ className: "circleGreenDynamic"});
          var markerx = L.marker( [lat,long], {icon: div_circle} ).addTo(this.map);
         }else{
          var div_circle = L.divIcon({ className: "circleGreen"});
          var markerx = L.marker( [lat,long], {icon: div_circle} ).addTo(this.map);
         }
      }
      
      // Plotting on the map
      var radius = 0;
      if((+object.confidence*100 > 50) && (+object.confidence*100 <75))
      {
        radius = 20;
      }else if ((+object.confidence*100 < 50))
      {
        radius = 30;
      }

      
      // if(e.motionType == 'Dynamic')
      // {
      //    var marker1 = L.circleMarker( [lat,long], {radius: radius, className: 'cssClass', fillOpacity: 0.3, weight: 2}).setStyle({color : 'green'}).addTo(this.map);
      //    var div_circle = L.divIcon({ className: "circleOrange"});
      //    var markerx = L.marker( [lat,long], {icon: div_circle} ).addTo(this.map);
      // }else{
      //    var marker1 = L.circleMarker( [lat,long], {radius: radius, className: 'cssClass'}).addTo(this.map);
      //    var div_circle = L.divIcon({ className: "circleGreen"});
      //    var markerx = L.marker( [lat,long], {icon: div_circle} ).addTo(this.map);
      // }
      
      
      let marker2 = L.featureGroup([markerx]).bindPopup( 
                                          '<h3>Detected Object Details</h3>'   +
                                          '<b>Object ID: </b>'  + object.id                + '<br>' +
                                          '<b>Object Type: </b>'+ object.type        + '<br>' +
                                          '<b>Accuracy: </b>'   +(+object.confidence*100)  + '<br>' +
                                          '<b>From Asset: </b>' + e.sensor.id          + '<br>' +
                                          '<b>Motion Type: </b>'+ 'Dynamic'        + '<br>' +
                                          '<b>Ground Truth Image: </b>'+ '<a href=`https://drive.google.com/drive/u/1/folders/1CqczJJP7Mxa8kMzMP37fhDP9yJIIVnC8`>Image</a>' + '<br>' + 
                                          '<img src= '+ this.imgsrc +' width=300 height=300 />',
                                          
                                          {
                                            maxHeight: 1000,
                                            maxWidth: 1000
                                          }
                                        )
                                .on('click', function() { })
                                .addTo(this.map);
              
       var myIcon3 = L.icon({
          iconUrl: 'assets/icons8-autonomous-vehicles-90.png',
          iconSize: [20,40],
        });
      
        
        if(this.countx == 0)
        {
          var bgv1 = L.marker([39.35151547165209, -76.34237530904761],  {icon : myIcon3}).addTo(this.map);
          var bgv2 = L.marker([39.3489767603811, -76.34299758149406] ,  {icon : myIcon3}).addTo(this.map);
          var bgv3 = L.marker([39.34917587832393, -76.3473964039603] ,  {icon : myIcon3}).addTo(this.map);
          this.countx = 1;
        }
        
      
        
        
      
      // Removing 'Dynamic' Objects after 5 secs                                   
      const ons1$ = timer(7000);
      ons1$.subscribe((d) => {
        if(object.confidence % 2 > 0)
        {
          removeMarker(markerx, this.map);
        } 
      })
      
    }
    
  }


    // Experimental function to test the state after page refresh
    plotLag() 
    {
      for(let i=0; i< this.list1.length; i=i+2)
      {
        this.list1[i].addTo(this.map);
        this.list1[i+1].addTo(this.map);
      }

      
    }
}



function removeMarker(marker1: L.Marker<any>,  map:any) 
{

  const ons3$ = timer(3000);
      ons3$.subscribe((d) => 
      {
          map.removeLayer(marker1);
      })
      
}

