import { AuthGuard } from 'app/services/auth-guard.service';
import { UserProfileComponent } from './../../user-profile/user-profile.component';
import { ScrollTopDirective } from './../../directives/scroll-top.directive';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { MatDialogModule } from '@angular/material/dialog';
import { MatBottomSheet, MatBottomSheetModule, MAT_BOTTOM_SHEET_DEFAULT_OPTIONS } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from "@angular/material/tabs";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from "@angular/material/list";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatStepperModule } from "@angular/material/stepper";
import { MatExpansionModule } from "@angular/material/expansion";
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { HomeComponent } from 'app/home/home.component';
import { BibleComponent } from 'app/bible/bible.component';
import { CatechismComponent } from 'app/catechism/catechism.component';
import { CatholicNewsComponent } from 'app/catholic-news/catholic-news.component';
import { CatholicPrayersComponent } from 'app/catholic-prayers/catholic-prayers.component';
import { DailyReadingsComponent } from 'app/daily-readings/daily-readings.component';
import { LiturgicalCalendarComponent } from 'app/liturgical-calendar/liturgical-calendar.component';
import { SocialShareComponent } from 'app/social-share/social-share.component';
import { RosariesComponent } from 'app/rosaries/rosaries.component';
import { DivineMercyRosaryComponent } from 'app/rosaries/divine-mercy-rosary/divine-mercy-rosary.component';
import { SevenSorrowRosaryComponent } from 'app/rosaries/seven-sorrow-rosary/seven-sorrow-rosary.component';
import { TheRosaryComponent } from 'app/rosaries/the-rosary/the-rosary.component';
import { PreloadersComponent } from 'app/preloaders/preloaders.component';
import { NewTestamentComponent } from "app/bible/new-testament/new-testament.component";
import { OldTestamentComponent } from "app/bible/old-testament/old-testament.component";
import { LogoutComponent } from 'app/logout/logout.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTabsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatSnackBarModule,
    MatListModule,
    MatButtonToggleModule,
    MatStepperModule,
    MatExpansionModule,
    MatOptionModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    NgxMatSelectSearchModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  declarations: [
    HomeComponent,
    DailyReadingsComponent,
    PreloadersComponent,
    RosariesComponent,
    BibleComponent,
    CatechismComponent,
    CatholicPrayersComponent,
    LiturgicalCalendarComponent,
    CatholicNewsComponent,
    SocialShareComponent,
    TheRosaryComponent,
    DivineMercyRosaryComponent,
    SevenSorrowRosaryComponent,
    OldTestamentComponent,
    NewTestamentComponent,
    ScrollTopDirective,
    UserProfileComponent,
    LogoutComponent,
  ],
  providers: [
    {
      provide: MatBottomSheet
    },
    {
      provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, useValue: { hasBackdrop: true }
    },
    {
      provide: AuthGuard
    }
  ],
  exports: [
    MatDatepickerModule,
    MatNativeDateModule,
  ]
})

export class AdminLayoutModule { }
