import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // You may need to create this file if it doesn't exist.
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module'; // Importing the CoreModule

@NgModule({
  declarations: [],
  imports: [BrowserModule, AppRoutingModule, CoreModule, AppComponent],
  providers: [],
  bootstrap: [],
})
export class AppModule {}
