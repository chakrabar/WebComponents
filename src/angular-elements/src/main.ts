import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ElementHostModule } from './app/element.module'; // ARGHYA: standard module inclusion
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(ElementHostModule) // ARGHYA: standard module bootstrap
    .catch(err => console.error(err));
