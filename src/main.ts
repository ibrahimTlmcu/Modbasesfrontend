import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { AppComponent } from './app.component';
(window as any).global = window;
(window as any).process = {
    env: { DEBUG: undefined },
};
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
