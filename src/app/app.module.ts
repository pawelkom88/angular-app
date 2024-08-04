import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // You may need to create this file if it doesn't exist.
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module'; // Importing the CoreModule

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule, HttpClient],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
