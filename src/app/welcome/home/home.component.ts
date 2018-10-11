import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AppService} from "../../app.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    form: FormGroup;
    lastWinners;
    index: number = 0;

    constructor(
        private appService: AppService,
        private router: Router,
        public toastrService: ToastrService,
        private http: HttpClient
    ) {
        let headers = {headers: new HttpHeaders().set("Authorization", this.appService.userInfo.token)};
        this.http.get(this.appService.apiUrl + 'lastwinners', headers).subscribe(
            response => {
                this.lastWinners = response;
            }
        );
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                const tree = router.parseUrl(router.url);
                if (tree.fragment) {
                    const element = document.querySelector("#" + tree.fragment);
                    if (element) {
                        element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
                        window.scrollBy(0, -50);
                    }
                }
            }
        });

        if (this.appService.showAlerts) {
            setTimeout(() => {
                this.showToast()
            }, 20000);
        }
    }

    onSubmit() {
        if (!this.form.invalid)
            this.router.navigate(['/successfully'], {queryParams: {type: 'contactus'}, skipLocationChange: true});
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            'subject': new FormControl(null, [Validators.required]),
            'name': new FormControl(null, [Validators.required]),
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'message': new FormControl(null, [Validators.required]),
            'agree': new FormControl(null, [Validators.requiredTrue]),
        })
    }

    showToast() {
        this.toastrService.clear();

        const options = {
            tapToDismiss: false,
            closeButton: true,
            progressBar: true,
            positionClass: 'toast-bottom-right',
            rtl: true,
            enableHtml: true
        };

        this.toastrService.toastrConfig.newestOnTop = true;
        this.toastrService.toastrConfig.preventDuplicates = false;

        this.toastrService['success'](
            'in the game <a href="/main/game/'+this.lastWinners[this.index].gameid+'">'+this.lastWinners[this.index].gameid+'</a>',
            this.lastWinners[this.index].username + ' won ' + this.lastWinners[this.index].profit + ' ETH', options);

        this.index = this.appService.randomNum(0, this.lastWinners.length);

        setTimeout(() => {
            this.showToast()
        }, 20000);
    }
}
