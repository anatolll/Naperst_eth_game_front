import {Component, OnInit} from '@angular/core';
import {AppService} from '../../app.service';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
    selector: 'app-recovery-sent',
    templateUrl: './successfully.component.html',
    styleUrls: ['../../../vendor/styles/pages/authentication.scss']
})
export class Successfullycomponent implements OnInit {

    subscribe: boolean = false;
    contactus: boolean = false;
    registration: boolean = false;

    constructor(
        private appService: AppService,
        private activatedRoute: ActivatedRoute
    ) {
        this.appService.pageTitle = 'Succesfully';
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe( params => {
            switch (params['type']) {
                case 'subscribe':
                    this.subscribe = true;
                    break;
                case 'contactus':
                    this.contactus = true;
                    break;
                case 'registration':
                    this.registration = true;
                    break;
            }
        });
    }

}
