import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['../../../vendor/styles/pages/authentication.scss']
})
export class ForgotComponent implements OnInit {

  form: FormGroup;

  constructor(private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email])
    })
  }

  onSubmit() {
    this.router.navigate(['/recovery-email-sent']);
  }
}
