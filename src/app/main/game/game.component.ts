import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AppService} from "../../app.service";

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html'
})

export class GameComponent implements OnInit, AfterViewInit {
    uid: string;
    joined: boolean = false;
    urltoshare: string = location.href;
    balance: number = 4.5;
    want: number = 3;
    game;
    private sub: any;

    constructor (
        private route: ActivatedRoute,
        private appService: AppService,
        private router: Router,
        private http: HttpClient
    ) {
        if (!window['fbAsyncInit']) {
            window['fbAsyncInit'] = function () {
                window['FB'].init({
                    appId: 'your-app-id',
                    autoLogAppEvents: true,
                    xfbml: true,
                    version: 'v3.0'
                });
            };
        }
        const url_fb = 'https://connect.facebook.net/en_US/sdk.js';
        if (!document.querySelector(`script[src='${url_fb}']`)) {
            let script = document.createElement('script');
            script.src = url_fb;
            document.body.appendChild(script);
        }
        const url_tweet = 'https://platform.twitter.com/widgets.js';
        if (!document.querySelector(`script[src='${url_tweet}']`)) {
            let script = document.createElement('script');
            script.src = url_tweet;
            document.body.appendChild(script);
        }
    }

    ngOnInit () {
        this.sub = this.route.params.subscribe(params => {
            this.uid = params['uid'];

            let headers = {headers: new HttpHeaders().set("Authorization", this.appService.userInfo.token)};
            this.http.get(this.appService.apiUrl + 'game/' + this.uid, headers).subscribe(
                response => {
                    this.game = response;
                }
            );
        });
    }

    confirm() {
        this.joined = true;
    }

    go() {
        this.router.navigate(['/main/billing'])
    }

    cancel() {
    }

    setStatus(status: number) {
        this.game.status = status;
        if (status == 0 && this.game.players.length == 3) {
            this.game.players.pop();
            this.game.currentCount = this.game.players.length;
            this.game.needCount = this.game.wantCount - this.game.players.length;
        } else if ((status !== 0) && this.game.players.length < 3) {
            this.game.players = [
                {date: '2018-07-05 14:05:23', player: 'nMaxwell', fee: 20, tx: '0xb5a803a4ad39357af19fd16d1961c9114685cc7a04a90da7adf3625e0f8d50fc'},
                {date: '2018-07-05 14:07:00', player: 'LimLim', fee: 20, tx: '0x79b06432b7a687843ac66ef7319c5ea8fddf51a927419f3e63c4e00e2debd4dc'},
                {date: '2018-07-05 14:08:54', player: 'Zmeenbiw', fee: 20, tx: '0x46a432aa7ceb03a14c55375d3ca2e4bc39e631af470272d514969a93017c63a2'}
            ];
            this.game.currentCount = this.game.players.length;
            this.game.needCount = this.game.wantCount - this.game.players.length;
        }
    }

    ngAfterViewInit(): void {
        window['FB'] && window['FB'].XFBML.parse();
        window['twttr'] && window['twttr'].widgets.load();
    }
}
