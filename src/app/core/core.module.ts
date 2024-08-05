// The Core Module is a special module in Angular that contains services and other singleton providers that you want to make available across your entire application.

// It should be imported only once in the AppModule to avoid creating multiple instances of these services.

import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [AuthService],
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // This constructor ensures that CoreModule is only loaded once.
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only.'
      );
    }
  }
}
