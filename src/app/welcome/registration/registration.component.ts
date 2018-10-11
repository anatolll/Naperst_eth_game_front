import {Component, OnInit} from '@angular/core';
import {AppService} from '../../app.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../shared/services/auth.service";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {Router} from "@angular/router";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['../../../vendor/styles/pages/authentication.scss']
})
export class RegistrationComponent implements OnInit {

    form: FormGroup;

    constructor(
        private appService: AppService,
        private http: HttpClient,
        private authService: AuthService,
        private router: Router
    ) {
        this.appService.pageTitle = 'Sign Up';
    }

    ngOnInit() {
        this.form = new FormGroup({});

        this.form.addControl('name', new FormControl(null, [
            Validators.required,
            Validators.minLength(3)
        ]));
        this.form.addControl('username', new FormControl(null, [
            Validators.required,
            Validators.minLength(3)
        ]));
        this.form.addControl('email', new FormControl(null, [
            Validators.required,
            Validators.email
        ]));
        this.form.addControl('password', new FormControl(null, [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(15),
            Validators.pattern("^(?=^.{6,15}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$")
        ]));
        this.form.addControl('repassword', new FormControl(null, [
            Validators.required
        ]));
        this.form.addControl('checkbox', new FormControl(true, [
            Validators.requiredTrue
        ]));
    }

    onChange() {
        if (this.form.get('password').value != this.form.get('repassword').value) {
            this.form.get('repassword').setErrors({missmath: true});
        }
    }

    onSubmit() {
        let postData = {
            name: this.form.value.name,
            username: this.form.value.username,
            email: this.form.value.email,
            password: this.form.value.password,
        };
        this.http.post<any>(this.appService.apiUrl + 'user/registration', postData)
            .subscribe(
                data => {
                    this.router.navigate(['/successfully'], {queryParams: {type: 'registration'}, skipLocationChange: true});
                },
                error => {
                    alert('Error');
                }
            );
    }
}
