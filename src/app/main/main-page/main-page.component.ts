import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {AppService} from '../../app.service';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {ToastrService} from "ngx-toastr";
import {UserInfoModel} from "../../shared/models/userInfo.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
    selector: 'app-page-2',
    templateUrl: './main-page.component.html',
    styleUrls: [
        '../../../../node_modules/@swimlane/ngx-datatable/release/index.css',
        '../../../vendor/libs/ngx-datatable/ngx-datatable.scss',
        '../../../../node_modules/@swimlane/ngx-datatable/release/assets/icons.css',
        './main-page.component.scss',
        '../../../vendor/libs/ngx-toastr/ngx-toastr.scss'
    ],
    encapsulation: ViewEncapsulation.None
})
export class MainPageComponent {
    @ViewChild('table') table: DatatableComponent;

    userInfo: UserInfoModel;
    date = new Date().toDateString();
    lastWinners;
    index: number = 0;
    loadingIndicator = true;
    rows;
    cols: any = [
        'uid', 'date', 'fee', 'players', 'status'
    ];
    temp;
    selected = [];
    active: boolean = true;

    constructor(
        private appService: AppService,
        public toastrService: ToastrService,
        private http: HttpClient
    ) {
        this.userInfo = this.appService.userInfo;
        this.appService.pageTitle = 'Main';

        let headers = {headers: new HttpHeaders().set("Authorization", this.appService.userInfo.token)};
        this.http.get(this.appService.apiUrl + 'games/open', headers).subscribe(
            response => {
                this.rows = response;
                this.temp = this.rows;
            }
        );
        this.http.get(this.appService.apiUrl + 'lastwinners', headers).subscribe(
            response => {
                this.lastWinners = response;
            }
        );
        setTimeout(() => {
            this.loadingIndicator = false;
        }, 1500);
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        this.rows = this.temp;
        const t = this.rows.filter(function (d) {
            if (val.replace(' ', '').length == 0) {
                return true;
            }
            for (let item in d) {
                if (d[item].toString().toLowerCase().indexOf(val) != -1) {
                    return true;
                }
            }
            return false;
        });
        this.rows = t;
        this.table.offset = 0;
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
