import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const cleanupServiceWorkers = async (): Promise<void> => {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(
      registrations.map(async registration => {
        const scriptUrl = registration.active?.scriptURL
          ?? registration.waiting?.scriptURL
          ?? registration.installing?.scriptURL;

        if (!scriptUrl) {
          return;
        }

        const parsedScriptUrl = new URL(scriptUrl);
        const expectedPathname = new URL('ngsw-worker.js', window.location.origin).pathname;
        const isUnexpectedRegistration = parsedScriptUrl.origin !== window.location.origin
          || parsedScriptUrl.pathname !== expectedPathname;

        if (isUnexpectedRegistration) {
          await registration.unregister();
        }
      })
    );
  } catch {
    return;
  }
};

if (environment.production) {
  enableProdMode();
}

cleanupServiceWorkers()
  .finally(() => platformBrowserDynamic().bootstrapModule(AppModule))
  .catch(err => console.error(err));
