import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
    selector: 'app-subscribe',
    templateUrl: './subscribe.component.html'
})

export class SubscribeComponent implements OnInit{
    form: FormGroup;

    constructor(private router: Router) {
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            'name': new FormControl(null, [
                Validators.required
            ]),
            'email': new FormControl(null, [
                Validators.required,
                Validators.email
            ])
        });
    }

    onSubmit() {
        this.router.navigate(['/successfully'], {queryParams: {type:  'subscribe'}, skipLocationChange: true});
    }
}
