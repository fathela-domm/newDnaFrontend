import { LogoutComponent } from './../../logout/logout.component';
import { HomeComponent } from 'app/home/home.component';
import { Routes } from '@angular/router';
import { CatholicNewsComponent } from 'app/catholic-news/catholic-news.component';
import { DailyReadingsComponent } from 'app/daily-readings/daily-readings.component';
import { BibleComponent } from './../../bible/bible.component';
import { CatholicPrayersComponent } from './../../catholic-prayers/catholic-prayers.component';
import { CatechismComponent } from './../../catechism/catechism.component';
import { RosariesComponent } from 'app/rosaries/rosaries.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'daily_readings', component: DailyReadingsComponent },
    { path: 'catholic_news', component: CatholicNewsComponent },
    { path: 'rosaries', component: RosariesComponent },
    { path: 'catechism', component: CatechismComponent },
    { path: 'catholic_bible', component: BibleComponent },
    { path: 'catholic_prayers', component: CatholicPrayersComponent },
    { path: "logout", component: LogoutComponent }
];
