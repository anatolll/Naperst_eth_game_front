import {Component} from '@angular/core';
import {
    Router,
    Event as RouterEvent,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError
} from '@angular/router';
import {AppService} from './app.service';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styles: [':host { display: block; }']
})
export class AppComponent {
    constructor(
        private router: Router,
        private appService: AppService,
        private translater: TranslateService
    ) {
        this.router.events.subscribe(this.navigationInterceptor.bind(this));
        if (typeof document['documentMode'] === 'number' && document['documentMode'] < 11) {
            const style = document.createElement('style');
            style.textContent = `
        * {
          -ms-animation: none !important;
          animation: none !important;
          -ms-transition: none !important;
          transition: none !important;
        }`;
            document.head.appendChild(style);
        }
    }

    private navigationInterceptor(e: RouterEvent) {
        if (e instanceof NavigationStart) {
            document.body.classList.add('app-loading');
        }

        if (e instanceof NavigationEnd) {
            this.appService.scrollTop(0, 0);
        }

        if (e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError) {
            document.body.classList.remove('app-loading');
        }
    }
}
