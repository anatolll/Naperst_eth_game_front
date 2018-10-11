import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {DatatableComponent} from "@swimlane/ngx-datatable";
import {AppService} from "../../app.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: [
        '../../../../node_modules/@swimlane/ngx-datatable/release/index.css',
        '../../../vendor/libs/ngx-datatable/ngx-datatable.scss',
        '../../../../node_modules/@swimlane/ngx-datatable/release/assets/icons.css',
        './reports.component.scss'
    ],
    encapsulation: ViewEncapsulation.None
})
export class ReportsComponent implements AfterViewInit{
    @ViewChild('table1') table1: DatatableComponent;
    @ViewChild('table2') table2: DatatableComponent;
    @ViewChild('table3') table3: DatatableComponent;
    @ViewChild('txTemplate') txTemplate: TemplateRef<any>;
    @ViewChild('txIdTemplate') txIdTemplate: TemplateRef<any>;
    @ViewChild('etherTemplate') etherTemplate: TemplateRef<any>;
    @ViewChild('etherBlackTemplate') etherBlackTemplate: TemplateRef<any>;
    @ViewChild('linkTemplate') linkTemplate: TemplateRef<any>;
    @ViewChild('statusTemplate') statusTemplate: TemplateRef<any>;

    loadingIndicator1 = true;
    loadingIndicator2 = true;
    loadingIndicator3 = true;
    rows1;
    rows2 = [];
    rows3 = [];
    temp1;
    temp2 = [];
    temp3 = [];
    columns1 = [];
    columns2 = [];
    columns3 = [];

    constructor(
        private appService: AppService,
        private http: HttpClient
    ) {
        this.appService.pageTitle = 'Main';

        let headers = {headers: new HttpHeaders().set("Authorization", this.appService.userInfo.token)};
        this.http.get(this.appService.apiUrl + 'mygames', headers).subscribe(
            response => {
                this.rows1 = response;
                this.temp1 = this.rows1;
            }
        );
        setTimeout(() => {
            this.loadingIndicator1 = false;
        }, 1500);

        this.fetch2((data) => {
            this.rows2 = data;
            this.temp2 = data;
            setTimeout(() => {
                this.loadingIndicator2 = false;
            }, 1500);
        });

        this.fetch3((data) => {
            this.rows3 = data;
            this.temp3 = data;
            setTimeout(() => {
                this.loadingIndicator3 = false;
            }, 1500);
        });
    }

    fetch1(cb) {
        const req = new XMLHttpRequest();
        req.open('GET', `assets/json/reports-games.json`);
        req.onload = () => {
            const data = JSON.parse(req.response);
            cb(data);
        };
        req.send();
    }

    fetch2(cb) {
        const req = new XMLHttpRequest();
        req.open('GET', `assets/json/reports-adds.json`);
        req.onload = () => {
            const data = JSON.parse(req.response);
            cb(data);
        };
        req.send();
    }

    fetch3(cb) {
        const req = new XMLHttpRequest();
        req.open('GET', `assets/json/reports-writeoffs.json`);
        req.onload = () => {
            const data = JSON.parse(req.response);
            cb(data);
        };
        req.send();
    }

    updateFilter1(event) {
        const val = event.target.value.toLowerCase();
        this.rows1 = this.temp1;
        const t = this.rows1.filter(function (d) {
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
        this.rows1 = t;
        this.table1.offset = 0;
    }

    updateFilter2(event) {
        const val = event.target.value.toLowerCase();
        this.rows2 = this.temp2;
        const t = this.rows2.filter(function (d) {
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
        this.rows2 = t;
        this.table2.offset = 0;
    }

    updateFilter3(event) {
        const val = event.target.value.toLowerCase();
        this.rows3 = this.temp3;
        const t = this.rows3.filter(function (d) {
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
        this.rows3 = t;
        this.table3.offset = 0;
    }

    private summary(cells: number[]) {
        const filteredCells = cells.filter(cell => !!cell);
        const result = filteredCells.reduce((sum, cell) => sum += cell, 0);
        const cls: string = result > 0 ? 'text-theme' : result < 0 ? 'text-danger' : '';
        return "<span class='"+cls+"'> <i class='fab fa-ethereum'></i> " + result + "</span>";
    }

    private avg(cells: number[]) {
        const filteredCells = cells.filter(cell => !!cell);
        let result: number = 0;
        for (let i=0; i<filteredCells.length; i++) {
            result += filteredCells[i];
        }
        result /= filteredCells.length;
        return "<i class='fab fa-ethereum'></i> " + result;
    }

    ngAfterViewInit(): void {
        this.columns1 = [
            {cellTemplate: this.linkTemplate, name: 'Id', summaryFunc: null},
            {prop: 'created', summaryFunc: null},
            {prop: 'winner', summaryFunc: null},
            {prop: 'players', summaryFunc: null},
            {cellTemplate: this.statusTemplate, prop: 'status', summaryFunc: null},
            {cellTemplate: this.etherBlackTemplate, prop: 'fee', summaryFunc: (cells) => this.avg(cells)},
            {cellTemplate: this.etherBlackTemplate, prop: 'hold', summaryFunc: (cells) => this.avg(cells)},
            {cellTemplate: this.etherBlackTemplate, prop: 'bank', summaryFunc: (cells) => this.avg(cells)},
            {cellTemplate: this.etherTemplate, prop: 'profit', summaryFunc: (cells) => this.summary(cells)},
        ];
        this.columns2 = [
            {cellTemplate: this.txIdTemplate, name: 'Id', summaryFunc: null},
            {prop: 'created', summaryFunc: null},
            {cellTemplate: this.txTemplate, prop: 'tx', summaryFunc: null},
            {cellTemplate: this.etherTemplate, prop: 'amount', summaryFunc: (cells) => this.summary(cells)},
            {cellTemplate: this.etherBlackTemplate, prop: 'balance', summaryFunc: null}
        ];
        this.columns3 = [
            {cellTemplate: this.txIdTemplate, name: 'Id', summaryFunc: null},
            {prop: 'created', summaryFunc: null},
            {cellTemplate: this.txTemplate, prop: 'tx', summaryFunc: null},
            {cellTemplate: this.etherTemplate, prop: 'amount', summaryFunc: (cells) => this.summary(cells)},
            {cellTemplate: this.etherBlackTemplate, prop: 'balance', summaryFunc: null}
        ];
    }

}
