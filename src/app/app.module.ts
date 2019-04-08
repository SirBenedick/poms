import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponentComponent } from './test-component/test-component.component';
import { NgZorroAntdModule, NZ_I18N, de_DE } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import de from '@angular/common/locales/de';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { TimelineComponent } from './timeline/timeline.component';
import { BasicLayoutComponent } from './shared/basic-layout/basic-layout.component';
import { BasicPageComponent } from './basic-page/basic-page.component';

registerLocaleData(de);

@NgModule({
  declarations: [
    AppComponent,
    TestComponentComponent,
    SideMenuComponent,
    TimelineComponent,
    BasicLayoutComponent,
    BasicPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: de_DE }],
  bootstrap: [AppComponent]
})
export class AppModule { }
