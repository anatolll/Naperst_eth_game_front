import {Component, OnInit} from '@angular/core';
import {AppService} from '../../app.service';

@Component({
    selector: 'app-recovery-sent',
    templateUrl: './recovery-sent.component.html',
    styleUrls: ['../../../vendor/styles/pages/authentication.scss']
})
export class RecoverySentComponent implements OnInit {

    constructor(private appService: AppService) {
        this.appService.pageTitle = 'Recovery Email Sent';
    }

    ngOnInit() {
    }

}
