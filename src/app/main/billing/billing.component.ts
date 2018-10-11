import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../app.service";
import {ActivatedRoute, Params} from "@angular/router";
import {NgbTabset} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-game',
    templateUrl: './billing.component.html',
    styles: [':host { display: block; }']
})
export class BillingComponent implements OnInit, AfterViewInit{

    @ViewChild('contractaddress') contractaddress;
    @ViewChild('tabs')
    private tabs: NgbTabset;
    private form: FormGroup;
    requested: boolean = false;
    selectedTab: string;
    sub: any;

    constructor(
        private appService: AppService,
        private route: ActivatedRoute
    ) {
        this.appService.pageTitle = 'Billing';
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            'address': new FormControl(null, [
                Validators.required,
                Validators.minLength(42),
                Validators.maxLength(42),
                Validators.pattern("^0x[a-fA-F0-9]{40}$")
            ])
        });
        this.sub = this.route.params.subscribe(params => {
            this.selectedTab = params['tab'];

            // In a real app: dispatch action to load the details here.
        });
    }

    onSubmit() {
        this.requested = true;
    }

    ngAfterViewInit(): void {
        this.tabs.select(this.selectedTab)
    }
}
