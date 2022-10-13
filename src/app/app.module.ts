import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapComponent } from './components/map/map.component';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { SettingsDialogComponent } from './components/settings-dialog/settings-dialog.component';

import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CallComponent } from './components/call/call.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SettingsDialogComponent,
    CallComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LeafletModule,
    HttpClientModule,
    LeafletMarkerClusterModule,
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

