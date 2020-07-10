import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import {MatExpansionModule} from '@angular/material/expansion';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { Observable, interval, Subscription } from 'rxjs';
import { LoadformComponent } from './components/loadform/loadform.component';
import {
    DxDataGridModule,
    DxBulletModule,
    DxTemplateModule,
    DxDataGridComponent
} from 'devextreme-angular';
import {MatMenuModule} from '@angular/material';
import { PickupComponent } from './components/pickup/pickup.component';
import { DropoffComponent } from './components/dropoff/dropoff.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ModalModule,
    ButtonsModule.forRoot(),
    MatExpansionModule,
    DxDataGridModule,
    MatMenuModule

  ],
  declarations: [ DashboardComponent, LoadformComponent, PickupComponent, DropoffComponent ]
})
export class DashboardModule { }
