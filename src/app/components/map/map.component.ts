import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { circle, latLng, Map, polygon, tileLayer } from 'leaflet';
import { interval, startWith, Subscription, switchMap } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  private map: Map;
  private pos: any;
  private refreshInterval: Subscription;

  private todayFormatted: any;


  private closedCalls: any;
  private activeCalls: any;

  //TODO: Move the markers to a marker service
  public callIcon = L.icon({
    iconUrl: '../assets/Marker.svg',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
  public homeIcon = L.icon({
    iconUrl: '../assets/Marker-Home.svg',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
  public activeIcon = L.icon({
    iconUrl: '../assets/Marker-Active.svg',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });

  public townBountry = {
    type: 'Feature' as const,
    properties: {
      shape_area: '667530348.413',
      shape_len: '122794.139919',
      town: 'Meriden',
      town_no: '80',
    },
    geometry: {
      type: 'MultiPolygon' as const,
      coordinates: [
        [
          [
            [-72.75199423992723, 41.578724571825674],
            [-72.75190740144008, 41.57759920157723],
            [-72.75161745870193, 41.57512908639381],
            [-72.75127018745334, 41.57161078297795],
            [-72.7509871596073, 41.56967839127845],
            [-72.75101065504074, 41.56786177360015],
            [-72.75063467642308, 41.5640686812742],
            [-72.7502578301034, 41.56073681656291],
            [-72.74992555508278, 41.55693839821776],
            [-72.74954124711208, 41.553914242645085],
            [-72.74944512605741, 41.552556277434505],
            [-72.74940038281567, 41.55125491810494],
            [-72.74912047612199, 41.54856608881673],
            [-72.74885475600132, 41.545448444615886],
            [-72.74874336531144, 41.54397195400859],
            [-72.74817527850468, 41.53735312489263],
            [-72.74797560384933, 41.53488315404971],
            [-72.74731846297897, 41.52741388379584],
            [-72.74677320766612, 41.521908402825346],
            [-72.74660350815108, 41.51985042931311],
            [-72.74660329472995, 41.51953242008837],
            [-72.746079610743, 41.5141427105967],
            [-72.74602810316485, 41.51303962530519],
            [-72.74593209564131, 41.512007547335365],
            [-72.74561511799514, 41.50873069767083],
            [-72.74546737130056, 41.50701319997596],
            [-72.7453194226244, 41.50501525451169],
            [-72.74505386261686, 41.50155761260882],
            [-72.74495221596156, 41.50008470833534],
            [-72.7447392632258, 41.49826291618046],
            [-72.74778305013827, 41.498019447385104],
            [-72.74822840229908, 41.498002815657216],
            [-72.74954027320648, 41.49797744245003],
            [-72.75586277578286, 41.49767369170166],
            [-72.75748308842073, 41.497581489197174],
            [-72.75956425786967, 41.49748356467182],
            [-72.76220734843916, 41.49735329714272],
            [-72.76602560570736, 41.49716294680795],
            [-72.77110684371881, 41.496901062430354],
            [-72.7719537054729, 41.496835896557926],
            [-72.77234086782964, 41.496830503255445],
            [-72.7726762368258, 41.49680882521779],
            [-72.7735234568226, 41.49710556897086],
            [-72.77601196965225, 41.49792372804675],
            [-72.77672733492031, 41.49819886554504],
            [-72.77716543975761, 41.49832500643404],
            [-72.78101202327292, 41.49961065268357],
            [-72.78139197481993, 41.49975926446911],
            [-72.78234806476276, 41.49997923950986],
            [-72.78279143896636, 41.50009935263819],
            [-72.7958800344259, 41.5046741185244],
            [-72.80021699198917, 41.505607810980514],
            [-72.80634994186777, 41.50689810456224],
            [-72.80776698450475, 41.50718402320197],
            [-72.81768238336308, 41.50928049725944],
            [-72.83523786802579, 41.51280243362941],
            [-72.84043047660803, 41.51383276990765],
            [-72.84745655679633, 41.515225483619346],
            [-72.85129787624115, 41.51599265911767],
            [-72.85382089231608, 41.522051113462986],
            [-72.85306308434615, 41.525031888239496],
            [-72.85658465374696, 41.526254915631576],
            [-72.85762954846498, 41.5266441652412],
            [-72.85784917818957, 41.52736316629465],
            [-72.86014272702648, 41.52738963850169],
            [-72.86085169006081, 41.528059107606936],
            [-72.86106375173516, 41.52833334442221],
            [-72.85772973558664, 41.534476969533394],
            [-72.85352887561415, 41.53344103915101],
            [-72.85183067597062, 41.54024783293029],
            [-72.85317109354206, 41.546180732059604],
            [-72.85110343272251, 41.54589612076059],
            [-72.84827594190541, 41.54545758104186],
            [-72.84455652886253, 41.54491507529068],
            [-72.84547289073126, 41.55121066766496],
            [-72.84562677568255, 41.552286518479576],
            [-72.84572254811526, 41.55328008246146],
            [-72.84594188048564, 41.55459738527663],
            [-72.84594916847368, 41.5547400880482],
            [-72.84602302273838, 41.55634790208534],
            [-72.84659562501463, 41.56210053867497],
            [-72.84785500948499, 41.565508530775176],
            [-72.84851315153884, 41.5672647251184],
            [-72.84781219385825, 41.56740751570457],
            [-72.84523224450432, 41.56788051649468],
            [-72.8424256342938, 41.56831470419299],
            [-72.83969959521471, 41.56873812606042],
            [-72.827911236289, 41.57050192133934],
            [-72.82986856571728, 41.56206019375207],
            [-72.82546956547104, 41.56421202554613],
            [-72.82567326496668, 41.56106166780453],
            [-72.82584833287657, 41.55785592557773],
            [-72.8259796457022, 41.55590765852632],
            [-72.82367037558186, 41.55457383703213],
            [-72.82330483550078, 41.55441489532188],
            [-72.82202609473556, 41.55401965313685],
            [-72.82185803612074, 41.55402490398796],
            [-72.82106106460539, 41.553992466246996],
            [-72.8202718870605, 41.55398711917936],
            [-72.81949758552298, 41.55401451762053],
            [-72.81867141501696, 41.554222902097806],
            [-72.81561735272268, 41.556813512519085],
            [-72.81413393970219, 41.55820215575519],
            [-72.81253394570165, 41.559777977879854],
            [-72.80995418643369, 41.56237949692275],
            [-72.80885078554185, 41.56175897407656],
            [-72.80469905616276, 41.56652838014023],
            [-72.800882530739, 41.57282370860943],
            [-72.79041520453711, 41.574287706346915],
            [-72.7815704754471, 41.57550932466668],
            [-72.76775446975958, 41.57714005098688],
            [-72.75873414962248, 41.57819527702619],
            [-72.75199423992723, 41.578724571825674],
          ],
        ],
      ],
    },
  };
  options = {
    layers: [
      tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        {
          maxZoom: 20,
          attribution:
            '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        }
      ),
    ],
    zoom: 14,
    center: latLng(41.536372, -72.8014305),
  };


  markerClusterGroup: L.MarkerClusterGroup;
  markerClusterData = [];

  constructor(private location: LocationService, private http: HttpService, private dataService: DataService) {
    let today = new Date();
    this.todayFormatted =
      today.getFullYear() +
      '-' +
      ('0' + (today.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + today.getDate()).slice(-2);

  }

  ngOnInit(): void {
    

    this.markerClusterGroup = L.markerClusterGroup({
      removeOutsideVisibleBounds: true,
      animate:true,
      maxClusterRadius: 10
    });

  }

  public onMapReady(map: Map) {
    this.map = map;

    this.location.getPosition().then((pos) => {
      this.pos = pos;
      console.log(pos.lat + ' ' + pos.lang);

      let layer = L.marker([this.pos.lat, this.pos.lang], {
        icon: this.homeIcon,
      });
      this.markerClusterGroup.addLayer(layer);

      this.markerClusterGroup.addTo(this.map);
    });

    L.geoJson(this.townBountry, {
      style: (feature) => ({
        color: '#d4d4d4',
        opacity: 1,
        fillOpacity: 0.0,
      }),
    }).addTo(this.map);

    this.refreshInterval = interval(60000)
      .pipe(
        startWith(0),
        switchMap(() => this.http.getActiveCalls()),
        () => this.http.getClosedCallsOnDate(this.todayFormatted)
      )
      .subscribe((data) => {
        console.log("Refreshing...");
        this.handleCall(data);
      });
  }


  private handleCall(data: any) {
    this.markerClusterGroup.clearLayers();
    data.calls.forEach((call: any) => {
      let popup =
        '<h2>' +
        call.nature +
        '</h2>' +
        '<p>' +
        call.case +
        '</p>' +
        '<p>' +
        call.address +
        '</p>' +
        '<p> Start: ' +
        new Date(call.start).toUTCString() +
        '</p>';
        let marker;
      if (call.coordinates) {
        if (call.end) {
          popup += "<p>End: "+new Date(call.end).toUTCString()+"</p>";
          marker = L.marker(
            [call.coordinates.latitude, call.coordinates.longitude],
            { icon: this.callIcon }
          )
            .bindPopup(popup)
            .bindTooltip(call.nature, { direction: 'bottom', offset: [0, 16] });
        } else {
          marker = L.marker(
            [call.coordinates.latitude, call.coordinates.longitude],
            { icon: this.activeIcon }
          )
            .bindPopup(popup)
            .bindTooltip(call.nature, { direction: 'bottom', offset: [0, 16] });
        }

        this.markerClusterGroup.addLayer(marker);

        this.markerClusterGroup.addTo(this.map);
      }
    });
  }

  public mapClick(e:any){
    var clickLocation = e.latlng;
   this.dataService.setLocation(clickLocation);
   let home = this.dataService.getLocation();

    L.marker([clickLocation.lat,clickLocation.lng],{icon:this.homeIcon}).addTo(this.map);
    console.log(clickLocation);
  }
}
