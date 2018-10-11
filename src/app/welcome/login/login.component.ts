import {Component, OnInit} from '@angular/core';
import {AppService} from '../../app.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";

@Component({
    selector: 'app-signin',
    templateUrl: './login.component.html',
    styleUrls: [
        '../../../vendor/styles/pages/authentication.scss'
    ]
})
export class LoginComponent implements OnInit {

    form: FormGroup;

    constructor(
        private appService: AppService,
        private router: Router,
        private authService: AuthService
    ) {
        this.appService.pageTitle = 'Sign In';
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            'email': new FormControl(null, [
                Validators.required,
                Validators.email
            ]),
            'password': new FormControl(null, [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(15),
                Validators.pattern("^(?=^.{6,15}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$")
            ])
        });
    }

    onSubmit() {
        this.authService.login(this.form.value);
    }
}
