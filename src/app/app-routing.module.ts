import { BasicPageComponent } from './basic-page/basic-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimelineComponent } from './timeline/timeline.component';
import { TestComponentComponent } from './test-component/test-component.component';

const routes: Routes = [
  { path: '', redirectTo: '/test', pathMatch: 'full' },
  { path: 'test', component: TestComponentComponent },
  { path: 'timeline', component: TimelineComponent},
  { path: 'basicpage', component: BasicPageComponent},
  { path: '**', redirectTo: '/test', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
