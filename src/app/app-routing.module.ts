import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StopwatchMainComponent } from './components/stopwatch-main/stopwatch-main.component';

const routes: Routes = [
  { path: '', component: StopwatchMainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
