import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {DatatableComponent} from "@swimlane/ngx-datatable";
import {AppService} from "../../app.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
    selector: 'app-reports',
    templateUrl: './games.component.html',
    styleUrls: [
        '../../../../node_modules/@swimlane/ngx-datatable/release/index.css',
        '../../../vendor/libs/ngx-datatable/ngx-datatable.scss',
        '../../../../node_modules/@swimlane/ngx-datatable/release/assets/icons.css',
        './games.component.scss'
    ],
    encapsulation: ViewEncapsulation.None
})
export class GamesComponent implements AfterViewInit {
    @ViewChild('table') table: DatatableComponent;
    @ViewChild('etherTemplate') etherTemplate: TemplateRef<any>;
    @ViewChild('etherBlackTemplate') etherBlackTemplate: TemplateRef<any>;
    @ViewChild('linkTemplate') linkTemplate: TemplateRef<any>;
    @ViewChild('statusTemplate') statusTemplate: TemplateRef<any>;

    loadingIndicator = true;
    rows;
    temp;
    columns;

    constructor(
        private appService: AppService,
        private http: HttpClient
    ) {
        this.appService.pageTitle = 'Games List';

        let headers = {headers: new HttpHeaders().set("Authorization", this.appService.userInfo.token)};
        this.http.get(this.appService.apiUrl + 'games', headers).subscribe(
            response => {
                this.rows = response;
                this.temp = this.rows;
            }
        );
        setTimeout(() => {
            this.loadingIndicator = false;
        }, 1500);
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();

        // filter our data
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

    private summary(cells: number[]) {
        const filteredCells = cells.filter(cell => !!cell);
        const result = filteredCells.reduce((sum, cell) => sum += cell, 0);
        const cls: string = result > 0 ? 'text-theme' : result < 0 ? 'text-danger' : '';
        return "<span class='"+cls+"'> <i class='fab fa-ethereum'></i> " + result + "</span>";
    }

    private avg(cells: number[]) {
        const filteredCells = cells.filter(cell => !!cell);
        let result: number = 0;
        console.log(filteredCells);
        for (let i=0; i<filteredCells.length; i++) {
            result += filteredCells[i];
        }
        result /= filteredCells.length;
        return "<i class='fab fa-ethereum'></i> " + result.toFixed(2);
    }

    ngAfterViewInit(): void {
        this.columns = [
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
    }
}
