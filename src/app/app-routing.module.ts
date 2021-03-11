import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StopwatchMainComponent } from './components/stopwatch-main/stopwatch-main.component';
import { StopwatchComponent } from './components/stopwatch/stopwatch.component';

const routes: Routes = [
  { path: 'main', component: StopwatchMainComponent },
  { path: '', component: StopwatchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
