import {Component} from '@angular/core';
import {AppService} from "../../app.service";

@Component({
    selector: 'app-terms',
    templateUrl: './cookie.component.html',
    styleUrls: ['./cookie.component.scss']
})
export class CookieComponent {
    constructor(
        private appService: AppService
    ) {
        this.appService.pageTitle = 'Home';
    }
}
