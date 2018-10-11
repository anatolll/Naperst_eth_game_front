import {Component} from "@angular/core";

@Component({
    selector: 'app-cookie-notification',
    templateUrl: './cookie-notification.component.html',
    styleUrls: ['./cookie-notification.component.scss']
})

export class CookieNotificationComponent {
    cookie = false;
    agreeCookiePolicy() {
        this.cookie = true;
    }
}