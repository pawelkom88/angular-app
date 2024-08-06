import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // You may need to create this file if it doesn't exist.
import { CoreModule } from './core/core.module'; // Importing the CoreModule
import { AppComponent } from './app.component';

@NgModule({
  declarations: [],
  imports: [BrowserModule, AppRoutingModule, CoreModule,AppComponent],
  providers: [],
  bootstrap: [],
})
export class AppModule {}
