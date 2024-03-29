import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StateControlsModule } from '@pool/view/state/controls';
import { ViewHeaderModule } from '@pool/view/header';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ApiModule } from '../../../../libs/api/src/lib/api.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@pool/view/dashboard').then(m => m.ViewDashboardModule)
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    StateControlsModule,
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true
        }
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production
      ? StoreDevtoolsModule.instrument({ name: 'Pool Client' })
      : [],
    StoreRouterConnectingModule.forRoot(),
    ViewHeaderModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerImmediately'
    }),
    ApiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
